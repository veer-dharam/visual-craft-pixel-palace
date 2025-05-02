
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsDragging(false);
    
    if (acceptedFiles.length === 0) {
      toast.error('No valid image files selected');
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('The selected file is not an image');
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image is too large (max 10MB)');
      return;
    }
    
    onImageUpload(file);
    toast.success('Image uploaded successfully');
  }, [onImageUpload]);
  
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple: false,
  });
  
  React.useEffect(() => {
    setIsDragging(isDragActive);
  }, [isDragActive]);

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-8 transition-colors duration-200 text-center ${
        isDragging 
          ? 'border-editor-purple bg-editor-light-purple/10' 
          : 'border-gray-300 hover:border-editor-purple/70'
      }`}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full bg-editor-light-purple/10 flex items-center justify-center">
          <Upload className="h-8 w-8 text-editor-purple" />
        </div>
        
        <div className="space-y-1">
          <p className="text-lg font-medium text-gray-700">
            {isDragging ? 'Drop image here' : 'Drag & drop image here'}
          </p>
          <p className="text-sm text-gray-500">
            or click to browse (JPG, PNG, WebP up to 10MB)
          </p>
        </div>
        
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          variant="outline"
          className="mt-2"
        >
          Select File
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
