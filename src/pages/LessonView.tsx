import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { LessonRenderer } from '@/components/lesson/LessonRenderer';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useLessonProgress } from '@/hooks/useLessonProgress';

interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: number;
}

const LessonView = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [userId, setUserId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isCompleted, markComplete, loading: progressLoading } = useLessonProgress(userId);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!lessonId) {
      setLoading(false);
      return;
    }

    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', lessonId)
          .maybeSingle();

        if (error) {
          console.error('Failed to fetch lesson:', error);
          setError(error.message);
          return;
        }

        if (!data) {
          setError('Lesson not found');
          return;
        }

        setLesson(data);
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (loading || progressLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => navigate('/chapters')} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Button>
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">Lesson Not Found</h1>
              <p className="text-muted-foreground mb-6">
                {error || 'The lesson you are looking for does not exist.'}
              </p>
              <Button onClick={() => navigate('/dashboard')} className="gradient-primary">
                Go to Dashboard
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const completed = isCompleted(lesson.id);

  const handleComplete = async () => {
    await markComplete(lesson.id);
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
                <h1 className="text-4xl font-bold text-foreground mb-2">{lesson.title}</h1>
                <p className="text-muted-foreground">{lesson.duration} minutes</p>
              </div>
              {completed && (
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
            <LessonRenderer content={lesson.content} />
          </motion.div>

          {!completed && (
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
