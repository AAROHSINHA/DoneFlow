import { useEffect, useState } from 'react';

interface ProductivityCircleProps {
  percentage: number;
}

const ProductivityCircle = ({ percentage }: ProductivityCircleProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage ? percentage : 0 );
    }, 200);
    
    return () => clearTimeout(timer);
  }, [percentage]);

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">Productivity % Circle</h2>
      </div>
      
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#fce7f3"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#f472b6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Percentage text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-pink-500">
            {Math.round(animatedPercentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductivityCircle;