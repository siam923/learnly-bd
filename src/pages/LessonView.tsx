import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { LessonRenderer } from '@/components/lesson/LessonRenderer';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: number;
}

// Static demo lessons
const DEMO_LESSONS: Record<string, Lesson> = {
  'periodic-table': {
    id: 'periodic-table',
    title: 'The Periodic Table',
    duration: 30,
    content: `# The Periodic Table of Elements

## Introduction

The periodic table is a tabular arrangement of chemical elements organized by their atomic number, electron configuration, and recurring chemical properties.

## History

The periodic table was first proposed by **Dmitri Mendeleev** in 1869. He arranged elements by atomic weight and noticed patterns in their properties.

### Key Facts

- Contains **118 confirmed elements**
- Organized into groups (columns) and periods (rows)
- Elements in the same group share similar properties

## Structure

The table consists of:

1. **Metals** - Good conductors of heat and electricity
2. **Nonmetals** - Poor conductors, often gases at room temperature
3. **Metalloids** - Properties between metals and nonmetals

## Mathematical Notation

The electron configuration of Hydrogen: $1s^1$

The mass-energy equivalence: $E = mc^2$

## Code Example

\`\`\`javascript
const elements = {
  hydrogen: { symbol: 'H', atomicNumber: 1 },
  helium: { symbol: 'He', atomicNumber: 2 }
};
\`\`\`

## Conclusion

Understanding the periodic table is fundamental to chemistry and helps predict element behavior and chemical reactions.`
  },
  'default': {
    id: 'default',
    title: 'Interactive Learning Demo',
    duration: 25,
    content: `# Welcome to Interactive Learning

## About This Lesson

This is a demonstration of our **MDX-powered** lesson system with rich content support.

## Features

### Rich Text Formatting

You can use *italic*, **bold**, and ***bold italic*** text. You can also use inline \`code\` formatting.

### Lists

**Ordered Lists:**

1. First item
2. Second item
3. Third item

**Unordered Lists:**

- Chemistry
- Physics
- Mathematics
- Biology

### Mathematical Equations

Inline math: The famous equation $E = mc^2$ shows mass-energy equivalence.

Block equation:

$$
\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

### Code Blocks

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

### Blockquotes

> "Education is the most powerful weapon which you can use to change the world."
> - Nelson Mandela

## Interactive Components

Our platform supports interactive elements like quizzes, simulations, and visualizations to make learning engaging and effective.

### Key Concepts

- **Active Learning**: Engage with content through interaction
- **Visual Learning**: Complex concepts made simple with diagrams
- **Practice**: Reinforce learning with exercises

## Conclusion

This lesson demonstrates the power of combining markdown, mathematics, code, and interactive elements for comprehensive learning experiences.`
  }
};

const LessonView = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  // Get static lesson based on ID or use default
  const lesson = DEMO_LESSONS[lessonId || 'default'] || DEMO_LESSONS['default'];

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/chapters')} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lessons
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{lesson.title}</h1>
                <p className="text-muted-foreground">{lesson.duration} minutes</p>
              </div>
              {completed && (
                <div className="flex items-center gap-2 px-4 py-2 bg-success/20 border-2 border-success rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-success font-semibold">Completed</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <LessonRenderer content={lesson.content} />
          </motion.div>

          {!completed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky bottom-6 z-10"
            >
              <Button onClick={handleComplete} className="w-full gradient-primary py-6 text-lg">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Mark as Complete
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LessonView;
