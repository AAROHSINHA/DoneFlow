import { useEffect, useState } from 'react';
import ProductivityCircle from './ProductivityCircle.tsx';
import EfficiencyRatio from './EfficiencyRatio.tsx';
import FocusTier from './FocusTier.tsx';

interface MainStatsProps {
    data: {[key: string] : number}
}

const MainStats = ({data}: MainStatsProps) => {
  const [focusPercentage, setFocusPercentage] = useState(0);
  const [efficiencyRatio, setEfficiencyRatio] = useState(0);
  const [focusTier, setFocusTier] = useState("Good Focus");

  useEffect(() => {
    const ProductivityScore = () => {
        const effortScore = Math.min(data.timeSpend/data.totalTime, 1)*100;
        const outputScore = (data.tasksCompleted / data.totalTasks) * 100;
        const efficiencyRatio = data.timeSpend > 0 ? (data.onTimeCompletedTasks / data.timeSpend) : 0;
        const efficiencyBonus = Math.min(efficiencyRatio * 100, 100)

        const productivityPercentage = (0.4*effortScore + 0.4*outputScore + 0.2*efficiencyBonus);
        setFocusPercentage(Math.round(productivityPercentage));
        setEfficiencyRatio(efficiencyRatio);

        const tierScore = efficiencyRatio*productivityPercentage*100;
        if(tierScore < 1500) setFocusTier("Bad Focus");
        else if(tierScore > 4500) setFocusTier("Excellent Focus");
        else setFocusTier("Good Focus");

    }
    ProductivityScore();
  }, [data])

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
        <EfficiencyRatio 
          ratio={efficiencyRatio}
        />
      </div>

      {/* Focus Tier */}
      <div>
        <FocusTier tier={focusTier} />
      </div>
    </div>
  );
};

export default MainStats;
