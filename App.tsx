import React, { useState } from 'react';
import { Utensils, AlertCircle } from 'lucide-react';
import SearchInput from './components/SearchInput';
import NutritionDisplay from './components/NutritionDisplay';
import { analyzeFood } from './services/geminiService';
import { NutritionData } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<NutritionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await analyzeFood(query);
      setData(result);
    } catch (err) {
      setError("Unable to analyze food. Please try a different query or check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Navbar / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 bg-opacity-80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400">
              NutriScan
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Hero / Search Section */}
        <div className={`transition-all duration-500 ease-in-out ${data ? 'mb-12' : 'min-h-[60vh] flex flex-col justify-center items-center text-center'}`}>
          {!data && (
            <div className="mb-8 space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                Know what you eat in <span className="text-emerald-500">seconds</span>.
              </h1>
              <p className="text-lg text-slate-600">
                Get instant calorie counts and macro breakdowns for any food or meal using advanced AI.
              </p>
            </div>
          )}
          
          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 animate-fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Results Section */}
        {data && !isLoading && (
          <div className="animate-fade-in-up">
            <NutritionDisplay data={data} />
          </div>
        )}
        
        {/* Empty State / Loading Placeholder could go here if needed, but handled by conditionals above */}

      </main>
      
      {/* Footer */}
      {!data && !isLoading && (
        <footer className="fixed bottom-6 w-full text-center text-slate-400 text-sm">
          <p>Powered by Gemini 2.5 Flash</p>
        </footer>
      )}
    </div>
  );
};

export default App;
