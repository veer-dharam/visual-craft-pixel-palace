
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageDownloaderProps {
  imageBlob: Blob;
  originalFileName: string;
}

const ImageDownloader: React.FC<ImageDownloaderProps> = ({
  imageBlob,
  originalFileName,
}) => {
  const [fileFormat, setFileFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [quality, setQuality] = useState(90);
  const [targetSize, setTargetSize] = useState(Math.ceil(imageBlob.size / 1024)); // Default to current size
  const [customTargetSize, setCustomTargetSize] = useState(String(Math.ceil(imageBlob.size / 1024)));
  const isMobile = useIsMobile();
  
  const getFileName = () => {
    const baseName = originalFileName.split('.')[0] || 'image';
    const timestamp = new Date().getTime();
    return `${baseName}-edited-${timestamp}.${fileFormat}`;
  };

  const handleCustomSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomTargetSize(value);
    
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue > 0) {
      setTargetSize(numValue);
    }
  };
  
  const handleDownload = async () => {
    try {
      // Create an image from the blob
      const blobUrl = URL.createObjectURL(imageBlob);
      const img = new Image();
      img.src = blobUrl;
      
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Still resolve to handle errors gracefully
      });
      
      // Create a canvas to apply compression and format conversion
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        // Convert to the selected format with specified quality
        let downloadBlob: Blob;
        const currentQuality = fileFormat !== 'png' ? quality / 100 : undefined;
        
        // If user has set a target size larger than current, try to upscale the quality
        if (targetSize > imageBlob.size / 1024 && fileFormat !== 'png') {
          // First attempt with current quality
          downloadBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
              (blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Failed to create blob"));
              },
              `image/${fileFormat}`,
              currentQuality
            );
          });
          
          // If we need a larger file, try increasing quality or dimensions
          if (downloadBlob.size / 1024 < targetSize) {
            // Try with maximum quality first
            downloadBlob = await new Promise<Blob>((resolve, reject) => {
              canvas.toBlob(
                (blob) => {
                  if (blob) resolve(blob);
                  else reject(new Error("Failed to create blob"));
                },
                `image/${fileFormat}`,
                1.0 // Maximum quality
              );
            });
            
            // If still too small, need to upscale the image dimensions
            if (downloadBlob.size / 1024 < targetSize) {
              // Calculate a scaling factor to try to achieve target size
              const scaleFactor = Math.sqrt(targetSize / (downloadBlob.size / 1024)) * 1.2; // Add 20% buffer
              
              // Create a larger canvas
              const upscaledCanvas = document.createElement('canvas');
              upscaledCanvas.width = Math.round(img.width * scaleFactor);
              upscaledCanvas.height = Math.round(img.height * scaleFactor);
              const upscaledCtx = upscaledCanvas.getContext('2d');
              
              if (upscaledCtx) {
                // Draw the image with better quality
                upscaledCtx.imageSmoothingQuality = 'high';
                upscaledCtx.drawImage(img, 0, 0, upscaledCanvas.width, upscaledCanvas.height);
                
                // Create final blob
                downloadBlob = await new Promise<Blob>((resolve, reject) => {
                  upscaledCanvas.toBlob(
                    (blob) => {
                      if (blob) resolve(blob);
                      else reject(new Error("Failed to create blob"));
                    },
                    `image/${fileFormat}`,
                    1.0
                  );
                });
              }
            }
          }
        } else {
          // Normal case - no size increase requested
          downloadBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
              (blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Failed to create blob"));
              },
              `image/${fileFormat}`,
              currentQuality
            );
          });
        }
        
        // Create download link and trigger download
        const downloadLink = document.createElement('a');
        const url = URL.createObjectURL(downloadBlob);
        downloadLink.href = url;
        downloadLink.download = getFileName();
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Clean up
        setTimeout(() => {
          URL.revokeObjectURL(url);
          URL.revokeObjectURL(blobUrl);
        }, 100);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Download Options</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-format">Format</Label>
          <Select
            value={fileFormat}
            onValueChange={(value: 'png' | 'jpeg' | 'webp') => setFileFormat(value)}
          >
            <SelectTrigger id="file-format">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpeg">JPEG (Smaller size)</SelectItem>
              <SelectItem value="webp">WebP (Modern format)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="quality">Quality</Label>
            <span className="text-sm text-gray-500">{quality}%</span>
          </div>
          <Slider
            id="quality"
            min={10}
            max={100}
            step={1}
            value={[quality]}
            onValueChange={([value]) => setQuality(value)}
            disabled={fileFormat === 'png'}
          />
          {fileFormat === 'png' && (
            <p className="text-xs text-gray-500 mt-1">
              Quality settings don't apply to PNG format
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="target-size">Target Size (KB)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="target-size"
              type="number"
              min="10"
              value={customTargetSize}
              onChange={handleCustomSizeChange}
              className="flex-1"
            />
            <span className="text-sm font-medium">KB</span>
          </div>
          <p className="text-xs text-gray-500">
            Current size: {Math.ceil(imageBlob.size / 1024)} KB
          </p>
        </div>
        
        <Button
          onClick={handleDownload}
          className="w-full"
        >
          <Download className="mr-2 h-4 w-4" /> Download Image
        </Button>
      </div>
    </div>
  );
};

export default ImageDownloader;
