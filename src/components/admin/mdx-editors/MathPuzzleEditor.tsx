import { ComponentEditorWrapper } from "./ComponentEditorWrapper";
import { Calculator, Lightbulb } from "lucide-react";

interface MathPuzzleEditorProps {
  problem: string;
  answer: number;
  hint?: string;
}

export const MathPuzzleEditor = ({
  problem,
  answer,
  hint,
}: MathPuzzleEditorProps) => {
  return (
    <ComponentEditorWrapper 
      componentName="MathPuzzle"
      icon={<Calculator className="h-5 w-5" />}
    >
      <div className="space-y-2">
        <div className="p-3 rounded-md bg-background/50 border border-border/50">
          <p className="font-medium text-foreground mb-2">{problem}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-primary/10 text-primary font-mono font-medium">
              Answer: {answer}
            </span>
          </div>
        </div>
        {hint && (
          <div className="flex items-start gap-2 p-2 rounded bg-muted/50 text-xs">
            <Lightbulb className="h-3.5 w-3.5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{hint}</span>
          </div>
        )}
      </div>
    </ComponentEditorWrapper>
  );
};
