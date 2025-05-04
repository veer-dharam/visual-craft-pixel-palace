import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdBanner from '@/components/AdBanner';
const HeroSection = () => {
  return <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <AdBanner slot="9876543210" format="horizontal" className="container mx-auto px-4 md:px-6 mb-8" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-6 max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Edit Your Images <span className="text-editor-purple">Instantly</span> with AI Power
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Transform your images with our free online tools. Resize, compress, remove backgrounds, and enhance—all without complicated software or sign-ups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-medium">
              <Link to="/editor">Resize now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#features">Explore Features</a>
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
            <Check className="h-4 w-4 text-green-500" /> No signup required
            <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
            <Check className="h-4 w-4 text-green-500" /> 100% free to use
            <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
            <Check className="h-4 w-4 text-green-500" /> Processed locally
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;