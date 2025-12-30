import React, { useState } from 'react';
import { MeasuresSelector } from './MeasuresSelector';
import { Accordion } from '../ui/Accordion';
import { DATA_CATEGORIZATION, GRAPH_TYPES } from '../../constants';
import { Checkbox } from '../ui/Checkbox';
import { PieChart, Settings2, FolderTree } from 'lucide-react';

export const GraphicalData: React.FC = () => {
  const [errorBars, setErrorBars] = useState({
    stdDev: false,
    stdErr: false
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <PieChart size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-800">Graphical Data Configuration</h2>
                <p className="text-sm text-slate-500">Setup visualization parameters and graph types.</p>
            </div>
        </div>

        <div className="space-y-6">
            <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">a. Results Consist Of</h3>
                <MeasuresSelector />
            </section>

            <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">b. Graph Options</h3>
                
                <Accordion title="Data Categorization" icon={<FolderTree size={16}/>} defaultOpen>
                     <div className="space-y-4">
                        {[1, 2, 3].map((level) => (
                            <div key={level} className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-600 uppercase">Level {level}</label>
                                <select className="w-full p-2.5 text-sm text-slate-900 bg-white border border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none">
                                    <option value="" className="text-gray-500">Select Variable...</option>
                                    {DATA_CATEGORIZATION.map((opt, i) => (
                                        <option key={i} value={opt} className="text-slate-900">{opt}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </Accordion>

                <Accordion title="Graph Format" icon={<Settings2 size={16}/>}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Type of Graph</label>
                            <div className="flex gap-6 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                {GRAPH_TYPES.map((type, i) => (
                                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="graphType" className="w-4 h-4 text-accent border-gray-300 focus:ring-accent" />
                                        <span className="text-sm font-medium text-slate-700">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100">
                             <label className="block text-sm font-bold text-slate-700 mb-2">Error Bars</label>
                             <div className="space-y-2">
                                <Checkbox 
                                  label="Graph means ± Standard Deviation" 
                                  checked={errorBars.stdDev}
                                  onChange={(c) => setErrorBars({...errorBars, stdDev: c})}
                                />
                                <Checkbox 
                                  label="Graph means ± Standard error" 
                                  checked={errorBars.stdErr}
                                  onChange={(c) => setErrorBars({...errorBars, stdErr: c})}
                                />
                             </div>
                        </div>
                    </div>
                </Accordion>
            </section>
        </div>
      </div>
    </div>
  );
};