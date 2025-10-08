/**
 * Editor Adapters - Bridge between MDXEditor and custom component editors
 * These adapters parse MDX node attributes and pass them to the visual editors
 */

import { parseMDXAttributes, getAttribute } from "@/lib/mdx/utils";
import { QuizEditor } from "./QuizEditor";
import { VideoEmbedEditor } from "./VideoEmbedEditor";
import { MathPuzzleEditor } from "./MathPuzzleEditor";
import { PhysicsSimulatorEditor } from "./PhysicsSimulatorEditor";
import { PeriodicTableEditor } from "./PeriodicTableEditor";
import { AngleVisualizerEditor } from "./AngleVisualizerEditor";

interface EditorAdapterProps {
  mdastNode?: any;
}

/**
 * Quiz component adapter
 */
export const QuizEditorAdapter = ({ mdastNode }: EditorAdapterProps) => {
  const questions = getAttribute(mdastNode, "questions");
  return <QuizEditor questions={questions} />;
};

/**
 * VideoEmbed component adapter
 */
export const VideoEmbedEditorAdapter = ({ mdastNode }: EditorAdapterProps) => {
  const props = parseMDXAttributes(mdastNode);
  return <VideoEmbedEditor url={props.url} title={props.title} />;
};

/**
 * MathPuzzle component adapter
 */
export const MathPuzzleEditorAdapter = ({ mdastNode }: EditorAdapterProps) => {
  const props = parseMDXAttributes(mdastNode);
  return (
    <MathPuzzleEditor
      problem={props.problem}
      answer={props.answer}
      hint={props.hint}
    />
  );
};

/**
 * PhysicsSimulator component adapter
 */
export const PhysicsSimulatorEditorAdapter = ({ mdastNode }: EditorAdapterProps) => {
  const props = parseMDXAttributes(mdastNode);
  return <PhysicsSimulatorEditor type={props.type} title={props.title} />;
};

/**
 * PeriodicTable component adapter
 */
export const PeriodicTableEditorAdapter = ({ mdastNode }: EditorAdapterProps) => {
  const highlightElement = getAttribute(mdastNode, "highlightElement");
  return <PeriodicTableEditor highlightElement={highlightElement} />;
};

/**
 * AngleVisualizer component adapter
 */
export const AngleVisualizerEditorAdapter = ({ mdastNode }: EditorAdapterProps) => {
  const initialAngle = getAttribute(mdastNode, "initialAngle");
  return <AngleVisualizerEditor initialAngle={initialAngle} />;
};
