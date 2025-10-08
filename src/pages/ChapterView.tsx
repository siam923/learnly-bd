import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLearning } from '@/contexts/LearningContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ChapterView = () => {
  const { currentChapter, setCurrentLesson } = useLearning();
  const navigate = useNavigate();

  if (!currentChapter) {
    return <div>Loading...</div>;
  }

  const handleLessonClick = (lessonId: string) => {
    setCurrentLesson(lessonId);
    navigate('/lesson');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <Button variant="ghost" onClick={() => navigate('/subjects')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Chapters
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">{currentChapter.title}</h1>
          <p className="text-muted-foreground">
            {currentChapter.lessons.length} lessons •{' '}
            {currentChapter.lessons.reduce((acc, l) => acc + l.duration, 0)} minutes
          </p>
        </motion.div>

        <div className="grid gap-4 max-w-3xl">
          {currentChapter.lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all gradient-card">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      lesson.completed
                        ? 'bg-success/20 border-2 border-success'
                        : 'bg-primary/20 border-2 border-primary'
                    }`}
                  >
                    {lesson.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    ) : (
                      <Play className="w-6 h-6 text-primary" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1">{lesson.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.duration} minutes</span>
                      {lesson.completed && (
                        <span className="text-success font-medium">• Completed</span>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleLessonClick(lesson.id)}
                    className="gradient-primary"
                  >
                    {lesson.completed ? 'Review' : 'Start'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ChapterView;
