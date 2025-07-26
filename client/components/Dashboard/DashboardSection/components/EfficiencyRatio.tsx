interface EfficiencyRatioProps {
  ratio: number
}

const efficiencyMessage = (ratio: number) => {
  if (ratio === 0) return "Yet to Start";
  else if (ratio <= 0.4) return "Poor Efficiency";
  else if (ratio <= 0.7) return "Moderate Efficiency";
  else if (ratio < 0.95) return "Good Efficiency";
  else return "Excellent Efficiency";
};


const EfficiencyRatio = ({ ratio }: EfficiencyRatioProps) => {

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-3">
        <span className="text-2xl mr-2">📊</span>
        <h2 className="text-xl font-semibold text-gray-800">Efficiency Ratio</h2>
      </div>
      
      <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
        <div className="text-2xl font-bold text-pink-600 mb-2">
          {Number(ratio.toFixed(2))}
        </div>
        
      
        
        <div className="text-sm text-gray-600">
          {efficiencyMessage(ratio)}
        </div>
      </div>
    </div>
  );
};

export default EfficiencyRatio;