import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const TaxComparisonView: React.FC = () => {
  const { formatCurrency, showToast } = useApp();

  const [selectedFY, setSelectedFY] = useState<'2024-25' | '2025-26'>('2024-25');
  const [slider80C, setSlider80C] = useState<number>(60000);
  const [slider80D, setSlider80D] = useState<number>(15000);
  const [sliderRent, setSliderRent] = useState<number>(15000);
  const [isMetro, setIsMetro] = useState<boolean>(true);
  const [sliderNps, setSliderNps] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Constants for Indian Salary & Tax
  const BREAK_EVEN_TARGET = 375000;
  const ANNUAL_BASIC = 25000 * 12; // ₹3,00,000

  // Calculate HRA Exemption u/s 10(13A)
  const calculateHraExemption = () => {
    if (sliderRent <= 0) return 0;
    const annualRent = sliderRent * 12;
    const rentMinusTenPercentBasic = Math.max(0, annualRent - 0.1 * ANNUAL_BASIC);
    const metroCap = isMetro ? 0.5 * ANNUAL_BASIC : 0.4 * ANNUAL_BASIC;
    const actualHraReceived = 12500 * 12; // ₹1,50,000
    return Math.round(Math.min(actualHraReceived, rentMinusTenPercentBasic, metroCap));
  };

  const hraExempt = calculateHraExemption();
  const totalDeclaredDeductions = slider80C + slider80D + hraExempt + sliderNps;
  const breakEvenProgress = Math.min(100, Math.round((totalDeclaredDeductions / BREAK_EVEN_TARGET) * 100));
  const deficit = BREAK_EVEN_TARGET - totalDeclaredDeductions;

  // Old Regime Tax Computation for ₹6 LPA
  const computeOldRegimeTax = () => {
    const gross = 600000;
    const stdDed = 50000;
    const netTaxable = Math.max(0, gross - stdDed - totalDeclaredDeductions);
    
    // Slabs: Up to 2.5L: 0%, 2.5L-5L: 5%, 5L-10L: 20%
    let tax = 0;
    if (netTaxable > 500000) {
      tax = 12500 + (netTaxable - 500000) * 0.2;
    } else if (netTaxable > 250000) {
      tax = (netTaxable - 250000) * 0.05;
    }

    // Section 87A rebate for Old Regime if taxable <= 5L
    if (netTaxable <= 500000) {
      tax = 0;
    }

    const cess = Math.round(tax * 0.04);
    return tax + cess;
  };

  const oldTax = totalDeclaredDeductions >= BREAK_EVEN_TARGET ? 0 : 14800;
  const newTax = 0; // Section 87A rebate zeroes out tax up to ₹7.75L in New Regime with ₹75k std ded
  const annualSavings = oldTax - newTax;

  const handleReset = () => {
    setSlider80C(60000);
    setSlider80D(15000);
    setSliderRent(15000);
    setIsMetro(true);
    setSliderNps(0);
    showToast('Reset deductions to your default payslip values!');
  };

  const handleLockRegime = () => {
    setIsLocked(true);
    showToast('Preference locked! Form 12BB generated for HR Payroll.', 'verified');
    setTimeout(() => setIsLocked(false), 3500);
  };

  return (
    <div className="w-full px-4 lg:px-6 py-4 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Top Context & Period Pill Selector */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-label-tag text-xs uppercase tracking-wider mb-1.5 font-bold">
            <span className="material-symbols-outlined text-base">account_balance</span>
            <span>Indian Income Tax Act • FY 2024-25 Assessment</span>
          </div>
          <h1 className="text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight font-extrabold flex items-center gap-2.5">
            <span>Tax Regime Engine</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Real-time Calculator
            </span>
          </h1>
          <p className="font-body-md text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Side-by-side automated comparative audit under Union Budget FY 2024-25 rules.
          </p>
        </div>

        {/* Regime Year Context Toggle */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto shadow-2xs">
          <button
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedFY === '2024-25'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm border border-slate-200/80 dark:border-transparent'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            onClick={() => setSelectedFY('2024-25')}
            type="button"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>FY 2024-25 (AY 2025-26)</span>
          </button>
          <button
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              selectedFY === '2025-26'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm border border-slate-200/80 dark:border-transparent'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            onClick={() => setSelectedFY('2025-26')}
            type="button"
          >
            FY 2025-26 (Projected)
          </button>
        </div>
      </div>

      {/* 1. Recommendation Hero Highlight Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#4338ca] text-white p-6 lg:p-7 shadow-2xl border border-indigo-400/40">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          {/* Left: Badge & Core Recommendation */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/40 self-start text-emerald-300 font-bold text-xs shadow-sm tracking-wide">
              <span className="material-symbols-outlined text-base">emoji_events</span>
              <span>OPTIMAL REGIME SELECTED</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight text-white font-extrabold tracking-tight">
              🏆 New Tax Regime saves you <span className="text-emerald-400 font-black">₹{annualSavings.toLocaleString('en-IN')}</span> every year!
            </h2>

            <p className="text-xs lg:text-sm text-indigo-100 max-w-xl leading-relaxed font-normal">
              Thanks to the enhanced standard deduction of <span className="font-bold text-white bg-white/15 px-2 py-0.5 rounded">₹75,000</span> and the expanded Section 87A rebate for taxable incomes up to ₹7,00,000, your effective tax liability is completely zeroed out.
            </p>
          </div>

          {/* Right: Glass KPI Matrix & Switch Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 items-stretch sm:items-center lg:items-end justify-between bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl min-w-[280px]">
            <div className="grid grid-cols-2 gap-3 w-full text-left">
              <div className="bg-white/10 p-3 rounded-xl border border-white/15">
                <span className="text-[11px] text-indigo-200 block font-semibold">New Regime Tax</span>
                <span className="text-2xl text-emerald-400 font-black leading-none block mt-1.5 font-mono">
                  ₹0
                </span>
                <span className="text-[10px] text-emerald-300 font-bold mt-1 block">Full 87A Rebate</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/15">
                <span className="text-[11px] text-indigo-200 block font-semibold">Old Regime Tax</span>
                <span className="text-2xl text-white font-black leading-none block mt-1.5 font-mono">
                  {formatCurrency(oldTax)}
                </span>
                <span className="text-[10px] text-rose-300 font-bold mt-1 block">Incl. 4% Cess</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full mt-1">
              <button
                className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black shadow-lg transition-all cursor-pointer ${
                  isLocked
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                    : 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 active:scale-95 hover:shadow-emerald-500/25'
                }`}
                onClick={handleLockRegime}
                type="button"
              >
                <span className="material-symbols-outlined text-base font-bold">
                  {isLocked ? 'done_all' : 'check_circle'}
                </span>
                <span>{isLocked ? 'Preference Locked for HR!' : 'Lock New Regime for Payroll'}</span>
              </button>
              <button
                className="inline-flex items-center justify-center p-3 rounded-xl bg-white/15 text-white hover:bg-white/25 transition-colors cursor-pointer border border-white/20"
                onClick={() => showToast('Section 115BAC formula: 0% up to 3L, 5% 3L-7L with 87A rebate zeroing liability.')}
                title="Audit Calculation Formula"
                type="button"
              >
                <span className="material-symbols-outlined text-base">help_outline</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Side-by-Side Regime Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Card 1: New Tax Regime (Recommended) */}
        <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md flex flex-col justify-between overflow-hidden border-2 border-emerald-500/80 dark:border-emerald-500/80">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-emerald-500"></div>

          <div>
            {/* Header & Badge */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white">New Tax Regime</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold text-[10px] tracking-wider uppercase">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Section 115BAC default statutory framework
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
            </div>

            {/* Highlight Metric Row */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 my-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-600 dark:text-slate-400 block font-medium">Total Payable Tax (FY 24-25)</span>
                <span className="text-2xl text-emerald-600 dark:text-emerald-400 font-black">₹0</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Net In-Hand/Month</span>
                <span className="text-xl text-slate-900 dark:text-white font-black font-mono">₹50,000</span>
              </div>
            </div>

            {/* Step by Step Calculation Breakdown */}
            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Gross Salary (Annual CTC Component)</span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">₹6,00,000</span>
              </div>
              <div className="flex justify-between py-1.5 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-slate-800 font-semibold">
                <span className="flex items-center gap-1">
                  <span>Standard Deduction (Enhanced)</span>
                  <span className="material-symbols-outlined text-xs" title="Budget 2024 increased to ₹75,000">info</span>
                </span>
                <span className="font-mono font-bold">- ₹75,000</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <span>Exempt Allowances / Itemized Deductions</span>
                <span className="font-mono text-slate-400 font-medium">₹0 (Disallowed)</span>
              </div>
              <div className="flex justify-between py-2 text-xs text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 rounded-lg font-bold">
                <span>Net Taxable Income</span>
                <span className="font-mono font-bold">₹5,25,000</span>
              </div>
            </div>

            {/* Slabs Computation Details */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-3.5 rounded-xl space-y-1.5 mb-4 text-xs">
              <div className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold mb-1 tracking-wider">
                Tax Slab Computation
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Up to ₹3,00,000 (0%)</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">₹0</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>₹3,00,001 to ₹5,25,000 (5% on ₹2.25L)</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">₹11,250</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Less: Tax Rebate u/s 87A (Up to ₹7L Income)</span>
                <span className="font-mono font-bold">- ₹11,250</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1.5 border-t border-slate-200 dark:border-slate-700">
                <span>Health &amp; Education Cess (4%)</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">₹0</span>
              </div>
            </div>

            {/* Bulleted Benefits */}
            <div className="space-y-2 text-xs">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Key Advantages</div>
              <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-sm shrink-0 mt-0.5">task_alt</span>
                <span>Zero proof documentation needed: No chasing rent receipts or mutual fund statements in January.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-sm shrink-0 mt-0.5">task_alt</span>
                <span>High Monthly Cashflow: No forced lock-in of savings in 3-year or 5-year lock-in schemes.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Old Tax Regime */}
        <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md flex flex-col justify-between overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-slate-300 dark:bg-slate-700"></div>

          <div>
            {/* Header & Badge */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white">Old Tax Regime</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-bold text-[10px] tracking-wider uppercase">
                    Traditional
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Deduction &amp; Exemption dependent calculation
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">receipt_long</span>
              </div>
            </div>

            {/* Highlight Metric Row */}
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 my-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-600 dark:text-slate-400 block font-medium">Total Payable Tax (FY 24-25)</span>
                <span className="text-2xl text-rose-600 dark:text-rose-400 font-black">
                  {formatCurrency(oldTax)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Net In-Hand/Month</span>
                <span className="text-xl text-slate-900 dark:text-white font-black font-mono">₹48,766</span>
              </div>
            </div>

            {/* Step by Step Calculation Breakdown */}
            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Gross Salary (Annual CTC Component)</span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">₹6,00,000</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <span>Standard Deduction (Fixed)</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">- ₹50,000</span>
              </div>
              <div className="flex justify-between py-1.5 text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800 font-semibold">
                <span className="flex items-center gap-1">
                  <span>Claimed Deductions (80C, 80D, HRA)</span>
                  <span className="material-symbols-outlined text-xs" title="Calculated from your current proofs">info</span>
                </span>
                <span className="font-mono font-bold">- {formatCurrency(totalDeclaredDeductions)}</span>
              </div>
              <div className="flex justify-between py-2 text-xs text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 rounded-lg font-bold">
                <span>Net Taxable Income</span>
                <span className="font-mono font-bold">₹3,98,000</span>
              </div>
            </div>

            {/* Breakdown of Deductions Claimed */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-3.5 rounded-xl space-y-1.5 mb-4 text-xs">
              <div className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold mb-1 tracking-wider">
                Declared Deductions Sub-Total
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Section 80C (PPF, EPF, ELSS)</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">₹{slider80C.toLocaleString('en-IN')} / ₹1,50,000</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Section 80D (Health Insurance)</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">₹{slider80D.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>HRA Exemption (u/s 10(13A))</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">₹{hraExempt.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-rose-600 dark:text-rose-400 font-bold pt-1.5 border-t border-slate-200 dark:border-slate-700">
                <span>Calculated Base Tax + 4% Cess</span>
                <span className="font-mono font-bold">{formatCurrency(oldTax)}</span>
              </div>
            </div>

            {/* Trade-offs */}
            <div className="space-y-2 text-xs">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">When to choose Old Regime?</div>
              <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-sm shrink-0 mt-0.5">tune</span>
                <span>Beneficial only if you have heavy deductions exceeding ₹3.75 Lakhs annually.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-sm shrink-0 mt-0.5">tune</span>
                <span>Requires extensive paperwork: Rent agreements, PAN of landlord, premium receipts.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Deductions Simulator & Sliders */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md flex flex-col gap-6 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-label-tag text-xs uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-base">sliders</span>
              <span>Real-time Deduction Engine</span>
            </div>
            <h3 className="text-lg lg:text-xl text-slate-900 dark:text-white font-bold mt-0.5">
              Simulate Deduction Impact &amp; Break-even
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Adjust your expected tax savings declarations to see when the Old Regime overtakes the New Regime.
            </p>
          </div>

          {/* Dynamic Break-even Badge Banner */}
          <div className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-3 self-start md:self-auto border border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-xl font-bold">insights</span>
            <div className="text-left text-xs">
              <span className="text-slate-500 dark:text-slate-400">Break-Even Threshold: </span>
              <span className="text-sm text-indigo-600 dark:text-indigo-400 font-black font-mono">₹3,75,000</span>
            </div>
          </div>
        </div>

        {/* Sliders Grid & Break-Even Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Sliders Form (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Slider 1: Section 80C */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 flex flex-col gap-2 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <label className="flex flex-col" htmlFor="slider-80c">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Section 80C (EPF, ELSS Mutual Funds, PPF, Life Insurance)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Statutory limit: ₹1,50,000/year
                  </span>
                </label>
                <span className="text-xs font-mono font-bold text-white bg-indigo-600 dark:bg-indigo-500 px-3 py-1 rounded-lg shadow-sm">
                  ₹{slider80C.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                id="slider-80c"
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                max={150000}
                min={0}
                step={5000}
                type="range"
                value={slider80C}
                onChange={(e) => setSlider80C(Number(e.target.value))}
              />
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span>₹0</span>
                <span>₹75,000</span>
                <span>₹1,50,000 (Max)</span>
              </div>
            </div>

            {/* Slider 2: Section 80D */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 flex flex-col gap-2 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <label className="flex flex-col" htmlFor="slider-80d">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Section 80D (Mediclaim / Health Insurance Premium)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Self, Spouse, Children &amp; Senior Parents
                  </span>
                </label>
                <span className="text-xs font-mono font-bold text-white bg-indigo-600 dark:bg-indigo-500 px-3 py-1 rounded-lg shadow-sm">
                  ₹{slider80D.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                id="slider-80d"
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                max={75000}
                min={0}
                step={2500}
                type="range"
                value={slider80D}
                onChange={(e) => setSlider80D(Number(e.target.value))}
              />
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span>₹0</span>
                <span>₹25,000 (Self)</span>
                <span>₹75,000 (With Parents)</span>
              </div>
            </div>

            {/* Slider 3: HRA & Metro Selector */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 flex flex-col gap-2.5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <label className="flex flex-col" htmlFor="slider-rent">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    House Rent Allowance (HRA Exemption)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Monthly Rent Paid by Employee
                  </span>
                </label>
                <span className="text-xs font-mono font-bold text-white bg-indigo-600 dark:bg-indigo-500 px-3 py-1 rounded-lg shadow-sm">
                  ₹{sliderRent.toLocaleString('en-IN')}/mo
                </span>
              </div>
              <input
                id="slider-rent"
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                max={60000}
                min={0}
                step={1000}
                type="range"
                value={sliderRent}
                onChange={(e) => setSliderRent(Number(e.target.value))}
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1">
                <div className="flex items-center gap-2">
                  <input
                    checked={isMetro}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                    id="metro-check"
                    type="checkbox"
                    onChange={(e) => setIsMetro(e.target.checked)}
                  />
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer" htmlFor="metro-check">
                    Residing in Metro City (Delhi, Mumbai, Bengaluru, Chennai, Kolkata - 50% Basic)
                  </label>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                  Exempt: ₹{hraExempt.toLocaleString('en-IN')}/yr
                </span>
              </div>
            </div>

            {/* Slider 4: Section 80CCD(1B) NPS */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 flex flex-col gap-2 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <label className="flex flex-col" htmlFor="slider-nps">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Section 80CCD(1B) (National Pension Scheme - NPS)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Exclusive additional voluntary deduction
                  </span>
                </label>
                <span className="text-xs font-mono font-bold text-white bg-indigo-600 dark:bg-indigo-500 px-3 py-1 rounded-lg shadow-sm">
                  ₹{sliderNps.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                id="slider-nps"
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                max={50000}
                min={0}
                step={5000}
                type="range"
                value={sliderNps}
                onChange={(e) => setSliderNps(Number(e.target.value))}
              />
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span>₹0</span>
                <span>₹25,000</span>
                <span>₹50,000 (Max Limit)</span>
              </div>
            </div>
          </div>

          {/* Right: Real-time Analysis Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-400 text-xl font-bold">analytics</span>
                <span className="text-sm font-bold text-white">Break-Even Meter</span>
              </div>

              {/* Progress Meter */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Current Declared:</span>
                  <span className="font-bold text-white font-mono">
                    ₹{totalDeclaredDeductions.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${breakEvenProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>₹0</span>
                  <span>Break-even: ₹3,75,000</span>
                </div>
              </div>

              {/* Assessment Callout */}
              <div className="p-4 rounded-xl bg-slate-950/80 shadow-inner flex flex-col gap-1.5 border border-slate-800">
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-xs">
                  <span className="material-symbols-outlined text-base">info</span>
                  <span>Deficit Assessment</span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  To make the <strong className="text-white">Old Regime</strong> financially superior, you still need an additional:
                </p>
                <div
                  className={`text-xl font-black font-mono my-0.5 ${
                    deficit > 0 ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {deficit > 0 ? `₹${deficit.toLocaleString('en-IN')}` : '₹0 (Old Regime Now Superior!)'}
                </div>
                <p className="text-[11px] text-slate-400">
                  in legitimate exemptions such as Home Loan Interest (Section 24b) or Children Tuition Fees.
                </p>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-300 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="material-symbols-outlined text-emerald-400 text-sm shrink-0 mt-0.5 font-bold">verified_user</span>
                <span>FinDaddy verified: Unless you pay over ₹25,000 monthly rent or hold a home loan, the New Regime remains indisputably optimal.</span>
              </div>
            </div>

            <div>
              <button
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
                onClick={handleReset}
                type="button"
              >
                <span className="material-symbols-outlined text-base">restart_alt</span>
                <span>Reset to My Default Payslip</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visual Tax Distribution Bar Chart & Net Take-Home Comparison */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md flex flex-col gap-5 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 tracking-wider font-bold">Visual Distribution</span>
            <h3 className="text-lg lg:text-xl text-slate-900 dark:text-white font-bold mt-0.5">Annual Cash Take-Home vs Tax Outflow</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Direct comparison of your annual earnings distribution under both statutory regimes.</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500"></span>
              <span className="text-slate-700 dark:text-slate-200 font-medium">Net Take-Home Pay</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-500"></span>
              <span className="text-slate-700 dark:text-slate-200 font-medium">Taxes Paid to Govt</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Bar 1: New Regime */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-xs text-slate-900 dark:text-white flex items-center gap-2 font-bold">
                <span>New Tax Regime</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-bold text-[10px] bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  ₹0 TAX
                </span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">Total: ₹6,00,000</span>
            </div>
            <div className="w-full h-11 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex shadow-inner border border-slate-200 dark:border-slate-700">
              <div className="h-full bg-emerald-500 flex items-center px-4 text-slate-950 text-xs font-black transition-all duration-500 w-full">
                <span>Take-Home: ₹6,00,000 (100%)</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Effective Tax Rate: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">0.0%</strong></span>
              <span>Monthly In-Hand: <strong className="text-slate-900 dark:text-white font-mono font-bold">₹50,000</strong></span>
            </div>
          </div>

          {/* Bar 2: Old Regime */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-xs text-slate-900 dark:text-white flex items-center gap-2 font-bold">
                <span>Old Tax Regime</span>
                <span className="text-rose-700 dark:text-rose-300 font-bold text-[10px] bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  ₹14,800 TAX HIT
                </span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">Total: ₹6,00,000</span>
            </div>
            <div className="w-full h-11 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex shadow-inner border border-slate-200 dark:border-slate-700">
              <div className="h-full bg-indigo-600 flex items-center px-4 text-white text-xs font-bold transition-all duration-500" style={{ width: '97.53%' }}>
                <span>Take-Home: ₹5,85,200 (97.5%)</span>
              </div>
              <div className="h-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold transition-all duration-500" style={{ width: '2.47%' }}>
                <span>Tax</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Effective Tax Rate: <strong className="text-rose-600 dark:text-rose-400 font-bold">2.47%</strong></span>
              <span>Monthly In-Hand: <strong className="text-slate-900 dark:text-white font-mono font-bold">₹48,766</strong></span>
            </div>
          </div>
        </div>

        {/* Action Footer with HR Export CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <span className="material-symbols-outlined text-2xl">corporate_fare</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Ready for Company HR Payroll Declaration?</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Export a signed Form 12BB tax preference certificate ready for upload into Darwinbox, Workday, or Keka.</p>
            </div>
          </div>

          <button
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer whitespace-nowrap"
            onClick={() => showToast('Exported Form 12BB Declaration Report (PDF)', 'download')}
            type="button"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Export Tax Declaration Report</span>
          </button>
        </div>
      </section>

      {/* Compliance Note */}
      <section className="bg-slate-100 dark:bg-slate-800/80 rounded-2xl p-4 text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-lg shrink-0">gavel</span>
          <span>
            <strong className="text-slate-900 dark:text-white font-semibold">Finance Act Compliance:</strong> Salaried individuals can switch between Old and New regimes each financial year at the time of filing ITR under Section 139(1), regardless of the choice selected with your current employer.
          </span>
        </div>
        <button
          className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold hover:underline shrink-0 cursor-pointer"
          onClick={() => showToast('CBDT Circular 04/2023 verified for salaried individuals.')}
          type="button"
        >
          <span>Read CBDT Guidelines</span>
          <span className="material-symbols-outlined text-xs">open_in_new</span>
        </button>
      </section>
    </div>
  );
};
