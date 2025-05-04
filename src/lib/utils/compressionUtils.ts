
import { canvasToBlob, createFallbackBlob } from './canvasUtils';

// Enhanced function to compress image by quality with better quality preservation
export const compressImage = (
  image: HTMLImageElement,
  targetSizeKB: number
): Promise<Blob> => {
  return new Promise(async (resolve) => {
    // Step 1: Create a canvas with the original image dimensions
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      // Fallback if canvas context is not available
      resolve(await createFallbackBlob(image));
      return;
    }
    
    // Draw image on canvas with original dimensions
    ctx.drawImage(image, 0, 0, image.width, image.height);
    
    // Step 2: Initial attempts with high quality
    let quality = 0.95;
    let blob = await canvasToBlob(canvas, 'image/jpeg', quality);
    let currentSize = blob.size / 1024;
    
    // If already smaller than target, return this high quality version
    if (currentSize <= targetSizeKB) {
      resolve(blob);
      return;
    }
    
    // Step 3: Try WebP first as it typically offers better quality/size ratio
    try {
      const webpQuality = 0.90;
      const webpBlob = await canvasToBlob(canvas, 'image/webp', webpQuality);
      const webpSize = webpBlob.size / 1024;
      
      if (webpSize <= targetSizeKB * 1.1) {
        // If WebP is close to target size, use it
        resolve(webpBlob);
        return;
      }
    } catch (e) {
      // WebP not supported, continue with JPEG
      console.log("WebP format not supported, using JPEG");
    }
    
    // Step 4: If still too large, use precise binary search for optimal quality
    let minQuality = 0.1;  // Don't go below 0.1 to maintain minimum quality
    let maxQuality = 0.95;
    let attempts = 0;
    const MAX_ATTEMPTS = 12; // More attempts for better precision
    
    // Try to get as close as possible to target size using binary search
    while (minQuality < maxQuality && attempts < MAX_ATTEMPTS) {
      attempts++;
      quality = (minQuality + maxQuality) / 2;
      
      blob = await canvasToBlob(canvas, 'image/jpeg', quality);
      currentSize = blob.size / 1024;
      
      const sizeDiff = Math.abs(currentSize - targetSizeKB);
      
      // If we're within 2% of target size, that's good enough
      if (sizeDiff < targetSizeKB * 0.02) {
        break;
      } else if (currentSize > targetSizeKB) {
        maxQuality = quality;
      } else {
        minQuality = quality;
      }
    }
    
    // Step 5: If quality is too low (below 0.4), try adaptive resizing
    if (quality < 0.4 && image.width > 1000) {
      // Calculate new dimensions - reduce size while maintaining aspect ratio
      const scaleFactor = 0.9; // Start with 90% of original size
      const newWidth = Math.floor(image.width * scaleFactor);
      const newHeight = Math.floor(image.height * scaleFactor);
      
      // Create new canvas with reduced dimensions
      const resizeCanvas = document.createElement('canvas');
      resizeCanvas.width = newWidth;
      resizeCanvas.height = newHeight;
      const resizeCtx = resizeCanvas.getContext('2d');
      
      if (resizeCtx) {
        resizeCtx.drawImage(image, 0, 0, newWidth, newHeight);
        
        // Try higher quality on smaller dimensions
        const resizedBlob = await canvasToBlob(resizeCanvas, 'image/jpeg', 0.75);
        
        if (resizedBlob.size / 1024 <= targetSizeKB * 1.1) {
          resolve(resizedBlob);
          return;
        }
      }
    }
    
    // If all else fails, return the best quality JPEG we could get
    resolve(blob);
  });
};
