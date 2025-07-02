import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface deadlineProp {
    month: String,
    date: number
}

const DeadLine:React.FC<deadlineProp> = ({month, date}) => {
    const [daysLeft, setDaysLeft] = useState(0);
    useEffect(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const todaysFullDate = new Date();
        const todaysDate = todaysFullDate.getDate();
        let todaysMonth = todaysFullDate.getMonth();
        let daysRemaining = date - todaysDate;
        const deadLineMonth = months.findIndex(monthName => monthName === month);
        
        if(deadLineMonth > todaysMonth){
            const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            while(deadLineMonth - todaysMonth > 0){
                daysRemaining += daysInMonths[todaysMonth++];
            }
        }

        setDaysLeft(daysRemaining);

    }, [])
    return (
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-xs font-medium">Due {month} {date.toString()}</span>
          </div>
          <span className="text-white font-semibold text-sm">{daysLeft.toString()} days left</span>
        </div>
    )
}

export default DeadLine;
