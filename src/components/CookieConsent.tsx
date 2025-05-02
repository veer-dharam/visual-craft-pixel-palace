
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('adConsent');
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);
  
  const acceptConsent = () => {
    localStorage.setItem('adConsent', 'true');
    setShowBanner(false);
  };
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50 border-t">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-700">
          We use cookies and show ads to improve your experience. By continuing to use our site, you consent to our use of cookies and advertising in accordance with our Privacy Policy.
        </p>
        <div className="flex gap-4">
          <Button onClick={acceptConsent} variant="default">Accept</Button>
          <Button onClick={acceptConsent} variant="outline">Decline Non-Essential</Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
