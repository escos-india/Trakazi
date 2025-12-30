import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false, className = "", icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-gray-200 rounded-lg mb-2 overflow-hidden bg-white shadow-sm ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2 font-semibold text-slate-700">
          {icon}
          <span>{title}</span>
        </div>
        {isOpen ? <ChevronDown size={18} className="text-gray-500" /> : <ChevronRight size={18} className="text-gray-500" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-100 bg-white animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

interface NestedAccordionProps {
    title: string;
    children: React.ReactNode;
}

export const NestedAccordion: React.FC<NestedAccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="ml-2 mb-1 border-l-2 border-gray-100 pl-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-accent transition-colors py-1"
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          {title}
        </button>
        {isOpen && <div className="mt-1 ml-4">{children}</div>}
      </div>
    );
  };