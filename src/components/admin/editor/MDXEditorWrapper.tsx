import { forwardRef } from "react";
import { MDXEditor, type MDXEditorMethods } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { Card } from "@/components/ui/card";
import { ComponentInserter } from "../ComponentInserter";
import { createEditorPlugins } from "./MDXEditorConfig";

interface MDXEditorWrapperProps {
  content: string;
  onChange: (value: string) => void;
  onInsertComponent: (componentCode: string) => void;
}

export const MDXEditorWrapper = forwardRef<
  MDXEditorMethods,
  MDXEditorWrapperProps
>(({ content, onChange, onInsertComponent }, ref) => {
  return (
    <Card className="p-4">
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="p-4 bg-muted rounded-lg text-sm flex-1">
            <h4 className="font-semibold mb-2">💡 Editor Guide:</h4>
            <ul className="space-y-1 text-xs">
              <li>• Use toolbar for formatting, links, tables, and code blocks</li>
              <li>• Math: Use $ for inline math, $$ for block math</li>
              <li>• Click "Insert Component" to add interactive elements</li>
              <li>
                • Components: Quiz, VideoEmbed, MathPuzzle, PhysicsSimulator,
                PeriodicTable, AngleVisualizer
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end">
          <ComponentInserter onInsert={onInsertComponent} />
        </div>
      </div>

      <MDXEditor
        ref={ref}
        markdown={content}
        onChange={onChange}
        plugins={createEditorPlugins()}
        className="min-h-[400px] border rounded-lg"
      />
    </Card>
  );
});

MDXEditorWrapper.displayName = "MDXEditorWrapper";
