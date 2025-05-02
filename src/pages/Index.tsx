import React, { useState } from 'react';
import { Image } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import ImageEditor from '@/components/ImageEditor';
const Index = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };
  const handleResetEditor = () => {
    setImageFile(null);
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-6">
          <div className="flex items-center space-x-4">
            <div className="bg-editor-purple rounded-full p-2">
              <Image className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">PixelCraft.veer</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        {!imageFile ? <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Edit Your Images Online
              </h1>
              <p className="text-lg text-gray-600">
                Resize, compress, remove backgrounds and more - completely free
              </p>
            </div>
            
            <ImageUploader onImageUpload={handleImageUpload} />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="bg-editor-light-purple/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Image className="h-8 w-8 text-editor-purple" />
                </div>
                <h3 className="font-medium text-lg mb-2">Image Compression</h3>
                <p className="text-gray-600 text-sm">
                  Resize and compress images without losing quality
                </p>
              </div>
              
              <div className="p-4">
                <div className="bg-editor-light-purple/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Crop className="h-8 w-8 text-editor-purple" />
                </div>
                <h3 className="font-medium text-lg mb-2">Background Removal</h3>
                <p className="text-gray-600 text-sm">
                  Remove backgrounds from images with one click
                </p>
              </div>
              
              <div className="p-4">
                <div className="bg-editor-light-purple/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Sun className="h-8 w-8 text-editor-purple" />
                </div>
                <h3 className="font-medium text-lg mb-2">Essential Editing</h3>
                <p className="text-gray-600 text-sm">
                  Adjust brightness, contrast, and more
                </p>
              </div>
            </div>
          </div> : <ImageEditor imageFile={imageFile} onResetEditor={handleResetEditor} />}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto py-6 px-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} PixelCraft. All images are processed locally in your browser.
          </p>
        </div>
      </footer>
    </div>;
};
export default Index;
import { Crop, Sun } from 'lucide-react';