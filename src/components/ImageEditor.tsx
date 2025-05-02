import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { loadImage, resizeImage, rotateImage, adjustImage } from '@/lib/imageUtils';
import EditToolbar from './EditToolbar';
import ImageDownloader from './ImageDownloader';
import { useIsMobile } from '@/hooks/use-mobile';
import EditorHeader from './EditorHeader';
import ImagePreview from './ImagePreview';
import ToolRenderer from './ToolRenderer';

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
  const isMobile = useIsMobile();
  
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
  
  // Get formatted file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const handleQuickDownload = () => {
    if (!currentImageBlob || !imageFile) return;
    
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(currentImageBlob);
    const fileName = imageFile.name.split('.')[0] || 'image';
    const fileExt = imageFile.name.split('.').pop() || 'png';
    const timestamp = new Date().getTime();
    
    downloadLink.href = url;
    downloadLink.download = `${fileName}-edited-${timestamp}.${fileExt}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <EditorHeader 
        currentImageBlob={currentImageBlob}
        formatFileSize={formatFileSize}
        onQuickDownload={handleQuickDownload}
        onResetEditor={onResetEditor}
      />
      
      <div className="flex flex-col gap-4 sm:gap-6">
        <EditToolbar 
          selectedTool={selectedTool} 
          onSelectTool={handleSelectTool}
          hasImage={!!currentImage}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <ImagePreview 
              canvasRef={canvasRef}
              currentImage={currentImage}
              isProcessing={isProcessing}
            />
          </div>
          
          <div className="lg:col-span-3 bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200 min-h-[250px] sm:min-h-[300px]">
            <ToolRenderer
              selectedTool={selectedTool}
              imageUrl={imageUrl}
              currentImage={currentImage}
              imageFile={imageFile}
              currentImageBlob={currentImageBlob}
              originalDimensions={originalDimensions}
              originalFileSize={originalFileSize}
              onResize={handleResize}
              onRotate={handleRotate}
              onCropComplete={handleCropComplete}
              onApplyAdjustments={handleApplyAdjustments}
              onCompressionComplete={handleCompressionComplete}
              onBackgroundRemovalComplete={handleBackgroundRemovalComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
