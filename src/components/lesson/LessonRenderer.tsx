import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Quiz } from '@/components/interactive/Quiz';
import { MathPuzzle } from '@/components/interactive/MathPuzzle';
import { VideoEmbed } from '@/components/interactive/VideoEmbed';
import { PhysicsSimulator } from '@/components/interactive/PhysicsSimulator';
import { AngleVisualizer } from '@/components/interactive/AngleVisualizer';
import { PeriodicTableVisualizer } from '@/components/interactive/PeriodicTableVisualizer';

interface LessonRendererProps {
  content: string;
}

export const LessonRenderer = ({ content }: LessonRendererProps) => {
  // Parse custom components from the markdown
  const parseComponents = (text: string) => {
    const components: JSX.Element[] = [];
    let lastIndex = 0;
    const regex = /<(\w+)\s+([^>]+)\/>/g;
    let match;

    const segments: { type: 'text' | 'component'; content: any; key: number }[] = [];
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the component
      if (match.index > lastIndex) {
        segments.push({
          type: 'text',
          content: text.substring(lastIndex, match.index),
          key: key++,
        });
      }

      const componentName = match[1];
      const propsString = match[2];

      // Parse props
      const props: any = {};
      const propRegex = /(\w+)=(?:{([^}]+)}|"([^"]+)"|'([^']+)')/g;
      let propMatch;

      while ((propMatch = propRegex.exec(propsString)) !== null) {
        const key = propMatch[1];
        const value = propMatch[2] || propMatch[3] || propMatch[4];
        
        // Try to parse as JSON if it looks like an array or number
        try {
          props[key] = value.startsWith('[') || !isNaN(Number(value)) ? JSON.parse(value) : value;
        } catch {
          props[key] = value;
        }
      }

      segments.push({
        type: 'component',
        content: { name: componentName, props },
        key: key++,
      });

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      segments.push({
        type: 'text',
        content: text.substring(lastIndex),
        key: key++,
      });
    }

    return segments;
  };

  const renderComponent = (name: string, props: any) => {
    switch (name) {
      case 'Quiz':
        return <Quiz {...props} />;
      case 'MathPuzzle':
        return <MathPuzzle {...props} />;
      case 'VideoEmbed':
        return <VideoEmbed {...props} />;
      case 'PhysicsSimulator':
        return <PhysicsSimulator {...props} />;
      case 'AngleVisualizer':
        return <AngleVisualizer />;
      case 'PeriodicTableVisualizer':
        return <PeriodicTableVisualizer />;
      default:
        return null;
    }
  };

  const segments = parseComponents(content);

  return (
    <div className="prose prose-lg max-w-none">
      {segments.map((segment) => {
        if (segment.type === 'text') {
          return (
            <ReactMarkdown
              key={segment.key}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold mb-6 text-primary">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold mt-8 mb-4 text-primary">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-foreground leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground">
                    {children}
                  </ol>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-primary">{children}</strong>
                ),
                code: ({ children }) => (
                  <code className="px-2 py-1 bg-muted rounded text-sm font-mono">{children}</code>
                ),
              }}
            >
              {segment.content}
            </ReactMarkdown>
          );
        } else {
          return (
            <div key={segment.key}>
              {renderComponent(segment.content.name, segment.content.props)}
            </div>
          );
        }
      })}
    </div>
  );
};
