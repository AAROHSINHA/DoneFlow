import Snowfall from "react-snowfall";

interface Prop {
  show?: boolean
}

export default function Landscape2({show}: Prop) {
  const snow = (show) ? true : false
  return (
    <div className="relative w-full bg-white" style={{ paddingBottom: "30%" }}>
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
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Farthest Peaks (Pink-100) */}
        <path
          d="M0 300 L0 180 L150 100 L300 200 L450 120 L600 220 L750 150 L900 250 L1000 180 L1000 300 Z"
          fill="#FCE7F3" // pink-100
        />
        {/* Mid Peaks (Pink-200) */}
        <path
          d="M0 300 L0 200 L100 120 L250 220 L400 140 L550 240 L700 170 L850 270 L1000 200 L1000 300 Z"
          fill="#FBCFE8" // pink-200
        />
        {/* Closer Peaks (Pink-300) */}
        <path
          d="M0 300 L0 220 L80 140 L200 240 L350 160 L500 260 L650 190 L800 290 L1000 220 L1000 300 Z"
          fill="#F9A8D4" // pink-300
        />
        {/* Closest Peaks (Pink-400) */}
        <path
          d="M0 300 L0 240 L60 160 L180 260 L300 180 L450 280 L600 210 L750 300 L1000 240 L1000 300 Z"
          fill="#F472B6" // pink-400
        />
      </svg>
    </div>
  )
}
