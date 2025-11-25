import React from 'react';
import { NutritionData } from '../types';
import MacroChart from './MacroChart';
import { Activity, Droplet, Zap, Heart } from 'lucide-react';

interface NutritionDisplayProps {
  data: NutritionData;
}

const NutritionDisplay: React.FC<NutritionDisplayProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 capitalize mb-1">{data.foodName}</h2>
            <p className="text-slate-500 text-sm font-medium bg-slate-100 inline-block px-3 py-1 rounded-full">
              Serving Size: {data.servingSize}
            </p>
          </div>
          <div className="text-right md:text-right">
            <div className="text-5xl font-extrabold text-emerald-600 tracking-tight">
              {Math.round(data.calories)}
            </div>
            <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider mt-1">Calories</div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-100">
           <p className="text-slate-600 leading-relaxed italic">
             "{data.briefSummary}"
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Macro Chart Section */}
        <div className="md:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            Macronutrients
          </h3>
          <MacroChart data={data} />
          <div className="text-center text-xs text-slate-400 mt-2">Distribution by weight (g)</div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard 
            label="Protein" 
            value={data.protein} 
            unit="g" 
            color="text-emerald-600" 
            bgColor="bg-emerald-50"
            icon={<Zap className="w-5 h-5" />}
          />
          <StatCard 
            label="Carbohydrates" 
            value={data.carbohydrates} 
            unit="g" 
            color="text-blue-600" 
            bgColor="bg-blue-50"
            icon={<Zap className="w-5 h-5" />}
          />
          <StatCard 
            label="Total Fat" 
            value={data.fat} 
            unit="g" 
            color="text-amber-600" 
            bgColor="bg-amber-50"
            icon={<Droplet className="w-5 h-5" />}
          />
          <StatCard 
            label="Fiber" 
            value={data.fiber} 
            unit="g" 
            color="text-indigo-600" 
            bgColor="bg-indigo-50"
            icon={<Heart className="w-5 h-5" />}
          />
          <StatCard 
            label="Sugars" 
            value={data.sugar} 
            unit="g" 
            color="text-rose-600" 
            bgColor="bg-rose-50"
            icon={<Droplet className="w-5 h-5" />}
          />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  unit: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, color, bgColor, icon }) => (
  <div className={`p-5 rounded-xl border border-slate-100 flex items-center justify-between transition-all hover:shadow-md bg-white`}>
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
        <span className="text-slate-400 text-sm">{unit}</span>
      </div>
    </div>
    <div className={`p-3 rounded-full ${bgColor} ${color}`}>
      {icon}
    </div>
  </div>
);

export default NutritionDisplay;
