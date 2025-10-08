import { ComponentEditorWrapper } from "./ComponentEditorWrapper";
import { FlaskConical } from "lucide-react";

interface PeriodicTableEditorProps {
  highlightElement?: string;
}

export const PeriodicTableEditor = ({
  highlightElement,
}: PeriodicTableEditorProps) => {
  return (
    <ComponentEditorWrapper 
      componentName="PeriodicTableVisualizer"
      icon={<FlaskConical className="h-5 w-5" />}
    >
      <div className="space-y-2">
        <p className="font-medium text-foreground">Interactive Periodic Table</p>
        {highlightElement && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Highlighted Element:</span>
            <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium font-mono uppercase">
              {highlightElement}
            </span>
          </div>
        )}
      </div>
    </ComponentEditorWrapper>
  );
};
