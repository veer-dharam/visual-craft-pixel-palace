
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ImageDownloaderProps {
  imageBlob: Blob;
  originalFileName: string;
}

const ImageDownloader: React.FC<ImageDownloaderProps> = ({ 
  imageBlob, 
  originalFileName 
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  
  const downloadImage = async () => {
    try {
      const fileName = getFileNameWithFormat(originalFileName, selectedFormat);
      
      // Create a download link and use the compressed blob directly
      const url = URL.createObjectURL(imageBlob);
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
    return `${baseName}_compressed.${format}`;
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
