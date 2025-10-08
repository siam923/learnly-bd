import { useState } from "react";
import { EditableComponentWrapper } from "./EditableComponentWrapper";
import { HelpCircle, CheckCircle2, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface QuizEditorProps {
  questions: any[];
  onUpdate?: (props: { questions: any[] }) => void;
}

export const QuizEditor = ({ questions, onUpdate }: QuizEditorProps) => {
  const [editQuestions, setEditQuestions] = useState(questions || []);

  const handleUpdate = () => {
    onUpdate?.({ questions: editQuestions });
  };

  const addQuestion = () => {
    setEditQuestions([
      ...editQuestions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  const removeQuestion = (index: number) => {
    setEditQuestions(editQuestions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...editQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setEditQuestions(updated);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...editQuestions];
    updated[qIndex].options[oIndex] = value;
    setEditQuestions(updated);
  };

  const editForm = (
    <div className="space-y-4 max-h-[500px] overflow-y-auto">
      {editQuestions.map((q, qIdx) => (
        <div key={qIdx} className="p-3 border border-border rounded-md space-y-3 bg-background">
          <div className="flex items-start justify-between gap-2">
            <Label className="text-xs font-semibold">Question {qIdx + 1}</Label>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeQuestion(qIdx)}
              className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <Input
            value={q.question}
            onChange={(e) => updateQuestion(qIdx, "question", e.target.value)}
            placeholder="Enter question"
            className="text-sm"
          />
          <div className="space-y-2">
            <Label className="text-xs">Options</Label>
            {q.options?.map((opt: string, oIdx: number) => (
              <div key={oIdx} className="flex items-center gap-2">
                <Input
                  value={opt}
                  onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                  placeholder={`Option ${oIdx + 1}`}
                  className="text-sm flex-1"
                />
                <input
                  type="radio"
                  name={`correct-${qIdx}`}
                  checked={q.correctAnswer === oIdx}
                  onChange={() => updateQuestion(qIdx, "correctAnswer", oIdx)}
                  className="w-4 h-4"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button
        onClick={addQuestion}
        variant="outline"
        size="sm"
        className="w-full"
      >
        <Plus className="h-3.5 w-3.5 mr-1" />
        Add Question
      </Button>
    </div>
  );

  return (
    <EditableComponentWrapper
      componentName="Quiz"
      icon={<HelpCircle className="h-5 w-5" />}
      editForm={editForm}
      onUpdate={handleUpdate}
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
    </EditableComponentWrapper>
  );
};
