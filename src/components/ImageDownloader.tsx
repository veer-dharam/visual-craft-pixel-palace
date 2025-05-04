
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileImage, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ImageDownloaderProps {
  imageBlob: Blob;
  originalFileName: string;
}

const ImageDownloader: React.FC<ImageDownloaderProps> = ({ 
  imageBlob, 
  originalFileName 
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [targetSizeKb, setTargetSizeKb] = useState<number>(100);
  
  const downloadImage = async () => {
    try {
      const fileName = getFileNameWithFormat(originalFileName, selectedFormat);
      
      // Create a new blob with the appropriate MIME type
      let processedBlob = imageBlob;
      
      if (selectedFormat !== 'png') {
        // For JPEG and WebP, try to match target filesize
        processedBlob = await adjustBlobSize(imageBlob, selectedFormat, targetSizeKb);
      }
      
      // Create a download link
      const url = URL.createObjectURL(processedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Image downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download image');
    }
  };
  
  const getFileNameWithFormat = (originalName: string, format: string): string => {
    // Remove the original extension and add new one
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    return `${baseName}.${format}`;
  };
  
  // Adjust blob size to target size by changing quality or upscaling
  const adjustBlobSize = async (
    blob: Blob, 
    format: 'jpeg' | 'png' | 'webp', 
    targetKb: number
  ): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        
        // Start with high quality
        let quality = 0.9;
        let scaleFactor = 1.0;
        const targetBytes = targetKb * 1024;
        const currentBytes = blob.size;
        
        // If current size is smaller than target, we need to upscale
        if (currentBytes < targetBytes) {
          // Calculate scale factor to reach target size (approximate)
          scaleFactor = Math.sqrt(targetBytes / currentBytes);
          quality = 0.95; // High quality for upscaling
        } else if (currentBytes > targetBytes) {
          // Calculate quality to reach target size (approximate)
          quality = Math.max(0.1, targetBytes / currentBytes);
        }
        
        // Create canvas with adjusted size
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve(blob);
          return;
        }
        
        // Draw image with adjusted size
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to blob with quality setting
        canvas.toBlob(
          (newBlob) => {
            resolve(newBlob || blob);
          },
          `image/${format}`,
          quality
        );
      };
      
      img.src = URL.createObjectURL(blob);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-3">
        <Label htmlFor="format">Download Format</Label>
        <Select 
          value={selectedFormat} 
          onValueChange={(value) => setSelectedFormat(value as any)}
        >
          <SelectTrigger className="w-full" id="format">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="webp">WebP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {selectedFormat !== 'png' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="target-size">Target File Size: {targetSizeKb} KB</Label>
          </div>
          <Slider
            id="target-size"
            min={10}
            max={5000}
            step={10}
            value={[targetSizeKb]}
            onValueChange={(value) => setTargetSizeKb(value[0])}
          />
          <div className="text-xs text-gray-500">
            {selectedFormat === 'jpeg' ? 
              'Adjust quality and size to match target file size' : 
              'Adjust compression to match target file size'}
          </div>
        </div>
      )}

      <Button 
        className="w-full" 
        onClick={downloadImage}
      >
        <Download className="mr-2 h-4 w-4" /> 
        Download Image
      </Button>
    </div>
  );
};

export default ImageDownloader;
