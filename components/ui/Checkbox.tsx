import React from 'react';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group py-1.5">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange && onChange(e.target.checked)}
        />
        <div className="h-5 w-5 rounded border-2 border-slate-300 bg-white ring-offset-2 peer-checked:border-accent peer-checked:bg-accent peer-focus:ring-2 peer-focus:ring-accent/50 transition-all shadow-sm">
            <svg className="h-3.5 w-3.5 text-white hidden peer-checked:block pointer-events-none absolute top-0.5 left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </div>
      </div>
      <span className="text-sm text-slate-700 font-medium group-hover:text-slate-900 select-none">{label}</span>
    </label>
  );
};