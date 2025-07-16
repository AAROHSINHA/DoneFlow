import Snowfall from "react-snowfall";

const Landscape3 = () => {
  return (
    <div className="w-full h-40 relative overflow-hidden bg-gradient-to-b from-pink-100 to-pink-200 rounded-lg">
      <Snowfall 
                  snowflakeCount={10}
                  color="#F472B6" 
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 10
                  }}
                />
      {/* Sun */}
      <div className="absolute top-4 right-8 w-12 h-12 bg-pink-300 rounded-full opacity-80"></div>
      
      {/* Geometric trees */}
      <div className="absolute bottom-0 left-8">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-pink-500"></div>
        <div className="w-2 h-8 bg-pink-400 mx-auto"></div>
      </div>
      
      <div className="absolute bottom-0 left-20">
        <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-pink-400"></div>
        <div className="w-1 h-6 bg-pink-300 mx-auto"></div>
      </div>
      
      {/* Geometric hills */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="w-0 h-0 border-l-32 border-r-32 border-b-12 border-l-transparent border-r-transparent border-b-pink-300 absolute bottom-0 left-16"></div>
        <div className="w-0 h-0 border-l-24 border-r-24 border-b-8 border-l-transparent border-r-transparent border-b-pink-400 absolute bottom-0 right-20"></div>
      </div>
      
      {/* Abstract shapes */}
      <div className="absolute top-12 left-12 w-4 h-4 bg-pink-200 transform rotate-45"></div>
      <div className="absolute top-8 left-32 w-3 h-3 bg-pink-300 rounded-full"></div>
      <div className="absolute top-16 right-24 w-2 h-6 bg-pink-200 transform skew-x-12"></div>
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-pink-500"></div>
    </div>
  );
};

export default Landscape3;