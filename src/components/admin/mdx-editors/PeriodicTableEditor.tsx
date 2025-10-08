import { ComponentEditorWrapper } from "./ComponentEditorWrapper";
import { Microscope } from "lucide-react";

interface PeriodicTableEditorProps {
  highlightElement?: string;
}

export const PeriodicTableEditor = ({
  highlightElement,
}: PeriodicTableEditorProps) => {
  return (
    <ComponentEditorWrapper componentName="PeriodicTableVisualizer">
      <div className="flex items-start gap-3">
        <Microscope className="h-5 w-5 text-primary mt-0.5" />
        <div className="flex-1">
          <p className="text-sm">Periodic Table Visualizer</p>
          {highlightElement && (
            <p className="text-xs text-muted-foreground mt-1">
              Highlighting: {highlightElement}
            </p>
          )}
        </div>
      </div>
    </ComponentEditorWrapper>
  );
};
