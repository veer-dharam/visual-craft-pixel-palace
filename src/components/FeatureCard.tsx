
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  benefits: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  benefits
}) => {
  return (
    <Card className="overflow-hidden bg-white border-2 border-gray-100 transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="bg-editor-light-purple/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-6">
          <div className="text-editor-purple">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-editor-purple mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
