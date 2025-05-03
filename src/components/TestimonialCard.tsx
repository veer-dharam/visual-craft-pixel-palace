
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  rating
}) => {
  return (
    <Card className="overflow-hidden bg-white border-2 border-gray-100 transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${
                index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <blockquote className="text-gray-700 italic mb-6">
          "{quote}"
        </blockquote>
        <div className="flex items-center">
          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 font-medium mr-3">
            {author.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{author}</p>
            <p className="text-gray-500 text-sm">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
