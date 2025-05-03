
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#about", label: "About" },
    { href: "#faq", label: "FAQ" }
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-editor-purple rounded-full p-1.5 sm:p-2">
            <Image className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <h1 className="font-bold text-xl sm:text-2xl text-gray-900">SizeIt.veer</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="text-gray-600 hover:text-editor-purple transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        {/* CTA Button - visible on both desktop and mobile */}
        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:flex">
            <Link to="/editor">Start Editing <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          
          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] px-4 py-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-editor-purple rounded-full p-1.5">
                      <Image className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="font-bold text-lg">SizeIt</h2>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a 
                      key={link.href} 
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)} 
                      className="text-gray-600 hover:text-editor-purple transition-colors py-2 px-1 border-b border-gray-100"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                
                <Button asChild className="w-full mt-4">
                  <Link to="/editor" onClick={() => setIsMenuOpen(false)}>
                    Start Editing <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
