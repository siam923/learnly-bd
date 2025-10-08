import { useState } from "react";
import { EditableComponentWrapper } from "./EditableComponentWrapper";
import { Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface AngleVisualizerEditorProps {
  initialAngle?: number;
  onUpdate?: (props: { initialAngle?: number }) => void;
}

export const AngleVisualizerEditor = ({
  initialAngle,
  onUpdate,
}: AngleVisualizerEditorProps) => {
  const [editAngle, setEditAngle] = useState(initialAngle || 45);

  const handleUpdate = () => {
    onUpdate?.({ initialAngle: editAngle });
  };

  const editForm = (
    <div className="space-y-3">
      <div>
        <Label htmlFor="angle-value" className="text-xs">Initial Angle (degrees)</Label>
        <div className="flex items-center gap-3 mt-2">
          <Slider
            value={[editAngle]}
            onValueChange={(value) => setEditAngle(value[0])}
            min={0}
            max={360}
            step={1}
            className="flex-1"
          />
          <Input
            id="angle-value"
            type="number"
            value={editAngle}
            onChange={(e) => setEditAngle(parseInt(e.target.value) || 0)}
            className="w-20"
            min={0}
            max={360}
          />
        </div>
      </div>
    </div>
  );

  return (
    <EditableComponentWrapper
      componentName="AngleVisualizer"
      icon={<Ruler className="h-5 w-5" />}
      editForm={editForm}
      onUpdate={handleUpdate}
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
    </EditableComponentWrapper>
  );
};
