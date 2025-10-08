/**
 * MDX Editor Configuration
 * Configures the MDXEditor with plugins and component descriptors
 */

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
import { getComponentDescriptors } from "@/lib/mdx/registry";

/**
 * Get JSX component descriptors from the central registry
 */
export const jsxComponentDescriptors = getComponentDescriptors();

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
