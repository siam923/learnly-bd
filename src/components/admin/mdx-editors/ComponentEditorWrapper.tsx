import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

interface ComponentEditorWrapperProps {
  componentName: string;
  children: React.ReactNode;
  onDelete?: () => void;
}

export const ComponentEditorWrapper = ({
  componentName,
  children,
  onDelete,
}: ComponentEditorWrapperProps) => {
  return (
    <Card className="p-4 my-2 border-2 border-primary/20 bg-primary/5">
      <div className="flex items-start justify-between mb-3">
        <Badge variant="secondary" className="font-mono">
          {componentName}
        </Badge>
        {onDelete && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="h-6 w-6 p-0"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>
      <div className="text-sm space-y-2">{children}</div>
    </Card>
  );
};
