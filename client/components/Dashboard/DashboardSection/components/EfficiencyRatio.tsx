interface EfficiencyRatioProps {
  ratio: number
}

const EfficiencyRatio = ({ ratio }: EfficiencyRatioProps) => {

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-3">
        <span className="text-2xl mr-2">📊</span>
        <h2 className="text-xl font-semibold text-gray-800">Efficiency Ratio</h2>
      </div>
      
      <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
        <div className="text-2xl font-bold text-pink-600 mb-2">
          {ratio.toFixed(1)}
        </div>
        
        {/* Progress bar
        <div className="w-full bg-pink-200 rounded-full h-3 mb-2">
          <div 
            className="bg-pink-400 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${efficiency}%` }}
          ></div>
        </div> */}
        
        <div className="text-sm text-gray-600">
          More Efficiency Expected
        </div>
      </div>
    </div>
  );
};

export default EfficiencyRatio;