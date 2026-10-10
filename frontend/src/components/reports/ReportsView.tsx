import React from 'react';
import { useApp } from '../../context/AppContext';

export const ReportsView: React.FC = () => {
  const { salarySlips, formatCurrency, showToast } = useApp();

  const reportsList = [
    {
      title: 'Form 12BB Investment Declaration Statement',
      category: 'Statutory Payroll',
      date: 'Generated for FY 2024-25',
      status: 'Ready for HR',
      icon: 'description',
    },
    {
      title: 'Form 16 Part A & B Consolidated Preview',
      category: 'Annual Tax Certificate',
      date: 'Updated with Oct 2024 TDS',
      status: 'TRACES Matched',
      icon: 'receipt_long',
    },
    {
      title: 'Annual In-Hand & Deductions Ledger (6 LPA)',
      category: 'Financial Analytics',
      date: 'H1 FY 2024-25 Breakdown',
      status: 'Verified',
      icon: 'table_view',
    },
    {
      title: '50/30/20 Discipline Audit Report',
      category: 'Budget Health',
      date: 'October 2024 Audit',
      status: 'Top 12% Earner',
      icon: 'pie_chart',
    },
  ];

  return (
    <div className="w-full px-4 lg:px-6 py-4 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 text-primary dark:text-[#818cf8] font-bold text-xl lg:text-2xl">
          <span className="material-symbols-outlined text-2xl">receipt_long</span>
          <h1 className="font-headline-lg text-2xl lg:text-3xl text-on-surface dark:text-white font-bold">
            Tax &amp; Financial Reports
          </h1>
        </div>
        <p className="font-body-md text-xs lg:text-sm text-on-surface-variant dark:text-slate-400 mt-1">
          Export verified tax compliance certificates, monthly salary slips, and payroll proof packets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportsList.map((rep, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-surface-container-lowest dark:bg-[#162032] shadow-sm border border-transparent dark:border-white/5 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-indigo-950 text-primary dark:text-[#818cf8] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">{rep.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface dark:text-white leading-snug">
                    {rep.title}
                  </h3>
                  <span className="text-xs text-on-surface-variant dark:text-slate-400 block mt-0.5">
                    {rep.category} • {rep.date}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed/30 dark:bg-emerald-950 text-tertiary dark:text-emerald-400 font-label-tag text-[10px] font-bold uppercase shrink-0">
                {rep.status}
              </span>
            </div>

            <div className="pt-2 border-t dark:border-slate-800 flex items-center justify-between">
              <button
                className="text-xs text-primary dark:text-[#818cf8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                onClick={() => showToast(`Previewing ${rep.title}`, 'visibility')}
              >
                <span className="material-symbols-outlined text-sm">visibility</span>
                <span>Preview</span>
              </button>
              <button
                className="px-3 py-1.5 rounded-xl bg-surface-container-high dark:bg-slate-700 text-xs font-bold text-on-surface dark:text-white hover:bg-primary hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                onClick={() => showToast(`Downloading official PDF for ${rep.title}`, 'download')}
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Salary Slip Archive Table */}
      <div className="p-5 rounded-3xl bg-surface-container-lowest dark:bg-[#162032] shadow-sm space-y-3 border border-transparent dark:border-white/5">
        <h3 className="font-headline-sm text-sm font-bold text-on-surface dark:text-white">
          Monthly Payslips Archive
        </h3>
        <div className="divide-y divide-surface-container-high/40 dark:divide-slate-800 text-xs">
          {salarySlips.map((slip) => (
            <div key={slip.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">description</span>
                <div>
                  <span className="font-bold text-on-surface dark:text-white block">
                    {slip.month} {slip.year} Payslip
                  </span>
                  <span className="text-on-surface-variant dark:text-slate-400 text-[11px]">
                    Net Credited: {formatCurrency(slip.inHandAmount)}
                  </span>
                </div>
              </div>
              <button
                className="p-2 rounded-lg bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-slate-300 hover:text-primary transition-colors cursor-pointer"
                onClick={() => showToast(`Downloaded ${slip.month} PDF`, 'download')}
              >
                <span className="material-symbols-outlined text-base">download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
