import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface QuizProps {
  question: string;
  options: string[];
  answer: number;
}

export const Quiz = ({ question, options, answer }: QuizProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

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

  const isCorrect = selectedOption === answer;

  return (
    <Card className="p-6 my-6 border-2 border-primary/20 bg-gradient-card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Quick Quiz</h3>
        <p className="text-foreground font-medium">{question}</p>

        <div className="space-y-3">
          {options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !submitted && setSelectedOption(index)}
              disabled={submitted}
              className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                submitted
                  ? index === answer
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
                    {index === answer && <CheckCircle2 className="text-success" />}
                    {index === selectedOption && index !== answer && (
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

            <Button onClick={handleReset} variant="outline" className="w-full">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
