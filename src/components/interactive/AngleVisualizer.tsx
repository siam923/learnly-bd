import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export const AngleVisualizer = () => {
  const [angle, setAngle] = useState([45]);

  const getAngleType = (deg: number) => {
    if (deg < 90) return { name: 'Acute', color: 'text-blue-500' };
    if (deg === 90) return { name: 'Right', color: 'text-green-500' };
    if (deg < 180) return { name: 'Obtuse', color: 'text-orange-500' };
    return { name: 'Straight', color: 'text-purple-500' };
  };

  const angleType = getAngleType(angle[0]);

  // Calculate the endpoint of the rotating line
  const cx = 200;
  const cy = 200;
  const radius = 120;
  const angleRad = (angle[0] * Math.PI) / 180;
  const endX = cx + radius * Math.cos(angleRad);
  const endY = cy - radius * Math.sin(angleRad);

  return (
    <Card className="p-6 my-6 border-2 border-primary/20 bg-gradient-card">
      <h3 className="text-lg font-semibold mb-4 text-primary">Angle Visualizer</h3>

      <div className="flex flex-col items-center">
        <svg width="400" height="250" viewBox="0 0 400 250" className="mb-4">
          {/* Base line */}
          <line
            x1={cx - radius}
            y1={cy}
            x2={cx + radius}
            y2={cy}
            stroke="hsl(var(--border))"
            strokeWidth="3"
          />

          {/* Rotating line */}
          <line
            x1={cx}
            y1={cy}
            x2={endX}
            y2={endY}
            stroke="hsl(var(--primary))"
            strokeWidth="3"
          />

          {/* Arc to show angle */}
          <path
            d={`M ${cx + 50} ${cy} A 50 50 0 ${angle[0] > 180 ? 1 : 0} 0 ${
              cx + 50 * Math.cos(angleRad)
            } ${cy - 50 * Math.sin(angleRad)}`}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
          />

          {/* Vertex point */}
          <circle cx={cx} cy={cy} r="5" fill="hsl(var(--primary))" />

          {/* Angle text */}
          <text
            x={cx + 70}
            y={cy - 20}
            fill="hsl(var(--foreground))"
            fontSize="20"
            fontWeight="bold"
          >
            {angle[0]}°
          </text>
        </svg>

        <div className="w-full space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Angle</label>
              <span className={`text-sm font-bold ${angleType.color}`}>
                {angle[0]}° - {angleType.name}
              </span>
            </div>
            <Slider value={angle} onValueChange={setAngle} max={180} step={1} />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-muted/50 rounded">
              <span className="font-semibold">Acute:</span> {'<'} 90°
            </div>
            <div className="p-2 bg-muted/50 rounded">
              <span className="font-semibold">Right:</span> = 90°
            </div>
            <div className="p-2 bg-muted/50 rounded">
              <span className="font-semibold">Obtuse:</span> 90° - 180°
            </div>
            <div className="p-2 bg-muted/50 rounded">
              <span className="font-semibold">Straight:</span> = 180°
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
