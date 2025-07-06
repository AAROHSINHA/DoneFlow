import { Calendar } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface DeadlineInterface {
  deadline: string;
  setDeadline: React.Dispatch<React.SetStateAction<string>>;
  reload: boolean
}

const Deadline: React.FC<DeadlineInterface> = ({ deadline, setDeadline, reload }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 1-indexed
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>(String(currentMonth).padStart(2, "0"));
  const [year, setYear] = useState<string>(String(currentYear));
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if(ref1.current) ref1.current.value = "";
      if(ref2.current) ref2.current.value = "";
    }, [reload])

  useEffect(() => {
    if (!day || !month || !year) {
      setDeadline(""); // incomplete date
    } else {
      setDeadline(`${year}-${month}-${day.padStart(2, "0")}`);
    }
  }, [day, month, year]);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 flex items-center">
        <Calendar size={16} className="mr-2 text-gray-500" />
        Deadline
      </label>
      <div className="flex gap-2">
        {/* Day input */}
        <input
          ref={ref1}
          type="number"
          min={1}
          max={31}
          placeholder="DD"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="w-1/3 px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        {/* Month select */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-1/3 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          {[...Array(12)].map((_, i) => {
            const val = String(i + 1).padStart(2, "0");
            return (
              <option key={val} value={val}>
                {val}
              </option>
            );
          })}
        </select>
        {/* Year input */}
        <input
          ref={ref2}
          type="number"
          placeholder="YYYY"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-1/3 px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
    </div>
  );
};

export default Deadline;
