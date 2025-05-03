
import React from 'react';
import { Upload, Sliders, Download } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Upload Your Image",
      description: "Select and upload any image from your device. Our platform supports all common image formats including JPEG, PNG, and WebP."
    },
    {
      icon: <Sliders className="h-8 w-8" />,
      title: "Apply Edits",
      description: "Use our intuitive tools to compress your image, remove backgrounds, or make essential adjustments like cropping and enhancing."
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Download Result",
      description: "Get your professionally edited image in seconds. Save it in your preferred format and quality settings."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-16 left-[calc(100%-16px)] w-full h-0.5 bg-gray-200 z-0"></div>
          )}
          <div className="text-center relative z-10">
            <div className="bg-editor-purple text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">Step {index + 1}: {step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
