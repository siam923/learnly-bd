import { Card } from "@/components/ui/card";
import { LessonRenderer } from "@/components/lesson/LessonRenderer";

interface LessonPreviewProps {
  title: string;
  content: string;
}

export const LessonPreview = ({ title, content }: LessonPreviewProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-6">{title || "Preview"}</h3>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <LessonRenderer
          content={content || "No content yet. Start writing in the editor!"}
        />
      </div>
    </Card>
  );
};
