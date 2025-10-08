/**
 * Centralized registry for all MDX components
 * This registry serves as the single source of truth for component configuration
 */

import { ComponentDescriptor, MDXComponentType } from "./types";
import {
  QuizEditorAdapter,
  VideoEmbedEditorAdapter,
  MathPuzzleEditorAdapter,
  PhysicsSimulatorEditorAdapter,
  PeriodicTableEditorAdapter,
  AngleVisualizerEditorAdapter,
} from "@/components/admin/mdx-editors/EditorAdapters";

/**
 * Component registry - add new MDX components here
 */
export const MDX_COMPONENT_REGISTRY: Record<MDXComponentType, ComponentDescriptor> = {
  Quiz: {
    name: "Quiz",
    kind: "flow",
    source: "./components/interactive/Quiz",
    props: [
      {
        name: "questions",
        type: "expression",
        required: true,
      },
    ],
    hasChildren: false,
    Editor: QuizEditorAdapter,
  },
  VideoEmbed: {
    name: "VideoEmbed",
    kind: "flow",
    source: "./components/interactive/VideoEmbed",
    props: [
      {
        name: "url",
        type: "string",
        required: true,
      },
      {
        name: "title",
        type: "string",
        required: true,
      },
    ],
    hasChildren: false,
    Editor: VideoEmbedEditorAdapter,
  },
  MathPuzzle: {
    name: "MathPuzzle",
    kind: "flow",
    source: "./components/interactive/MathPuzzle",
    props: [
      {
        name: "problem",
        type: "string",
        required: true,
      },
      {
        name: "answer",
        type: "number",
        required: true,
      },
      {
        name: "hint",
        type: "string",
        required: false,
      },
    ],
    hasChildren: false,
    Editor: MathPuzzleEditorAdapter,
  },
  PhysicsSimulator: {
    name: "PhysicsSimulator",
    kind: "flow",
    source: "./components/interactive/PhysicsSimulator",
    props: [
      {
        name: "type",
        type: "string",
        required: true,
      },
      {
        name: "title",
        type: "string",
        required: false,
      },
    ],
    hasChildren: false,
    Editor: PhysicsSimulatorEditorAdapter,
  },
  PeriodicTableVisualizer: {
    name: "PeriodicTableVisualizer",
    kind: "flow",
    source: "./components/interactive/PeriodicTableVisualizer",
    props: [
      {
        name: "highlightElement",
        type: "string",
        required: false,
      },
    ],
    hasChildren: false,
    Editor: PeriodicTableEditorAdapter,
  },
  AngleVisualizer: {
    name: "AngleVisualizer",
    kind: "flow",
    source: "./components/interactive/AngleVisualizer",
    props: [
      {
        name: "initialAngle",
        type: "number",
        required: false,
      },
    ],
    hasChildren: false,
    Editor: AngleVisualizerEditorAdapter,
  },
};

/**
 * Get all component descriptors as an array
 */
export const getComponentDescriptors = (): ComponentDescriptor[] => {
  return Object.values(MDX_COMPONENT_REGISTRY);
};

/**
 * Get a specific component descriptor by name
 */
export const getComponentDescriptor = (
  name: MDXComponentType
): ComponentDescriptor | undefined => {
  return MDX_COMPONENT_REGISTRY[name];
};

/**
 * Check if a component is registered
 */
export const isRegisteredComponent = (name: string): name is MDXComponentType => {
  return name in MDX_COMPONENT_REGISTRY;
};
