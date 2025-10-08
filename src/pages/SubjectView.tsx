import { Header } from '@/components/layout/Header';
import { ChapterList } from '@/components/dashboard/ChapterList';
import { Button } from '@/components/ui/button';
import { useLearning } from '@/contexts/LearningContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const SubjectView = () => {
  const { currentSubject, setCurrentChapter } = useLearning();
  const navigate = useNavigate();

  if (!currentSubject) {
    return <div>Loading...</div>;
  }

  const handleChapterClick = (chapterId: string) => {
    setCurrentChapter(chapterId);
    navigate('/chapters');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${currentSubject.color} flex items-center justify-center text-4xl shadow-glow`}
            >
              {currentSubject.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">{currentSubject.title}</h1>
              <p className="text-lg text-muted-foreground">{currentSubject.description}</p>
            </div>
          </div>
        </motion.div>

        <ChapterList chapters={currentSubject.chapters} onSelectChapter={handleChapterClick} />
      </main>
    </div>
  );
};

export default SubjectView;
