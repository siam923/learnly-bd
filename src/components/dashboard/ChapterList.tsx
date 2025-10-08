import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Chapter } from '@/contexts/LearningContext';

interface ChapterListProps {
  chapters: Chapter[];
  onSelectChapter: (chapterId: string) => void;
}

export const ChapterList = ({ chapters, onSelectChapter }: ChapterListProps) => {
  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => {
        const totalLessons = chapter.lessons.length;
        const completedLessons = chapter.lessons.filter((l) => l.completed).length;
        const progress = Math.round((completedLessons / totalLessons) * 100);

        return (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all gradient-card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">{chapter.title}</h3>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {chapter.lessons.reduce((acc, l) => acc + l.duration, 0)} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {completedLessons}/{totalLessons} completed
                    </span>
                  </div>

                  <div className="space-y-2">
                    {chapter.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                        )}
                        <span className="text-sm text-foreground">{lesson.title}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {lesson.duration}m
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => onSelectChapter(chapter.id)}
                  className="ml-4 gradient-primary"
                >
                  {progress === 100 ? 'Review' : 'Start'}
                </Button>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
