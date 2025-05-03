
import React from 'react';
import { ImageDown, Wand, Crop, RotateCw, Sun, Image } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import AdBanner from '@/components/AdBanner';
import { useIsMobile } from '@/hooks/use-mobile';

const FeaturesSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Editing Tools</h2>
          <p className="text-lg text-gray-600">
            Our suite of editing tools helps you create perfect images for any purpose
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={<ImageDown size={24} />} title="Image Compression" description="Reduce file size without compromising quality" benefits={["Optimize images for web and social media", "Choose your target file size", "Maintain visual quality while reducing size", "Download in multiple formats"]} />
          
          <FeatureCard icon={<Wand size={24} />} title="Background Removal" description="Remove backgrounds with one click" benefits={["Instant AI-powered background removal", "Perfect for product photos", "Create transparent PNG images", "No more manual masking required"]} />
          
          <FeatureCard icon={<Crop size={24} />} title="Crop & Resize" description="Perfect dimensions for any platform" benefits={["Resize images to exact pixels or percentages", "Crop to highlight important parts", "Maintain aspect ratio automatically", "Preset sizes for social media platforms"]} />
          
          <FeatureCard icon={<RotateCw size={24} />} title="Rotate & Flip" description="Correct image orientation easily" benefits={["Rotate images to any angle", "Quick 90° rotation options", "Horizontal and vertical flipping", "Fix incorrectly oriented photos"]} />
          
          <FeatureCard icon={<Sun size={24} />} title="Adjust & Enhance" description="Perfect your image's appearance" benefits={["Adjust brightness and contrast", "Enhance colors and sharpness", "Fix exposure problems", "Make dull images pop"]} />
          
          <FeatureCard icon={<Image size={24} />} title="Format Conversion" description="Save in your preferred format" benefits={["Convert between JPG, PNG, and WebP", "Choose optimal quality settings", "Preserve transparency when needed", "Optimize for different use cases"]} />
        </div>
        
        <AdBanner slot="1357924680" format={isMobile ? "horizontal" : "rectangle"} className="mt-12" />
      </div>
    </section>
  );
};

export default FeaturesSection;
