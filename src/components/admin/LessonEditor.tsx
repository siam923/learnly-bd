import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Eye, Code } from "lucide-react";
import { LessonRenderer } from "@/components/lesson/LessonRenderer";
import { ComponentInserter } from "./ComponentInserter";

// Dynamic import for MDXEditor to avoid SSR issues
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  toolbarPlugin,
  jsxPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  CodeToggle,
  InsertCodeBlock,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

// Define JSX component descriptors for the editor
const jsxComponentDescriptors = [
  {
    name: 'Quiz',
    kind: 'flow' as const,
    source: './components/interactive/Quiz',
    props: [
      { name: 'questions', type: 'expression' as const }
    ],
    hasChildren: false,
    Editor: () => null
  },
  {
    name: 'VideoEmbed',
    kind: 'flow' as const,
    source: './components/interactive/VideoEmbed',
    props: [
      { name: 'url', type: 'string' as const },
      { name: 'title', type: 'string' as const }
    ],
    hasChildren: false,
    Editor: () => null
  },
  {
    name: 'MathPuzzle',
    kind: 'flow' as const,
    source: './components/interactive/MathPuzzle',
    props: [
      { name: 'problem', type: 'string' as const },
      { name: 'answer', type: 'number' as const },
      { name: 'hint', type: 'string' as const }
    ],
    hasChildren: false,
    Editor: () => null
  },
  {
    name: 'PhysicsSimulator',
    kind: 'flow' as const,
    source: './components/interactive/PhysicsSimulator',
    props: [
      { name: 'type', type: 'string' as const },
      { name: 'title', type: 'string' as const }
    ],
    hasChildren: false,
    Editor: () => null
  },
  {
    name: 'PeriodicTableVisualizer',
    kind: 'flow' as const,
    source: './components/interactive/PeriodicTableVisualizer',
    props: [
      { name: 'highlightElement', type: 'string' as const }
    ],
    hasChildren: false,
    Editor: () => null
  },
  {
    name: 'AngleVisualizer',
    kind: 'flow' as const,
    source: './components/interactive/AngleVisualizer',
    props: [
      { name: 'initialAngle', type: 'number' as const }
    ],
    hasChildren: false,
    Editor: () => null
  }
];

interface LessonEditorProps {
  chapters: any[];
}

export const LessonEditor = ({ chapters }: LessonEditorProps) => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("15");
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState("editor");
  const editorRef = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    if (selectedChapterId) {
      fetchLessons(selectedChapterId);
    }
  }, [selectedChapterId]);

  const fetchLessons = async (chapterId: string) => {
    try {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("chapter_id", chapterId)
        .order("order_index");

      if (error) throw error;
      setLessons(data || []);
    } catch (error: any) {
      toast.error("Failed to load lessons");
    }
  };

  const loadLesson = async (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (lesson) {
      setLessonTitle(lesson.title);
      setLessonDuration(lesson.duration.toString());
      setContent(lesson.content);
      setSelectedLessonId(lessonId);
    }
  };

  const handleInsertComponent = (componentCode: string) => {
    if (editorRef.current) {
      const currentContent = content;
      setContent(currentContent + componentCode);
      editorRef.current.setMarkdown(currentContent + componentCode);
    }
  };

  const handleSave = async () => {
    if (!selectedChapterId || !lessonTitle) {
      toast.error("Please select a chapter and enter a title");
      return;
    }

    try {
      const lessonData = {
        chapter_id: selectedChapterId,
        title: lessonTitle,
        duration: parseInt(lessonDuration),
        content: content,
        order_index: selectedLessonId ? undefined : lessons.length,
      };

      if (selectedLessonId) {
        // Update existing lesson
        const { error } = await supabase
          .from("lessons")
          .update(lessonData)
          .eq("id", selectedLessonId);

        if (error) throw error;
        toast.success("Lesson updated successfully");
      } else {
        // Create new lesson
        const { error } = await supabase.from("lessons").insert(lessonData);

        if (error) throw error;
        toast.success("Lesson created successfully");
      }

      fetchLessons(selectedChapterId);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || "Failed to save lesson");
    }
  };

  const resetForm = () => {
    setLessonTitle("");
    setLessonDuration("15");
    setContent("");
    setSelectedLessonId("");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Chapter</Label>
          <Select value={selectedChapterId} onValueChange={setSelectedChapterId}>
            <SelectTrigger>
              <SelectValue placeholder="Select chapter" />
            </SelectTrigger>
            <SelectContent>
              {chapters.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.id}>
                  {chapter.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedChapterId && lessons.length > 0 && (
          <div>
            <Label>Edit Existing Lesson</Label>
            <Select value={selectedLessonId} onValueChange={loadLesson}>
              <SelectTrigger>
                <SelectValue placeholder="New lesson or select existing" />
              </SelectTrigger>
              <SelectContent>
                {lessons.map((lesson) => (
                  <SelectItem key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <Label>Duration (minutes)</Label>
          <Input
            type="number"
            value={lessonDuration}
            onChange={(e) => setLessonDuration(e.target.value)}
            min="1"
            placeholder="15"
          />
        </div>
      </div>

      <div>
        <Label>Lesson Title</Label>
        <Input
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          placeholder="e.g., Introduction to Quadratic Equations"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="editor">
            <Code className="w-4 h-4 mr-2" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="mt-4">
          <Card className="p-4">
            <div className="mb-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-muted rounded-lg text-sm flex-1">
                  <h4 className="font-semibold mb-2">💡 Editor Guide:</h4>
                  <ul className="space-y-1">
                    <li>• Use toolbar for formatting, links, tables, and code blocks</li>
                    <li>• Math: Use $ for inline math, $$ for block math</li>
                    <li>• Click "Insert Component" to add interactive elements visually</li>
                    <li>• Available: Quiz, VideoEmbed, MathPuzzle, PhysicsSimulator, PeriodicTable, AngleVisualizer</li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-end">
                <ComponentInserter onInsert={handleInsertComponent} />
              </div>
            </div>

            <MDXEditor
              ref={editorRef}
              markdown={content}
              onChange={setContent}
              plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                imagePlugin(),
                tablePlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: "javascript" }),
                codeMirrorPlugin({
                  codeBlockLanguages: {
                    javascript: "JavaScript",
                    typescript: "TypeScript",
                    jsx: "JSX",
                    css: "CSS",
                    python: "Python",
                    java: "Java",
                    cpp: "C++",
                  },
                }),
                jsxPlugin({ jsxComponentDescriptors }),
                diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: '' }),
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <Separator />
                      <BoldItalicUnderlineToggles />
                      <Separator />
                      <BlockTypeSelect />
                      <Separator />
                      <ListsToggle />
                      <Separator />
                      <CreateLink />
                      <Separator />
                      <InsertTable />
                      <Separator />
                      <CodeToggle />
                      <InsertCodeBlock />
                      <Separator />
                      <InsertThematicBreak />
                    </>
                  ),
                }),
              ]}
              className="min-h-[400px] border rounded-lg"
            />
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-4">{lessonTitle || "Preview"}</h3>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <LessonRenderer content={content || "No content yet. Start writing in the editor!"} />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2">
        <Button onClick={handleSave} className="w-full md:w-auto">
          <Save className="w-4 h-4 mr-2" />
          {selectedLessonId ? "Update Lesson" : "Create Lesson"}
        </Button>
        {selectedLessonId && (
          <Button onClick={resetForm} variant="outline">
            Create New Lesson
          </Button>
        )}
      </div>
    </div>
  );
};
