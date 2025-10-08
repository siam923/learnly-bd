import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface PhysicsSimulatorProps {
  type: 'velocity' | 'force';
}

export const PhysicsSimulator = ({ type }: PhysicsSimulatorProps) => {
  const [speed, setSpeed] = useState([50]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setPosition((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + speed[0] / 20;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isPlaying, speed]);

  const handleReset = () => {
    setPosition(0);
    setIsPlaying(false);
  };

  return (
    <Card className="p-6 my-6 border-2 border-accent/30 bg-gradient-card">
      <h3 className="text-lg font-semibold mb-4 text-accent">Physics Simulator</h3>

      <div className="mb-6 bg-secondary/30 rounded-lg p-8 relative overflow-hidden h-32">
        <div className="absolute bottom-4 left-0 w-full h-1 bg-border" />
        <motion.div
          animate={{ left: `${position}%` }}
          transition={{ duration: 0.05 }}
          className="absolute bottom-2 w-12 h-12 bg-primary rounded-full shadow-glow"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div className="w-full h-full rounded-full bg-gradient-primary flex items-center justify-center">
            🚗
          </div>
        </motion.div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Speed</label>
            <span className="text-sm text-muted-foreground">{speed[0]} km/h</span>
          </div>
          <Slider
            value={speed}
            onValueChange={setSpeed}
            max={100}
            step={1}
            disabled={isPlaying}
            className="cursor-pointer"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={position >= 100}
            className="flex-1"
            variant="default"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>

          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-sm">
            <span className="font-semibold">Distance:</span> {Math.round(position)}%
          </p>
          <p className="text-sm">
            <span className="font-semibold">Time:</span>{' '}
            {((position / speed[0]) * 20).toFixed(1)}s
          </p>
        </div>
      </div>
    </Card>
  );
};
