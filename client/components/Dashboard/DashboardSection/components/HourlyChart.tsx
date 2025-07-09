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
}
const labels = [
  "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM",
  "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
  "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
  "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
];


const HourlyChart = ({data}: HourlyChartProps) => {
    // first making the data to feed in the chart component
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Focus Time (mins)',
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
        ticks: {
          stepSize: 30,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />

}

export default HourlyChart;
