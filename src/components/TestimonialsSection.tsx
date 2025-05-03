
import React from 'react';
import TestimonialCard from '@/components/TestimonialCard';

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Users Say</h2>
          <p className="text-lg text-gray-600">
            Thousands of people use PixelCraft every day to enhance their images
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard quote="I use PixelCraft for all my product photos. The background removal tool saves me hours of work!" author="Sarah Johnson" role="E-commerce Store Owner" rating={5} />
          
          <TestimonialCard quote="As a blogger, I need to optimize dozens of images weekly. PixelCraft makes it incredibly easy and fast." author="Michael Chen" role="Content Creator" rating={5} />
          
          <TestimonialCard quote="The compression tool is amazing. My website loads so much faster now that I've optimized all my images." author="Emma Rodriguez" role="Web Developer" rating={4} />
          
          <TestimonialCard quote="I'm not tech-savvy at all, but even I found PixelCraft super easy to use. Great for quick edits!" author="David Thompson" role="Small Business Owner" rating={5} />
          
          <TestimonialCard quote="The fact that I can do all this without creating an account or downloading software is fantastic." author="Lisa Patel" role="Marketing Manager" rating={4} />
          
          <TestimonialCard quote="I use it for my social media posts. The resize options make it perfect for different platforms." author="James Wilson" role="Social Media Enthusiast" rating={5} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
