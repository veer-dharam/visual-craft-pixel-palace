
import React, { useState } from 'react';
import { Loader, Wand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { removeBackground } from '@/lib/api';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

interface BackgroundRemoverProps {
  imageFile: File;
  onProcessingComplete: (processedImageBlob: Blob) => void;
}

const BackgroundRemover: React.FC<BackgroundRemoverProps> = ({
  imageFile,
  onProcessingComplete,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleRemoveBackground = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    toast.info('Removing background...');
    
    // Simulate progress while processing
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 90) return prev + 10;
        return prev;
      });
    }, 300);
    
    try {
      const processedBlob = await removeBackground(imageFile);
      clearInterval(progressInterval);
      setProgress(100);
      onProcessingComplete(processedBlob);
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Error removing background:', error);
      toast.error('Failed to remove background. Please try again.');
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 500);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Background Removal</h3>
      <p className="text-sm text-gray-500">
        Remove the background from your image with one click.
      </p>
      
      {isProcessing && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-500 text-center">{progress}% Complete</p>
        </div>
      )}
      
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
          <>
            <Wand className="mr-2 h-4 w-4" />
            Remove Background
          </>
        )}
      </Button>
    </div>
  );
};

export default BackgroundRemover;
