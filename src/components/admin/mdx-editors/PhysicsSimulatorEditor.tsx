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
    <ComponentEditorWrapper 
      componentName="PhysicsSimulator"
      icon={<Atom className="h-5 w-5" />}
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
    </ComponentEditorWrapper>
  );
};
