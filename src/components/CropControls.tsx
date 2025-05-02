
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface CropControlsProps {
  imageUrl: string;
  onCropComplete: (croppedBlob: Blob) => void;
}

const CropControls: React.FC<CropControlsProps> = ({ imageUrl, onCropComplete }) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  const applyCrop = () => {
    if (!completedCrop || !imgRef.current) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      return;
    }
    
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    
    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );
    
    canvas.toBlob((blob) => {
      if (blob) {
        onCropComplete(blob);
      }
    }, 'image/png');
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-2">Crop Image</h3>
      <p className="text-sm text-gray-500 mb-4">
        Drag to select crop area
      </p>
      
      <div className="max-h-[300px] overflow-hidden">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        >
          <img 
            ref={imgRef} 
            src={imageUrl} 
            alt="Crop preview" 
            className="max-w-full"
          />
        </ReactCrop>
      </div>
      
      <Button onClick={applyCrop} className="w-full mt-4">
        Apply Crop
      </Button>
    </div>
  );
};

export default CropControls;
