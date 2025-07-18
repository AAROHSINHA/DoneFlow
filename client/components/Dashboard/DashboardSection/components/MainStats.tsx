import { useEffect, useState } from 'react';
import ProductivityCircle from './ProductivityCircle.tsx';
import EfficiencyRatio from './EfficiencyRatio.tsx';
import FocusTier from './FocusTier.tsx';
import { calculateProductivityStats } from '../helpers.ts';

interface MainStatsProps {
  data: { [key: string]: number };
}

const MainStats = ({ data }: MainStatsProps) => {
  const [focusPercentage, setFocusPercentage] = useState(0);
  const [efficiencyRatio, setEfficiencyRatio] = useState(0);
  const [focusTier, setFocusTier] = useState("Good Focus");

  useEffect(() => {
    const stats = calculateProductivityStats(data);
    setFocusPercentage(stats.focusPercentage);
    setEfficiencyRatio(stats.efficiencyRatio);
    setFocusTier(stats.focusTier);
  }, [data]);

  return (
    <div className="bg-white rounded-xl p-4 w-full max-w-xs mx-auto">
      {/* Productivity Circle */}
      <div className="text-center mb-4">
        <div className="scale-90">
          <ProductivityCircle percentage={focusPercentage} />
        </div>
        <p className="text-gray-700 text-sm mt-2 font-medium">
          {focusPercentage}% Focused
        </p>
      </div>

      {/* Efficiency Ratio */}
      <div className="mb-4">
        <EfficiencyRatio ratio={efficiencyRatio} />
      </div>

      {/* Focus Tier */}
      <div>
        <FocusTier tier={focusTier} />
      </div>
    </div>
  );
};

export default MainStats;
