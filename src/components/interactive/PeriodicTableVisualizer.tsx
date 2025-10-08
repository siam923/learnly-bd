import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const elements = [
  { symbol: 'H', name: 'Hydrogen', number: 1, category: 'nonmetal' },
  { symbol: 'He', name: 'Helium', number: 2, category: 'noble' },
  { symbol: 'Li', name: 'Lithium', number: 3, category: 'alkali' },
  { symbol: 'Be', name: 'Beryllium', number: 4, category: 'alkaline' },
  { symbol: 'B', name: 'Boron', number: 5, category: 'metalloid' },
  { symbol: 'C', name: 'Carbon', number: 6, category: 'nonmetal' },
  { symbol: 'N', name: 'Nitrogen', number: 7, category: 'nonmetal' },
  { symbol: 'O', name: 'Oxygen', number: 8, category: 'nonmetal' },
  { symbol: 'F', name: 'Fluorine', number: 9, category: 'halogen' },
  { symbol: 'Ne', name: 'Neon', number: 10, category: 'noble' },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    nonmetal: 'from-blue-400 to-blue-600',
    noble: 'from-purple-400 to-purple-600',
    alkali: 'from-red-400 to-red-600',
    alkaline: 'from-orange-400 to-orange-600',
    metalloid: 'from-teal-400 to-teal-600',
    halogen: 'from-green-400 to-green-600',
  };
  return colors[category] || 'from-gray-400 to-gray-600';
};

export const PeriodicTableVisualizer = () => {
  const [selectedElement, setSelectedElement] = useState<typeof elements[0] | null>(null);

  return (
    <Card className="p-6 my-6 border-2 border-success/30 bg-gradient-card">
      <h3 className="text-lg font-semibold mb-4 text-success">Periodic Table Explorer</h3>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {elements.map((element) => (
          <motion.button
            key={element.number}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedElement(element)}
            className={`p-3 rounded-lg bg-gradient-to-br ${getCategoryColor(
              element.category
            )} text-white font-bold text-center shadow-md hover:shadow-lg transition-shadow`}
          >
            <div className="text-xs opacity-80">{element.number}</div>
            <div className="text-xl">{element.symbol}</div>
          </motion.button>
        ))}
      </div>

      {selectedElement && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary/50 rounded-lg border-2 border-success/30"
        >
          <h4 className="text-xl font-bold mb-2">{selectedElement.name}</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold">Symbol:</span> {selectedElement.symbol}
            </p>
            <p>
              <span className="font-semibold">Atomic Number:</span> {selectedElement.number}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{' '}
              <span className="capitalize">{selectedElement.category}</span>
            </p>
          </div>
        </motion.div>
      )}

      <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs space-y-1">
        <p className="font-semibold mb-2">Legend:</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-400 to-blue-600" />
            <span>Nonmetal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-400 to-purple-600" />
            <span>Noble Gas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-red-400 to-red-600" />
            <span>Alkali Metal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-teal-400 to-teal-600" />
            <span>Metalloid</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
