import React from 'react';
import { useApp } from '../../context/AppContext';

export const FinancialGoalsView: React.FC = () => {
  const { goals, openAddGoalModal, formatCurrency, showToast } = useApp();

  return (
    <div className="w-full px-4 lg:px-6 py-4 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary dark:text-[#818cf8] font-bold text-xl lg:text-2xl">
            <span className="material-symbols-outlined text-2xl">flag</span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl text-on-surface dark:text-white font-bold">
              Financial Milestones &amp; Life Goals
            </h1>
          </div>
          <p className="font-body-md text-xs lg:text-sm text-on-surface-variant dark:text-slate-400 mt-1">
            Track automated SIP contributions and targeted completion timelines based on your ₹43,200 in-hand salary.
          </p>
        </div>

        <button
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary dark:bg-indigo-600 text-white font-headline-sm text-xs font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer self-start sm:self-auto"
          onClick={openAddGoalModal}
          type="button"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          <span>Create New Goal</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {goals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          return (
            <div
              key={goal.id}
              className="bg-surface-container-lowest dark:bg-[#162032] p-5 rounded-2xl shadow-sm border border-transparent dark:border-white/5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container dark:bg-slate-800 flex items-center justify-center text-2xl shadow-sm">
                    {goal.icon}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed/30 dark:bg-emerald-950 text-tertiary dark:text-emerald-400 font-label-tag text-[10px] font-bold uppercase">
                    {goal.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface dark:text-white leading-snug">
                    {goal.title}
                  </h3>
                  <span className="text-xs text-on-surface-variant dark:text-slate-400 font-body-sm">
                    Target: {goal.targetDate}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-on-surface dark:text-white font-mono">
                      {formatCurrency(goal.currentAmount)}
                    </span>
                    <span className="text-on-surface-variant dark:text-slate-400 font-mono">
                      of {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-tertiary dark:bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-tertiary dark:text-emerald-400 font-bold">{pct}% Achieved</span>
                    <span className="text-on-surface-variant dark:text-slate-400">
                      ₹{goal.monthlyAutoDebit.toLocaleString('en-IN')}/mo SIP
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-on-surface-variant dark:text-slate-400 font-medium">Auto-debit on 1st</span>
                <button
                  className="text-primary dark:text-[#818cf8] font-bold hover:underline cursor-pointer"
                  onClick={() => showToast(`Calibrated SIP for ${goal.title}`)}
                >
                  Adjust SIP ₹
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
