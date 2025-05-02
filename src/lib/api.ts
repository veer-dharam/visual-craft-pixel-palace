
import { loadImage } from './imageUtils';

// Function to remove background from image using client-side processing
export const removeBackground = async (imageFile: File): Promise<Blob> => {
  try {
    // Create a canvas with the same dimensions as the image
    const image = await loadImage(imageFile);
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Draw the original image
    ctx.drawImage(image, 0, 0);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Simple background removal algorithm using color detection
    // This is a simplified version - using edge detection to find subject
    const tolerance = 30;
    
    // First, try to find the background color (we assume it's mostly consistent around the edges)
    const edgePixels = [];
    // Sample from the edges
    for (let i = 0; i < canvas.width; i++) {
      // Top edge
      const topIndex = (i + 0 * canvas.width) * 4;
      edgePixels.push([data[topIndex], data[topIndex + 1], data[topIndex + 2]]);
      
      // Bottom edge
      const bottomIndex = (i + (canvas.height - 1) * canvas.width) * 4;
      edgePixels.push([data[bottomIndex], data[bottomIndex + 1], data[bottomIndex + 2]]);
    }
    
    for (let j = 0; j < canvas.height; j++) {
      // Left edge
      const leftIndex = (0 + j * canvas.width) * 4;
      edgePixels.push([data[leftIndex], data[leftIndex + 1], data[leftIndex + 2]]);
      
      // Right edge
      const rightIndex = ((canvas.width - 1) + j * canvas.width) * 4;
      edgePixels.push([data[rightIndex], data[rightIndex + 1], data[rightIndex + 2]]);
    }
    
    // Function to check if a color is close to another
    const isColorClose = (color1: number[], color2: number[], tolerance: number) => {
      return (
        Math.abs(color1[0] - color2[0]) < tolerance &&
        Math.abs(color1[1] - color2[1]) < tolerance &&
        Math.abs(color1[2] - color2[2]) < tolerance
      );
    };
    
    // Apply the background removal
    for (let i = 0; i < data.length; i += 4) {
      const pixelColor = [data[i], data[i + 1], data[i + 2]];
      
      // Check if this pixel color is close to any edge colors (likely background)
      let isBackground = false;
      for (const edgeColor of edgePixels) {
        if (isColorClose(pixelColor, edgeColor, tolerance)) {
          isBackground = true;
          break;
        }
      }
      
      // If it's background, set alpha to 0 (transparent)
      if (isBackground) {
        data[i + 3] = 0;
      }
    }
    
    // Put the modified image data back to canvas
    ctx.putImageData(imageData, 0, 0);
    
    // Return as blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          // If something went wrong, return the original file
          resolve(imageFile);
        }
      }, 'image/png');
    });
  } catch (error) {
    console.error('Error in background removal:', error);
    // Return the original file if processing fails
    return imageFile;
  }
};
