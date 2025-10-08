import { ComponentEditorWrapper } from "./ComponentEditorWrapper";
import { Video } from "lucide-react";

interface VideoEmbedEditorProps {
  url: string;
  title?: string;
}

export const VideoEmbedEditor = ({ url, title }: VideoEmbedEditorProps) => {
  return (
    <ComponentEditorWrapper componentName="VideoEmbed">
      <div className="flex items-start gap-3">
        <Video className="h-5 w-5 text-primary mt-0.5" />
        <div className="flex-1 min-w-0">
          {title && <p className="font-medium mb-1">{title}</p>}
          <p className="text-xs text-muted-foreground break-all">{url}</p>
        </div>
      </div>
    </ComponentEditorWrapper>
  );
};
