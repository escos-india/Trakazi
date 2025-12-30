import React, { useState } from 'react';
import { TextualData } from './components/sections/TextualData';
import { GraphicalData } from './components/sections/GraphicalData';
import { StatisticalData } from './components/sections/StatisticalData';
import { FileText, PieChart, Calculator, Menu, X, Settings } from 'lucide-react';

type Section = 'textual' | 'graphical' | 'statistical';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('textual');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'textual': return <TextualData />;
      case 'graphical': return <GraphicalData />;
      case 'statistical': return <StatisticalData />;
      default: return <TextualData />;
    }
  };

  const NavItem = ({ section, label, icon: Icon }: { section: Section; label: string; icon: React.ElementType }) => (
    <button
      onClick={() => {
        setActiveSection(section);
        setMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        activeSection === section 
          ? 'bg-accent text-white shadow-lg shadow-accent/30' 
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} className={activeSection === section ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} />
      <span className="font-medium">{label}</span>
      {activeSection === section && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="p-6 border-b border-gray-100">
           <div className="flex items-center gap-2 text-slate-800">
             <div className="bg-slate-900 text-white p-1.5 rounded">
                <Settings size={20} />
             </div>
             <span className="text-xl font-bold tracking-tight">BioStats<span className="text-accent">Config</span></span>
           </div>
           <p className="text-xs text-slate-400 mt-2">Experiment Configuration Suite v1.0</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">Modules</div>
            <NavItem section="textual" label="Textual Data" icon={FileText} />
            <NavItem section="graphical" label="Graphical Data" icon={PieChart} />
            <NavItem section="statistical" label="Statistical Data" icon={Calculator} />
        </nav>

        <div className="p-4 bg-slate-50 border-t border-gray-200">
            <div className="text-xs text-slate-400 text-center">
                &copy; 2024 Research Lab Tools
            </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
         <span className="text-lg font-bold text-slate-800">BioStats<span className="text-accent">Config</span></span>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
            {mobileMenuOpen ? <X /> : <Menu />}
         </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 lg:hidden pt-20 px-6 space-y-4">
             <NavItem section="textual" label="Textual Data" icon={FileText} />
             <NavItem section="graphical" label="Graphical Data" icon={PieChart} />
             <NavItem section="statistical" label="Statistical Data" icon={Calculator} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-y-auto scroll-smooth">
         <header className="mb-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800">
                {activeSection === 'textual' && 'Textual Results Generation'}
                {activeSection === 'graphical' && 'Graphical Visualization'}
                {activeSection === 'statistical' && 'Statistical Analysis'}
            </h1>
            <p className="text-slate-500 mt-2">
                {activeSection === 'textual' && 'Select measures and define categorization for detailed text reports.'}
                {activeSection === 'graphical' && 'Configure plot types, error bars, and visualization hierarchies.'}
                {activeSection === 'statistical' && 'Setup hypothesis testing, variable relations, and post-hoc analysis.'}
            </p>
         </header>

         {renderSection()}
      </main>
    </div>
  );
};

export default App;