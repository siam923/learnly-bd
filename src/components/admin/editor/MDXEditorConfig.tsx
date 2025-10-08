import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  toolbarPlugin,
  jsxPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  CodeToggle,
  InsertCodeBlock,
} from "@mdxeditor/editor";
import {
  QuizEditorAdapter,
  VideoEmbedEditorAdapter,
  MathPuzzleEditorAdapter,
  PhysicsSimulatorEditorAdapter,
  PeriodicTableEditorAdapter,
  AngleVisualizerEditorAdapter,
} from "../mdx-editors/EditorAdapters";

export const jsxComponentDescriptors = [
  {
    name: "Quiz",
    kind: "flow" as const,
    source: "./components/interactive/Quiz",
    props: [{ name: "questions", type: "expression" as const }],
    hasChildren: false,
    Editor: QuizEditorAdapter,
  },
  {
    name: "VideoEmbed",
    kind: "flow" as const,
    source: "./components/interactive/VideoEmbed",
    props: [
      { name: "url", type: "string" as const },
      { name: "title", type: "string" as const },
    ],
    hasChildren: false,
    Editor: VideoEmbedEditorAdapter,
  },
  {
    name: "MathPuzzle",
    kind: "flow" as const,
    source: "./components/interactive/MathPuzzle",
    props: [
      { name: "problem", type: "string" as const },
      { name: "answer", type: "number" as const },
      { name: "hint", type: "string" as const },
    ],
    hasChildren: false,
    Editor: MathPuzzleEditorAdapter,
  },
  {
    name: "PhysicsSimulator",
    kind: "flow" as const,
    source: "./components/interactive/PhysicsSimulator",
    props: [
      { name: "type", type: "string" as const },
      { name: "title", type: "string" as const },
    ],
    hasChildren: false,
    Editor: PhysicsSimulatorEditorAdapter,
  },
  {
    name: "PeriodicTableVisualizer",
    kind: "flow" as const,
    source: "./components/interactive/PeriodicTableVisualizer",
    props: [{ name: "highlightElement", type: "string" as const }],
    hasChildren: false,
    Editor: PeriodicTableEditorAdapter,
  },
  {
    name: "AngleVisualizer",
    kind: "flow" as const,
    source: "./components/interactive/AngleVisualizer",
    props: [{ name: "initialAngle", type: "number" as const }],
    hasChildren: false,
    Editor: AngleVisualizerEditorAdapter,
  },
];

const CustomToolbar = () => (
  <>
    <UndoRedo />
    <Separator />
    <BoldItalicUnderlineToggles />
    <Separator />
    <BlockTypeSelect />
    <Separator />
    <ListsToggle />
    <Separator />
    <CreateLink />
    <Separator />
    <InsertTable />
    <Separator />
    <CodeToggle />
    <InsertCodeBlock />
    <Separator />
    <InsertThematicBreak />
  </>
);

export const createEditorPlugins = () => [
  headingsPlugin(),
  listsPlugin(),
  quotePlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin(),
  tablePlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "javascript" }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      javascript: "JavaScript",
      typescript: "TypeScript",
      jsx: "JSX",
      css: "CSS",
      python: "Python",
      java: "Java",
      cpp: "C++",
    },
  }),
  jsxPlugin({ jsxComponentDescriptors }),
  diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
  toolbarPlugin({
    toolbarContents: () => <CustomToolbar />,
  }),
];
