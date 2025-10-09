import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface QuizProps {
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
}

export const Quiz = ({ questions }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions?.[currentQuestionIndex];
  
  if (!currentQuestion) {
    return null;
  }

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setSubmitted(true);
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setSubmitted(false);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setSubmitted(false);
      setShowExplanation(false);
    }
  };

  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  return (
    <Card className="p-6 my-6 border-2 border-primary/20 bg-gradient-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">Quick Quiz</h3>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <p className="text-foreground font-medium">{currentQuestion.question}</p>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !submitted && setSelectedOption(index)}
              disabled={submitted}
              className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                submitted
                  ? index === currentQuestion.correctAnswer
                    ? 'border-success bg-success/10'
                    : index === selectedOption
                    ? 'border-destructive bg-destructive/10'
                    : 'border-border bg-muted/50'
                  : selectedOption === index
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              } ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {submitted && (
                  <>
                    {index === currentQuestion.correctAnswer && <CheckCircle2 className="text-success" />}
                    {index === selectedOption && index !== currentQuestion.correctAnswer && (
                      <XCircle className="text-destructive" />
                    )}
                  </>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="w-full gradient-primary"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                isCorrect ? 'bg-success/10 border-2 border-success' : 'bg-destructive/10 border-2 border-destructive'
              }`}
            >
              <p className="font-semibold flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="text-success" />
                    <span className="text-success">Correct! Well done!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-destructive" />
                    <span className="text-destructive">Not quite. Try again!</span>
                  </>
                )}
              </p>
            </motion.div>

            <div className="flex gap-2">
              {currentQuestionIndex > 0 && (
                <Button onClick={handlePrevious} variant="outline" className="flex-1">
                  Previous
                </Button>
              )}
              <Button onClick={handleReset} variant="outline" className="flex-1">
                Try Again
              </Button>
              {currentQuestionIndex < questions.length - 1 && (
                <Button onClick={handleNext} variant="default" className="flex-1">
                  Next Question
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
