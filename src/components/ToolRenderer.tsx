
import React from 'react';
import ResizeControls from './ResizeControls';
import CropControls from './CropControls';
import CompressionControls from './CompressionControls';
import BackgroundRemover from './BackgroundRemover';
import AdjustmentControls from './AdjustmentControls';
import ImageDownloader from './ImageDownloader';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

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
  const renderDownloadButton = () => {
    if (!currentImageBlob || !imageFile) return null;
    
    return (
      <div className="mt-4 pt-4 border-t border-gray-200">
        <ImageDownloader
          imageBlob={currentImageBlob}
          originalFileName={imageFile.name}
        />
      </div>
    );
  };

  if (!selectedTool) {
    return (
      <div className="flex flex-col h-full justify-center items-center text-center p-4 sm:p-6 gap-4">
        <p className="text-gray-600">Select a tool from the toolbar above to edit your image</p>
        {currentImageBlob && imageFile && (
          <div className="w-full max-w-xs">
            <ImageDownloader
              imageBlob={currentImageBlob}
              originalFileName={imageFile.name}
            />
          </div>
        )}
      </div>
    );
  }

  let toolContent;
  
  switch(selectedTool) {
    case 'resize':
      toolContent = currentImage ? (
        <div className="space-y-4">
          <ResizeControls
            originalWidth={originalDimensions.width}
            originalHeight={originalDimensions.height}
            onResize={onResize}
          />
          {renderDownloadButton()}
        </div>
      ) : null;
      break;
      
    case 'crop':
      toolContent = imageUrl ? (
        <div className="space-y-4">
          <CropControls 
            imageUrl={imageUrl}
            onCropComplete={onCropComplete}
          />
          {renderDownloadButton()}
        </div>
      ) : null;
      break;
      
    case 'compress':
      toolContent = currentImage ? (
        <div className="space-y-4">
          <CompressionControls
            imageElement={currentImage}
            originalFileSize={originalFileSize}
            onCompressionComplete={onCompressionComplete}
          />
          {renderDownloadButton()}
        </div>
      ) : null;
      break;
      
    case 'background':
      toolContent = imageFile ? (
        <div className="space-y-4">
          <BackgroundRemover
            imageFile={imageFile}
            onProcessingComplete={onBackgroundRemovalComplete}
          />
          {renderDownloadButton()}
        </div>
      ) : null;
      break;
      
    case 'adjust':
      toolContent = (
        <div className="space-y-4">
          <AdjustmentControls
            onApplyAdjustments={onApplyAdjustments}
          />
          {renderDownloadButton()}
        </div>
      );
      break;
      
    case 'rotate':
      toolContent = (
        <div className="space-y-4">
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
          {renderDownloadButton()}
        </div>
      );
      break;
      
    default:
      toolContent = null;
  }

  return <div>{toolContent}</div>;
};

export default ToolRenderer;
