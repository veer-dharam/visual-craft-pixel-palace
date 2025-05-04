// Function to resize an image
export const resizeImage = (
  image: HTMLImageElement,
  width: number,
  height: number
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(image, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, 'image/png');
    }
  });
};

// Function to crop an image
export const cropImage = (
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, 'image/png');
    }
  });
};

// Function to rotate an image
export const rotateImage = (
  image: HTMLImageElement,
  degrees: number
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Calculate new dimensions for rotated image
      if (degrees === 90 || degrees === 270) {
        canvas.width = image.height;
        canvas.height = image.width;
      } else {
        canvas.width = image.width;
        canvas.height = image.height;
      }
      
      // Move to center of canvas
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      // Rotate
      ctx.rotate((degrees * Math.PI) / 180);
      
      // Move back
      ctx.drawImage(
        image,
        -image.width / 2,
        -image.height / 2,
        image.width,
        image.height
      );
      
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, 'image/png');
    }
  });
};

// Function to adjust brightness and contrast
export const adjustImage = (
  image: HTMLImageElement,
  brightness: number,
  contrast: number
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(image, 0, 0, image.width, image.height);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Adjust brightness and contrast
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      
      for (let i = 0; i < data.length; i += 4) {
        // Brightness (add to RGB values)
        data[i] += brightness;
        data[i + 1] += brightness;
        data[i + 2] += brightness;
        
        // Contrast (apply formula)
        data[i] = factor * (data[i] - 128) + 128;
        data[i + 1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, 'image/png');
    }
  });
};

// Function to convert image to file
export const blobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type });
};

// Load image from file
export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

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

// Helper function to convert canvas to blob with given format and quality
const canvasToBlob = (canvas: HTMLCanvasElement, format: string, quality: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas to Blob conversion failed'));
        }
      },
      format,
      quality
    );
  });
};

// Fallback in case canvas context is not available
const createFallbackBlob = async (image: HTMLImageElement): Promise<Blob> => {
  // Create a simple blob from the image source if possible
  try {
    const response = await fetch(image.src);
    return await response.blob();
  } catch (e) {
    // If all else fails, create an empty blob
    return new Blob([], { type: 'image/jpeg' });
  }
};
