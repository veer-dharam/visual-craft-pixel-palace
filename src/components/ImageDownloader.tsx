
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useImageProcessing } from '@/contexts/ImageProcessingContext';

interface ImageDownloaderProps {
  imageBlob: Blob;
  originalFileName: string;
}

const ImageDownloader: React.FC<ImageDownloaderProps> = ({ 
  imageBlob, 
  originalFileName 
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const { imageState } = useImageProcessing();
  
  const downloadImage = async () => {
    try {
      const fileName = getFileNameWithFormat(originalFileName, selectedFormat);
      
      // Use the existing blob directly for PNG format
      let processedBlob = imageBlob;
      
      if (selectedFormat !== 'png') {
        // For JPEG and WebP, maintain the current compression state
        processedBlob = await convertToFormat(imageBlob, selectedFormat);
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
  
  // Convert blob to selected format while maintaining quality
  const convertToFormat = async (
    blob: Blob, 
    format: 'jpeg' | 'webp'
  ): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        
        // Create canvas with original dimensions
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve(blob);
          return;
        }
        
        // Draw image at original size
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to blob with high quality setting for non-PNG formats
        canvas.toBlob(
          (newBlob) => {
            resolve(newBlob || blob);
          },
          `image/${format}`,
          0.95 // Use high quality
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
        <div className="text-xs text-gray-500">
          {selectedFormat === 'png' ? 
            'PNG format preserves full quality with transparency' : 
            selectedFormat === 'jpeg' ? 
              'JPEG works best for photos with smaller file sizes' : 
              'WebP offers good compression with quality preservation'}
        </div>
      </div>

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
