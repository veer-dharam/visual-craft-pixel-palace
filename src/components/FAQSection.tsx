
import React from 'react';
import AdBanner from '@/components/AdBanner';

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about using PixelCraft
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Is PixelCraft really free?</h3>
            <p className="text-gray-700">
              Yes, PixelCraft is completely free to use with no hidden fees. We support our service through non-intrusive advertisements.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Do you store my images?</h3>
            <p className="text-gray-700">
              No, all image processing happens directly in your browser. Your images never leave your device, ensuring complete privacy.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">What file formats are supported?</h3>
            <p className="text-gray-700">
              PixelCraft supports JPG, PNG, and WebP formats. You can also download your edited images in any of these formats.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Is there a file size limit?</h3>
            <p className="text-gray-700">
              Yes, the maximum file size is 10MB per image. This limit ensures optimal performance across all devices.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Do I need to create an account?</h3>
            <p className="text-gray-700">
              No account is needed. Simply visit the site, upload your image, and start editing immediately.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">How accurate is the background removal?</h3>
            <p className="text-gray-700">
              Our AI-powered background removal works best with clear subjects against contrasting backgrounds. Complex images may require additional adjustments.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Can I use PixelCraft for commercial projects?</h3>
            <p className="text-gray-700">
              Yes, images edited with PixelCraft can be used for both personal and commercial purposes. You retain all rights to your images.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Which browsers are supported?</h3>
            <p className="text-gray-700">
              PixelCraft works on all modern browsers including Chrome, Firefox, Safari, and Edge. For optimal performance, we recommend using the latest browser version.
            </p>
          </div>
        </div>
        
        <AdBanner slot="2468013579" format="horizontal" className="mt-12" />
      </div>
    </section>
  );
};

export default FAQSection;
