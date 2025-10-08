import { useState } from "react";
import { EditableComponentWrapper } from "./EditableComponentWrapper";
import { Video, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VideoEmbedEditorProps {
  url: string;
  title?: string;
  onUpdate?: (props: { url: string; title: string }) => void;
}

export const VideoEmbedEditor = ({ url, title, onUpdate }: VideoEmbedEditorProps) => {
  const [editUrl, setEditUrl] = useState(url);
  const [editTitle, setEditTitle] = useState(title || "");

  const getVideoSource = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('vimeo.com')) return 'Vimeo';
    return 'Video';
  };

  const handleUpdate = () => {
    onUpdate?.({ url: editUrl, title: editTitle });
  };

  const editForm = (
    <div className="space-y-3">
      <div>
        <Label htmlFor="video-title" className="text-xs">Title</Label>
        <Input
          id="video-title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Video title"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="video-url" className="text-xs">Video URL</Label>
        <Input
          id="video-url"
          value={editUrl}
          onChange={(e) => setEditUrl(e.target.value)}
          placeholder="https://youtube.com/embed/..."
          className="mt-1"
        />
      </div>
    </div>
  );

  return (
    <EditableComponentWrapper 
      componentName="VideoEmbed"
      icon={<Video className="h-5 w-5" />}
      editForm={editForm}
      onUpdate={handleUpdate}
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
    </EditableComponentWrapper>
  );
};
