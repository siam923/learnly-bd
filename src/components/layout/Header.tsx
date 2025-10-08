import { GraduationCap, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLearning } from '@/contexts/LearningContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { currentClass } = useLearning();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 font-bold text-xl gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span>LearnHub BD</span>
        </button>

        {currentClass && (
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{currentClass.title}</span>
          </div>
        )}

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
