import { Header } from '@/components/layout/Header';
import { SubjectCard } from '@/components/dashboard/SubjectCard';
import { useLearning } from '@/contexts/LearningContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Dashboard = () => {
  const { currentClass, setCurrentSubject, getProgress } = useLearning();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/auth');
    } else {
      setLoading(false);
    }
  };

  if (loading || !currentClass) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleSubjectClick = (subjectId: string) => {
    setCurrentSubject(subjectId);
    navigate('/subjects');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-primary animate-float" />
            <h1 className="text-4xl font-bold text-primary">
              Welcome Back!
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Continue your learning journey in {currentClass.title}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentClass.subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SubjectCard
                subject={subject}
                progress={getProgress(subject.id)}
                onClick={() => handleSubjectClick(subject.id)}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
