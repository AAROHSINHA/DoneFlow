import { Clock } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface TimerInterface {
  timerTime: string;
  setTimerTime: React.Dispatch<React.SetStateAction<string>>;
  reload: boolean
}

const Timer: React.FC<TimerInterface> = ({ timerTime, setTimerTime, reload }) => {
  const [hours, setHours] = useState<string>("");   // initially empty
  const [minutes, setMinutes] = useState<string>("");
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if(ref1.current) ref1.current.value = "";
      if(ref2.current) ref2.current.value = "";
    }, [reload])

  useEffect(() => {
    const finalHours = hours === "" ? "00" : hours.padStart(2, "0");
    const finalMinutes = minutes === "" ? "00" : minutes.padStart(2, "0");
    setTimerTime(`${finalHours}:${finalMinutes}`);
  }, [hours, minutes]);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 flex items-center">
        <Clock size={16} className="mr-2 text-gray-500" />
        Timer Duration
      </label>

      <div className="flex gap-3">
        <input
          ref={ref1}
          type="number"
          min={0}
          max={23}
          placeholder="HH"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all placeholder-gray-400"
        />
        <input
          ref={ref2}
          type="number"
          min={0}
          max={59}
          placeholder="MM"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default Timer;
