
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
  } | { label: string; value: number }[];
  height?: number;
  title?: string;
  description?: string;
  formatValue?: (value: number) => string;
}

const BarChart: React.FC<BarChartProps> = ({ data, height = 300, title, description, formatValue }) => {
  // Check if data is in the simplified format (array of {label, value})
  const isSimplifiedFormat = Array.isArray(data) && data.length > 0 && 'label' in data[0] && 'value' in data[0];
  
  // Transform simplified format to the expected format by Recharts
  const transformedData = isSimplifiedFormat
    ? (data as { label: string; value: number }[]).map(item => ({
        name: item.label,
        value: item.value
      }))
    : (data as { labels: string[]; datasets: any[] }).labels.map((label, index) => {
        const dataPoint: Record<string, string | number> = { name: label };
        (data as { labels: string[]; datasets: any[] }).datasets.forEach((dataset) => {
          dataPoint[dataset.label] = dataset.data[index];
        });
        return dataPoint;
      });

  // Determine which keys to use for the Bar components
  const dataKeys = isSimplifiedFormat 
    ? ['value'] 
    : (data as { labels: string[]; datasets: any[] }).datasets.map(dataset => dataset.label);

  // Get colors from the dataset if available
  const getBarColor = (index: number) => {
    if (isSimplifiedFormat) {
      // Use default colors for simplified format
      const defaultColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];
      return defaultColors[index % defaultColors.length];
    } else {
      return (data as { labels: string[]; datasets: any[] }).datasets[index].backgroundColor;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={height || 300}>
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
        <YAxis tickFormatter={formatValue} />
        <Tooltip formatter={formatValue ? formatValue : (value) => value} />
        {dataKeys.map((key, index) => (
          <Bar
            key={index}
            dataKey={key}
            fill={getBarColor(index)}
            stroke={isSimplifiedFormat ? undefined : (data as { labels: string[]; datasets: any[] }).datasets[index].borderColor}
            strokeWidth={isSimplifiedFormat ? 1 : (data as { labels: string[]; datasets: any[] }).datasets[index].borderWidth}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
