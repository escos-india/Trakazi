export type MeasureCategory = 'Test Information' | 'Arena Measures' | 'ROI Measures' | 'Behaviour Measures';

export interface BehaviourSubCategory {
  name: string;
  measures: string[];
}

export interface SectionProps {
  isActive: boolean;
}

export type GraphType = 'Line' | 'Bar/Column' | 'Scattered Graph';
export type ParametricTest = 'None' | 'Bonferroni Test' | 'Duncan’s Test' | 'Fisher’s LSD Test' | 'Scheffe’s Test' | 'Sidak Test' | 'Student-Neuman-Keules Test' | 'Tukey Test';
export type NonParametricTest = 'None' | 'Appropriate test to data';
