
import React, { useState } from 'react';
import { ImageProcessingProvider } from '@/contexts/ImageProcessingContext';
import { useDownloadUtils } from '@/hooks/use-download-utils';
import EditorContent from './editor/EditorContent';
import EditorHeader from './EditorHeader';

interface ImageEditorProps {
  imageFile: File | null;
  onResetEditor: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ imageFile, onResetEditor }) => {
  // We'll render the contents inside the ImageProcessingProvider context
  return (
    <ImageProcessingProvider imageFile={imageFile}>
      <EditorContainer imageFile={imageFile} onResetEditor={onResetEditor} />
    </ImageProcessingProvider>
  );
};

// This internal component has access to the context
const EditorContainer: React.FC<ImageEditorProps> = ({ imageFile, onResetEditor }) => {
  const [selectedTool, setSelectedTool] = useState<'resize' | 'crop' | 'rotate' | 'background' | 'adjust' | 'compress' | null>(null);
  const { imageState } = useImageProcessing();
  const { formatFileSize, handleQuickDownload } = useDownloadUtils();
  
  const handleSelectTool = (tool: 'resize' | 'crop' | 'rotate' | 'background' | 'adjust' | 'compress' | null) => {
    setSelectedTool(tool);
  };
  
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <EditorHeader 
        currentImageBlob={imageState.currentImageBlob}
        formatFileSize={formatFileSize}
        onQuickDownload={() => imageFile && handleQuickDownload(imageFile)}
        onResetEditor={onResetEditor}
      />
      
      <EditorContent 
        selectedTool={selectedTool}
        onSelectTool={handleSelectTool}
        imageFile={imageFile}
      />
    </div>
  );
};

export default ImageEditor;
