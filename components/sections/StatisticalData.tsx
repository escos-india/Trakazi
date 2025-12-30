import React, { useState } from 'react';
import { MeasuresSelector } from './MeasuresSelector';
import { Accordion } from '../ui/Accordion';
import { DATA_CATEGORIZATION, PARAMETRIC_POST_HOC, NON_PARAMETRIC_POST_HOC, REPORT_FORMAT_OPTS } from '../../constants';
import { Checkbox } from '../ui/Checkbox';
import { Calculator, FlaskConical, ArrowRightLeft } from 'lucide-react';

export const StatisticalData: React.FC = () => {
  const [statTestType, setStatTestType] = useState<'parametric' | 'non-parametric'>('parametric');
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(new Set());

  const toggleFormat = (format: string, isChecked: boolean) => {
    const newFormats = new Set(selectedFormats);
    if (isChecked) {
      newFormats.add(format);
    } else {
      newFormats.delete(format);
    }
    setSelectedFormats(newFormats);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <Calculator size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-800">Statistical Analysis Configuration</h2>
                <p className="text-sm text-slate-500">Define variables and statistical tests.</p>
            </div>
        </div>

        <div className="space-y-6">
            <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">a. Dependent Variables (Results)</h3>
                <MeasuresSelector />
            </section>

            <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">b. Independent Variables</h3>
                <Accordion title="Variable Selection" icon={<FlaskConical size={16}/>} defaultOpen>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Primary Independent Variable</label>
                            <select className="w-full p-2.5 text-sm text-slate-900 bg-white border border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none">
                                <option value="" className="text-gray-500">Select Variable...</option>
                                {DATA_CATEGORIZATION.map((opt, i) => (
                                    <option key={i} value={opt} className="text-slate-900">{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Secondary Independent Variable (Optional)</label>
                            <select className="w-full p-2.5 text-sm text-slate-900 bg-white border border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none">
                                <option value="" className="text-gray-500">Select Variable...</option>
                                {DATA_CATEGORIZATION.map((opt, i) => (
                                    <option key={i} value={opt} className="text-slate-900">{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Accordion>
            </section>

            <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">c. Analysis Options</h3>
                <Accordion title="Statistical Test Settings" icon={<ArrowRightLeft size={16}/>} defaultOpen>
                    <div className="space-y-6">
                        
                        {/* Test Type Selection */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">Select Statistical Test Type</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto bg-white">
                                    <input 
                                        type="radio" 
                                        name="statType" 
                                        checked={statTestType === 'parametric'} 
                                        onChange={() => setStatTestType('parametric')}
                                        className="w-4 h-4 text-accent border-gray-300 focus:ring-accent" 
                                    />
                                    <span className="font-medium text-slate-700">Parametric</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto bg-white">
                                    <input 
                                        type="radio" 
                                        name="statType" 
                                        checked={statTestType === 'non-parametric'} 
                                        onChange={() => setStatTestType('non-parametric')}
                                        className="w-4 h-4 text-accent border-gray-300 focus:ring-accent" 
                                    />
                                    <span className="font-medium text-slate-700">Non-parametric</span>
                                </label>
                            </div>
                        </div>

                        {/* Dynamic Post-Hoc */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                             <label className="block text-sm font-bold text-slate-700 mb-2">
                                Post-hoc Test ({statTestType === 'parametric' ? 'Parametric' : 'Non-parametric'})
                             </label>
                             <select className="w-full md:w-1/2 p-2.5 text-sm text-slate-900 bg-white border border-gray-300 rounded-md focus:border-accent focus:ring-1 focus:ring-accent outline-none">
                                {(statTestType === 'parametric' ? PARAMETRIC_POST_HOC : NON_PARAMETRIC_POST_HOC).map((test, i) => (
                                    <option key={i} value={test} className="text-slate-900">{test}</option>
                                ))}
                             </select>
                        </div>

                        {/* Control Group */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Control Group Comparison</label>
                            <select className="w-full md:w-1/2 p-2.5 text-sm text-slate-900 bg-white border border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none">
                                <option value="" className="text-gray-500">Select Control Group (if applicable)...</option>
                                <option value="1" className="text-slate-900">Group 1</option>
                                <option value="2" className="text-slate-900">Group 2</option>
                            </select>
                        </div>

                         {/* Report Format */}
                         <div className="pt-4 border-t border-gray-200">
                             <label className="block text-sm font-bold text-slate-700 mb-3">Report Format Includes:</label>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {REPORT_FORMAT_OPTS.map((opt, i) => (
                                    <Checkbox 
                                      key={i} 
                                      label={opt} 
                                      checked={selectedFormats.has(opt)}
                                      onChange={(c) => toggleFormat(opt, c)}
                                    />
                                ))}
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