
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadImage } from '@/lib/imageUtils';
import { toast } from 'sonner';

export interface ImageState {
  currentImage: HTMLImageElement | null;
  currentImageBlob: Blob | null;
  imageUrl: string | null;
  isProcessing: boolean;
  originalDimensions: { width: number; height: number };
  rotationAngle: number;
  originalFileSize: number;
}

interface ImageProcessingContextType {
  imageState: ImageState;
  setProcessing: (isProcessing: boolean) => void;
  updateImage: (newImage: HTMLImageElement, newBlob: Blob) => void;
  setRotationAngle: (angle: number) => void;
  loadInitialImage: (imageFile: File) => Promise<void>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const ImageProcessingContext = createContext<ImageProcessingContextType | null>(null);

export const useImageProcessing = () => {
  const context = useContext(ImageProcessingContext);
  if (!context) {
    throw new Error('useImageProcessing must be used within an ImageProcessingProvider');
  }
  return context;
};

interface ImageProcessingProviderProps {
  children: React.ReactNode;
  imageFile: File | null;
}

export const ImageProcessingProvider: React.FC<ImageProcessingProviderProps> = ({ 
  children,
  imageFile 
}) => {
  const [imageState, setImageState] = useState<ImageState>({
    currentImage: null,
    currentImageBlob: null,
    imageUrl: null,
    isProcessing: false,
    originalDimensions: { width: 0, height: 0 },
    rotationAngle: 0,
    originalFileSize: 0,
  });
  
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  // Load the image when imageFile changes
  const loadInitialImage = async (imageFile: File) => {
    setImageState(prev => ({ ...prev, isProcessing: true }));
    try {
      const img = await loadImage(imageFile);
      
      updateImage(img, imageFile);
      setImageState(prev => ({
        ...prev,
        originalFileSize: imageFile.size,
        originalDimensions: { width: img.width, height: img.height },
      }));
    } catch (error) {
      console.error('Error loading image:', error);
      toast.error('Failed to load image. Please try again.');
    } finally {
      setImageState(prev => ({ ...prev, isProcessing: false }));
    }
  };
  
  // Update image state with new image
  const updateImage = (newImage: HTMLImageElement, newBlob: Blob) => {
    // Revoke previous object URL to prevent memory leaks
    if (imageState.imageUrl) {
      URL.revokeObjectURL(imageState.imageUrl);
    }
    
    setImageState(prev => ({
      ...prev,
      currentImage: newImage,
      currentImageBlob: newBlob,
      imageUrl: URL.createObjectURL(newBlob),
    }));
  };
  
  // Set processing state
  const setProcessing = (isProcessing: boolean) => {
    setImageState(prev => ({ ...prev, isProcessing }));
  };
  
  // Set rotation angle
  const setRotationAngle = (angle: number) => {
    setImageState(prev => ({ ...prev, rotationAngle: angle }));
  };
  
  // Draw image on canvas when currentImage changes
  useEffect(() => {
    const { currentImage } = imageState;
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
  }, [imageState.currentImage]);

  // Load initial image when imageFile changes
  useEffect(() => {
    if (!imageFile) return;
    loadInitialImage(imageFile);
    
    // Clean up URL object on unmount
    return () => {
      if (imageState.imageUrl) URL.revokeObjectURL(imageState.imageUrl);
    };
  }, [imageFile]);
  
  const value = {
    imageState,
    setProcessing,
    updateImage,
    setRotationAngle,
    loadInitialImage,
    canvasRef,
  };
  
  return (
    <ImageProcessingContext.Provider value={value}>
      {children}
    </ImageProcessingContext.Provider>
  );
};
