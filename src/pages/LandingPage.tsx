
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import SEOMetadata from '@/components/SEOMetadata';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <SEOMetadata />
    </div>
  );
};

export default LandingPage;
