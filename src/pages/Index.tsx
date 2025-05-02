
import React, { useState } from 'react';
import { Image, Crop, Sun } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import ImageEditor from '@/components/ImageEditor';
import AdBanner from '@/components/AdBanner';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isMobile = useIsMobile();
  
  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };
  
  const handleResetEditor = () => {
    setImageFile(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto py-3 sm:py-4 px-4 sm:px-6">
          <div className="flex items-center space-x-4">
            <div className="bg-editor-purple rounded-full p-1.5 sm:p-2">
              <Image className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">PixelCraft.veer</h1>
          </div>
        </div>
      </header>
      
      {/* Top banner ad */}
      <AdBanner slot="1234567890" format="horizontal" className="bg-gray-100 py-2" />
      
      {/* Main Content */}
      <main className="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
        {!imageFile ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Edit Your Images Online
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Resize, compress, remove backgrounds and more - completely free
              </p>
            </div>
            
            <ImageUploader onImageUpload={handleImageUpload} />
            
            {/* Mid-page ad */}
            <AdBanner slot="0987654321" className="my-6 sm:my-8" />
            
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="p-4 bg-white/50 rounded-lg shadow-sm">
                <div className="bg-editor-light-purple/10 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Image className="h-6 w-6 sm:h-8 sm:w-8 text-editor-purple" />
                </div>
                <h3 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">Image Compression</h3>
                <p className="text-gray-600 text-sm">
                  Resize and compress images without losing quality
                </p>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg shadow-sm">
                <div className="bg-editor-light-purple/10 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Crop className="h-6 w-6 sm:h-8 sm:w-8 text-editor-purple" />
                </div>
                <h3 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">Background Removal</h3>
                <p className="text-gray-600 text-sm">
                  Remove backgrounds from images with one click
                </p>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg shadow-sm sm:col-span-2 md:col-span-1">
                <div className="bg-editor-light-purple/10 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Sun className="h-6 w-6 sm:h-8 sm:w-8 text-editor-purple" />
                </div>
                <h3 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">Essential Editing</h3>
                <p className="text-gray-600 text-sm">
                  Adjust brightness, contrast, and more
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <ImageEditor imageFile={imageFile} onResetEditor={handleResetEditor} />
            {/* Sidebar ad for editor page */}
            <div className="mt-4 sm:mt-6">
              <AdBanner slot="1122334455" format={isMobile ? "horizontal" : "rectangle"} />
            </div>
          </>
        )}
      </main>
      
      {/* Bottom banner ad */}
      <AdBanner slot="5544332211" format="horizontal" className="bg-gray-100 py-2 mt-4 sm:mt-6" />
      
      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto py-4 sm:py-6 px-4 sm:px-6">
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} PixelCraft. All images are processed locally in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
