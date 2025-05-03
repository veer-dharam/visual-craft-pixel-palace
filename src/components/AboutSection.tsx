
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img alt="Person editing images on laptop" className="rounded-xl shadow-lg" src="/lovable-uploads/f9c984e4-6c0b-49c8-81ff-caf7310e8c61.png" />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About PixelCraft.veer</h2>
            <p className="text-lg text-gray-700">
              PixelCraft was created with a simple mission: to make professional image editing accessible to everyone. We believe that powerful editing tools shouldn't require expensive software subscriptions or technical expertise.
            </p>
            <p className="text-lg text-gray-700">
              Our web-based platform processes all images directly in your browser, ensuring your privacy and security. No images are uploaded to external servers, giving you peace of mind when working with sensitive or personal photos.
            </p>
            <p className="text-lg text-gray-700">
              Whether you're a small business owner needing product photos, a content creator preparing social media assets, or simply someone wanting to enhance personal photos, PixelCraft provides the tools you need—free from complexity and cost.
            </p>
            <p className="text-lg text-gray-700">
              We're constantly improving our technology to provide more advanced features while maintaining our commitment to accessibility, privacy, and ease of use.
            </p>
            
            <Button asChild>
              <Link to="/editor">Try PixelCraft Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
