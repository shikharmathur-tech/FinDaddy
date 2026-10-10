import React from 'react';
import { useApp } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const {
    activeProfile,
    formatCurrency,
    earningsItems,
    deductionItems,
    goals,
    salarySlips,
    openPayslipDetailModal,
    openAddGoalModal,
    setActiveTab,
    setIsFinDaddyOpen,
    showToast,
  } = useApp();
  const totalGross = earningsItems.reduce(
  (sum, item) => sum + item.amount,
  0
);

const totalDeductions = deductionItems.reduce(
  (sum, item) => sum + item.amount,
  0
);

const takeHomePay = totalGross - totalDeductions;

  return (
    <div className="w-full px-4 lg:px-6 py-4 space-y-6 max-w-[1360px] mx-auto animate-in fade-in duration-300">
      {/* Top Welcome Banner & Score Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#4338ca] text-white shadow-2xl p-6 lg:p-7 border border-indigo-400/40">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-72 h-72 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6">
          {/* User Greeting & Quick Stats */}
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-label-tag text-xs uppercase tracking-wider text-emerald-300 font-bold">
                Active Streak: 4 Months of Smart Allocation
              </span>
            </div>

            <div className="flex items-baseline gap-2 flex-wrap">
              <h1 className="text-2xl lg:text-3xl text-white font-extrabold tracking-tight">
                Welcome back, {activeProfile.split(' ')[0]}! 🎉
              </h1>
            </div>

            <p className="text-sm text-indigo-100 max-w-lg leading-relaxed font-normal">
              Your October salary is fully processed. You beat your personal savings benchmark by 3% this month! Keep up the momentum toward your Goa vacation &amp; emergency buffer.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-950 font-bold text-sm shadow-md hover:bg-slate-100 transition-all active:scale-[0.98] cursor-pointer"
                onClick={() => setActiveTab('upload-payslip')}
                type="button"
              >
                <span className="material-symbols-outlined text-lg transition-transform group-hover:rotate-12">
                  document_scanner
                </span>
                <span>Scan New Payslip</span>
              </button>

              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-sm transition-all active:scale-[0.98] cursor-pointer border border-white/20"
                onClick={() => setActiveTab('scenario-simulator')}
                type="button"
              >
                <span className="material-symbols-outlined text-lg">trending_up</span>
                <span>Simulate Raise</span>
              </button>

              <button
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-sm transition-all cursor-pointer border border-white/15"
                onClick={() => setActiveTab('reports')}
                title="Export PDF Statement"
                type="button"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span className="hidden sm:inline">Export Report</span>
              </button>
            </div>
          </div>

          {/* Financial Health Score Dial Widget */}
          <div className="flex-shrink-0 flex items-center justify-between sm:justify-start gap-5 p-4 rounded-2xl bg-black/35 backdrop-blur-xl shadow-xl border border-white/20">
            {/* Circular SVG Gauge */}
            <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="42" stroke="rgba(255,255,255,0.2)" strokeWidth="9"></circle>
                <circle
                  className="transition-all duration-1000 ease-out"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="42"
                  stroke="#34d399"
                  strokeDasharray="263.89"
                  strokeDashoffset="42.22"
                  strokeLinecap="round"
                  strokeWidth="9"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl leading-none font-black text-white">84</span>
                <span className="text-[10px] text-emerald-300 font-bold tracking-wider uppercase mt-0.5">/ 100</span>
              </div>
            </div>

            {/* Score Metrics Breakdown */}
            <div className="space-y-1.5 min-w-[160px]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-[10px] uppercase tracking-wide">
                  Excellent
                </span>
                <span className="text-xs text-emerald-400 font-black flex items-center">
                  <span className="material-symbols-outlined text-xs">arrow_upward</span> +6 pts
                </span>
              </div>
              <div className="text-indigo-200 text-xs font-medium">Score Factors:</div>
              <div className="space-y-1 font-mono text-xs text-white">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-indigo-200">DTI Ratio:</span>
                  <span className="font-bold text-emerald-400">18% (Safe)</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-indigo-200">Emergency:</span>
                  <span className="font-bold text-white">3.2 months</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-indigo-200">Tax Efficiency:</span>
                  <span className="font-bold text-emerald-400">92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Metric Summary Cards (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gross Monthly */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Gross CTC Monthly</span>
            <span className="p-2 rounded-xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-slate-700">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
            </span>
          </div>
          <div className="text-2xl text-slate-900 dark:text-white tracking-tight font-black font-mono">
            {formatCurrency(totalGross)}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="inline-flex items-center text-emerald-700 dark:text-emerald-300 font-bold text-xs bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              <span className="material-symbols-outlined text-xs">arrow_upward</span> 8.0% YoY
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Annual: ₹6.0 LPA</span>
          </div>
        </div>

        {/* Card 2: In-Hand (Net Pay) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Take-Home (In-Hand)</span>
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-slate-700">
              <span className="material-symbols-outlined text-xl">payments</span>
            </span>
          </div>
          <div className="text-2xl text-indigo-600 dark:text-indigo-400 tracking-tight font-black font-mono">
            {formatCurrency(takeHomePay)}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded-md font-bold border border-rose-200 dark:border-rose-800">
              -₹6,800 deductions
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">86.4% of CTC</span>
          </div>
        </div>

        {/* Card 3: Tax & Statutory Deductions */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Statutory Deductions</span>
            <span className="p-2 rounded-xl bg-rose-50 dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-slate-700">
              <span className="material-symbols-outlined text-xl">pie_chart</span>
            </span>
          </div>
          <div className="text-2xl text-slate-900 dark:text-white tracking-tight font-black font-mono">
            {formatCurrency(totalDeductions)}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
              TDS: ₹4.8k • PF: ₹1.8k
            </span>
          </div>
        </div>

        {/* Card 4: Savings Rate Benchmark */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Monthly Savings Rate</span>
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-slate-700">
              <span className="material-symbols-outlined text-xl">savings</span>
            </span>
          </div>
          <div className="text-2xl text-slate-900 dark:text-white tracking-tight font-black font-mono">
            38.0%
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="inline-flex items-center text-emerald-700 dark:text-emerald-300 font-bold text-xs bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              🎯 Target 35% exceeded!
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">₹19,000 kept</span>
          </div>
        </div>
      </div>

      {/* Interactive Salary Waterfall Breakdown Flow */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4 border border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl text-slate-900 dark:text-white font-bold">
              Salary Flow &amp; Waterfall Architecture
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              From gross enterprise payroll credit to actionable free pocket capital.{' '}
              <button
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
                onClick={() => openPayslipDetailModal('October 2024')}
              >
                (Click to inspect itemized components)
              </button>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs border border-slate-200 dark:border-slate-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> New Regime FY24-25
            </span>
            <button
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
              onClick={() => setActiveTab('tax-comparison')}
              title="Filter Slabs"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">tune</span>
            </button>
          </div>
        </div>

        {/* Segmented Visual Bar */}
        <div
          className="w-full h-4 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex shadow-inner cursor-pointer border border-slate-200 dark:border-slate-700"
          onClick={() => openPayslipDetailModal('October 2024')}
        >
          <div className="h-full bg-indigo-600 transition-all hover:opacity-90" style={{ width: '26.4%' }} title="Take Home Pocket (₹13,200)"></div>
          <div className="h-full bg-emerald-500 transition-all hover:opacity-90" style={{ width: '24.0%' }} title="SIP & Long Term (₹12,000)"></div>
          <div className="h-full bg-purple-600 transition-all hover:opacity-90" style={{ width: '36.0%' }} title="Essentials & Rent (₹18,000)"></div>
          <div className="h-full bg-rose-500 transition-all hover:opacity-90" style={{ width: '9.6%' }} title="Income Tax TDS (₹4,800)"></div>
          <div className="h-full bg-slate-600 transition-all hover:opacity-90" style={{ width: '3.6%' }} title="EPF Contribution (₹1,800)"></div>
          <div className="h-full bg-slate-400 transition-all hover:opacity-90" style={{ width: '0.4%' }} title="Professional Tax (₹200)"></div>
        </div>

        {/* Waterfall Stage Cards Grid (Clickable) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-1">
          {/* 1. Gross Income */}
          <div
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-all cursor-pointer flex flex-col justify-between border border-slate-200 dark:border-slate-700 shadow-sm"
            onClick={() => openPayslipDetailModal('October 2024')}
          >
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">1. Gross Salary</span>
              <div className="text-sm font-black text-slate-900 dark:text-white mt-1 font-mono">₹50,000</div>
            </div>
            <span className="mt-2 font-mono text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">100% Base CTC</span>
          </div>

          {/* 2. Income Tax TDS */}
          <div
            className="p-3 rounded-xl bg-error-container/20 dark:bg-rose-950/30 hover:bg-error-container/40 dark:hover:bg-rose-900/40 transition-all cursor-pointer flex flex-col justify-between border border-transparent dark:border-rose-500/20"
            onClick={() => setActiveTab('tax-comparison')}
          >
            <div>
              <span className="font-label-tag text-[10px] text-error dark:text-rose-400 uppercase">2. Tax (TDS)</span>
              <div className="font-label-currency-md text-sm font-bold text-error dark:text-rose-400 mt-1">-₹4,800</div>
            </div>
            <span className="mt-2 font-label-mono-data text-[10px] text-error dark:text-rose-400 font-semibold">Standard Slab</span>
          </div>

          {/* 3. EPF */}
          <div
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-all cursor-pointer flex flex-col justify-between border border-slate-200 dark:border-slate-700 shadow-sm"
            onClick={() => openPayslipDetailModal('October 2024')}
          >
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">3. EPF Employee</span>
              <div className="text-sm font-black text-slate-900 dark:text-white mt-1 font-mono">-₹1,800</div>
            </div>
            <span className="mt-2 font-mono text-[10px] text-slate-500 dark:text-slate-400 font-semibold">12% Basic Cap</span>
          </div>

          {/* 4. Prof Tax */}
          <div
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-all cursor-pointer flex flex-col justify-between border border-slate-200 dark:border-slate-700 shadow-sm"
            onClick={() => openPayslipDetailModal('October 2024')}
          >
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">4. Prof. Tax (PT)</span>
              <div className="text-sm font-black text-slate-900 dark:text-white mt-1 font-mono">-₹200</div>
            </div>
            <span className="mt-2 font-mono text-[10px] text-slate-500 dark:text-slate-400 font-semibold">State Statutory</span>
          </div>

          {/* 5. Rent & Living Essentials */}
          <div
            className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all cursor-pointer flex flex-col justify-between border border-purple-200 dark:border-purple-800 shadow-sm"
            onClick={() => setActiveTab('budget-planner')}
          >
            <div>
              <span className="text-[10px] text-purple-700 dark:text-purple-300 uppercase font-bold">5. Rent &amp; Needs</span>
              <div className="text-sm font-black text-purple-700 dark:text-purple-300 mt-1 font-mono">-₹18,000</div>
            </div>
            <span className="mt-2 font-mono text-[10px] text-purple-600 dark:text-purple-300 font-bold">Rent, Food, Wifi</span>
          </div>

          {/* 6. SIP & Wealth */}
          <div
            className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all cursor-pointer flex flex-col justify-between border border-emerald-200 dark:border-emerald-800 shadow-sm"
            onClick={() => setActiveTab('financial-goals')}
          >
            <div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 uppercase font-bold">6. SIP &amp; Buffers</span>
              <div className="text-sm font-black text-emerald-700 dark:text-emerald-300 mt-1 font-mono">-₹12,000</div>
            </div>
            <span className="mt-2 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Nifty50 + RD</span>
          </div>

          {/* 7. Spendable Cash */}
          <div
            className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all cursor-pointer flex flex-col justify-between border border-indigo-200 dark:border-indigo-800 shadow-sm"
            onClick={() => setActiveTab('budget-planner')}
          >
            <div>
              <span className="text-[10px] text-indigo-700 dark:text-indigo-300 uppercase font-bold">7. Free Cash</span>
              <div className="text-sm font-black text-indigo-700 dark:text-indigo-300 mt-1 font-mono">+₹13,200</div>
            </div>
            <span className="mt-2 font-mono text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Guilt-free Play</span>
          </div>
        </div>
      </div>

      {/* Two-Column Analytical Grid: Budget Allocation & Tax Optimization Nudges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left (7 Cols): Monthly 50/30/20 Allocation Visualizer */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg lg:text-xl text-slate-900 dark:text-white font-bold">
                Monthly Budget Rule Engine
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant dark:text-slate-400">
                Benchmarked against the proven 50 / 30 / 20 Framework
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-tertiary-fixed/30 dark:bg-emerald-950/50 text-tertiary dark:text-emerald-400 font-label-tag text-xs uppercase tracking-wide border border-transparent dark:border-emerald-500/20">
              Optimal Health
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-2">
            {/* Donut Graphic Representation */}
            <div
              className="md:col-span-5 flex flex-col items-center justify-center relative cursor-pointer"
              onClick={() => setActiveTab('budget-planner')}
            >
              <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
                {/* Needs: 45% */}
                <circle
                  className="dark:stroke-indigo-500"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="48"
                  stroke="#3525cd"
                  strokeDasharray="301.59"
                  strokeDashoffset="135.71"
                  strokeWidth="16"
                ></circle>
                {/* Wants: 23% */}
                <circle
                  className="transform origin-center rotate-[162deg] dark:stroke-purple-500"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="48"
                  stroke="#8a4cfc"
                  strokeDasharray="301.59"
                  strokeDashoffset="232.22"
                  strokeWidth="16"
                ></circle>
                {/* Savings: 32% */}
                <circle
                  className="transform origin-center rotate-[244deg] dark:stroke-emerald-500"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="48"
                  stroke="#006e4b"
                  strokeDasharray="301.59"
                  strokeDashoffset="205.08"
                  strokeWidth="16"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-body-sm text-xs text-on-surface-variant dark:text-slate-400">In-Hand</span>
                <span className="font-headline-md text-base font-bold text-on-surface dark:text-white">₹50,000</span>
                <span className="font-label-tag text-[10px] text-tertiary dark:text-emerald-400">100% Tracked</span>
              </div>
            </div>

            {/* Progress Legend & Benchmarks */}
            <div className="md:col-span-7 space-y-3">
              {/* Needs */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-headline-sm text-xs text-on-surface dark:text-slate-200 flex items-center gap-1.5 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-indigo-500"></span> Needs (Essentials)
                  </span>
                  <span className="font-label-mono-data text-xs text-on-surface dark:text-slate-200 font-semibold">
                    ₹22,500 <span className="text-on-surface-variant dark:text-slate-400 font-normal">(45%)</span>
                  </span>
                </div>
                <div className="w-full bg-surface-container dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary dark:bg-indigo-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="font-label-tag text-[10px] text-tertiary dark:text-emerald-400">
                  Ideal: &lt;50% • You saved 5% cushion!
                </span>
              </div>

              {/* Wants */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-headline-sm text-xs text-on-surface dark:text-slate-200 flex items-center gap-1.5 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-container dark:bg-purple-500"></span> Wants (Lifestyle &amp; Dining)
                  </span>
                  <span className="font-label-mono-data text-xs text-on-surface dark:text-slate-200 font-semibold">
                    ₹11,500 <span className="text-on-surface-variant dark:text-slate-400 font-normal">(23%)</span>
                  </span>
                </div>
                <div className="w-full bg-surface-container dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary-container dark:bg-purple-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
                <span className="font-label-tag text-[10px] text-on-surface-variant dark:text-slate-400">
                  Ideal: &lt;30% • Under control
                </span>
              </div>

              {/* Savings / SIP */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-headline-sm text-xs text-on-surface dark:text-slate-200 flex items-center gap-1.5 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container dark:bg-emerald-500"></span> Wealth Accumulation &amp; SIP
                  </span>
                  <span className="font-label-mono-data text-xs text-on-surface dark:text-slate-200 font-semibold">
                    ₹16,000 <span className="text-on-surface-variant dark:text-slate-400 font-normal">(32%)</span>
                  </span>
                </div>
                <div className="w-full bg-surface-container dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-tertiary-container dark:bg-emerald-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
                <span className="font-label-tag text-[10px] text-tertiary dark:text-emerald-400 font-bold">
                  Ideal: &gt;20% • Beat by +12% 🚀
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between rounded-xl bg-surface-container-low dark:bg-slate-800/80 border border-transparent dark:border-white/5 p-3 text-xs text-on-surface-variant dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary dark:text-indigo-400 text-base">info</span>
              Auto-calculated via linked HDFC Salary Account
            </span>
            <button
              className="text-primary dark:text-indigo-400 font-bold hover:underline cursor-pointer"
              onClick={() => setActiveTab('budget-planner')}
              type="button"
            >
              Adjust Limits
            </button>
          </div>
        </div>

        {/* Right (5 Cols): Tax-Saving Smart Nudges & AI Recommendations */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-3.5 flex flex-col justify-between border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg lg:text-xl text-slate-900 dark:text-white font-bold">
                Tax Optimizer
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs border border-purple-200 dark:border-purple-800 font-bold">
                <span className="material-symbols-outlined text-xs">auto_awesome</span> 3 Nudges
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Actionable steps to minimize TDS before Q4 closure.
            </p>
          </div>

          <div className="space-y-2.5">
            {/* Nudge 1: 80C */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative overflow-hidden group border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="p-2 rounded-lg bg-indigo-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <span className="material-symbols-outlined text-lg">bolt</span>
                </span>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Save ₹15,600 Tax</span>
                    <span className="text-[10px] text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-2 py-0.5 rounded font-bold border border-rose-200 dark:border-rose-900">
                      March 31 Deadline
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    Switching to the Old Regime could save ₹15,600 if you exhaust Section 80C with ELSS or PPF contributions.
                  </p>
                  <div className="pt-1">
                    <button
                      className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-xs hover:gap-1.5 transition-all font-bold cursor-pointer"
                      onClick={() => setActiveTab('tax-comparison')}
                      type="button"
                    >
                      <span>View Regime Comparison</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Nudge 2: NPS 80CCD(1B) */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex-shrink-0">
                  <span className="material-symbols-outlined text-lg">lightbulb</span>
                </span>
                <div className="space-y-1 flex-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Start NPS Tier 1</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    Unlock an exclusive ₹50,000 tax deduction under 80CCD(1B) above Section 80C caps.
                  </p>
                  <div className="pt-0.5">
                    <button
                      className="text-emerald-700 dark:text-emerald-400 font-bold text-xs hover:underline cursor-pointer"
                      onClick={() => setIsFinDaddyOpen(true)}
                      type="button"
                    >
                      Calculate NPS Return
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Nudge 3: Health Insurance 80D */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex-shrink-0">
                  <span className="material-symbols-outlined text-lg">shield</span>
                </span>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-xs font-bold text-on-surface dark:text-white">Health Shield (80D)</span>
                    <span className="font-label-mono-data text-xs text-secondary dark:text-purple-300 font-bold">Claim ₹25,000</span>
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400 leading-snug">
                    Protect your parents &amp; yourself while trimming your taxable gross.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-full py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-on-surface dark:text-white font-headline-sm text-xs font-bold transition-colors text-center border border-transparent dark:border-white/10 cursor-pointer"
            onClick={() => showToast('Booking 15-min session with FinDaddy CA partner...', 'event')}
            type="button"
          >
            Schedule Free 15-min Session with CA
          </button>
        </div>
      </div>

      {/* Active Goals Progress & Recent Uploaded Payslips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Active Goals (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4 border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg text-slate-900 dark:text-white font-bold">
                Active Savings Goals
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automated deductions fueling your life targets
              </p>
            </div>
            <button
              className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:underline cursor-pointer"
              onClick={openAddGoalModal}
              type="button"
            >
              <span className="material-symbols-outlined text-base">add_circle</span> Add Goal
            </button>
          </div>

          <div className="space-y-3">
            {goals.map((g) => {
              const pct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
              return (
                <div
                  key={g.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 space-y-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors cursor-pointer shadow-sm"
                  onClick={() => setActiveTab('financial-goals')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-slate-750 border border-indigo-100 dark:border-slate-700 flex items-center justify-center font-bold text-lg shadow-sm">
                        {g.icon}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {g.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          Target Date: {g.targetDate}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                        {formatCurrency(totalGross)}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {' '}
                        / {formatCurrency(totalGross)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                      {pct}% Complete • {g.onTrack ? 'On Track' : 'Needs attention'}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono">
                      ₹{g.monthlyAutoDebit.toLocaleString('en-IN')} auto-invested monthly
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Uploaded Payslips (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-lg text-slate-900 dark:text-white font-bold">
                  Parsed Salary Slips
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Secure OCR verified against Form 26AS records
                </p>
              </div>
              <button
                className="text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:underline cursor-pointer"
                onClick={() => setActiveTab('upload-payslip')}
                type="button"
              >
                View All ({salarySlips.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {salarySlips.map((slip) => (
                <div
                  key={slip.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-between gap-3 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer flex-1"
                    onClick={() => openPayslipDetailModal(`${slip.month} ${slip.year}`)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-xl">description</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {slip.month} {slip.year}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-[10px] uppercase font-bold">
                          Verified
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Credited {slip.creditDate} • In-Hand:{' '}
                        <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                          {formatCurrency(totalGross)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-600 hover:text-white text-slate-600 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-slate-600 shadow-sm"
                      onClick={() => showToast(`Downloaded ${slip.month} Payslip PDF`, 'download')}
                      title="Download Original PDF"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">download</span>
                    </button>
                    <button
                      className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-600 hover:text-white text-slate-600 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-slate-600 shadow-sm"
                      onClick={() => openPayslipDetailModal(`${slip.month} ${slip.year}`)}
                      title="View Full Breakdown"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 mt-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-base font-bold">cloud_done</span>
              <span>Auto-sync with Zimyo / Darwinbox HRMS enabled</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">
              Updated 2h ago
            </span>
          </div>
        </div>
      </div>

      {/* Motivational Floating Banner */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 lg:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="material-symbols-outlined text-2xl font-bold">workspace_premium</span>
          </div>
          <div>
            <div className="text-sm lg:text-base text-slate-900 dark:text-white font-bold">
              You're in the Top 12% of first-year earners!
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              By sustaining an automated 38% savings rate, your estimated net worth at age 26 is projected to hit ₹8,40,000.
            </p>
          </div>
        </div>
        <button
          className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          onClick={() => setActiveTab('scenario-simulator')}
          type="button"
        >
          Explore 5-Year Wealth Path
        </button>
      </div>
    </div>
  );
};
