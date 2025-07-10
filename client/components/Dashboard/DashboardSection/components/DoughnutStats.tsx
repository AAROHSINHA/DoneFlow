import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ["Tasks Completed", "Tasks in progress", "Tasks Remaining"]

interface DoughnutStatsProps {
    data: number[]
}

const DoughnutStats = ({data} : DoughnutStatsProps) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'My Dataset',
                data,
                backgroundColor: [
                'rgba(244, 114, 182, 0.6)',  // pink-400
                'rgba(59, 130, 246, 0.6)',   // blue-500
                'rgba(34, 197, 94, 0.6)',    // green-500 
                ],
                borderWidth: 1
            },
        ],
    };

      const options = {
            responsive: true,
            plugins: {
            legend: {
                position: 'bottom' as const,
            },
            tooltip: {
                enabled: true,
            },
            },
    };


    
    return <Doughnut data={chartData} options={options} />;
}

export default DoughnutStats;