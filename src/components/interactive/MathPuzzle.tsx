import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface MathPuzzleProps {
  equation: string;
}

export const MathPuzzle = ({ equation }: MathPuzzleProps) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Parse the equation and calculate the answer
  const parseEquation = (eq: string) => {
    // Simple parser for equations like "2x + 3 = 11"
    const parts = eq.split('=');
    const rightSide = parseFloat(parts[1].trim());
    
    // Extract coefficient and constant from left side
    const leftSide = parts[0].trim();
    const match = leftSide.match(/(\d+)x\s*([+-])\s*(\d+)/);
    
    if (match) {
      const coefficient = parseFloat(match[1]);
      const operator = match[2];
      const constant = parseFloat(match[3]);
      
      // Solve for x
      if (operator === '+') {
        return (rightSide - constant) / coefficient;
      } else {
        return (rightSide + constant) / coefficient;
      }
    }
    return 0;
  };

  const correctAnswer = parseEquation(equation);
  const isCorrect = submitted && parseFloat(userAnswer) === correctAnswer;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setUserAnswer('');
    setSubmitted(false);
    setShowHint(false);
  };

  return (
    <Card className="p-6 my-6 border-2 border-accent/30 bg-gradient-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-accent">Math Puzzle</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            className="text-accent"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Hint
          </Button>
        </div>

        <div className="p-4 bg-secondary/50 rounded-lg">
          <p className="text-2xl font-bold text-center font-mono">{equation}</p>
        </div>

        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-accent/10 border-2 border-accent/30 rounded-lg"
          >
            <p className="text-sm text-muted-foreground">
              <strong>Hint:</strong> Isolate the variable by performing the same operation on both sides of the equation!
            </p>
          </motion.div>
        )}

        <div className="flex gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">x =</span>
              <Input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={submitted}
                placeholder="Your answer"
                className="text-lg"
              />
            </div>
          </div>
        </div>

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!userAnswer}
            className="w-full gradient-accent"
          >
            Check Answer
          </Button>
        ) : (
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg ${
                isCorrect
                  ? 'bg-success/10 border-2 border-success'
                  : 'bg-destructive/10 border-2 border-destructive'
              }`}
            >
              <p className="font-semibold flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="text-success" />
                    <span className="text-success">Perfect! You got it right!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-destructive" />
                    <span className="text-destructive">
                      Not quite. The correct answer is x = {correctAnswer}
                    </span>
                  </>
                )}
              </p>
            </motion.div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              Try Another
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
