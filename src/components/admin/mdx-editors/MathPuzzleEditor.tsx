import { useState } from "react";
import { EditableComponentWrapper } from "./EditableComponentWrapper";
import { Calculator, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MathPuzzleEditorProps {
  problem: string;
  answer: number;
  hint?: string;
  onUpdate?: (props: { problem: string; answer: number; hint?: string }) => void;
}

export const MathPuzzleEditor = ({
  problem,
  answer,
  hint,
  onUpdate,
}: MathPuzzleEditorProps) => {
  const [editProblem, setEditProblem] = useState(problem);
  const [editAnswer, setEditAnswer] = useState(answer.toString());
  const [editHint, setEditHint] = useState(hint || "");

  const handleUpdate = () => {
    onUpdate?.({
      problem: editProblem,
      answer: parseFloat(editAnswer),
      hint: editHint || undefined,
    });
  };

  const editForm = (
    <div className="space-y-3">
      <div>
        <Label htmlFor="math-problem" className="text-xs">Problem</Label>
        <Textarea
          id="math-problem"
          value={editProblem}
          onChange={(e) => setEditProblem(e.target.value)}
          placeholder="Enter the math problem"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="math-answer" className="text-xs">Answer</Label>
        <Input
          id="math-answer"
          type="number"
          value={editAnswer}
          onChange={(e) => setEditAnswer(e.target.value)}
          placeholder="Answer"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="math-hint" className="text-xs">Hint (Optional)</Label>
        <Textarea
          id="math-hint"
          value={editHint}
          onChange={(e) => setEditHint(e.target.value)}
          placeholder="Helpful hint"
          className="mt-1"
        />
      </div>
    </div>
  );

  return (
    <EditableComponentWrapper 
      componentName="MathPuzzle"
      icon={<Calculator className="h-5 w-5" />}
      editForm={editForm}
      onUpdate={handleUpdate}
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
    </EditableComponentWrapper>
  );
};
