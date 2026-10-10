import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ScenarioSimulatorView: React.FC = () => {
  const { formatCurrency, showToast } = useApp();

  const [hikePercent, setHikePercent] = useState<number>(15);
  const [rentIncrease, setRentIncrease] = useState<number>(3000);
  const [gadgetEmi, setGadgetEmi] = useState<number>(0);
  const [sipStepUp, setSipStepUp] = useState<number>(10);

  // Math models
  const baseSalaryMonthly = 50000;
  const newSalaryMonthly = Math.round(baseSalaryMonthly * (1 + hikePercent / 100));
  const baseInHandMonthly = 43200;
  const newInHandMonthly = Math.round(baseInHandMonthly * (1 + (hikePercent * 0.85) / 100));

  const baseSipMonthly = 6000;
  const baseWealth3Yr = 324000; // Baseline at 6k/mo for 36 months + ~12% CAGR

  // Simulate 3-year net wealth
  const calculateSimulatedWealth = () => {
    // 36 months simulation
    let totalInvestedWealth = 0;
    let monthlySip = baseSipMonthly;
    
    // Net cash flow change: salary hike + extra in-hand minus rent increase minus EMI
    const monthlyCashflowDelta = (newInHandMonthly - baseInHandMonthly) - rentIncrease - gadgetEmi;
    
    // Sips step up each year by sipStepUp%
    for (let yr = 1; yr <= 3; yr++) {
      for (let m = 1; m <= 12; m++) {
        // Compound monthly with 12% annual return (1% monthly)
        totalInvestedWealth = (totalInvestedWealth + monthlySip + Math.max(0, monthlyCashflowDelta * 0.4)) * 1.01;
      }
      monthlySip = Math.round(monthlySip * (1 + sipStepUp / 100));
    }

    return Math.round(totalInvestedWealth);
  };

  const simulatedWealth = calculateSimulatedWealth();
  const netDifference = simulatedWealth - baseWealth3Yr;

  return (
    <div className="w-full px-4 lg:px-6 py-4 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-primary dark:text-[#818cf8] font-bold text-xl lg:text-2xl">
          <span className="material-symbols-outlined text-2xl">analytics</span>
          <h1 className="font-headline-lg text-2xl lg:text-3xl text-on-surface dark:text-white font-bold">
            Fresher Life Scenario Simulator
          </h1>
        </div>
        <p className="font-body-md text-sm text-on-surface-variant dark:text-slate-400 mt-1">
          Simulate appraisal hikes, rent spikes, gadgets on EMI, and annual SIP step-ups to see their impact on your 3-year net worth.
        </p>
      </div>

      {/* Projected 3-Year Wealth Output Banner */}
      <div className="bg-surface-container-lowest dark:bg-[#162032] rounded-3xl p-6 shadow-md border border-primary/20 dark:border-white/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-label-tag text-xs font-bold uppercase tracking-wider text-primary dark:text-[#818cf8]">
              PROJECTED 3-YEAR WEALTH OUTPUT
            </span>
            <div className="font-display-hero text-3xl lg:text-4xl text-primary dark:text-[#818cf8] font-black tracking-tight">
              {formatCurrency(simulatedWealth)}
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant dark:text-slate-400">
              Baseline would have been {formatCurrency(baseWealth3Yr)}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-tertiary-fixed/30 dark:bg-emerald-950/60 text-tertiary dark:text-emerald-400 font-bold text-sm border border-tertiary/20 dark:border-emerald-800/40 self-start md:self-auto">
            <span className="material-symbols-outlined text-lg">trending_up</span>
            <span>
              {netDifference >= 0 ? '+' : ''}
              {formatCurrency(netDifference)} Net Difference over 3 Years
            </span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Simulation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Annual Appraisal Hike */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest dark:bg-[#162032] shadow-sm border border-transparent dark:border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary dark:text-[#818cf8] text-xl">trending_up</span>
              <span className="font-headline-sm text-sm font-bold text-on-surface dark:text-white">
                1. Annual Appraisal Hike: {hikePercent}%
              </span>
            </div>
            <span className="font-label-mono-data text-xs font-bold text-primary dark:text-[#818cf8] bg-primary/10 px-2.5 py-1 rounded-lg">
              New: ₹{newInHandMonthly.toLocaleString('en-IN')}/mo
            </span>
          </div>

          <input
            className="w-full h-2 bg-surface-container-high dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
            max={50}
            min={0}
            step={5}
            type="range"
            value={hikePercent}
            onChange={(e) => setHikePercent(Number(e.target.value))}
          />

          <div className="flex justify-between text-xs text-on-surface-variant dark:text-slate-400 font-body-sm">
            <span>0% (Flat)</span>
            <span>20% (Standard)</span>
            <span>50% (Switch)</span>
          </div>
        </div>

        {/* 2. Rent Inflation / PG Upgrade */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest dark:bg-[#162032] shadow-sm border border-transparent dark:border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-error dark:text-rose-400 text-xl">apartment</span>
              <span className="font-headline-sm text-sm font-bold text-on-surface dark:text-white">
                2. Rent Inflation / PG Upgrade: +₹{rentIncrease.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="font-label-mono-data text-xs font-bold text-error dark:text-rose-400 bg-error/10 px-2.5 py-1 rounded-lg">
              +₹{(rentIncrease * 12).toLocaleString('en-IN')}/yr
            </span>
          </div>

          <input
            className="w-full h-2 bg-surface-container-high dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-error"
            max={12000}
            min={0}
            step={1000}
            type="range"
            value={rentIncrease}
            onChange={(e) => setRentIncrease(Number(e.target.value))}
          />

          <div className="flex justify-between text-xs text-on-surface-variant dark:text-slate-400 font-body-sm">
            <span>+₹0 (Stayed)</span>
            <span>+₹4,000 (1BHK Upgrade)</span>
            <span>+₹12,000 (Solo Studio)</span>
          </div>
        </div>

        {/* 3. Gadget / Phone EMI */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest dark:bg-[#162032] shadow-sm border border-transparent dark:border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary dark:text-purple-400 text-xl">devices</span>
              <span className="font-headline-sm text-sm font-bold text-on-surface dark:text-white">
                3. Gadget / Phone EMI: ₹{gadgetEmi.toLocaleString('en-IN')}/mo
              </span>
            </div>
            <span className="font-label-tag text-xs font-bold text-on-surface dark:text-white">
              {gadgetEmi === 0 ? 'No Active EMI' : '6 Mo. No-Cost EMI'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              className={`p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                gadgetEmi === 0
                  ? 'bg-primary dark:bg-indigo-600 text-white shadow-sm'
                  : 'bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-slate-300'
              }`}
              onClick={() => setGadgetEmi(0)}
              type="button"
            >
              ₹0 (None)
            </button>
            <button
              className={`p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                gadgetEmi === 6500
                  ? 'bg-primary dark:bg-indigo-600 text-white shadow-sm'
                  : 'bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-slate-300'
              }`}
              onClick={() => setGadgetEmi(6500)}
              type="button"
            >
              iPhone (₹6.5k/mo)
            </button>
            <button
              className={`p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                gadgetEmi === 12000
                  ? 'bg-primary dark:bg-indigo-600 text-white shadow-sm'
                  : 'bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-slate-300'
              }`}
              onClick={() => setGadgetEmi(12000)}
              type="button"
            >
              MacBook (₹12k/mo)
            </button>
          </div>
        </div>

        {/* 4. Annual SIP Step-Up */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest dark:bg-[#162032] shadow-sm border border-transparent dark:border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary dark:text-emerald-400 text-xl">rocket_launch</span>
              <span className="font-headline-sm text-sm font-bold text-on-surface dark:text-white">
                4. Annual SIP Step-Up: {sipStepUp}%
              </span>
            </div>
            <span className="font-label-tag text-xs font-bold text-tertiary dark:text-emerald-400">
              Compounds annually
            </span>
          </div>

          <input
            className="w-full h-2 bg-surface-container-high dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-tertiary"
            max={25}
            min={0}
            step={5}
            type="range"
            value={sipStepUp}
            onChange={(e) => setSipStepUp(Number(e.target.value))}
          />

          <div className="flex justify-between text-xs text-on-surface-variant dark:text-slate-400 font-body-sm">
            <span>0% (Fixed SIP)</span>
            <span>10% (Recommended)</span>
            <span>25% (Super Saver)</span>
          </div>
        </div>
      </div>

      {/* Trajectory Breakdown Table */}
      <div className="p-5 rounded-3xl bg-surface-container-lowest dark:bg-[#162032] shadow-sm space-y-3 border border-transparent dark:border-white/5">
        <h3 className="font-headline-sm text-sm font-bold text-on-surface dark:text-white">
          Year-by-Year Net Worth Trajectory
        </h3>
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 rounded-xl bg-surface-container-low dark:bg-slate-800">
            <span className="text-on-surface-variant dark:text-slate-400 block">End of Year 1</span>
            <span className="font-label-currency-md text-base font-bold text-on-surface dark:text-white mt-1 block">
              {formatCurrency(Math.round(simulatedWealth * 0.28))}
            </span>
            <span className="text-[10px] text-tertiary dark:text-emerald-400 font-bold">Foundation Built</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low dark:bg-slate-800">
            <span className="text-on-surface-variant dark:text-slate-400 block">End of Year 2</span>
            <span className="font-label-currency-md text-base font-bold text-on-surface dark:text-white mt-1 block">
              {formatCurrency(Math.round(simulatedWealth * 0.61))}
            </span>
            <span className="text-[10px] text-tertiary dark:text-emerald-400 font-bold">Compounding Starts</span>
          </div>
          <div className="p-3 rounded-xl bg-primary/10 dark:bg-indigo-950/40 border border-primary/20">
            <span className="text-primary dark:text-[#818cf8] font-bold block">End of Year 3</span>
            <span className="font-label-currency-md text-base font-bold text-primary dark:text-[#818cf8] mt-1 block">
              {formatCurrency(simulatedWealth)}
            </span>
            <span className="text-[10px] text-primary dark:text-[#818cf8] font-bold">Target Reached 🎯</span>
          </div>
        </div>
      </div>
    </div>
  );
};
