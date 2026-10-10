import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const BudgetPlannerView: React.FC = () => {
  const {
    budgetItems,
    openAddCategoryModal,
    addBudgetItem,
    formatCurrency,
    showToast,
  } = useApp();

  const [activeStrategy, setActiveStrategy] = useState<'50-30-20' | '40-20-40' | '45-25-30' | 'custom'>('50-30-20');
  const [unallocatedPool, setUnallocatedPool] = useState<number>(1000);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const netSalary = 43200;

  // Ratios based on strategy
  const getRatios = () => {
    switch (activeStrategy) {
      case '40-20-40':
        return { needs: 0.4, wants: 0.2, savings: 0.4 };
      case '45-25-30':
        return { needs: 0.45, wants: 0.25, savings: 0.3 };
      case 'custom':
        return { needs: 0.48, wants: 0.26, savings: 0.26 };
      case '50-30-20':
      default:
        return { needs: 0.5, wants: 0.3, savings: 0.2 };
    }
  };

  const ratios = getRatios();
  const needsTarget = Math.round(netSalary * ratios.needs);
  const wantsTarget = Math.round(netSalary * ratios.wants);
  const savingsTarget = Math.round(netSalary * ratios.savings);

  const needsItems = budgetItems.filter((b) => b.bucket === 'Needs');
  const wantsItems = budgetItems.filter((b) => b.bucket === 'Wants');
  const savingsItems = budgetItems.filter((b) => b.bucket === 'Savings');

  const totalNeeds = needsItems.reduce((acc, i) => acc + i.monthlyCap, 0);
  const totalWants = wantsItems.reduce((acc, i) => acc + i.monthlyCap, 0);
  const totalSavings = savingsItems.reduce((acc, i) => acc + i.monthlyCap, 0);

  const handleStrategyChange = (st: '50-30-20' | '40-20-40' | '45-25-30' | 'custom') => {
    setActiveStrategy(st);
    if (st === '50-30-20') showToast('50/30/20 Rule: 50% Needs, 30% Wants, 20% Savings');
    if (st === '40-20-40') showToast('Aggressive Saver: 40% Needs, 20% Wants, 40% Wealth Generation');
    if (st === '45-25-30') showToast('Balanced First-Job: 45% Needs, 25% Wants, 30% Savings');
    if (st === 'custom') showToast('Custom Mode: Calibrated for Bangalore/Mumbai costs');
  };

  const handleDivert = (targetName: string, amount: number) => {
    if (unallocatedPool < amount) {
      showToast('No floating surplus remaining!', 'warning');
      return;
    }
    setUnallocatedPool((prev) => prev - amount);
    showToast(`Diverted ₹${amount.toLocaleString('en-IN')} to ${targetName}!`, 'bolt');
  };

  const handleQuickPreset = (name: string, amount: number, bucket: 'Needs' | 'Wants') => {
    addBudgetItem({
      name,
      subtext: 'Quick added recurring cost',
      monthlyCap: amount,
      spentDate: 0,
      bucket,
      icon: bucket === 'Needs' ? 'receipt' : 'local_mall',
      statusText: 'Tracking active',
    });
  };

  return (
    <div className="w-full px-4 lg:px-6 py-4 space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      {/* Top Action Deck & Net Pay Header */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-label-tag text-xs tracking-wider uppercase font-bold border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              FY 2024-25 • April In-Hand Allocation
            </div>
            <h1 className="text-2xl lg:text-3xl text-slate-900 dark:text-white tracking-tight font-extrabold">
              Smart In-Hand Budget Planner
            </h1>
            <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400">
              Structure your real post-tax paycheck with disciplined framework ratios built specifically for Indian entry-level compensation.
            </p>
          </div>

          {/* Net Monthly In-Hand Highlight Widget */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl shadow-sm min-w-[280px] border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Net Monthly Take-Home</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl lg:text-2xl text-slate-900 dark:text-white font-black font-mono">
                  {formatCurrency(netSalary)}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full font-bold border border-emerald-300 dark:border-emerald-700">
                  Verified Payslip
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                Post-EPF (₹1,800) &amp; TDS (₹0)
              </span>
            </div>
          </div>
        </div>

        {/* Strategy Segment Pills */}
        <div className="mt-5 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeStrategy === '50-30-20'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              onClick={() => handleStrategyChange('50-30-20')}
              type="button"
            >
              50/30/20 Rule (Standard)
            </button>
            <button
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeStrategy === '40-20-40'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              onClick={() => handleStrategyChange('40-20-40')}
              type="button"
            >
              Aggressive Saver (40/20/40)
            </button>
            <button
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeStrategy === '45-25-30'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              onClick={() => handleStrategyChange('45-25-30')}
              type="button"
            >
              Balanced First-Job (45/25/30)
            </button>
            <button
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeStrategy === 'custom'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              onClick={() => handleStrategyChange('custom')}
              type="button"
            >
              Custom Rule
            </button>
          </div>

          {/* Sync & Lock Global Triggers */}
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors text-xs font-bold shadow-sm cursor-pointer border border-slate-200 dark:border-slate-700"
              onClick={() => showToast('Synced Axis & ICICI bank alerts... 4 new transactions logged!', 'sync')}
              type="button"
            >
              <span className="material-symbols-outlined text-base text-indigo-600 dark:text-indigo-400">sync_saved_locally</span>
              <span>Sync UPI &amp; Alerts</span>
            </button>
            <button
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all ${
                isLocked
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
              onClick={() => {
                setIsLocked(true);
                showToast('April Budget locked! Daily burn capped at ₹1,296/day.', 'lock');
                setTimeout(() => setIsLocked(false), 3000);
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-base">
                {isLocked ? 'check' : 'lock'}
              </span>
              <span>{isLocked ? 'Budget Locked!' : 'Lock April Budget'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active High-Level Pacing Visualizer Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm space-y-4 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="material-symbols-outlined text-xl">timelapse</span>
            </div>
            <div>
              <span className="text-xs lg:text-sm font-bold text-slate-900 dark:text-white block">
                Pacing Velocity: Day 18 of 30
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">
                Ideal target spent by today: ₹25,920 (60.0%) • Actual spend logged: ₹23,328 (54.0%)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div className="hidden sm:block">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                Current Burn Rate
              </span>
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold block">
                ₹1,296 / day (Healthy)
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              6% Under-Budget
            </span>
          </div>
        </div>

        {/* Segmented Bar Meter */}
        <div className="space-y-1.5">
          <div className="h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner border border-slate-200 dark:border-slate-700">
            <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: '48.6%' }} title="Needs Spent"></div>
            <div className="h-full bg-purple-600 transition-all duration-500" style={{ width: '25.9%' }} title="Wants Spent"></div>
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: '25.5%' }} title="Saved & Invested"></div>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>Needs: ₹21,000 (48.6%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block"></span>Wants: ₹11,200 (25.9%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>Invested: ₹11,000 (25.5%)</span>
          </div>
        </div>
      </div>

      {/* The 3 Primary Financial Buckets (Needs, Wants, Savings) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* BUCKET 1: NEEDS */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-5 border border-slate-200 dark:border-slate-800">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                  <h2 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white">1. Essentials &amp; Needs</h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Non-negotiable living baseline &amp; fixed overheads</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1 border border-emerald-300 dark:border-emerald-700">
                <span className="material-symbols-outlined text-xs">check_circle</span>
                On Track
              </span>
            </div>

            {/* Gauge */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl space-y-1.5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold">
                  Target Ratio ({Math.round(ratios.needs * 100)}%)
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ₹{needsTarget.toLocaleString('en-IN')} max
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {formatCurrency(totalNeeds)}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  {needsTarget - totalNeeds >= 0 ? `₹${(needsTarget - totalNeeds).toLocaleString('en-IN')} buffer safe` : 'Over budget'}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((totalNeeds / needsTarget) * 100))}%` }}
                ></div>
              </div>
            </div>

            {/* Category Cards */}
            <div className="space-y-2">
              {needsItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all p-3.5 rounded-2xl flex flex-col gap-1 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-slate-700 border border-indigo-100 dark:border-slate-600 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">{item.name}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.subtext}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900 dark:text-white block leading-tight font-mono">
                        {formatCurrency(item.monthlyCap)}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        {((item.monthlyCap / netSalary) * 100).toFixed(1)}% net
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{item.statusText}</span>
                    <button
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold cursor-pointer"
                      onClick={() => showToast(`Calibrated cap for ${item.name}`)}
                    >
                      Edit ₹
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
            onClick={() => openAddCategoryModal('Needs')}
            type="button"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add Needs Item</span>
          </button>
        </div>

        {/* BUCKET 2: WANTS */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-5 border border-slate-200 dark:border-slate-800">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                  <h2 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white">2. Lifestyle &amp; Wants</h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Leisure, experiences &amp; guilt-free social spending</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1 border border-emerald-300 dark:border-emerald-700">
                <span className="material-symbols-outlined text-xs">format_image_left</span>
                Safe (Headroom)
              </span>
            </div>

            {/* Gauge */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl space-y-1.5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold">
                  Target Ratio ({Math.round(ratios.wants * 100)}%)
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ₹{wantsTarget.toLocaleString('en-IN')} max
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-purple-600 dark:text-purple-400 font-mono">
                  {formatCurrency(totalWants)}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  {wantsTarget - totalWants >= 0 ? `+₹${(wantsTarget - totalWants).toLocaleString('en-IN')} spare room` : 'Exceeded'}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((totalWants / wantsTarget) * 100))}%` }}
                ></div>
              </div>
            </div>

            {/* Category Cards */}
            <div className="space-y-2">
              {wantsItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all p-3.5 rounded-2xl flex flex-col gap-1 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-slate-700 border border-purple-100 dark:border-slate-600 flex items-center justify-center text-purple-600 dark:text-purple-300 shadow-sm">
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">{item.name}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.subtext}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900 dark:text-white block leading-tight font-mono">
                        {formatCurrency(item.monthlyCap)}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        {((item.monthlyCap / netSalary) * 100).toFixed(1)}% net
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{item.statusText}</span>
                    <button
                      className="text-purple-600 dark:text-purple-300 hover:underline font-bold cursor-pointer"
                      onClick={() => showToast(`Calibrated cap for ${item.name}`)}
                    >
                      Edit ₹
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-purple-300 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
            onClick={() => openAddCategoryModal('Wants')}
            type="button"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add Wants Item</span>
          </button>
        </div>

        {/* BUCKET 3: SAVINGS */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-5 border border-slate-200 dark:border-slate-800">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <h2 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white">3. Savings &amp; Wealth</h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Compounding capital &amp; emergency liquidity</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center gap-1 border border-emerald-300 dark:border-emerald-700">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                +₹2,360 Ahead! 🚀
              </span>
            </div>

            {/* Gauge */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl space-y-1.5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold">
                  Target Ratio ({Math.round(ratios.savings * 100)}%)
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ₹{savingsTarget.toLocaleString('en-IN')} base min
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {formatCurrency(totalSavings)}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  {((totalSavings / netSalary) * 100).toFixed(1)}% achieved!
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-full"></div>
              </div>
            </div>

            {/* Category Cards */}
            <div className="space-y-2">
              {savingsItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all p-3.5 rounded-2xl flex flex-col gap-1 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-slate-700 border border-emerald-100 dark:border-slate-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">{item.name}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.subtext}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900 dark:text-white block leading-tight font-mono">
                        {formatCurrency(item.monthlyCap)}
                      </span>
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        {((item.monthlyCap / netSalary) * 100).toFixed(1)}% net
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{item.statusText}</span>
                    <button
                      className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold cursor-pointer"
                      onClick={() => showToast(`Calibrated SIP amount for ${item.name}`)}
                    >
                      Edit ₹
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
            onClick={() => openAddCategoryModal('Savings')}
            type="button"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add Investment Channel</span>
          </button>
        </div>
      </div>

      {/* Interactive Budget Health Insights & Reallocation Opportunity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Smart Reallocation Callout (8 Cols) */}
        <div className="lg:col-span-8 bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high dark:from-slate-800/80 dark:via-slate-800/50 dark:to-slate-850/80 p-5 lg:p-6 rounded-3xl shadow-sm flex flex-col justify-between border border-transparent dark:border-white/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-tertiary dark:bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <span className="material-symbols-outlined text-2xl">auto_awesome</span>
              </div>
              <div>
                <span className="font-label-tag text-[10px] uppercase tracking-wider text-tertiary dark:text-emerald-400 font-bold">
                  FinDaddy AI Advisor
                </span>
                <h3 className="font-headline-md text-base lg:text-lg font-bold text-on-surface dark:text-white">
                  Smart Reallocation Opportunity
                </h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-surface-container-lowest dark:bg-slate-900 text-primary dark:text-[#818cf8] font-label-mono-data text-xs font-bold shadow-sm">
              Unallocated Pool: ₹{unallocatedPool.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="my-3.5 bg-surface-container-lowest/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl space-y-1 border dark:border-slate-800">
            <p className="font-body-md text-xs lg:text-sm text-on-surface dark:text-slate-100">
              Based on your ₹43,200 net pay and April commitments, you currently hold{' '}
              <strong className="text-tertiary dark:text-emerald-400 font-bold">
                ₹{unallocatedPool.toLocaleString('en-IN')} of floating surplus
              </strong>.
            </p>
            <p className="font-body-sm text-xs text-on-surface-variant dark:text-slate-400">
              Your emergency fund currently has 0.2 months of runway. Diverting this surplus directly ensures your 3-month survival milestone is reached 45 days sooner.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              className="px-4 py-2 rounded-xl bg-tertiary dark:bg-emerald-600 text-white font-headline-sm text-xs font-bold hover:brightness-110 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              onClick={() => handleDivert('Emergency Fund', 1000)}
              type="button"
            >
              <span className="material-symbols-outlined text-base">add_task</span>
              <span>Auto-divert ₹1,000 to Emergency Fund</span>
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-white hover:bg-surface-container-high transition-colors font-headline-sm text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer border dark:border-slate-700"
              onClick={() => handleDivert('Nifty 50 SIP', 1000)}
              type="button"
            >
              <span className="material-symbols-outlined text-base">trending_up</span>
              <span>Boost Nifty 50 SIP</span>
            </button>
            <button
              className="px-3 py-2 rounded-xl text-on-surface-variant dark:text-slate-400 hover:text-on-surface font-body-sm text-xs cursor-pointer"
              onClick={() => showToast('Surplus kept in floating account')}
              type="button"
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Quick Indian Preset Add Drawer (4 Cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest dark:bg-[#162032] p-5 rounded-3xl shadow-sm flex flex-col justify-between space-y-4 border border-transparent dark:border-white/5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-headline-sm text-sm font-bold text-on-surface dark:text-white">Quick Add Presets</h3>
              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 text-lg">bolt</span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant dark:text-slate-400">
              Tap standard entry-level recurring expenses to append directly:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              className="p-2.5 rounded-xl bg-surface-container-low dark:bg-slate-800 hover:bg-surface-container text-left transition-colors flex flex-col gap-0.5 cursor-pointer border border-transparent dark:border-white/5"
              onClick={() => handleQuickPreset('Maid & Cook Share', 2500, 'Needs')}
              type="button"
            >
              <span className="material-symbols-outlined text-primary dark:text-[#818cf8] text-lg">cleaning_services</span>
              <span className="font-body-sm text-xs font-semibold text-on-surface dark:text-white leading-tight">Maid / Cook</span>
              <span className="font-label-mono-data text-[10px] text-on-surface-variant dark:text-slate-400">~₹2,500</span>
            </button>

            <button
              className="p-2.5 rounded-xl bg-surface-container-low dark:bg-slate-800 hover:bg-surface-container text-left transition-colors flex flex-col gap-0.5 cursor-pointer border border-transparent dark:border-white/5"
              onClick={() => handleQuickPreset('UPI Chai & Quick Snacks', 1000, 'Wants')}
              type="button"
            >
              <span className="material-symbols-outlined text-secondary dark:text-purple-400 text-lg">qr_code_scanner</span>
              <span className="font-body-sm text-xs font-semibold text-on-surface dark:text-white leading-tight">UPI Micro-spends</span>
              <span className="font-label-mono-data text-[10px] text-on-surface-variant dark:text-slate-400">~₹1,000</span>
            </button>

            <button
              className="p-2.5 rounded-xl bg-surface-container-low dark:bg-slate-800 hover:bg-surface-container text-left transition-colors flex flex-col gap-0.5 cursor-pointer border border-transparent dark:border-white/5"
              onClick={() => handleQuickPreset('Bike Petrol / Uber', 1800, 'Needs')}
              type="button"
            >
              <span className="material-symbols-outlined text-primary dark:text-[#818cf8] text-lg">local_gas_station</span>
              <span className="font-body-sm text-xs font-semibold text-on-surface dark:text-white leading-tight">Petrol / Cabs</span>
              <span className="font-label-mono-data text-[10px] text-on-surface-variant dark:text-slate-400">~₹1,800</span>
            </button>

            <button
              className="p-2.5 rounded-xl bg-surface-container-low dark:bg-slate-800 hover:bg-surface-container text-left transition-colors flex flex-col gap-0.5 cursor-pointer border border-transparent dark:border-white/5"
              onClick={() => handleQuickPreset('Cult.fit / Gym Membership', 1500, 'Wants')}
              type="button"
            >
              <span className="material-symbols-outlined text-secondary dark:text-purple-400 text-lg">fitness_center</span>
              <span className="font-body-sm text-xs font-semibold text-on-surface dark:text-white leading-tight">Cult / Gym</span>
              <span className="font-label-mono-data text-[10px] text-on-surface-variant dark:text-slate-400">~₹1,500</span>
            </button>
          </div>

          <div className="p-2.5 bg-surface-container-low dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-on-surface-variant dark:text-slate-400 text-[11px]">
              <span className="material-symbols-outlined text-sm">security</span>
              <span>No bank credentials stored</span>
            </div>
            <span className="text-[10px] font-bold text-primary dark:text-[#818cf8]">RBI Norms</span>
          </div>
        </div>
      </div>

      {/* Discipline Matrix Table */}
      <div className="bg-surface-container-lowest dark:bg-[#162032] p-5 lg:p-6 rounded-3xl shadow-sm space-y-4 border border-transparent dark:border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-headline-md text-base lg:text-lg font-bold text-on-surface dark:text-white">
              Monthly Financial Discipline Matrix
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant dark:text-slate-400">
              Comparison of your planned caps versus automated transaction categorization
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 rounded-xl bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-white font-headline-sm text-xs font-semibold flex items-center gap-1 border dark:border-slate-700 cursor-pointer"
              onClick={() => showToast('Filtered active line items')}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">tune</span>
              <span>Filter</span>
            </button>
            <button
              className="px-3 py-1.5 rounded-xl bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-white font-headline-sm text-xs font-semibold flex items-center gap-1 border dark:border-slate-700 cursor-pointer"
              onClick={() => showToast('Exported April financial ledger (CSV)', 'download')}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-on-surface-variant dark:text-slate-400 font-label-tag uppercase tracking-wider bg-surface-container-low/60 dark:bg-slate-800/60">
                <th className="py-2.5 px-3 rounded-l-xl">Category / Line Item</th>
                <th className="py-2.5 px-3">Bucket Type</th>
                <th className="py-2.5 px-3">Monthly Cap</th>
                <th className="py-2.5 px-3">Logged to Date</th>
                <th className="py-2.5 px-3">Pacing Status</th>
                <th className="py-2.5 px-3 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/40 dark:divide-slate-800 font-body-sm">
              {budgetItems.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-on-surface dark:text-white flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.bucket === 'Needs' ? 'bg-primary' : item.bucket === 'Wants' ? 'bg-secondary' : 'bg-tertiary'
                      }`}
                    ></span>
                    {item.name}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-tag text-[10px] font-bold ${
                        item.bucket === 'Needs'
                          ? 'bg-primary/10 text-primary dark:text-[#818cf8]'
                          : item.bucket === 'Wants'
                          ? 'bg-secondary/10 text-secondary dark:text-purple-300'
                          : 'bg-tertiary/10 text-tertiary dark:text-emerald-400'
                      }`}
                    >
                      {item.bucket}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-label-mono-data font-semibold text-on-surface dark:text-white">
                    {formatCurrency(item.monthlyCap)}
                  </td>
                  <td className="py-3 px-3 font-label-mono-data text-on-surface-variant dark:text-slate-400">
                    {formatCurrency(item.spentDate)}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-tertiary dark:text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary dark:bg-emerald-400"></span>
                      {item.statusText}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      className="text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors cursor-pointer"
                      onClick={() => showToast(`Options for ${item.name}`)}
                    >
                      <span className="material-symbols-outlined text-base">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
