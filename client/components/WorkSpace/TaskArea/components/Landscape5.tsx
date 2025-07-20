import Snowfall from "react-snowfall";

interface Prop {
  show?: boolean
}

const Landscape5 = ({show}: Prop) => {
  const snow = (show) ? true : false
  return (
    <div className="w-full h-40 relative overflow-hidden bg-gradient-to-t from-pink-200 to-pink-50 rounded-lg">
      {snow && <Snowfall 
            snowflakeCount={10}
            color="#F472B6" 
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 10
            }}
          />}
      {/* Sky elements */}
      <div className="absolute top-6 right-12 w-8 h-8 bg-pink-100 rounded-full opacity-60"></div>
      <div className="absolute top-8 left-16 w-2 h-2 bg-pink-200 rounded-full opacity-40"></div>
      
      {/* Tall building on left */}
      <div className="absolute bottom-0 left-4 w-8 h-32 bg-pink-400">
        {/* Windows */}
        <div className="absolute top-2 left-1 w-1 h-1 bg-pink-100"></div>
        <div className="absolute top-2 right-1 w-1 h-1 bg-pink-100"></div>
        <div className="absolute top-6 left-1 w-1 h-1 bg-pink-100"></div>
        <div className="absolute top-6 right-1 w-1 h-1 bg-pink-100"></div>
        <div className="absolute top-10 left-1 w-1 h-1 bg-pink-100"></div>
        <div className="absolute top-10 right-1 w-1 h-1 bg-pink-100"></div>
        <div className="absolute top-14 left-1 w-1 h-1 bg-pink-100"></div>
        <div className="absolute top-14 right-1 w-1 h-1 bg-pink-100"></div>
      </div>
      
      {/* Medium building */}
      <div className="absolute bottom-0 left-16 w-10 h-20 bg-pink-300">
        <div className="absolute top-2 left-2 w-1 h-1 bg-pink-50"></div>
        <div className="absolute top-2 right-2 w-1 h-1 bg-pink-50"></div>
        <div className="absolute top-6 left-2 w-1 h-1 bg-pink-50"></div>
        <div className="absolute top-6 right-2 w-1 h-1 bg-pink-50"></div>
        <div className="absolute top-10 left-2 w-1 h-1 bg-pink-50"></div>
        <div className="absolute top-10 right-2 w-1 h-1 bg-pink-50"></div>
      </div>
      
      {/* Short wide building */}
      <div className="absolute bottom-0 left-30 w-12 h-12 bg-pink-500">
        <div className="absolute top-2 left-2 w-2 h-1 bg-pink-100"></div>
        <div className="absolute top-2 right-2 w-2 h-1 bg-pink-100"></div>
        <div className="absolute top-6 left-2 w-2 h-1 bg-pink-100"></div>
        <div className="absolute top-6 right-2 w-2 h-1 bg-pink-100"></div>
      </div>
      
      {/* Triangular roof building */}
      <div className="absolute bottom-0 right-20">
        <div className="w-6 h-16 bg-pink-400"></div>
        <div className="w-0 h-0 border-l-3 border-r-3 border-b-4 border-l-transparent border-r-transparent border-b-pink-300 absolute -top-4 left-0"></div>
        <div className="absolute top-2 left-1 w-1 h-1 bg-pink-100"></div>
        <div className="absolute top-2 right-1 w-1 h-1 bg-pink-100"></div>
        <div className="absolute top-6 left-1 w-1 h-1 bg-pink-100"></div>
        <div className="absolute top-6 right-1 w-1 h-1 bg-pink-100"></div>
      </div>
      
      {/* Tall thin building on right */}
      <div className="absolute bottom-0 right-8 w-4 h-28 bg-pink-350">
        <div className="absolute top-2 left-1 w-0.5 h-0.5 bg-pink-50"></div>
        <div className="absolute top-2 right-1 w-0.5 h-0.5 bg-pink-50"></div>
        <div className="absolute top-6 left-1 w-0.5 h-0.5 bg-pink-50"></div>
        <div className="absolute top-6 right-1 w-0.5 h-0.5 bg-pink-50"></div>
        <div className="absolute top-10 left-1 w-0.5 h-0.5 bg-pink-50"></div>
        <div className="absolute top-10 right-1 w-0.5 h-0.5 bg-pink-50"></div>
        <div className="absolute top-14 left-1 w-0.5 h-0.5 bg-pink-50"></div>
        <div className="absolute top-14 right-1 w-0.5 h-0.5 bg-pink-50"></div>
      </div>
      
      {/* Small house */}
      <div className="absolute bottom-0 right-32">
        <div className="w-8 h-8 bg-pink-300"></div>
        <div className="w-0 h-0 border-l-4 border-r-4 border-b-3 border-l-transparent border-r-transparent border-b-pink-400 absolute -top-3 left-0"></div>
        <div className="absolute top-2 left-2 w-1 h-1 bg-pink-100"></div>
        <div className="absolute top-2 right-2 w-1 h-1 bg-pink-100"></div>
      </div>
      
      {/* Ground/street */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-pink-400"></div>
      
      {/* Street elements */}
      <div className="absolute bottom-1 left-12 w-1 h-2 bg-pink-300"></div>
      <div className="absolute bottom-1 right-16 w-1 h-2 bg-pink-300"></div>
      <div className="absolute bottom-1 left-1/2 w-1 h-2 bg-pink-300"></div>
    </div>
  );
};

export default Landscape5;