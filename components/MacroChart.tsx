import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { NutritionData, ChartDataPoint } from '../types';

interface MacroChartProps {
  data: NutritionData;
}

const MacroChart: React.FC<MacroChartProps> = ({ data }) => {
  const chartData: ChartDataPoint[] = [
    { name: 'Protein', value: data.protein, fill: '#10b981' }, // Emerald-500
    { name: 'Carbs', value: data.carbohydrates, fill: '#3b82f6' }, // Blue-500
    { name: 'Fat', value: data.fat, fill: '#f59e0b' }, // Amber-500
  ];

  // Filter out zero values to avoid empty segments or label clutter
  const activeData = chartData.filter(d => d.value > 0);

  if (activeData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
        No macro data available
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={activeData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {activeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value}g`}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MacroChart;
