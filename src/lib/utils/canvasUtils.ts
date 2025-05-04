
// Shared canvas utility functions

// Helper function to convert canvas to blob with given format and quality
export const canvasToBlob = (canvas: HTMLCanvasElement, format: string, quality: number): Promise<Blob> => {
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
export const createFallbackBlob = async (image: HTMLImageElement): Promise<Blob> => {
  // Create a simple blob from the image source if possible
  try {
    const response = await fetch(image.src);
    return await response.blob();
  } catch (e) {
    // If all else fails, create an empty blob
    return new Blob([], { type: 'image/jpeg' });
  }
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
