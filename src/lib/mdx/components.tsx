/**
 * MDX Component Map for rendering
 * This file provides the runtime component mapping for MDX rendering
 * Import this in any project that needs to render the same MDX content
 */

import { Quiz } from "@/components/interactive/Quiz";
import { VideoEmbed } from "@/components/interactive/VideoEmbed";
import { MathPuzzle } from "@/components/interactive/MathPuzzle";
import { PhysicsSimulator } from "@/components/interactive/PhysicsSimulator";
import { PeriodicTableVisualizer } from "@/components/interactive/PeriodicTableVisualizer";
import { AngleVisualizer } from "@/components/interactive/AngleVisualizer";

/**
 * Component map for MDX runtime
 * Use this with MDXProvider or direct MDX rendering
 */
export const MDX_COMPONENTS = {
  Quiz,
  VideoEmbed,
  MathPuzzle,
  PhysicsSimulator,
  PeriodicTableVisualizer,
  AngleVisualizer,
};

/**
 * Get component by name (useful for dynamic rendering)
 */
export const getMDXComponent = (name: string) => {
  return MDX_COMPONENTS[name as keyof typeof MDX_COMPONENTS];
};

/**
 * Export individual components for tree-shaking
 */
export {
  Quiz,
  VideoEmbed,
  MathPuzzle,
  PhysicsSimulator,
  PeriodicTableVisualizer,
  AngleVisualizer,
};
