
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface AdjustmentControlsProps {
  onApplyAdjustments: (brightness: number, contrast: number) => void;
}

const AdjustmentControls: React.FC<AdjustmentControlsProps> = ({
  onApplyAdjustments,
}) => {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  
  const handleReset = () => {
    setBrightness(0);
    setContrast(0);
    onApplyAdjustments(0, 0);
  };
  
  const handleApply = () => {
    onApplyAdjustments(brightness, contrast);
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Adjustments</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="brightness">Brightness</Label>
            <span className="text-sm text-gray-500">{brightness}</span>
          </div>
          <Slider
            id="brightness"
            min={-100}
            max={100}
            step={1}
            value={[brightness]}
            onValueChange={([value]) => setBrightness(value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="contrast">Contrast</Label>
            <span className="text-sm text-gray-500">{contrast}</span>
          </div>
          <Slider
            id="contrast"
            min={-100}
            max={100}
            step={1}
            value={[contrast]}
            onValueChange={([value]) => setContrast(value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleReset} 
            className="flex-1"
          >
            Reset
          </Button>
          <Button 
            onClick={handleApply}
            className="flex-1"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdjustmentControls;
