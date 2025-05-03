
import { useImageProcessing } from '@/contexts/ImageProcessingContext';

export const useDownloadUtils = () => {
  const { imageState } = useImageProcessing();
  
  // Get formatted file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const handleQuickDownload = (imageFile?: File) => {
    if (!imageState.currentImageBlob || !imageFile) return;
    
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(imageState.currentImageBlob);
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
  
  return {
    formatFileSize,
    handleQuickDownload
  };
};
