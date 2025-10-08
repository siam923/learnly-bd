import { useState } from "react";
import { EditableComponentWrapper } from "./EditableComponentWrapper";
import { Atom } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PhysicsSimulatorEditorProps {
  type: string;
  title?: string;
  onUpdate?: (props: { type: string; title?: string }) => void;
}

export const PhysicsSimulatorEditor = ({
  type,
  title,
  onUpdate,
}: PhysicsSimulatorEditorProps) => {
  const [editType, setEditType] = useState(type);
  const [editTitle, setEditTitle] = useState(title || "");

  const handleUpdate = () => {
    onUpdate?.({
      type: editType,
      title: editTitle || undefined,
    });
  };

  const editForm = (
    <div className="space-y-3">
      <div>
        <Label htmlFor="physics-title" className="text-xs">Title (Optional)</Label>
        <Input
          id="physics-title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Simulation title"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="physics-type" className="text-xs">Simulation Type</Label>
        <Select value={editType} onValueChange={setEditType}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendulum">Pendulum</SelectItem>
            <SelectItem value="projectile">Projectile Motion</SelectItem>
            <SelectItem value="waves">Wave Motion</SelectItem>
            <SelectItem value="collision">Collision</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <EditableComponentWrapper
      componentName="PhysicsSimulator"
      icon={<Atom className="h-5 w-5" />}
      editForm={editForm}
      onUpdate={handleUpdate}
    >
      <div className="space-y-2">
        {title && (
          <p className="font-medium text-foreground">{title}</p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Simulation Type:</span>
          <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium font-mono">
            {type}
          </span>
        </div>
      </div>
    </EditableComponentWrapper>
  );
};
