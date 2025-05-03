
import { useState } from 'react';
import { toast } from 'sonner';
import { loadImage, resizeImage, rotateImage, adjustImage } from '@/lib/imageUtils';
import { useImageProcessing } from '@/contexts/ImageProcessingContext';

export const useImageOperations = () => {
  const { imageState, updateImage, setProcessing, setRotationAngle } = useImageProcessing();
  
  const handleResize = async (width: number, height: number) => {
    if (!imageState.currentImage) return;
    
    setProcessing(true);
    try {
      const resizedBlob = await resizeImage(imageState.currentImage, width, height);
      const resizedImg = await loadImage(new File([resizedBlob], "resized.png", { type: "image/png" }));
      updateImage(resizedImg, resizedBlob);
      toast.success('Image resized successfully!');
    } catch (error) {
      console.error('Error resizing image:', error);
      toast.error('Failed to resize image. Please try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  const handleRotate = async (direction: 'clockwise' | 'counterclockwise') => {
    if (!imageState.currentImage) return;
    
    const angle = direction === 'clockwise' ? 90 : -90;
    const newRotationAngle = (imageState.rotationAngle + angle) % 360;
    setRotationAngle(newRotationAngle);
    
    setProcessing(true);
    try {
      const rotatedBlob = await rotateImage(imageState.currentImage, angle);
      const rotatedImg = await loadImage(new File([rotatedBlob], "rotated.png", { type: "image/png" }));
      updateImage(rotatedImg, rotatedBlob);
      toast.success('Image rotated successfully!');
    } catch (error) {
      console.error('Error rotating image:', error);
      toast.error('Failed to rotate image. Please try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  const handleApplyAdjustments = async (brightness: number, contrast: number) => {
    if (!imageState.currentImage) return;
    
    setProcessing(true);
    try {
      const adjustedBlob = await adjustImage(imageState.currentImage, brightness, contrast);
      const adjustedImg = await loadImage(new File([adjustedBlob], "adjusted.png", { type: "image/png" }));
      updateImage(adjustedImg, adjustedBlob);
      toast.success('Adjustments applied successfully!');
    } catch (error) {
      console.error('Error applying adjustments:', error);
      toast.error('Failed to apply adjustments. Please try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  const handleCropComplete = async (croppedBlob: Blob) => {
    setProcessing(true);
    try {
      const croppedImg = await loadImage(new File([croppedBlob], "cropped.png", { type: "image/png" }));
      updateImage(croppedImg, croppedBlob);
      toast.success('Image cropped successfully!');
    } catch (error) {
      console.error('Error setting cropped image:', error);
      toast.error('Failed to crop image. Please try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  const handleCompressionComplete = async (compressedBlob: Blob, sizeKb: number) => {
    setProcessing(true);
    try {
      const compressedImg = await loadImage(new File([compressedBlob], "compressed.png", { type: "image/png" }));
      updateImage(compressedImg, compressedBlob);
      toast.success(`Image compressed to ${sizeKb.toFixed(1)} KB successfully!`);
    } catch (error) {
      console.error('Error setting compressed image:', error);
      toast.error('Failed to compress image. Please try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  const handleBackgroundRemovalComplete = async (processedBlob: Blob) => {
    try {
      const processedImg = await loadImage(new File([processedBlob], "no-bg.png", { type: "image/png" }));
      updateImage(processedImg, processedBlob);
    } catch (error) {
      console.error('Error setting processed image:', error);
      toast.error('Failed to update image. Please try again.');
    }
  };
  
  return {
    handleResize,
    handleRotate,
    handleApplyAdjustments,
    handleCropComplete,
    handleCompressionComplete,
    handleBackgroundRemovalComplete
  };
};
