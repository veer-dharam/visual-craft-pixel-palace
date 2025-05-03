
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdBanner from '@/components/AdBanner';

const HeroSection = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <AdBanner slot="9876543210" format="horizontal" className="container mx-auto px-4 md:px-6 mb-8" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              Edit Your Images <span className="text-editor-purple">Instantly</span> with AI Power
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              Transform your images with our free online tools. Resize, compress, remove backgrounds, and enhance—all without complicated software or sign-ups.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-medium">
                <Link to="/editor">Start Editing Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#features">Explore Features</a>
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check className="h-4 w-4 text-green-500" /> No signup required
              <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
              <Check className="h-4 w-4 text-green-500" /> 100% free to use
              <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
              <Check className="h-4 w-4 text-green-500" /> Processed locally
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="bg-white p-3 rounded-t-xl border-b border-gray-200">
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/hero-image.jpg"
                alt="SizeIt image editor interface"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-5"></div>
              <div className="absolute top-4 left-4 bg-white/90 rounded-lg px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
                SizeIt Editor
              </div>
              <div className="absolute bottom-4 right-4 bg-editor-purple text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
