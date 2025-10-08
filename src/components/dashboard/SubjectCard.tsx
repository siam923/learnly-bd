import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Subject } from '@/contexts/LearningContext';

interface SubjectCardProps {
  subject: Subject;
  progress: number;
  onClick: () => void;
}

export const SubjectCard = ({ subject, progress, onClick }: SubjectCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        onClick={onClick}
        className="p-6 cursor-pointer border-2 border-border hover:border-primary/50 transition-all gradient-card shadow-elegant hover:shadow-glow"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-3xl shadow-md`}
            >
              {subject.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{subject.title}</h3>
              <p className="text-sm text-muted-foreground">{subject.description}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {subject.chapters.length} Chapters
            </span>
            <span className="font-semibold text-primary">{progress}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Card>
    </motion.div>
  );
};
