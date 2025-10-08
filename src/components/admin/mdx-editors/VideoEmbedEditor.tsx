import { ComponentEditorWrapper } from "./ComponentEditorWrapper";
import { Video, ExternalLink } from "lucide-react";

interface VideoEmbedEditorProps {
  url: string;
  title?: string;
}

export const VideoEmbedEditor = ({ url, title }: VideoEmbedEditorProps) => {
  const getVideoSource = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('vimeo.com')) return 'Vimeo';
    return 'Video';
  };

  return (
    <ComponentEditorWrapper 
      componentName="VideoEmbed"
      icon={<Video className="h-5 w-5" />}
    >
      <div className="space-y-2">
        {title && (
          <p className="font-medium text-foreground">{title}</p>
        )}
        <div className="flex items-center gap-2 p-2 rounded bg-background/50 border border-border/50">
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground">
              {getVideoSource(url)}
            </p>
            <p className="text-xs text-muted-foreground truncate">{url}</p>
          </div>
        </div>
      </div>
    </ComponentEditorWrapper>
  );
};
