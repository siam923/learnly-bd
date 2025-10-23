/**
 * MDXRenderer - Renders MDX content with custom components
 * This component can be used in any part of the application to render MDX
 */

import { useState, useEffect } from "react";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
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
  const [MDXContent, setMDXContent] = useState<any>(null);

  useEffect(() => {
    evaluate(content, {
      ...runtime as any,
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
      development: false,
    }).then((result) => {
      setMDXContent(() => result.default);
    }).catch((error) => {
      console.error("Error evaluating MDX:", error);
    });
  }, [content]);

  if (!MDXContent) {
    return (
      <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
        <div>Loading content...</div>
      </div>
    );
  }

  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      <MDXContent components={MDX_COMPONENTS} />
    </div>
  );
};
