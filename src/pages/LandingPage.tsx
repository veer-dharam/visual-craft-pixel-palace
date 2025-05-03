
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Image, 
  ArrowRight, 
  Crop, 
  FileImage, 
  FileMinus, 
  Sliders, 
  ArrowDown, 
  CheckCircle, 
  Star, 
  MessageCircle, 
  Info, 
  Mail, 
  HelpCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import AdBanner from '@/components/AdBanner';
import { useIsMobile } from '@/hooks/use-mobile';
import TestimonialCard from '@/components/TestimonialCard';
import FeatureCard from '@/components/FeatureCard';
import HowItWorks from '@/components/HowItWorks';
import { cn } from '@/lib/utils';

const LandingPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto py-4 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-editor-purple rounded-full p-1.5">
                <Image className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">PixelCraft.veer</h1>
            </div>
            <Button asChild size="sm">
              <Link to="/">Try Now</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Top banner ad */}
      <AdBanner slot="landing-top" format="horizontal" className="bg-gray-50 py-2" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-editor-light-purple/10 to-white pt-12 pb-16 md:pt-24 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Transform Your Images <span className="text-editor-purple">Instantly</span> with AI
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Resize, remove backgrounds, enhance, and perfect your images with our powerful yet easy-to-use online image editing tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-medium">
                  <Link to="/">Edit Your Image <ArrowRight className="ml-2" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-medium">
                  <a href="#how-it-works">Learn More <ArrowDown className="ml-2" /></a>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-editor-purple/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-editor-teal/20 rounded-full blur-2xl"></div>
                <Card className="overflow-hidden border-2 border-gray-100 shadow-xl">
                  <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center relative">
                    <img 
                      src="/placeholder.svg" 
                      alt="AI image editing demonstration showing before and after editing results" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                        <Image className="w-12 h-12 text-editor-purple mx-auto" />
                        <p className="text-sm font-medium mt-2">AI-Powered Editing</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your images with our powerful AI tools
            </p>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* Mid-page ad */}
      <AdBanner slot="landing-mid" className="py-6" />

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Editing Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our suite of professional image editing tools helps you achieve professional results in seconds
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <FeatureCard 
              title="Image Compression" 
              description="Reduce file size while maintaining quality. Perfect for web optimization and faster loading times." 
              icon={<FileImage />} 
              benefits={["Up to 90% file size reduction", "Maintain visual quality", "Batch processing available"]}
            />
            <FeatureCard 
              title="Background Removal" 
              description="Instantly remove backgrounds from images with our AI-powered tool. No complex manual selection required." 
              icon={<FileMinus />} 
              benefits={["One-click removal", "Works with complex objects", "Save with transparency"]}
            />
            <FeatureCard 
              title="Essential Editing" 
              description="Crop, rotate, adjust brightness and contrast to make your images perfect with our intuitive editing tools." 
              icon={<Sliders />} 
              benefits={["Precise cropping", "Color enhancement", "Professional results"]}
            />
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="font-medium">
              <Link to="/">Try These Features Now <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About PixelCraft.veer</h2>
              <p className="text-lg text-gray-600 mb-6">
                PixelCraft.veer was born from a simple idea: make professional image editing accessible to everyone, regardless of technical skill. Our mission is to democratize image editing with AI-powered tools that are both powerful and intuitive.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Unlike traditional image editing software that requires installation, training, and powerful computers, our web-based solution works entirely in your browser. This means you can edit images from any device, anytime, with professional-grade results.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our proprietary AI algorithms have been trained on millions of images to understand context, recognize objects, and make intelligent enhancements that would have required hours of manual editing in the past.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-editor-purple mr-2" />
                  <span className="text-gray-700">No software installation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-editor-purple mr-2" />
                  <span className="text-gray-700">Works on any device</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-editor-purple mr-2" />
                  <span className="text-gray-700">Privacy-focused</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-editor-purple mr-2" />
                  <span className="text-gray-700">Constantly improving AI</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-editor-teal/20 rounded-full blur-2xl"></div>
              <Card className="overflow-hidden border-2 border-gray-100 shadow-xl">
                <div className="aspect-video w-full bg-gray-100">
                  <img 
                    src="/placeholder.svg" 
                    alt="Team working on AI image editing technology" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-editor-purple/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Side banner ad (only on desktop) */}
      {!isMobile && (
        <div className="fixed right-4 top-1/3 w-[160px] z-40 hidden lg:block">
          <AdBanner slot="landing-side" format="vertical" />
        </div>
      )}

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thousands of users rely on our tools for their image editing needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              quote="The background removal tool saved me hours of work! It's incredibly accurate and so easy to use." 
              author="Sarah Johnson" 
              role="Marketing Manager" 
              rating={5} 
            />
            <TestimonialCard 
              quote="I've tried many online image compressors, but this one maintains the best quality while reducing file size significantly." 
              author="Michael Chen" 
              role="E-commerce Entrepreneur" 
              rating={4} 
            />
            <TestimonialCard 
              quote="As a blogger who needs to optimize images constantly, this tool has become an essential part of my workflow." 
              author="Emma Rodriguez" 
              role="Content Creator" 
              rating={5} 
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our image editing tools
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-medium">
                  Is my data safe when I upload images?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes, absolutely. PixelCraft.veer processes all images directly in your browser. Your images are never stored on our servers, and they never leave your device. We have a strict privacy policy that ensures your data remains yours.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-medium">
                  What image formats are supported?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We support all common image formats including JPEG, PNG, WebP, and GIF. You can also choose your preferred output format when downloading your edited images.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-medium">
                  Are there any limitations on file size?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  The free version supports images up to 5MB. For larger files and batch processing, consider our premium version which allows images up to 50MB and unlimited batch processing.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-medium">
                  How accurate is the background removal tool?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our AI-powered background removal tool is highly accurate for most images. It works best with clear subjects and contrasting backgrounds, but can handle complex images as well. For very complex images with fine details (like hair or fur), you might need minor manual adjustments.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-medium">
                  Will compressing images reduce their quality?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our compression algorithm uses intelligent techniques to reduce file size while maintaining visual quality. You can choose your preferred level of compression to balance between size reduction and quality preservation. For most web usage, even high compression settings will produce excellent results.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-medium">
                  Do I need to create an account to use the tools?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  No account is required to use our basic tools. However, creating a free account allows you to save your editing history and access additional features. Premium subscribers get access to all advanced features, higher resolution support, and priority processing.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Bottom banner ad */}
      <AdBanner slot="landing-bottom" format="horizontal" className="bg-gray-50 py-2" />

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white rounded-full p-1">
                  <Image className="h-5 w-5 text-editor-purple" />
                </div>
                <h3 className="text-lg font-bold">PixelCraft.veer</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Professional image editing tools powered by AI, available right in your browser.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR Compliance</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-editor-purple mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">support@pixelcraft.veer.com</span>
                </li>
                <li>
                  <Button variant="outline" className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white mt-2">
                    Send Feedback
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-gray-800 my-6" />
          
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} PixelCraft.veer. All rights reserved.</p>
            <p className="mt-2">All images are processed locally in your browser. We respect your privacy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
