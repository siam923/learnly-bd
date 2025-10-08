import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PuzzleIcon, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ComponentInserterProps {
  onInsert: (componentCode: string) => void;
}

const COMPONENT_TEMPLATES = {
  Quiz: {
    label: "Quiz",
    description: "Interactive quiz with multiple questions",
    icon: "🎯",
    fields: [
      {
        name: "questions",
        type: "quiz-questions",
        label: "Quiz Questions",
        required: true,
      },
    ],
  },
  VideoEmbed: {
    label: "Video Embed",
    description: "Embed YouTube or other videos",
    icon: "🎥",
    fields: [
      { name: "url", type: "text", label: "Video URL", required: true },
      { name: "title", type: "text", label: "Video Title", required: false },
    ],
  },
  MathPuzzle: {
    label: "Math Puzzle",
    description: "Interactive math problem solver",
    icon: "🧮",
    fields: [
      { name: "problem", type: "text", label: "Problem", required: true },
      { name: "answer", type: "number", label: "Answer", required: true },
      { name: "hint", type: "text", label: "Hint", required: false },
    ],
  },
  PhysicsSimulator: {
    label: "Physics Simulator",
    description: "Interactive physics simulation",
    icon: "⚛️",
    fields: [
      { name: "type", type: "select", label: "Simulation Type", required: true, options: ["pendulum", "projectile", "collision"] },
      { name: "title", type: "text", label: "Title", required: false },
    ],
  },
  PeriodicTableVisualizer: {
    label: "Periodic Table",
    description: "Interactive periodic table of elements",
    icon: "🧪",
    fields: [
      { name: "highlightElement", type: "text", label: "Highlight Element", required: false },
    ],
  },
  AngleVisualizer: {
    label: "Angle Visualizer",
    description: "Interactive angle measurement tool",
    icon: "📐",
    fields: [
      { name: "initialAngle", type: "number", label: "Initial Angle (degrees)", required: false },
    ],
  },
};

export const ComponentInserter = ({ onInsert }: ComponentInserterProps) => {
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [quizQuestions, setQuizQuestions] = useState<Array<{
    question: string;
    options: string[];
    correct: number;
  }>>([{ question: "", options: ["", "", "", ""], correct: 0 }]);

  const handleComponentSelect = (componentName: string) => {
    setSelectedComponent(componentName);
    setFormData({});
    setQuizQuestions([{ question: "", options: ["", "", "", ""], correct: 0 }]);
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const addQuizQuestion = () => {
    setQuizQuestions([...quizQuestions, { question: "", options: ["", "", "", ""], correct: 0 }]);
  };

  const removeQuizQuestion = (index: number) => {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
  };

  const updateQuizQuestion = (index: number, field: string, value: any) => {
    const updated = [...quizQuestions];
    if (field === "question" || field === "correct") {
      updated[index] = { ...updated[index], [field]: value };
    }
    setQuizQuestions(updated);
  };

  const updateQuizOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...quizQuestions];
    updated[questionIndex].options[optionIndex] = value;
    setQuizQuestions(updated);
  };

  const generateComponentCode = () => {
    if (!selectedComponent) return "";

    const template = COMPONENT_TEMPLATES[selectedComponent as keyof typeof COMPONENT_TEMPLATES];
    
    if (selectedComponent === "Quiz") {
      const questionsCode = JSON.stringify(quizQuestions, null, 2);
      return `<Quiz questions={${questionsCode}} />`;
    }

    const props = template.fields
      .map((field) => {
        const value = formData[field.name];
        if (!value && !field.required) return null;
        
        if (field.type === "number") {
          return `${field.name}={${value}}`;
        } else {
          return `${field.name}="${value}"`;
        }
      })
      .filter(Boolean)
      .join(" ");

    return `<${selectedComponent} ${props} />`;
  };

  const handleInsert = () => {
    const code = generateComponentCode();
    if (code) {
      onInsert(`\n\n${code}\n\n`);
      setOpen(false);
      setSelectedComponent("");
      setFormData({});
    }
  };

  const renderField = (field: any) => {
    if (field.type === "select") {
      return (
        <div key={field.name} className="space-y-2">
          <Label>{field.label}</Label>
          <Select onValueChange={(value) => handleInputChange(field.name, value)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (field.type === "quiz-questions") {
      return (
        <div key={field.name} className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Quiz Questions</Label>
            <Button type="button" size="sm" onClick={addQuizQuestion}>
              <Plus className="w-4 h-4 mr-1" />
              Add Question
            </Button>
          </div>
          {quizQuestions.map((q, qIndex) => (
            <Card key={qIndex} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <Label>Question {qIndex + 1}</Label>
                {quizQuestions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuizQuestion(qIndex)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Input
                placeholder="Enter question"
                value={q.question}
                onChange={(e) => updateQuizQuestion(qIndex, "question", e.target.value)}
              />
              <div className="space-y-2">
                <Label className="text-sm">Options</Label>
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="flex gap-2 items-center">
                    <span className="text-sm font-medium min-w-[20px]">{oIndex + 1}.</span>
                    <Input
                      placeholder={`Option ${oIndex + 1}`}
                      value={opt}
                      onChange={(e) => updateQuizOption(qIndex, oIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label>Correct Answer</Label>
                <Select
                  value={q.correct.toString()}
                  onValueChange={(value) => updateQuizQuestion(qIndex, "correct", parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {q.options.map((_, oIndex) => (
                      <SelectItem key={oIndex} value={oIndex.toString()}>
                        Option {oIndex + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div key={field.name} className="space-y-2">
        <Label>{field.label}</Label>
        <Input
          type={field.type}
          placeholder={field.label}
          value={formData[field.name] || ""}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          required={field.required}
        />
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PuzzleIcon className="w-4 h-4 mr-2" />
          Insert Component
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Insert Interactive Component</DialogTitle>
          <DialogDescription>
            Choose a component and fill in its properties
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedComponent ? (
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(COMPONENT_TEMPLATES).map(([key, template]) => (
                <Card
                  key={key}
                  className="p-4 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleComponentSelect(key)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{template.icon}</span>
                    <div>
                      <h3 className="font-semibold">{template.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {COMPONENT_TEMPLATES[selectedComponent as keyof typeof COMPONENT_TEMPLATES].icon}
                  </span>
                  <h3 className="font-semibold">
                    {COMPONENT_TEMPLATES[selectedComponent as keyof typeof COMPONENT_TEMPLATES].label}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedComponent("")}
                >
                  ← Back
                </Button>
              </div>

              <div className="space-y-4">
                {COMPONENT_TEMPLATES[selectedComponent as keyof typeof COMPONENT_TEMPLATES].fields.map(
                  renderField
                )}
              </div>

              <div className="border-t pt-4">
                <Label className="text-sm text-muted-foreground">Preview Code:</Label>
                <pre className="mt-2 p-3 bg-muted rounded-lg text-xs overflow-x-auto">
                  {generateComponentCode()}
                </pre>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInsert}>Insert Component</Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
