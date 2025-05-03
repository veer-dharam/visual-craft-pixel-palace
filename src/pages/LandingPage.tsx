import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Image, Crop, RotateCw, Sun, ImageDown, Wand, Upload, Download, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import AdBanner from '@/components/AdBanner';
import { useIsMobile } from '@/hooks/use-mobile';
const LandingPage = () => {
  const isMobile = useIsMobile();
  return <div className="min-h-screen bg-white">
      {/* Header */}
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
      
      {/* Hero Section */}
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
              
              
            </div>
          </div>
        </div>
      </section>
      
      {/* How it Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Edit your images in three simple steps without downloading any software
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-editor-light-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="h-8 w-8 text-editor-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Upload Your Image</h3>
              <p className="text-gray-600">
                Upload any image from your device. We support JPG, PNG, and WebP formats up to 10MB.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-editor-light-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="h-8 w-8 text-editor-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Choose Editing Tool</h3>
              <p className="text-gray-600">
                Select from our range of tools including resize, crop, adjust, and background removal.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-editor-light-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="h-8 w-8 text-editor-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Download Result</h3>
              <p className="text-gray-600">
                Save your edited image in your preferred format and quality. No watermarks, completely free.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/editor">Try It Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features */}
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
      
      {/* About */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/assets/about-image.jpg" alt="Person editing images on laptop" className="rounded-xl shadow-lg" />
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
      
      {/* Testimonials */}
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
      
      {/* FAQ */}
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
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-editor-purple text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Images?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who edit their images with PixelCraft every day. No signup, no downloads, just powerful editing tools at your fingertips.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/editor" className="px-8">Start Editing Now</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/cookies" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">Email: support@pixelcraft.com</li>
                <li className="text-gray-300">Twitter: @pixelcraft</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} PixelCraft. All rights reserved.</p>
            <p className="mt-2">All images are processed locally in your browser. Your privacy is our priority.</p>
          </div>
        </div>
      </footer>
      
      {/* Add the following meta tags for SEO */}
      {/* The React Helmet component would be better for these but we're keeping it simple */}
      <div style={{
      display: 'none'
    }}>
        <meta name="description" content="Free online image editing tools. Resize, compress, remove backgrounds and more with PixelCraft. No signup required." />
        <meta name="keywords" content="image editor, photo editor, background removal, image compression, resize image, crop image, free image tools" />
        <meta property="og:title" content="PixelCraft - Free Online Image Editor" />
        <meta property="og:description" content="Edit your images online for free. No signup required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pixelcraft.veer.com" />
        <meta property="og:image" content="https://pixelcraft.veer.com/og-image.jpg" />
      </div>
    </div>;
};
export default LandingPage;