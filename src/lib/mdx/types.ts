/**
 * Type definitions for MDX component system
 * This file defines the contract for MDX components across the application
 */

export type MDXComponentType = 
  | "Quiz"
  | "VideoEmbed"
  | "MathPuzzle"
  | "PhysicsSimulator"
  | "PeriodicTableVisualizer"
  | "AngleVisualizer";

export interface MDXAttribute {
  name: string;
  value: any;
  type?: "string" | "number" | "boolean" | "expression";
}

export interface MDXNode {
  type: string;
  name: string;
  attributes?: MDXAttribute[];
  children?: any[];
}

export interface ComponentDescriptor {
  name: MDXComponentType;
  kind: "flow" | "text";
  source: string;
  props: Array<{
    name: string;
    type: "string" | "number" | "expression";
    required?: boolean;
    default?: any;
  }>;
  hasChildren: boolean;
  Editor: React.ComponentType<any>;
}

export interface ParsedComponentProps {
  [key: string]: any;
}

// Type-safe component prop definitions
export interface QuizProps {
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
}

export interface VideoEmbedProps {
  url: string;
  title: string;
}

export interface MathPuzzleProps {
  problem: string;
  answer: number;
  hint?: string;
}

export interface PhysicsSimulatorProps {
  type: string;
  title?: string;
}

export interface PeriodicTableVisualizerProps {
  highlightElement?: string;
}

export interface AngleVisualizerProps {
  initialAngle?: number;
}

export type ComponentPropsMap = {
  Quiz: QuizProps;
  VideoEmbed: VideoEmbedProps;
  MathPuzzle: MathPuzzleProps;
  PhysicsSimulator: PhysicsSimulatorProps;
  PeriodicTableVisualizer: PeriodicTableVisualizerProps;
  AngleVisualizer: AngleVisualizerProps;
};
