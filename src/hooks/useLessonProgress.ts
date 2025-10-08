import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LessonProgress {
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
}

export const useLessonProgress = (userId: string | undefined) => {
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        const { data, error } = await supabase
          .from("lesson_progress")
          .select("*")
          .eq("user_id", userId);

        if (error) throw error;

        const progressMap: Record<string, LessonProgress> = {};
        data?.forEach((item) => {
          progressMap[item.lesson_id] = {
            lesson_id: item.lesson_id,
            completed: item.completed,
            completed_at: item.completed_at,
          };
        });

        setProgress(progressMap);
      } catch (error: any) {
        console.error("Failed to fetch lesson progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [userId]);

  const markComplete = async (lessonId: string) => {
    if (!userId) {
      toast.error("Please log in to track progress");
      return;
    }

    try {
      const { error } = await supabase
        .from("lesson_progress")
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
        }, {
          onConflict: "user_id,lesson_id"
        });

      if (error) throw error;

      setProgress((prev) => ({
        ...prev,
        [lessonId]: {
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
        },
      }));

      toast.success("Lesson completed! Great job! 🎉");
    } catch (error: any) {
      toast.error("Failed to save progress");
      console.error(error);
    }
  };

  const isCompleted = (lessonId: string): boolean => {
    return progress[lessonId]?.completed || false;
  };

  return {
    progress,
    loading,
    markComplete,
    isCompleted,
  };
};
