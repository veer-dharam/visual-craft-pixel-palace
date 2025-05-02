
import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { removeBackground } from '@/lib/api';
import { toast } from 'sonner';

interface BackgroundRemoverProps {
  imageFile: File;
  onProcessingComplete: (processedImageBlob: Blob) => void;
}

const BackgroundRemover: React.FC<BackgroundRemoverProps> = ({
  imageFile,
  onProcessingComplete,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleRemoveBackground = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    toast.info('Removing background...');
    
    try {
      const processedBlob = await removeBackground(imageFile);
      onProcessingComplete(processedBlob);
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Error removing background:', error);
      toast.error('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Background Removal</h3>
      <p className="text-sm text-gray-500">
        Remove the background from your image with one click.
      </p>
      <Button 
        onClick={handleRemoveBackground} 
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" /> 
            Processing...
          </>
        ) : (
          'Remove Background'
        )}
      </Button>
    </div>
  );
};

export default BackgroundRemover;
