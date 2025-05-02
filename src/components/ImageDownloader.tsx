
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { compressImage } from '@/lib/imageUtils';

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
  
  const getFileName = () => {
    const baseName = originalFileName.split('.')[0] || 'image';
    const timestamp = new Date().getTime();
    return `${baseName}-edited-${timestamp}.${fileFormat}`;
  };
  
  const handleDownload = async () => {
    try {
      const img = new Image();
      img.src = URL.createObjectURL(imageBlob);
      
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });
      
      let downloadBlob = imageBlob;
      
      // If not PNG or needs compression, process the image
      if (fileFormat !== 'png' || quality < 100) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          downloadBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob(
              (blob) => {
                if (blob) resolve(blob);
              },
              `image/${fileFormat}`,
              quality / 100
            );
          });
        }
      }
      
      // Create download link and trigger it
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(downloadBlob);
      downloadLink.download = getFileName();
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
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
              <SelectItem value="png">PNG (Lossless)</SelectItem>
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
              PNG is lossless and doesn't use quality settings
            </p>
          )}
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
