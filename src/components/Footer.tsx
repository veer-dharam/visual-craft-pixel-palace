
import React from 'react';
import { Image } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-full p-1.5">
                <Image className="h-5 w-5 text-editor-purple" />
              </div>
              <h3 className="font-bold text-xl">PixelCraft.veer</h3>
            </div>
            <p className="text-gray-300">
              Free online image editing tools for everyone. No signup required.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} PixelCraft. All rights reserved.</p>
          <p className="mt-2">All images are processed locally in your browser. Your privacy is our priority.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
