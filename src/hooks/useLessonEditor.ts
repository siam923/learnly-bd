import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useLessonEditor = (chapters: any[]) => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("15");
  const [content, setContent] = useState("");

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
        const { error } = await supabase
          .from("lessons")
          .update(lessonData)
          .eq("id", selectedLessonId);

        if (error) throw error;
        toast.success("Lesson updated successfully");
      } else {
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

  return {
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
  };
};
