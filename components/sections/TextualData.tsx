import React, { useState } from 'react';
import { MeasuresSelector } from './MeasuresSelector';
import { Accordion } from '../ui/Accordion';
import { DATA_CATEGORIZATION, REPORT_FORMAT_OPTS } from '../../constants';
import { Checkbox } from '../ui/Checkbox';
import { FileText, List, SlidersHorizontal } from 'lucide-react';

export const TextualData: React.FC = () => {
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
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <FileText size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-800">Textual Data Configuration</h2>
                <p className="text-sm text-slate-500">Configure parameters for textual result generation.</p>
            </div>
        </div>

        <div className="space-y-6">
            <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">a. Results Selection</h3>
                <MeasuresSelector />
            </section>

            <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">b. Report Options</h3>
                <Accordion title="Data Categorization" icon={<List size={16}/>} defaultOpen>
                    <div className="space-y-4">
                        {[1, 2, 3].map((level) => (
                            <div key={level} className="p-3 bg-gray-50 rounded border border-gray-100">
                                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
                                    Categorization Level {level}
                                </label>
                                <div className="relative">
                                    <select className="w-full p-2.5 text-sm text-slate-900 bg-white border border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none">
                                        <option value="" className="text-gray-500">Select Category...</option>
                                        {DATA_CATEGORIZATION.map((opt, i) => (
                                            <option key={i} value={opt} className="text-slate-900">{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </Accordion>

                <Accordion title="Reporting Format" icon={<SlidersHorizontal size={16}/>}>
                     <div className="p-1">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Include in Report:</label>
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
                </Accordion>
            </section>
        </div>
      </div>
    </div>
  );
};