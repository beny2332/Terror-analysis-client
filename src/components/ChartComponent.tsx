import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, PointElement, LineElement, ArcElement } from 'chart.js';
import { generateColors } from '../utils/chartColors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, PointElement, LineElement, ArcElement);

let delayed = false;

interface ChartComponentProps {
  type: 'bar' | 'line' | 'pie';
  data: any;
  options?: any;
}


const ChartComponent: React.FC<ChartComponentProps> = ({ type, data, options }) => {
  interface Dataset {
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
    borderRadius?: number;
  }

  interface Data {
    labels: string[];
    datasets: Dataset[];
  }

  const dataWithColors: Data = {
    ...data,
    datasets: data.datasets.map((dataset: Dataset) => {
      const colors = generateColors(dataset.data.length);
      return {
        ...dataset,
        backgroundColor: colors.map(c => c.backgroundColor),
        borderColor: colors.map(c => c.borderColor),
        borderWidth: 2,
        borderRadius: 8,
      };
    })
  };

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context: any) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    ...options
  };

  const chartStyle = {
    width: '80vw',
    height: '60vh'
  };
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={dataWithColors} options={defaultOptions} />;
      case 'line':
        return <Line data={data} options={defaultOptions} />;
      case 'pie':
        return <Pie data={data} options={defaultOptions} />;
      default:
        return null;
    }
  };

  return <div style={chartStyle}>{renderChart()}</div>;
};

export default ChartComponent;


