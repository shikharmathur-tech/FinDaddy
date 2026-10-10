import React from 'react';
import { useApp } from '../../context/AppContext';

export const HRPortalView: React.FC = () => {
  const { showToast } = useApp();

  const proofs = [
    { title: 'Tax Regime Preference', status: 'Locked (New Regime)', verified: true, desc: 'Section 115BAC selected' },
    { title: 'House Rent Receipts (HRA)', status: 'Exempt under New Regime', verified: true, desc: 'No proofs required in New Regime' },
    { title: 'Mediclaim Policy Certificate', status: 'Declared (80D)', verified: true, desc: 'Self & Dependent Parents' },
    { title: 'NPS Tier 1 PRAN Card', status: 'Optional (80CCD)', verified: false, desc: 'Pending PRAN upload' },
  ];

  return (
    <div className="w-full px-4 lg:px-6 py-4 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 text-primary dark:text-[#818cf8] font-bold text-xl lg:text-2xl">
          <span className="material-symbols-outlined text-2xl">corporate_fare</span>
          <h1 className="font-headline-lg text-2xl lg:text-3xl text-on-surface dark:text-white font-bold">
            HRMS &amp; Payroll Declaration Portal
          </h1>
        </div>
        <p className="font-body-md text-xs lg:text-sm text-on-surface-variant dark:text-slate-400 mt-1">
          Synchronize your annual tax preference and reimbursement declarations with Darwinbox, Workday, or Keka.
        </p>
      </div>

      {/* Integration Status Card */}
      <div className="p-5 rounded-2xl bg-surface-container-lowest dark:bg-[#162032] shadow-sm border border-transparent dark:border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-tertiary-fixed/30 dark:bg-emerald-950 text-tertiary dark:text-emerald-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">sync</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-sm font-bold text-on-surface dark:text-white">
                Darwinbox HRMS Integration: Active
              </span>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed/40 dark:bg-emerald-950 text-tertiary dark:text-emerald-400 font-label-tag text-[10px] font-bold uppercase">
                Synced Today
              </span>
            </div>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
              Employee ID: RT-IND-4921 • RazorTech Solutions India Pvt Ltd
            </p>
          </div>
        </div>

        <button
          className="px-4 py-2 rounded-xl bg-primary dark:bg-indigo-600 text-white font-headline-sm text-xs font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer whitespace-nowrap"
          onClick={() => showToast('Syncing with Darwinbox / Keka API...', 'sync')}
          type="button"
        >
          Force Sync Payroll
        </button>
      </div>

      {/* Proofs Checklist */}
      <div className="p-5 rounded-3xl bg-surface-container-lowest dark:bg-[#162032] shadow-sm space-y-4 border border-transparent dark:border-white/5">
        <h3 className="font-headline-sm text-sm font-bold text-on-surface dark:text-white">
          Form 12BB Proof Submission Checklist (FY 2024-25)
        </h3>

        <div className="space-y-2.5">
          {proofs.map((p, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-surface-container-low dark:bg-slate-800 flex items-center justify-between text-xs border border-transparent dark:border-white/5"
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-lg ${p.verified ? 'text-tertiary dark:text-emerald-400' : 'text-outline dark:text-slate-400'}`}>
                  {p.verified ? 'check_circle' : 'pending'}
                </span>
                <div>
                  <span className="font-bold text-on-surface dark:text-white block">{p.title}</span>
                  <span className="text-on-surface-variant dark:text-slate-400 text-[11px]">{p.desc}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-high dark:bg-slate-700 text-on-surface dark:text-slate-200 font-label-tag text-[10px] font-bold">
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
