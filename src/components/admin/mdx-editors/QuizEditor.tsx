import { ComponentEditorWrapper } from "./ComponentEditorWrapper";

interface QuizEditorProps {
  questions: any[];
}

export const QuizEditor = ({ questions }: QuizEditorProps) => {
  return (
    <ComponentEditorWrapper componentName="Quiz">
      <div className="space-y-2">
        <p className="font-semibold">Questions: {questions?.length || 0}</p>
        {questions?.slice(0, 2).map((q: any, idx: number) => (
          <div key={idx} className="pl-3 border-l-2 border-primary/30">
            <p className="font-medium">{q.question}</p>
            <p className="text-xs text-muted-foreground">
              {q.options?.length || 0} options
            </p>
          </div>
        ))}
        {questions?.length > 2 && (
          <p className="text-xs text-muted-foreground">
            +{questions.length - 2} more questions...
          </p>
        )}
      </div>
    </ComponentEditorWrapper>
  );
};
