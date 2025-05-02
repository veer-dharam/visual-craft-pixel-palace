
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { compressImage } from '@/lib/imageUtils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CompressionControlsProps {
  imageElement: HTMLImageElement;
  originalFileSize: number;
  onCompressionComplete: (compressedBlob: Blob, sizeKb: number) => void;
}

const CompressionControls: React.FC<CompressionControlsProps> = ({
  imageElement,
  originalFileSize,
  onCompressionComplete
}) => {
  const [quality, setQuality] = useState(90);
  const [targetSize, setTargetSize] = useState(Math.ceil(originalFileSize / 1024));
  const [customTargetSize, setCustomTargetSize] = useState(String(Math.ceil(originalFileSize / 1024)));
  const [compressing, setCompressing] = useState(false);
  const isMobile = useIsMobile();

  const formatFileSize = (sizeInKB: number): string => {
    if (sizeInKB < 1024) {
      return `${Math.round(sizeInKB)} KB`;
    } else {
      return `${(sizeInKB / 1024).toFixed(2)} MB`;
    }
  };

  const handleCustomSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomTargetSize(value);
    
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue > 0) {
      setTargetSize(Math.min(numValue, Math.ceil(originalFileSize / 1024)));
    }
  };

  const handleCompress = async () => {
    if (!imageElement) return;
    
    setCompressing(true);
    
    try {
      // Start with the current quality setting
      let currentQuality = quality;
      let compressedBlob = await compressImage(imageElement, currentQuality);
      let currentSize = compressedBlob.size / 1024; // KB
      
      // If the target size is smaller than what we got, try to reduce quality until we reach target
      if (currentSize > targetSize) {
        // Binary search approach to find the right quality for target size
        let minQuality = 1;
        let maxQuality = quality;
        
        for (let i = 0; i < 6 && maxQuality - minQuality > 3; i++) {
          currentQuality = Math.floor((minQuality + maxQuality) / 2);
          compressedBlob = await compressImage(imageElement, currentQuality);
          currentSize = compressedBlob.size / 1024;
          
          if (currentSize > targetSize) {
            maxQuality = currentQuality;
          } else {
            minQuality = currentQuality;
          }
        }
      }
      
      onCompressionComplete(compressedBlob, currentSize);
    } catch (error) {
      console.error('Error compressing image:', error);
    } finally {
      setCompressing(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-2">Compress Image</h3>
      <p className="text-sm text-gray-500 mb-3">
        Original size: {formatFileSize(originalFileSize / 1024)}
      </p>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="quality">Quality</Label>
            <span className="text-sm text-gray-600 font-medium">{quality}%</span>
          </div>
          <Slider
            id="quality"
            min={5}
            max={100}
            step={1}
            value={[quality]}
            onValueChange={([value]) => setQuality(value)}
            className={isMobile ? "py-4" : ""}
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="target-size">Target Size</Label>
            <span className="text-sm text-gray-600 font-medium">{formatFileSize(targetSize)}</span>
          </div>
          <Slider
            id="target-size"
            min={10}
            max={Math.max(5000, Math.ceil(originalFileSize / 1024))}
            step={10}
            value={[targetSize]}
            onValueChange={([value]) => {
              setTargetSize(value);
              setCustomTargetSize(String(value));
            }}
            className={isMobile ? "py-4" : ""}
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="custom-target-size">Custom Target Size (KB)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="custom-target-size"
              type="number"
              min="10"
              max={Math.ceil(originalFileSize / 1024)}
              value={customTargetSize}
              onChange={handleCustomSizeChange}
              className="flex-1"
            />
            <span className="text-sm font-medium">KB</span>
          </div>
        </div>
        
        <Button 
          onClick={handleCompress} 
          className="w-full"
          disabled={compressing}
        >
          {compressing ? 'Compressing...' : 'Apply Compression'}
        </Button>
      </div>
    </div>
  );
};

export default CompressionControls;
