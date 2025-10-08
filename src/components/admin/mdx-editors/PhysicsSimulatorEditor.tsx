import { ComponentEditorWrapper } from "./ComponentEditorWrapper";
import { Atom } from "lucide-react";

interface PhysicsSimulatorEditorProps {
  type: string;
  title?: string;
}

export const PhysicsSimulatorEditor = ({
  type,
  title,
}: PhysicsSimulatorEditorProps) => {
  return (
    <ComponentEditorWrapper componentName="PhysicsSimulator">
      <div className="flex items-start gap-3">
        <Atom className="h-5 w-5 text-primary mt-0.5" />
        <div className="flex-1">
          {title && <p className="font-medium mb-1">{title}</p>}
          <p className="text-xs text-muted-foreground">Type: {type}</p>
        </div>
      </div>
    </ComponentEditorWrapper>
  );
};
