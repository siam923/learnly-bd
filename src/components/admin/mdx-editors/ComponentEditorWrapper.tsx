import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";

interface ComponentEditorWrapperProps {
  componentName: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onDelete?: () => void;
}

export const ComponentEditorWrapper = ({
  componentName,
  children,
  icon,
  onDelete,
}: ComponentEditorWrapperProps) => {
  return (
    <Card className="group relative p-4 my-3 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/40 transition-all duration-200">
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <div className="flex items-start justify-between mb-3 ml-6">
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          <Badge variant="secondary" className="font-mono text-xs">
            &lt;{componentName} /&gt;
          </Badge>
        </div>
        {onDelete && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      <div className="text-sm space-y-2 ml-6">{children}</div>
    </Card>
  );
};
