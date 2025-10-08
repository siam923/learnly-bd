import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: number;
  completed: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export interface Class {
  id: string;
  title: string;
  subjects: Subject[];
}

interface LearningContextType {
  classes: Class[];
  currentClass: Class | null;
  currentSubject: Subject | null;
  currentChapter: Chapter | null;
  currentLesson: Lesson | null;
  setCurrentClass: (classId: string) => void;
  setCurrentSubject: (subjectId: string) => void;
  setCurrentChapter: (chapterId: string) => void;
  setCurrentLesson: (lessonId: string) => void;
  markLessonComplete: (lessonId: string) => void;
  getProgress: (subjectId: string) => number;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within LearningProvider');
  }
  return context;
};

export const LearningProvider = ({ children }: { children: ReactNode }) => {
  const [classes] = useState<Class[]>([
    {
      id: 'class-9',
      title: 'Class 9',
      subjects: [
        {
          id: 'math',
          title: 'Mathematics',
          description: 'Explore algebra, geometry, and problem-solving',
          icon: '🔢',
          color: 'from-blue-500 to-purple-600',
          chapters: [
            {
              id: 'algebra',
              title: 'Algebra Basics',
              lessons: [
                {
                  id: 'variables',
                  title: 'Variables and Expressions',
                  duration: 15,
                  completed: false,
                  content: `# Variables and Expressions

Variables are symbols that represent unknown values. Let's explore!

## What is a Variable?

A **variable** is like a container that holds a value. We use letters like $x$, $y$, or $z$ to represent variables.

### Example
If $x = 5$, then:
- $x + 3 = 8$
- $2x = 10$
- $x^2 = 25$

## Try It Yourself!

<Quiz question="If x = 7, what is 3x?" options='["21", "10", "14", "24"]' answer={0} />

## Visual Representation

<MathPuzzle equation="2x + 3 = 11" />

Remember: Variables help us solve problems when we don't know all the values!`,
                },
                {
                  id: 'equations',
                  title: 'Solving Linear Equations',
                  duration: 20,
                  completed: false,
                  content: `# Solving Linear Equations

Learn to solve equations step by step!

## The Balance Method

Think of an equation like a balanced scale. Whatever you do to one side, do to the other!

### Example: Solve $2x + 4 = 12$

**Step 1:** Subtract 4 from both sides
$2x + 4 - 4 = 12 - 4$
$2x = 8$

**Step 2:** Divide both sides by 2
$x = 4$

<Quiz question="Solve: 3x - 6 = 9. What is x?" options='["5", "3", "4", "6"]' answer={0} />

## Practice Makes Perfect!

<MathPuzzle equation="5x - 10 = 15" />

Keep practicing and you'll master equations in no time!`,
                },
              ],
            },
            {
              id: 'geometry',
              title: 'Introduction to Geometry',
              lessons: [
                {
                  id: 'angles',
                  title: 'Understanding Angles',
                  duration: 18,
                  completed: false,
                  content: `# Understanding Angles

Angles are everywhere! Let's explore them.

## What is an Angle?

An **angle** is formed when two rays meet at a point called the **vertex**.

### Types of Angles

1. **Acute Angle**: Less than 90°
2. **Right Angle**: Exactly 90°
3. **Obtuse Angle**: Between 90° and 180°
4. **Straight Angle**: Exactly 180°

## Interactive Learning

<AngleVisualizer />

<Quiz question="What type of angle is 120°?" options='["Acute", "Right", "Obtuse", "Straight"]' answer={2} />

## Real-World Examples

Watch how angles appear in architecture and design:

<VideoEmbed url="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Angles in Real Life" />

Angles are the building blocks of geometry!`,
                },
              ],
            },
          ],
        },
        {
          id: 'physics',
          title: 'Physics',
          description: 'Discover the laws of motion and energy',
          icon: '⚡',
          color: 'from-orange-500 to-red-600',
          chapters: [
            {
              id: 'motion',
              title: 'Motion and Forces',
              lessons: [
                {
                  id: 'velocity',
                  title: 'Velocity and Speed',
                  duration: 22,
                  completed: false,
                  content: `# Velocity and Speed

Let's understand motion!

## Speed vs Velocity

**Speed** is how fast something moves.
**Velocity** is speed with direction!

### Formula

$v = \\frac{d}{t}$

Where:
- $v$ = velocity
- $d$ = distance
- $t$ = time

## Interactive Simulation

<PhysicsSimulator type="velocity" />

<Quiz question="If a car travels 100km in 2 hours, what is its speed?" options='["50 km/h", "100 km/h", "200 km/h", "25 km/h"]' answer={0} />

## Real-World Application

<VideoEmbed url="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Understanding Motion" />

Physics makes the world move!`,
                },
              ],
            },
          ],
        },
        {
          id: 'chemistry',
          title: 'Chemistry',
          description: 'Explore atoms, molecules, and reactions',
          icon: '🧪',
          color: 'from-green-500 to-teal-600',
          chapters: [
            {
              id: 'atoms',
              title: 'Atomic Structure',
              lessons: [
                {
                  id: 'periodic-table',
                  title: 'The Periodic Table',
                  duration: 25,
                  completed: false,
                  content: `# The Periodic Table

Discover the building blocks of matter!

## What is the Periodic Table?

The **Periodic Table** organizes all known elements by their properties.

### Key Concepts

- **Atomic Number**: Number of protons
- **Atomic Mass**: Total mass of protons and neutrons
- **Groups**: Vertical columns
- **Periods**: Horizontal rows

<Quiz question="What is the atomic number of Carbon?" options='["6", "12", "8", "14"]' answer={0} />

## Interactive Exploration

<PeriodicTableVisualizer />

<VideoEmbed url="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Periodic Table Explained" />

Chemistry is all around us!`,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const [currentClass, setCurrentClassState] = useState<Class | null>(classes[0]);
  const [currentSubject, setCurrentSubjectState] = useState<Subject | null>(null);
  const [currentChapter, setCurrentChapterState] = useState<Chapter | null>(null);
  const [currentLesson, setCurrentLessonState] = useState<Lesson | null>(null);

  const setCurrentClass = (classId: string) => {
    const foundClass = classes.find((c) => c.id === classId);
    setCurrentClassState(foundClass || null);
    setCurrentSubjectState(null);
    setCurrentChapterState(null);
    setCurrentLessonState(null);
  };

  const setCurrentSubject = (subjectId: string) => {
    if (!currentClass) return;
    const subject = currentClass.subjects.find((s) => s.id === subjectId);
    setCurrentSubjectState(subject || null);
    setCurrentChapterState(null);
    setCurrentLessonState(null);
  };

  const setCurrentChapter = (chapterId: string) => {
    if (!currentSubject) return;
    const chapter = currentSubject.chapters.find((c) => c.id === chapterId);
    setCurrentChapterState(chapter || null);
    setCurrentLessonState(null);
  };

  const setCurrentLesson = (lessonId: string) => {
    if (!currentChapter) return;
    const lesson = currentChapter.lessons.find((l) => l.id === lessonId);
    setCurrentLessonState(lesson || null);
  };

  const markLessonComplete = (lessonId: string) => {
    // In a real app, this would update the database
    if (currentLesson && currentLesson.id === lessonId) {
      currentLesson.completed = true;
    }
  };

  const getProgress = (subjectId: string): number => {
    if (!currentClass) return 0;
    const subject = currentClass.subjects.find((s) => s.id === subjectId);
    if (!subject) return 0;

    const totalLessons = subject.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
    const completedLessons = subject.chapters.reduce(
      (acc, ch) => acc + ch.lessons.filter((l) => l.completed).length,
      0
    );

    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  return (
    <LearningContext.Provider
      value={{
        classes,
        currentClass,
        currentSubject,
        currentChapter,
        currentLesson,
        setCurrentClass,
        setCurrentSubject,
        setCurrentChapter,
        setCurrentLesson,
        markLessonComplete,
        getProgress,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};
