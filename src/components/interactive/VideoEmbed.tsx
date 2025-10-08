import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  url: string;
  title: string;
}

export const VideoEmbed = ({ url, title }: VideoEmbedProps) => {
  return (
    <Card className="my-6 overflow-hidden border-2 border-primary/20">
      <div className="relative pb-[56.25%] h-0">
        <iframe
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <div className="p-4 bg-gradient-card border-t border-border">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-primary" />
          <p className="font-medium text-sm">{title}</p>
        </div>
      </div>
    </Card>
  );
};
