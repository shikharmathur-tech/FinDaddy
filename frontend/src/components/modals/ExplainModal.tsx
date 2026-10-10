import React from 'react';
import { useApp } from '../../context/AppContext';

export const ExplainModal: React.FC = () => {
  const { explainModal, closeExplainModal } = useApp();

  if (!explainModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-surface-container-lowest dark:bg-[#1e293b] rounded-3xl p-5 lg:p-6 shadow-2xl space-y-4 border border-surface-container-high dark:border-slate-700 animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-tag text-[10px] px-2.5 py-0.5 rounded-full bg-primary-fixed dark:bg-indigo-950 text-primary dark:text-indigo-300 uppercase tracking-wider font-bold">
              {explainModal.tag || 'Tax Law Clause'}
            </span>
            <h3 className="font-headline-md text-lg lg:text-xl font-bold text-on-surface dark:text-white mt-1">
              {explainModal.title}
            </h3>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high text-on-surface-variant dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            onClick={closeExplainModal}
            type="button"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="p-4 bg-surface-container-low dark:bg-slate-800/80 rounded-2xl space-y-1">
          <span className="font-label-tag text-[10px] uppercase text-on-surface-variant dark:text-slate-400 font-bold">
            Plain English Translation
          </span>
          <p className="font-body-md text-xs lg:text-sm text-on-surface dark:text-slate-100 leading-relaxed">
            {explainModal.description}
          </p>
        </div>

        <div className="p-4 bg-surface-container dark:bg-slate-800 rounded-2xl space-y-1">
          <span className="font-label-tag text-[10px] uppercase text-primary dark:text-[#818cf8] font-bold">
            Official Indian Tax Calculation
          </span>
          <p className="font-label-mono-data text-xs text-on-surface dark:text-slate-200 leading-normal">
            {explainModal.formula}
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            className="px-5 py-2 rounded-xl bg-primary dark:bg-indigo-600 text-white font-headline-sm text-xs font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer"
            onClick={closeExplainModal}
            type="button"
          >
            Got It, Understood!
          </button>
        </div>
      </div>
    </div>
  );
};
