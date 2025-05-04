
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { compressImage } from '@/lib/imageUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

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
  const [targetSize, setTargetSize] = useState(Math.ceil(originalFileSize / 1024 / 2)); // Default to half the original size
  const [compressing, setCompressing] = useState(false);
  const isMobile = useIsMobile();

  const formatFileSize = (sizeInKB: number): string => {
    if (sizeInKB < 1024) {
      return `${Math.round(sizeInKB)} KB`;
    } else {
      return `${(sizeInKB / 1024).toFixed(2)} MB`;
    }
  };

  const handleTargetSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value);
    
    if (!isNaN(numValue) && numValue > 0) {
      // Cap at original size as maximum
      setTargetSize(Math.min(numValue, Math.ceil(originalFileSize / 1024)));
    } else if (value === '') {
      // Allow empty input for better UX
      setTargetSize(0);
    }
  };

  const handleCompress = async () => {
    if (!imageElement) return;
    
    // Prevent compression with zero or negative target size
    if (targetSize <= 0) {
      toast.error('Please enter a valid target size greater than 0 KB');
      return;
    }
    
    setCompressing(true);
    
    try {
      // Use the improved compression algorithm
      const compressedBlob = await compressImage(imageElement, targetSize);
      const currentSize = compressedBlob.size / 1024; // KB
      
      onCompressionComplete(compressedBlob, currentSize);
      toast.success(`Image compressed to ${formatFileSize(currentSize)}`);
    } catch (error) {
      console.error('Error compressing image:', error);
      toast.error('Error compressing image. Please try again.');
    } finally {
      setCompressing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Compress Image</h3>
        <p className="text-sm text-gray-500 mb-4">
          Original size: {formatFileSize(originalFileSize / 1024)}
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="custom-target-size">Target Size (KB)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="custom-target-size"
              type="number"
              min="1"
              max={Math.ceil(originalFileSize / 1024)}
              value={targetSize}
              onChange={handleTargetSizeChange}
              className="flex-1"
            />
            <span className="text-sm font-medium">KB</span>
          </div>
          <p className="text-xs text-gray-500">
            Our compression algorithm will attempt to reach this target size while preserving maximum quality.
          </p>
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
