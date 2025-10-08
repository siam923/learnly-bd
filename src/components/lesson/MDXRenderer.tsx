/**
 * MDXRenderer - Renders MDX content with custom components
 * This component can be used in any part of the application to render MDX
 */

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { MDX_COMPONENTS } from "@/lib/mdx/components";

interface MDXRendererProps {
  content: string;
  className?: string;
}

/**
 * Renders MDX content with custom interactive components
 * Use this component wherever you need to display lesson content
 */
export const MDXRenderer = ({ content, className = "" }: MDXRendererProps) => {
  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={MDX_COMPONENTS as any}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
