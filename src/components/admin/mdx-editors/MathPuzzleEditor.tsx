import { ComponentEditorWrapper } from "./ComponentEditorWrapper";
import { Calculator } from "lucide-react";

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
    <ComponentEditorWrapper componentName="MathPuzzle">
      <div className="flex items-start gap-3">
        <Calculator className="h-5 w-5 text-primary mt-0.5" />
        <div className="flex-1">
          <p className="font-medium mb-1">{problem}</p>
          <p className="text-xs text-muted-foreground">Answer: {answer}</p>
          {hint && (
            <p className="text-xs text-muted-foreground mt-1">Hint: {hint}</p>
          )}
        </div>
      </div>
    </ComponentEditorWrapper>
  );
};
