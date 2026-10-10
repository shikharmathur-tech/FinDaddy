import React from 'react';
import { useApp } from '../../context/AppContext';
import { FinDaddyLogo } from '../common/FinDaddyLogo';

interface MobileNavProps {
  onOpenSidebar: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenSidebar }) => {
  const {
    setActiveTab,
    setIsMobileSimulatorOpen,
  } = useApp();

  return (
    <>
      {/* Mobile Top Hamburger Bar for small screens */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl z-40 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            className="p-2 -ml-1 rounded-xl text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            onClick={onOpenSidebar}
            type="button"
            aria-label="Open Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          <div className="cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <FinDaddyLogo size="sm" />
          </div>
        </div>

        <button
          className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
          onClick={() => setIsMobileSimulatorOpen(true)}
          type="button"
        >
          <span className="material-symbols-outlined text-sm">smartphone</span>
          <span>390px</span>
        </button>
      </div>

      {/* Floating 390px simulator button at bottom right (matches Image 15) */}
      <button
        aria-label="Mobile Preview Simulator"
        className="fixed bottom-16 right-5 z-40 px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-xl shadow-indigo-600/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 border border-white/20 group backdrop-blur-md cursor-pointer"
        onClick={() => setIsMobileSimulatorOpen(true)}
        title="Open Mobile Responsive Preview (390px)"
        type="button"
      >
        <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">
          smartphone
        </span>
        <span className="font-headline-sm text-xs font-bold tracking-tight">Mobile Preview</span>
        <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono leading-none">390px</span>
      </button>
    </>
  );
};
