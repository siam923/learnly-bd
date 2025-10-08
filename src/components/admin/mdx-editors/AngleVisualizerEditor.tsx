import { ComponentEditorWrapper } from "./ComponentEditorWrapper";
import { Ruler } from "lucide-react";

interface AngleVisualizerEditorProps {
  initialAngle?: number;
}

export const AngleVisualizerEditor = ({
  initialAngle,
}: AngleVisualizerEditorProps) => {
  return (
    <ComponentEditorWrapper componentName="AngleVisualizer">
      <div className="flex items-start gap-3">
        <Ruler className="h-5 w-5 text-primary mt-0.5" />
        <div className="flex-1">
          <p className="text-sm">Angle Visualizer</p>
          {initialAngle !== undefined && (
            <p className="text-xs text-muted-foreground mt-1">
              Initial angle: {initialAngle}°
            </p>
          )}
        </div>
      </div>
    </ComponentEditorWrapper>
  );
};
