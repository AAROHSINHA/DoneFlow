import React from "react";
import Snowfall from "react-snowfall";

interface Prop {
  show?: boolean
}

export default function Landscape({show}: Prop) {
  const snow = (show) ? true : false
  return (
    <div className="relative w-full bg-white" style={{ paddingBottom: "35%" }}>
      {/* Snowfall sits above the background */}
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


      {/* Landscape SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 350"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Farthest Mountains (Pink-100) */}
        <path
          d="M0 350 L0 250 C100 200, 200 280, 300 220 C400 180, 500 260, 600 200 C700 150, 800 230, 900 180 C950 150, 1000 200, 1000 250 L1000 350 Z"
          fill="#FCE7F3"
        />
        {/* Mid-Farthest Mountains (Pink-200) */}
        <path
          d="M0 350 L0 280 C120 230, 250 300, 380 240 C510 190, 640 270, 770 210 C850 180, 1000 240, 1000 280 L1000 350 Z"
          fill="#FBCFE8"
        />
        {/* Middle Mountains (Pink-300) */}
        <path
          d="M0 350 L0 300 C150 250, 300 320, 450 260 C600 210, 750 290, 900 230 C950 200, 1000 260, 1000 300 L1000 350 Z"
          fill="#F9A8D4"
        />
        {/* Mid-Closest Mountains (Pink-400) */}
        <path
          d="M0 350 L0 320 C180 270, 360 340, 540 280 C720 230, 880 310, 1000 250 L1000 350 Z"
          fill="#F472B6"
        />
        {/* Closer Mountains (Pink-500) */}
        <path
          d="M0 350 L0 340 C200 290, 400 360, 600 300 C800 250, 1000 330, 1000 350 Z"
          fill="#EC4899"
        />
        {/* Closest Mountains (Pink-600) */}
        <path
          d="M0 350 L0 350 C250 300, 500 370, 750 310 C900 280, 1000 340, 1000 350 Z"
          fill="#DB2777"
        />
      </svg>
    </div>
  );
}
