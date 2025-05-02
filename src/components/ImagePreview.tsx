
import React from 'react';
import { Loader } from 'lucide-react';

interface ImagePreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  currentImage: HTMLImageElement | null;
  isProcessing: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  canvasRef,
  currentImage,
  isProcessing,
}) => {
  return (
    <div className="relative bg-gray-100 border border-gray-200 rounded-lg overflow-hidden h-[200px] sm:h-[350px] flex items-center justify-center">
      {isProcessing && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
          <Loader className="h-8 w-8 text-white animate-spin" />
        </div>
      )}
      
      {currentImage ? (
        <canvas
          ref={canvasRef}
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <div className="text-gray-400">No image to preview</div>
      )}
    </div>
  );
};

export default ImagePreview;
