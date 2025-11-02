
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { EmotionResult } from '../types';

interface EmotionChartProps {
  data: EmotionResult[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const score = (payload[0].value * 100).toFixed(1);
    return (
      <div className="bg-slate-700 p-2 border border-slate-600 rounded-md shadow-lg">
        <p className="label text-slate-200">{`${label} : ${score}%`}</p>
      </div>
    );
  }

  return null;
};


const EmotionChart: React.FC<EmotionChartProps> = ({ data }) => {
  const chartData = data.filter(item => item.score > 0.01); // Filter out very low scores

  if (chartData.length === 0) {
    return <p className="text-center text-slate-400">No significant emotions detected.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
        layout="vertical"
      >
        <XAxis type="number" hide domain={[0, 1]} />
        <YAxis 
          dataKey="emotion" 
          type="category" 
          stroke="#94a3b8" 
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
        <Bar dataKey="score" barSize={20} radius={[0, 4, 4, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EmotionChart;
