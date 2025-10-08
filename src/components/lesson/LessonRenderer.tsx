/**
 * LessonRenderer - Renders lesson content using the MDX system
 * Uses the centralized MDX component registry for consistent rendering
 */

import { MDXRenderer } from "./MDXRenderer";

interface LessonRendererProps {
  content: string;
}

export const LessonRenderer = ({ content }: LessonRendererProps) => {
  return <MDXRenderer content={content} className="prose-lg" />;
};
