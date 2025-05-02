
import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ResizeControlsProps {
  originalWidth: number;
  originalHeight: number;
  onResize: (width: number, height: number) => void;
}

const ResizeControls: React.FC<ResizeControlsProps> = ({
  originalWidth,
  originalHeight,
  onResize,
}) => {
  const [width, setWidth] = useState(originalWidth);
  const [height, setHeight] = useState(originalHeight);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [scale, setScale] = useState(100);
  
  const aspectRatio = originalWidth / originalHeight;
  
  useEffect(() => {
    setWidth(originalWidth);
    setHeight(originalHeight);
    setScale(100);
  }, [originalWidth, originalHeight]);
  
  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    
    if (maintainAspectRatio) {
      const newHeight = Math.round(newWidth / aspectRatio);
      setHeight(newHeight);
      setScale((newWidth / originalWidth) * 100);
    }
  };
  
  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    
    if (maintainAspectRatio) {
      const newWidth = Math.round(newHeight * aspectRatio);
      setWidth(newWidth);
      setScale((newHeight / originalHeight) * 100);
    }
  };
  
  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
    const newWidth = Math.round((originalWidth * newScale) / 100);
    const newHeight = Math.round((originalHeight * newScale) / 100);
    setWidth(newWidth);
    setHeight(newHeight);
  };
  
  const handleApplyResize = () => {
    onResize(width, height);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Resize Image</h3>
        <p className="text-sm text-gray-500 mb-4">
          Original size: {originalWidth} x {originalHeight}px
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="scale">Scale {scale}%</Label>
          <Slider
            id="scale"
            min={1}
            max={200}
            step={1}
            value={[scale]}
            onValueChange={([value]) => handleScaleChange(value)}
          />
        </div>
        
        <div className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="width">Width (px)</Label>
            <Input
              id="width"
              type="number"
              min={1}
              value={width}
              onChange={(e) => handleWidthChange(parseInt(e.target.value) || 1)}
            />
          </div>
          
          <div className="pb-2">
            <ArrowDown className="text-gray-400" />
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="height">Height (px)</Label>
            <Input
              id="height"
              type="number"
              min={1}
              value={height}
              onChange={(e) => handleHeightChange(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            id="aspect-ratio"
            type="checkbox"
            className="rounded border-gray-300"
            checked={maintainAspectRatio}
            onChange={() => setMaintainAspectRatio(!maintainAspectRatio)}
          />
          <Label htmlFor="aspect-ratio">Maintain aspect ratio</Label>
        </div>
        
        <Button onClick={handleApplyResize} className="w-full">
          Apply Resize
        </Button>
      </div>
    </div>
  );
};

export default ResizeControls;
