import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface LessonEditorActionsProps {
  selectedLessonId: string;
  onSave: () => void;
  onReset: () => void;
}

export const LessonEditorActions = ({
  selectedLessonId,
  onSave,
  onReset,
}: LessonEditorActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button onClick={onSave} className="w-full md:w-auto">
        <Save className="w-4 h-4 mr-2" />
        {selectedLessonId ? "Update Lesson" : "Create Lesson"}
      </Button>
      {selectedLessonId && (
        <Button onClick={onReset} variant="outline">
          Create New Lesson
        </Button>
      )}
    </div>
  );
};
