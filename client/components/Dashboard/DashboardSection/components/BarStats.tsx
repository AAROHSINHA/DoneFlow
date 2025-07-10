import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarStatsProps {
  userFocus: number[];
  targetFocus: number[];
}

const focusComparisonLabels = [
  "Average Focus Time (min)",
  "Longest Focus Session (min)",
  "Focus Consistency (%)"
];

const BarStats = ({ userFocus, targetFocus }: BarStatsProps) => {
  const chartData = useMemo(() => ({
    labels: focusComparisonLabels,
    datasets: [
      {
        label: "Target",
        data: targetFocus,
        backgroundColor: "rgba(229, 231, 235, 1)", // light gray
        borderRadius: 4,
      },
      {
        label: "You",
        data: userFocus,
        backgroundColor: "rgba(244, 114, 182, 0.8)", // pink-400
        borderRadius: 4,
      }
    ]
  }), [userFocus, targetFocus]);

  const chartOptions = {
    responsive: true,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
      }
    },
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarStats;
