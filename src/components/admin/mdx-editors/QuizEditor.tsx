import { ComponentEditorWrapper } from "./ComponentEditorWrapper";
import { HelpCircle, CheckCircle2 } from "lucide-react";

interface QuizEditorProps {
  questions: any[];
}

export const QuizEditor = ({ questions }: QuizEditorProps) => {
  return (
    <ComponentEditorWrapper 
      componentName="Quiz"
      icon={<HelpCircle className="h-5 w-5" />}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {questions?.length || 0} Questions
          </span>
        </div>
        
        {questions?.slice(0, 2).map((q: any, idx: number) => (
          <div 
            key={idx} 
            className="p-3 rounded-md bg-background/50 border border-border/50 space-y-1"
          >
            <div className="flex items-start gap-2">
              <span className="font-mono text-xs text-muted-foreground mt-0.5">
                Q{idx + 1}
              </span>
              <p className="font-medium flex-1">{q.question}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground ml-6">
              <CheckCircle2 className="h-3 w-3" />
              <span>{q.options?.length || 0} options</span>
            </div>
          </div>
        ))}
        
        {questions?.length > 2 && (
          <p className="text-xs text-muted-foreground text-center py-1">
            + {questions.length - 2} more question{questions.length - 2 !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </ComponentEditorWrapper>
  );
};
