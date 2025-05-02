
import React, { useState, useRef, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { loadImage, resizeImage, rotateImage, adjustImage, blobToFile } from '@/lib/imageUtils';
import ResizeControls from './ResizeControls';
import CropControls from './CropControls';
import CompressionControls from './CompressionControls';
import BackgroundRemover from './BackgroundRemover';
import AdjustmentControls from './AdjustmentControls';
import EditToolbar from './EditToolbar';
import ImageDownloader from './ImageDownloader';
import { Button } from '@/components/ui/button';

type Tool = 'resize' | 'crop' | 'rotate' | 'background' | 'adjust' | 'compress';

interface ImageEditorProps {
  imageFile: File | null;
  onResetEditor: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ imageFile, onResetEditor }) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null);
  const [currentImageBlob, setCurrentImageBlob] = useState<Blob | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [rotationAngle, setRotationAngle] = useState(0);
  const [originalFileSize, setOriginalFileSize] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Load the image when imageFile changes
  useEffect(() => {
    if (!imageFile) return;
    
    const loadImageAndDraw = async () => {
      setIsProcessing(true);
      try {
        const img = await loadImage(imageFile);
        setCurrentImage(img);
        setOriginalDimensions({ width: img.width, height: img.height });
        setCurrentImageBlob(imageFile);
        setOriginalFileSize(imageFile.size);
        setImageUrl(URL.createObjectURL(imageFile));
      } catch (error) {
        console.error('Error loading image:', error);
        toast.error('Failed to load image. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    };
    
    loadImageAndDraw();
    
    // Clean up URL object on unmount
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageFile]);
  
  // Draw image on canvas when currentImage changes
  useEffect(() => {
    if (!currentImage || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match image
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image
    ctx.drawImage(currentImage, 0, 0);
    
    // Update image URL for tools that need it
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    if (currentImageBlob) {
      setImageUrl(URL.createObjectURL(currentImageBlob));
    }
  }, [currentImage]);
  
  const handleSelectTool = (tool: Tool | null) => {
    setSelectedTool(tool);
    
    // If selecting rotate, initialize the rotation angle to 0
    if (tool === 'rotate') {
      setRotationAngle(0);
    }
  };
  
  const handleResize = async (width: number, height: number) => {
    if (!currentImage) return;
    
    setIsProcessing(true);
    try {
      const resizedBlob = await resizeImage(currentImage, width, height);
      const resizedImg = await loadImage(new File([resizedBlob], "resized.png", { type: "image/png" }));
      setCurrentImage(resizedImg);
      setCurrentImageBlob(resizedBlob);
      toast.success('Image resized successfully!');
    } catch (error) {
      console.error('Error resizing image:', error);
      toast.error('Failed to resize image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleRotate = async (direction: 'clockwise' | 'counterclockwise') => {
    if (!currentImage) return;
    
    const angle = direction === 'clockwise' ? 90 : -90;
    const newRotationAngle = (rotationAngle + angle) % 360;
    setRotationAngle(newRotationAngle);
    
    setIsProcessing(true);
    try {
      const rotatedBlob = await rotateImage(currentImage, angle);
      const rotatedImg = await loadImage(new File([rotatedBlob], "rotated.png", { type: "image/png" }));
      setCurrentImage(rotatedImg);
      setCurrentImageBlob(rotatedBlob);
      toast.success('Image rotated successfully!');
    } catch (error) {
      console.error('Error rotating image:', error);
      toast.error('Failed to rotate image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleApplyAdjustments = async (brightness: number, contrast: number) => {
    if (!currentImage) return;
    
    setIsProcessing(true);
    try {
      const adjustedBlob = await adjustImage(currentImage, brightness, contrast);
      const adjustedImg = await loadImage(new File([adjustedBlob], "adjusted.png", { type: "image/png" }));
      setCurrentImage(adjustedImg);
      setCurrentImageBlob(adjustedBlob);
      toast.success('Adjustments applied successfully!');
    } catch (error) {
      console.error('Error applying adjustments:', error);
      toast.error('Failed to apply adjustments. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleCropComplete = async (croppedBlob: Blob) => {
    setIsProcessing(true);
    try {
      const croppedImg = await loadImage(new File([croppedBlob], "cropped.png", { type: "image/png" }));
      setCurrentImage(croppedImg);
      setCurrentImageBlob(croppedBlob);
      toast.success('Image cropped successfully!');
    } catch (error) {
      console.error('Error setting cropped image:', error);
      toast.error('Failed to crop image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleCompressionComplete = async (compressedBlob: Blob, sizeKb: number) => {
    setIsProcessing(true);
    try {
      const compressedImg = await loadImage(new File([compressedBlob], "compressed.png", { type: "image/png" }));
      setCurrentImage(compressedImg);
      setCurrentImageBlob(compressedBlob);
      toast.success(`Image compressed to ${sizeKb.toFixed(1)} KB successfully!`);
    } catch (error) {
      console.error('Error setting compressed image:', error);
      toast.error('Failed to compress image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleBackgroundRemovalComplete = async (processedBlob: Blob) => {
    try {
      const processedImg = await loadImage(new File([processedBlob], "no-bg.png", { type: "image/png" }));
      setCurrentImage(processedImg);
      setCurrentImageBlob(processedBlob);
    } catch (error) {
      console.error('Error setting processed image:', error);
      toast.error('Failed to update image. Please try again.');
    }
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Edit Image</h2>
        <button
          onClick={onResetEditor}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Start Over
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 flex flex-col gap-4">
          <EditToolbar 
            selectedTool={selectedTool} 
            onSelectTool={handleSelectTool}
            hasImage={!!currentImage}
          />
          
          <div className="relative bg-gray-100 rounded-lg overflow-hidden h-[400px] flex items-center justify-center">
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
          
          {selectedTool === 'rotate' && currentImage && (
            <div className="flex justify-center gap-4">
              <Button onClick={() => handleRotate('counterclockwise')}>
                Rotate Left
              </Button>
              <Button onClick={() => handleRotate('clockwise')}>
                Rotate Right
              </Button>
            </div>
          )}
        </div>
        
        <div className="lg:w-1/3 bg-white rounded-lg p-4 shadow-sm">
          {!selectedTool && currentImageBlob && imageFile && (
            <ImageDownloader
              imageBlob={currentImageBlob}
              originalFileName={imageFile.name}
            />
          )}
          
          {selectedTool === 'resize' && currentImage && (
            <ResizeControls
              originalWidth={originalDimensions.width}
              originalHeight={originalDimensions.height}
              onResize={handleResize}
            />
          )}
          
          {selectedTool === 'crop' && imageUrl && (
            <CropControls 
              imageUrl={imageUrl}
              onCropComplete={handleCropComplete}
            />
          )}
          
          {selectedTool === 'compress' && currentImage && (
            <CompressionControls
              imageElement={currentImage}
              originalFileSize={originalFileSize}
              onCompressionComplete={handleCompressionComplete}
            />
          )}
          
          {selectedTool === 'background' && imageFile && (
            <BackgroundRemover
              imageFile={imageFile}
              onProcessingComplete={handleBackgroundRemovalComplete}
            />
          )}
          
          {selectedTool === 'adjust' && (
            <AdjustmentControls
              onApplyAdjustments={handleApplyAdjustments}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
