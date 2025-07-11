import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarStatsProps {
  userFocus: number[];
  targetFocus: number[];
}

const focusComparisonLabels = [
  "Avg Focus",
  "Max Focus",
  "Focus (%)",
];

const BarStats = ({ userFocus, targetFocus }: BarStatsProps) => {
  const chartData = useMemo(
    () => ({
      labels: focusComparisonLabels,
      datasets: [
        {
          label: "Target",
          data: targetFocus,
          backgroundColor: "rgba(229, 231, 235, 1)", // light gray
          borderRadius: 6,
          barThickness: 24,
        },
        {
          label: "You",
          data: userFocus,
          backgroundColor: "rgba(244, 114, 182, 0.8)", // pink
          borderRadius: 6,
          barThickness: 24,
        },
      ],
    }),
    [userFocus, targetFocus]
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x" as const,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 12,
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        padding: 8,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          borderDash: [4],
          drawTicks: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-2">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarStats;
