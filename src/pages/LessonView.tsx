import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { LessonRenderer } from '@/components/lesson/LessonRenderer';
import { useLearning } from '@/contexts/LearningContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const LessonView = () => {
  const { currentLesson, markLessonComplete } = useLearning();
  const navigate = useNavigate();

  if (!currentLesson) {
    return <div>Loading...</div>;
  }

  const handleComplete = () => {
    markLessonComplete(currentLesson.id);
    toast.success('Lesson completed! Great job! 🎉');
    navigate('/chapters');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/chapters')} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lessons
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{currentLesson.title}</h1>
                <p className="text-muted-foreground">{currentLesson.duration} minutes</p>
              </div>
              {currentLesson.completed && (
                <div className="flex items-center gap-2 px-4 py-2 bg-success/20 border-2 border-success rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-success font-semibold">Completed</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <LessonRenderer content={currentLesson.content} />
          </motion.div>

          {!currentLesson.completed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky bottom-6 z-10"
            >
              <Button onClick={handleComplete} className="w-full gradient-primary py-6 text-lg">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Mark as Complete
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LessonView;
