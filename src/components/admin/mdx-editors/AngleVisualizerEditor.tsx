import { ComponentEditorWrapper } from "./ComponentEditorWrapper";
import { Ruler } from "lucide-react";

interface AngleVisualizerEditorProps {
  initialAngle?: number;
}

export const AngleVisualizerEditor = ({
  initialAngle,
}: AngleVisualizerEditorProps) => {
  return (
    <ComponentEditorWrapper 
      componentName="AngleVisualizer"
      icon={<Ruler className="h-5 w-5" />}
    >
      <div className="space-y-2">
        <p className="font-medium text-foreground">Interactive Angle Visualizer</p>
        {initialAngle !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Initial Angle:</span>
            <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium font-mono">
              {initialAngle}°
            </span>
          </div>
        )}
      </div>
    </ComponentEditorWrapper>
  );
};
