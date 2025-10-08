import { QuizEditor } from "./QuizEditor";
import { VideoEmbedEditor } from "./VideoEmbedEditor";
import { MathPuzzleEditor } from "./MathPuzzleEditor";
import { PhysicsSimulatorEditor } from "./PhysicsSimulatorEditor";
import { PeriodicTableEditor } from "./PeriodicTableEditor";
import { AngleVisualizerEditor } from "./AngleVisualizerEditor";

// Adapter components that match MDXEditor's JsxEditorProps interface
export const QuizEditorAdapter = (props: any) => {
  const questions = props.mdastNode?.attributes?.find(
    (attr: any) => attr.name === "questions"
  )?.value;
  return <QuizEditor questions={questions} />;
};

export const VideoEmbedEditorAdapter = (props: any) => {
  const url = props.mdastNode?.attributes?.find(
    (attr: any) => attr.name === "url"
  )?.value;
  const title = props.mdastNode?.attributes?.find(
    (attr: any) => attr.name === "title"
  )?.value;
  return <VideoEmbedEditor url={url} title={title} />;
};

export const MathPuzzleEditorAdapter = (props: any) => {
  const problem = props.mdastNode?.attributes?.find(
    (attr: any) => attr.name === "problem"
  )?.value;
  const answer = props.mdastNode?.attributes?.find(
    (attr: any) => attr.name === "answer"
  )?.value;
  const hint = props.mdastNode?.attributes?.find(
    (attr: any) => attr.name === "hint"
  )?.value;
  return <MathPuzzleEditor problem={problem} answer={answer} hint={hint} />;
};

export const PhysicsSimulatorEditorAdapter = (props: any) => {
  const type = props.mdastNode?.attributes?.find(
    (attr: any) => attr.name === "type"
  )?.value;
  const title = props.mdastNode?.attributes?.find(
    (attr: any) => attr.name === "title"
  )?.value;
  return <PhysicsSimulatorEditor type={type} title={title} />;
};

export const PeriodicTableEditorAdapter = (props: any) => {
  const highlightElement = props.mdastNode?.attributes?.find(
    (attr: any) => attr.name === "highlightElement"
  )?.value;
  return <PeriodicTableEditor highlightElement={highlightElement} />;
};

export const AngleVisualizerEditorAdapter = (props: any) => {
  const initialAngle = props.mdastNode?.attributes?.find(
    (attr: any) => attr.name === "initialAngle"
  )?.value;
  return <AngleVisualizerEditor initialAngle={initialAngle} />;
};
