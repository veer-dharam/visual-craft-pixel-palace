
import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Settings, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">
            Edit your images in three simple steps without downloading any software
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl text-center">
            <div className="w-16 h-16 bg-editor-light-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="h-8 w-8 text-editor-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">1. Upload Your Image</h3>
            <p className="text-gray-600">
              Upload any image from your device. We support JPG, PNG, and WebP formats up to 10MB.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl text-center">
            <div className="w-16 h-16 bg-editor-light-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Settings className="h-8 w-8 text-editor-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">2. Choose Editing Tool</h3>
            <p className="text-gray-600">
              Select from our range of tools including resize, crop, adjust, and background removal.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl text-center">
            <div className="w-16 h-16 bg-editor-light-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="h-8 w-8 text-editor-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">3. Download Result</h3>
            <p className="text-gray-600">
              Save your edited image in your preferred format and quality. No watermarks, completely free.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/editor">Try It Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
