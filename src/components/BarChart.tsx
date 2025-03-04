import React from 'react';
import { Bar } from 'recharts';
import { BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  // Transformação dos dados para o formato esperado pelo Recharts
  const transformedData = data.labels.map((label, index) => {
    const dataPoint: Record<string, string | number> = { name: label };
    data.datasets.forEach((dataset) => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    return dataPoint;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={transformedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {data.datasets.map((dataset, index) => (
          <Bar
            key={index}
            dataKey={dataset.label}
            fill={dataset.backgroundColor}
            stroke={dataset.borderColor}
            strokeWidth={dataset.borderWidth}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart; 