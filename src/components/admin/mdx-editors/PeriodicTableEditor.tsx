import { useState } from "react";
import { EditableComponentWrapper } from "./EditableComponentWrapper";
import { FlaskConical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PeriodicTableEditorProps {
  highlightElement?: string;
  onUpdate?: (props: { highlightElement?: string }) => void;
}

export const PeriodicTableEditor = ({
  highlightElement,
  onUpdate,
}: PeriodicTableEditorProps) => {
  const [editElement, setEditElement] = useState(highlightElement || "");

  const handleUpdate = () => {
    onUpdate?.({
      highlightElement: editElement || undefined,
    });
  };

  const editForm = (
    <div className="space-y-3">
      <div>
        <Label htmlFor="element-symbol" className="text-xs">
          Highlighted Element Symbol (Optional)
        </Label>
        <Input
          id="element-symbol"
          value={editElement}
          onChange={(e) => setEditElement(e.target.value.toUpperCase())}
          placeholder="e.g., H, He, Li, C, O"
          className="mt-1 uppercase"
          maxLength={2}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Enter chemical symbol (1-2 letters)
        </p>
      </div>
    </div>
  );

  return (
    <EditableComponentWrapper
      componentName="PeriodicTableVisualizer"
      icon={<FlaskConical className="h-5 w-5" />}
      editForm={editForm}
      onUpdate={handleUpdate}
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
    </EditableComponentWrapper>
  );
};
