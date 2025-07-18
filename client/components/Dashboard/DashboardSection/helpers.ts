export const HOURS_IN_DAY = 24;
export const DAYS_IN_WEEK = 7;
export const HOURLY_FOCUS_PHASE_ARRAY_STEP = 3;

export const calculateCompletion = (tasksCompleted: number, netTotalTasks: number) => {
  const completion =
      netTotalTasks > 0
        ? Math.min(Math.round((tasksCompleted / netTotalTasks) * 100), 100)
        : 0;
    return completion;
}
export const calculateEfficiency = (timeSpend:number, totalTime: number) => {
  let efficiency = 0;
      if (totalTime > 0 && timeSpend > 0) {
        efficiency = Math.min(Math.round((timeSpend / totalTime) * 100), 100);
      }
    return efficiency;
} 
export const calculateOnTimeTaskCompletion = (onTimeCompletedTasks: number, tasksCompleted: number) => {
  const onTimeCompletion =
        tasksCompleted > 0
          ? Math.min(Math.round((onTimeCompletedTasks / tasksCompleted) * 100), 100)
          : 0;
  return onTimeCompletedTasks;
        }
export const hourlyFocus = (focusPerHour: number[]) => {
        const hourly = focusPerHour;
        const MINUTES_IN_HOUR = 60;
        let netFocus = 0;
        let hoursFocused = 0;
        for(let hour of hourly){
          if(hour > 0){
            netFocus += hour;
            hoursFocused += 1;
          }
        }

        hoursFocused*=MINUTES_IN_HOUR;
        if(hoursFocused > 0){
          return Math.min(Math.round((netFocus / hoursFocused) * 100), 100);
        }
        return 0;
  }
export const dailyFocusPercent = (focusLastWeek: number[]) => {
        const daily = focusLastWeek;
        let daysFocused = 0;

        for (let day of daily) {
          if (day > 0) {
            daysFocused += 1;
          }
        }

        const percent = daysFocused > 0 
          ? ((daysFocused * HOURS_IN_DAY) / (DAYS_IN_WEEK * HOURS_IN_DAY)) * 100 
          : 0;

        return Math.round(percent);
  };

export const averageFocusTime = (timeSpend: number, focusSession: number) => {
        const spendTime = timeSpend ?? 0;
        const focus_session = focusSession ?? 0;
        return (focusSession > 0) ? Number((spendTime/focus_session).toFixed(2)) : 0
}

export const productivePeriods = (focusPhase: number[]) => {
        const hourlyData = focusPhase;
        let maxIndex = -1;
        let minIndex = -1;
        let maxHours = 0;
        let minHours = HOURLY_FOCUS_PHASE_ARRAY_STEP;
        for(let i = 0; i < hourlyData.length; i++){
          const hours = hourlyData[i];
          if(hours >= maxHours){
            maxIndex = i;
            maxHours = hours;
          }
          if(hours <= minHours){
            minIndex = hours;
            minHours = hours;
          }
        }
        return {minIndex, maxIndex};
      }

export interface ProductivityStats {
  focusPercentage: number;
  efficiencyRatio: number;
  focusTier: string;
}

export function calculateProductivityStats(data: {[key: string]: number}): ProductivityStats {
  const effortScore = Math.min(data.timeSpend / data.totalTime, 1) * 100;
  const outputScore = (data.tasksCompleted / data.totalTasks) * 100;
  const efficiencyRatio = data.timeSpend > 0 
    ? (data.onTimeCompletedTasks / data.timeSpend) 
    : 0;
  const efficiencyBonus = Math.min(efficiencyRatio * 100, 100);

  const productivityPercentage = (
    0.4 * effortScore +
    0.4 * outputScore +
    0.2 * efficiencyBonus
  );

  const roundedProductivity = Math.round(productivityPercentage);

  const tierScore = efficiencyRatio * productivityPercentage * 100;

  let focusTier = "Good Focus";
  if (tierScore < 1500) focusTier = "Bad Focus";
  else if (tierScore > 4500) focusTier = "Excellent Focus";

  return {
    focusPercentage: roundedProductivity,
    efficiencyRatio,
    focusTier,
  };
}

