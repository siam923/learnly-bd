import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Eye } from "lucide-react";
import { type MDXEditorMethods } from "@mdxeditor/editor";
import { useLessonEditor } from "@/hooks/useLessonEditor";
import { LessonForm } from "./editor/LessonForm";
import { MDXEditorWrapper } from "./editor/MDXEditorWrapper";
import { LessonPreview } from "./editor/LessonPreview";
import { LessonEditorActions } from "./editor/LessonEditorActions";

interface LessonEditorProps {
  chapters: any[];
}

export const LessonEditor = ({ chapters }: LessonEditorProps) => {
  const [activeTab, setActiveTab] = useState("editor");
  const editorRef = useRef<MDXEditorMethods>(null);

  const {
    lessons,
    selectedChapterId,
    setSelectedChapterId,
    selectedLessonId,
    loadLesson,
    lessonTitle,
    setLessonTitle,
    lessonDuration,
    setLessonDuration,
    content,
    setContent,
    handleSave,
    resetForm,
  } = useLessonEditor(chapters);

  const handleInsertComponent = (componentCode: string) => {
    if (editorRef.current) {
      const currentContent = content;
      const newContent = currentContent + "\n\n" + componentCode;
      setContent(newContent);
      editorRef.current.setMarkdown(newContent);
    }
  };

  return (
    <div className="space-y-4">
      <LessonForm
        chapters={chapters}
        lessons={lessons}
        selectedChapterId={selectedChapterId}
        selectedLessonId={selectedLessonId}
        lessonTitle={lessonTitle}
        lessonDuration={lessonDuration}
        onChapterChange={setSelectedChapterId}
        onLessonChange={loadLesson}
        onTitleChange={setLessonTitle}
        onDurationChange={setLessonDuration}
      />

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
          <MDXEditorWrapper
            ref={editorRef}
            content={content}
            onChange={setContent}
            onInsertComponent={handleInsertComponent}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <LessonPreview title={lessonTitle} content={content} />
        </TabsContent>
      </Tabs>

      <LessonEditorActions
        selectedLessonId={selectedLessonId}
        onSave={handleSave}
        onReset={resetForm}
      />
    </div>
  );
};
