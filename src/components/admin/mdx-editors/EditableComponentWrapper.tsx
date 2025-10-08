import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical, Edit2, Check, X } from "lucide-react";

interface EditableComponentWrapperProps {
  componentName: string;
  children: React.ReactNode;
  editForm?: React.ReactNode;
  icon?: React.ReactNode;
  onDelete?: () => void;
  onUpdate?: () => void;
}

export const EditableComponentWrapper = ({
  componentName,
  children,
  editForm,
  icon,
  onDelete,
  onUpdate,
}: EditableComponentWrapperProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate?.();
    setIsEditing(false);
  };

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
        <div className="flex gap-1">
          {!isEditing && editForm && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
          )}
          {isEditing && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSave}
                className="h-7 w-7 p-0 hover:bg-success/10 hover:text-success"
              >
                <Check className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="h-7 w-7 p-0 hover:bg-muted"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
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
      </div>
      
      <div className="text-sm space-y-2 ml-6">
        {isEditing && editForm ? editForm : children}
      </div>
    </Card>
  );
};
