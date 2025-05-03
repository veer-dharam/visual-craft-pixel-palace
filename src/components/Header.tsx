
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-editor-purple rounded-full p-1.5 sm:p-2">
            <Image className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <h1 className="font-bold text-xl sm:text-2xl text-gray-900">PixelCraft.veer</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-gray-600 hover:text-editor-purple transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-editor-purple transition-colors">How It Works</a>
          <a href="#about" className="text-gray-600 hover:text-editor-purple transition-colors">About</a>
          <a href="#faq" className="text-gray-600 hover:text-editor-purple transition-colors">FAQ</a>
        </nav>
        
        <Button asChild>
          <Link to="/editor">Start Editing <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
