
import React, { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  slot, 
  format = 'auto',
  className = ''
}) => {
  useEffect(() => {
    // Load ads when component mounts
    try {
      // @ts-ignore - Google AdSense is loaded via script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Ad loading error:', error);
    }
  }, []);

  return (
    <div className={`ad-container my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense Publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
