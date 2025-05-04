
import React, { useState } from 'react';
import { Image, Crop, Sun, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageUploader from '@/components/ImageUploader';
import ImageEditor from '@/components/ImageEditor';
import AdBanner from '@/components/AdBanner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isMobile = useIsMobile();
  
  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };
  
  const handleResetEditor = () => {
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto py-3 sm:py-4 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-editor-purple rounded-full p-1.5 sm:p-2">
                <Image className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">SizeIt</h1>
            </div>
            
            {imageFile && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleResetEditor}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Top banner ad */}
      <AdBanner slot="1234567890" format="horizontal" className="bg-gray-100 py-2" />
      
      {/* Main Content */}
      <main className="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
        {!imageFile ? (
          <>
            <HeroSection />
            <HowItWorksSection />
            
            <div className="max-w-3xl mx-auto mt-12">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Edit Your Images Online
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Resize, compress, remove backgrounds and more - completely free
                </p>
              </div>
              
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
            
            {/* Mid-page ad */}
            <AdBanner slot="0987654321" className="my-6 sm:my-8" />
            
            <FeaturesSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
          </>
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
      <Footer />
    </div>
  );
};

export default Index;
