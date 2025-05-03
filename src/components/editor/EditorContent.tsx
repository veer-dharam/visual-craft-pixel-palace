
import React from 'react';
import { useImageProcessing } from '@/contexts/ImageProcessingContext';
import { useImageOperations } from '@/hooks/use-image-operations';
import EditToolbar from '../EditToolbar';
import ImagePreview from '../ImagePreview';
import ToolRenderer from '../ToolRenderer';

type Tool = 'resize' | 'crop' | 'rotate' | 'background' | 'adjust' | 'compress';

interface EditorContentProps {
  selectedTool: Tool | null;
  onSelectTool: (tool: Tool | null) => void;
  imageFile: File | null;
}

const EditorContent: React.FC<EditorContentProps> = ({
  selectedTool,
  onSelectTool,
  imageFile
}) => {
  const { imageState, canvasRef } = useImageProcessing();
  const imageOperations = useImageOperations();
  
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <EditToolbar 
        selectedTool={selectedTool} 
        onSelectTool={onSelectTool}
        hasImage={!!imageState.currentImage}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6">
        <div className="lg:col-span-4 flex flex-col gap-4">
          <ImagePreview 
            canvasRef={canvasRef}
            currentImage={imageState.currentImage}
            isProcessing={imageState.isProcessing}
          />
        </div>
        
        <div className="lg:col-span-3 bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200 min-h-[250px] sm:min-h-[300px]">
          <ToolRenderer
            selectedTool={selectedTool}
            imageUrl={imageState.imageUrl}
            currentImage={imageState.currentImage}
            imageFile={imageFile}
            currentImageBlob={imageState.currentImageBlob}
            originalDimensions={imageState.originalDimensions}
            originalFileSize={imageState.originalFileSize}
            onResize={imageOperations.handleResize}
            onRotate={imageOperations.handleRotate}
            onCropComplete={imageOperations.handleCropComplete}
            onApplyAdjustments={imageOperations.handleApplyAdjustments}
            onCompressionComplete={imageOperations.handleCompressionComplete}
            onBackgroundRemovalComplete={imageOperations.handleBackgroundRemovalComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorContent;
