import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


interface HourlyChartProps {
    data: number[];
    labels: string[];
    label: string
}
 

const HourlyChart = ({data, labels, label}: HourlyChartProps) => {
    // first making the data to feed in the chart component
    const chartData = {
        labels,
        datasets: [
            {
                label: label,
                data,
                backgroundColor: 'rgba(244, 114, 182, 0.6)', // Tailwind blue-500 at 50%
                borderRadius: 4,
            },
        ],
    };
    const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: (label == 'Today' ? 60 : 24*60),
        ticks: {
          stepSize: 30,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />

}

export default HourlyChart;
