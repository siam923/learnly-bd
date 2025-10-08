import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LessonFormProps {
  chapters: any[];
  lessons: any[];
  selectedChapterId: string;
  selectedLessonId: string;
  lessonTitle: string;
  lessonDuration: string;
  onChapterChange: (value: string) => void;
  onLessonChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onDurationChange: (value: string) => void;
}

export const LessonForm = ({
  chapters,
  lessons,
  selectedChapterId,
  selectedLessonId,
  lessonTitle,
  lessonDuration,
  onChapterChange,
  onLessonChange,
  onTitleChange,
  onDurationChange,
}: LessonFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Chapter</Label>
          <Select value={selectedChapterId} onValueChange={onChapterChange}>
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
            <Select value={selectedLessonId} onValueChange={onLessonChange}>
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
            onChange={(e) => onDurationChange(e.target.value)}
            min="1"
            placeholder="15"
          />
        </div>
      </div>

      <div>
        <Label>Lesson Title</Label>
        <Input
          value={lessonTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="e.g., Introduction to Quadratic Equations"
        />
      </div>
    </div>
  );
};
