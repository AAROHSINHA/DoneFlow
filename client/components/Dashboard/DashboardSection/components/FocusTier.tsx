interface FocusTierProps {
  tier: string;
}

const FocusTier = ({ tier }: FocusTierProps) => {
  const getTierColor = (tierName: string) => {
  if (tierName === "Excellent Focus") {
    return 'bg-pink-500';
  } else if (tierName === "Good Focus") {
    return 'bg-pink-400';
  } else if (tierName === "Bad Focus") {
    return 'bg-pink-300';
  } else {
    return 'bg-pink-200'; // For "Not Ranked" or "No Focus Yet"
  }
};


  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-3">
        <span className="text-2xl mr-2">🏅</span>
        <h2 className="text-xl font-semibold text-gray-800">Focus Tier / Rank</h2>
      </div>
      
      <div className={`${getTierColor(tier)} rounded-lg p-4 text-white shadow-lg transform hover:scale-105 transition-transform duration-200`}>
        <div className="text-sm font-medium opacity-90 mb-1">
          Tier:
        </div>
        <div className="text-xl font-bold">
          "{tier}"
        </div>
      </div>
    </div>
  );
};

export default FocusTier;
