import Snowfall from "react-snowfall";

const Landscape4 = () => {
  return (
    <div className="w-full h-40 relative overflow-hidden bg-gradient-to-br from-pink-50 via-pink-100 to-pink-150 rounded-lg">
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
      {/* Floating geometric shapes */}
      <div className="absolute top-6 left-12 w-6 h-6 bg-pink-200 transform rotate-45 opacity-70"></div>
      <div className="absolute top-4 right-16 w-4 h-8 bg-pink-300 transform skew-y-12 opacity-60"></div>
      <div className="absolute top-8 left-1/3 w-3 h-3 bg-pink-400 rounded-full opacity-80"></div>
      
      {/* Crystal formations */}
      <div className="absolute bottom-0 left-6">
        <div className="relative">
          <div className="w-0 h-0 border-l-6 border-r-6 border-b-20 border-l-transparent border-r-transparent border-b-pink-400"></div>
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-12 border-l-transparent border-r-transparent border-b-pink-300 absolute top-8 left-1/2 transform -translate-x-1/2"></div>
          <div className="w-0 h-0 border-l-2 border-r-2 border-b-6 border-l-transparent border-r-transparent border-b-pink-200 absolute top-14 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-8">
        <div className="relative">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-24 border-l-transparent border-r-transparent border-b-pink-500"></div>
          <div className="w-0 h-0 border-l-5 border-r-5 border-b-15 border-l-transparent border-r-transparent border-b-pink-400 absolute top-9 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <div className="w-0 h-0 border-l-5 border-r-5 border-b-18 border-l-transparent border-r-transparent border-b-pink-350"></div>
          <div className="w-0 h-0 border-l-3 border-r-3 border-b-10 border-l-transparent border-r-transparent border-b-pink-250 absolute top-8 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
      
      {/* Angular geometric platforms */}
      <div className="absolute bottom-4 left-20 w-12 h-2 bg-pink-300 transform skew-x-12"></div>
      <div className="absolute bottom-6 right-24 w-8 h-3 bg-pink-400 transform -skew-x-6"></div>
      <div className="absolute bottom-8 left-1/3 w-6 h-1 bg-pink-200 transform skew-x-24"></div>
      
      {/* Floating diamonds */}
      <div className="absolute top-12 right-12 w-3 h-3 bg-pink-300 transform rotate-45 opacity-70"></div>
      <div className="absolute top-16 left-24 w-2 h-2 bg-pink-400 transform rotate-45 opacity-60"></div>
      <div className="absolute top-20 right-1/3 w-4 h-4 bg-pink-200 transform rotate-45 opacity-50"></div>
      
      {/* Geometric ground elements */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400"></div>
      <div className="absolute bottom-2 left-4 w-4 h-1 bg-pink-300 transform skew-x-45"></div>
      <div className="absolute bottom-2 right-6 w-3 h-1 bg-pink-350 transform -skew-x-30"></div>
    </div>
  );
};

export default Landscape4;