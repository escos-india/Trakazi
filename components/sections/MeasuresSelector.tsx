import React, { useState, useMemo } from 'react';
import { TEST_INFO, ARENA_MEASURES, ROI_MEASURES, BEHAVIOURS } from '../../constants';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';

interface MeasureItem {
  id: string;
  label: string;
  category: string;
  displayLabel: string;
}

// Flatten and normalize all data into a single searchable list
const ALL_ITEMS: MeasureItem[] = [
  ...TEST_INFO.map((m, i) => ({ 
    id: `test-${i}`, 
    label: m, 
    displayLabel: m, 
    category: 'Test Information' 
  })),
  ...ARENA_MEASURES.map((m, i) => ({ 
    id: `arena-${i}`, 
    label: m, 
    displayLabel: m, 
    category: 'Arena Measures' 
  })),
  ...ROI_MEASURES.map((m, i) => ({ 
    id: `roi-${i}`, 
    label: m, 
    displayLabel: m, 
    category: 'ROI Measures' 
  })),
  ...BEHAVIOURS.flatMap((b, i) => 
    b.measures.map((m, j) => ({ 
      id: `beh-${i}-${j}`, 
      label: m, 
      displayLabel: `${b.name}: ${m}`, 
      category: 'Behaviour Measures' 
    }))
  )
];

const CATEGORIES = ['All Categories', 'Test Information', 'Arena Measures', 'ROI Measures', 'Behaviour Measures'];

export const MeasuresSelector: React.FC = () => {
  // Main selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Temporary selection states (highlighting items in the lists)
  const [tempSelectedLeft, setTempSelectedLeft] = useState<Set<string>>(new Set());
  const [tempSelectedRight, setTempSelectedRight] = useState<Set<string>>(new Set());
  
  // Filters
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter available items based on dropdown, search, and exclude already selected items
  const availableItems = useMemo(() => {
    return ALL_ITEMS.filter(item => {
      const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
      const matchesSearch = item.displayLabel.toLowerCase().includes(searchTerm.toLowerCase());
      const notSelected = !selectedIds.has(item.id);
      return matchesCategory && matchesSearch && notSelected;
    });
  }, [categoryFilter, searchTerm, selectedIds]);

  // Get list of currently selected items
  const selectedItemsList = useMemo(() => {
    return ALL_ITEMS.filter(item => selectedIds.has(item.id));
  }, [selectedIds]);

  // Move items from Available to Selected
  const handleAdd = () => {
    const newSelected = new Set(selectedIds);
    tempSelectedLeft.forEach(id => newSelected.add(id));
    setSelectedIds(newSelected);
    setTempSelectedLeft(new Set()); // Clear highlights
  };

  // Move items from Selected back to Available
  const handleRemove = () => {
    const newSelected = new Set(selectedIds);
    tempSelectedRight.forEach(id => newSelected.delete(id));
    setSelectedIds(newSelected);
    setTempSelectedRight(new Set()); // Clear highlights
  };

  const toggleLeft = (id: string) => {
    const newSet = new Set(tempSelectedLeft);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setTempSelectedLeft(newSet);
  };

  const toggleRight = (id: string) => {
    const newSet = new Set(tempSelectedRight);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setTempSelectedRight(newSet);
  };

  return (
    <div className="bg-[#f0f0f0] p-4 rounded border border-[#d4d4d4] text-sm font-sans">
      <div className="flex flex-col md:flex-row gap-4 h-[450px]">
        
        {/* LEFT PANEL: Available Items */}
        <div className="flex-1 flex flex-col bg-white border border-[#8b8b8b] shadow-sm">
          <div className="p-3 bg-gray-50 border-b border-gray-200 space-y-3">
            <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Authority (Category)</label>
                <select 
                className="w-full text-sm border-gray-300 rounded-sm py-1 px-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-slate-900"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                >
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-white text-slate-900">{c}</option>)}
                </select>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-7 pr-2 py-1 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-slate-900 placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-1.5 text-gray-400" size={14} />
            </div>
            
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-2">Available Measures</div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white p-0.5">
             {availableItems.map(item => (
                <div 
                  key={item.id}
                  onClick={() => toggleLeft(item.id)}
                  className={`px-3 py-1 cursor-pointer flex items-center gap-2 select-none border-b border-transparent ${
                    tempSelectedLeft.has(item.id) 
                        ? 'bg-[#cce8ff] border-[#99d1ff] text-black' 
                        : 'hover:bg-gray-50 text-gray-800'
                  }`}
                >
                   <span className="truncate">{item.displayLabel}</span>
                </div>
             ))}
             {availableItems.length === 0 && (
                 <div className="p-4 text-center text-gray-400 italic">No measures found</div>
             )}
          </div>
        </div>

        {/* MIDDLE: Controls */}
        <div className="flex md:flex-col justify-center items-center gap-2 px-1">
            <button 
                onClick={handleAdd}
                disabled={tempSelectedLeft.size === 0}
                className="w-20 md:w-10 h-8 md:h-auto py-1 bg-gray-100 border border-gray-400 rounded-sm shadow-sm hover:bg-[#e1f0ff] active:bg-[#cce8ff] disabled:opacity-50 disabled:cursor-default transition-colors flex items-center justify-center text-gray-700"
                title="Add to List"
            >
                <span className="hidden md:block text-xs mb-1">Add</span>
                <ChevronRight className="hidden md:block" size={16} />
                <div className="md:hidden rotate-90"><ChevronRight size={16} /></div>
            </button>
            <button 
                onClick={handleRemove}
                disabled={tempSelectedRight.size === 0}
                className="w-20 md:w-10 h-8 md:h-auto py-1 bg-gray-100 border border-gray-400 rounded-sm shadow-sm hover:bg-[#e1f0ff] active:bg-[#cce8ff] disabled:opacity-50 disabled:cursor-default transition-colors flex items-center justify-center text-gray-700"
                 title="Remove from List"
            >
                <ChevronLeft className="hidden md:block" size={16} />
                <div className="md:hidden rotate-90"><ChevronLeft size={16} /></div>
                <span className="hidden md:block text-xs mt-1">Del</span>
            </button>
        </div>

        {/* RIGHT PANEL: Selected Items */}
        <div className="flex-1 flex flex-col bg-white border border-[#8b8b8b] shadow-sm">
           <div className="p-3 bg-gray-50 border-b border-gray-200">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Selected List</label>
              <div className="text-xs text-gray-400">Items to be included in report</div>
           </div>
           
           <div className="flex-1 overflow-y-auto bg-white p-0.5">
             {selectedItemsList.map(item => (
                <div 
                  key={item.id}
                  onClick={() => toggleRight(item.id)}
                  className={`px-3 py-1 cursor-pointer flex items-center justify-between select-none border-b border-transparent ${
                    tempSelectedRight.has(item.id) 
                        ? 'bg-[#cce8ff] border-[#99d1ff] text-black' 
                        : 'hover:bg-gray-50 text-gray-800'
                  }`}
                >
                   <span className="truncate">{item.displayLabel}</span>
                   <span className="text-[10px] text-gray-400 ml-2">{item.category.split(' ')[0]}</span>
                </div>
             ))}
             {selectedItemsList.length === 0 && (
                <div className="p-4 text-center text-gray-400 italic">List is empty</div>
             )}
          </div>
          <div className="p-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-right">
            Total Selected: {selectedItemsList.length}
          </div>
        </div>

      </div>
    </div>
  );
};