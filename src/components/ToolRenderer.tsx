
import React from 'react';
import ResizeControls from './ResizeControls';
import CropControls from './CropControls';
import CompressionControls from './CompressionControls';
import BackgroundRemover from './BackgroundRemover';
import AdjustmentControls from './AdjustmentControls';
import ImageDownloader from './ImageDownloader';
import { Button } from '@/components/ui/button';

type Tool = 'resize' | 'crop' | 'rotate' | 'background' | 'adjust' | 'compress';

interface ToolRendererProps {
  selectedTool: Tool | null;
  imageUrl: string | null;
  currentImage: HTMLImageElement | null;
  imageFile: File | null;
  currentImageBlob: Blob | null;
  originalDimensions: { width: number; height: number };
  originalFileSize: number;
  onResize: (width: number, height: number) => void;
  onRotate: (direction: 'clockwise' | 'counterclockwise') => void;
  onCropComplete: (croppedBlob: Blob) => void;
  onApplyAdjustments: (brightness: number, contrast: number) => void;
  onCompressionComplete: (compressedBlob: Blob, sizeKb: number) => void;
  onBackgroundRemovalComplete: (processedBlob: Blob) => void;
}

const ToolRenderer: React.FC<ToolRendererProps> = ({
  selectedTool,
  imageUrl,
  currentImage,
  imageFile,
  currentImageBlob,
  originalDimensions,
  originalFileSize,
  onResize,
  onRotate,
  onCropComplete,
  onApplyAdjustments,
  onCompressionComplete,
  onBackgroundRemovalComplete,
}) => {
  if (!selectedTool) {
    return (
      <div className="flex flex-col h-full justify-center items-center text-center p-4 sm:p-6 gap-4">
        <p className="text-gray-600">Select a tool from the toolbar above to edit your image</p>
        {currentImageBlob && imageFile && (
          <ImageDownloader
            imageBlob={currentImageBlob}
            originalFileName={imageFile.name}
          />
        )}
      </div>
    );
  }

  switch(selectedTool) {
    case 'resize':
      return currentImage ? (
        <ResizeControls
          originalWidth={originalDimensions.width}
          originalHeight={originalDimensions.height}
          onResize={onResize}
        />
      ) : null;
      
    case 'crop':
      return imageUrl ? (
        <CropControls 
          imageUrl={imageUrl}
          onCropComplete={onCropComplete}
        />
      ) : null;
      
    case 'compress':
      return currentImage ? (
        <CompressionControls
          imageElement={currentImage}
          originalFileSize={originalFileSize}
          onCompressionComplete={onCompressionComplete}
        />
      ) : null;
      
    case 'background':
      return imageFile ? (
        <BackgroundRemover
          imageFile={imageFile}
          onProcessingComplete={onBackgroundRemovalComplete}
        />
      ) : null;
      
    case 'adjust':
      return (
        <AdjustmentControls
          onApplyAdjustments={onApplyAdjustments}
        />
      );
      
    case 'rotate':
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-2">Rotate Image</h3>
          <div className="flex justify-center gap-4">
            <Button onClick={() => onRotate('counterclockwise')}>
              Rotate Left
            </Button>
            <Button onClick={() => onRotate('clockwise')}>
              Rotate Right
            </Button>
          </div>
        </div>
      );
      
    default:
      return null;
  }
};

export default ToolRenderer;
