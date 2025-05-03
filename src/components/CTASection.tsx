
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
