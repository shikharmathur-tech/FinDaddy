import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MobileSimulatorModal: React.FC = () => {
  const {
    isMobileSimulatorOpen,
    setIsMobileSimulatorOpen,
    formatCurrency,
    setActiveTab,
    openPayslipDetailModal,
    openAddGoalModal,
    setIsFinDaddyOpen,
  } = useApp();

  const [preset, setPreset] = useState<'iphone15' | 'pixel8' | 'compact'>('iphone15');
  const [zoomScale, setZoomScale] = useState<number>(1);

  if (!isMobileSimulatorOpen) return null;

  const deviceDimensions = {
    iphone15: { width: 390, height: 810, radius: '40px', name: 'iPhone 15/16 Pro (390 × 844)' },
    pixel8: { width: 412, height: 850, radius: '36px', name: 'Google Pixel 8 (412 × 892)' },
    compact: { width: 360, height: 740, radius: '32px', name: 'Compact Mini (360 × 740)' },
  };

  const currDim = deviceDimensions[preset];

  const handleMobileTabClick = (tab: 'dashboard' | 'payslip' | 'goals' | 'ai') => {
    if (tab === 'dashboard') {
      setActiveTab('dashboard');
    } else if (tab === 'payslip') {
      openPayslipDetailModal('October 2024');
    } else if (tab === 'goals') {
      openAddGoalModal();
    } else if (tab === 'ai') {
      setIsFinDaddyOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="flex flex-col items-center max-w-full my-auto py-2">
        {/* Controls Bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 mb-3 bg-surface-container-lowest/95 dark:bg-[#1e293b]/95 backdrop-blur-md rounded-2xl shadow-xl border border-surface-container-high dark:border-slate-700 w-full max-w-[500px] text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-[#a5b4fc] text-base">devices</span>
            <select
              className="bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-slate-200 border border-surface-container-high dark:border-slate-700 rounded-lg px-2 py-1 text-xs outline-none cursor-pointer font-semibold"
              value={preset}
              onChange={(e) => setPreset(e.target.value as 'iphone15' | 'pixel8' | 'compact')}
            >
              <option value="iphone15">iPhone 15/16 Pro (390 × 844)</option>
              <option value="pixel8">Google Pixel 8 (412 × 892)</option>
              <option value="compact">Compact Mini (360 × 740)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              className="px-2 py-1 rounded-lg bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:text-on-surface dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              onClick={() => setZoomScale((prev) => (prev === 1 ? 0.85 : 1))}
              title="Toggle Zoom Scale"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">zoom_in</span>
              <span>{Math.round(zoomScale * 100)}%</span>
            </button>
            <button
              className="px-2.5 py-1 rounded-lg bg-error-container/60 hover:bg-error-container text-error dark:text-rose-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
              onClick={() => setIsMobileSimulatorOpen(false)}
              title="Exit Mobile Preview"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Chassis Phone Frame */}
        <div
          className="relative transition-all duration-300 origin-top flex justify-center"
          style={{ transform: `scale(${zoomScale})` }}
        >
          <div
            className="relative bg-slate-950 rounded-[50px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_2px_rgba(255,255,255,0.15)] ring-1 ring-slate-800 transition-all duration-300"
            style={{ width: `${currDim.width}px`, height: `${currDim.height}px` }}
          >
            {/* Physical Buttons on Chassis */}
            <div className="absolute -left-1 top-24 w-1 h-7 bg-slate-700 rounded-l"></div>
            <div className="absolute -left-1 top-36 w-1 h-12 bg-slate-700 rounded-l"></div>
            <div className="absolute -left-1 top-52 w-1 h-12 bg-slate-700 rounded-l"></div>
            <div className="absolute -right-1 top-32 w-1 h-16 bg-slate-700 rounded-r"></div>

            {/* Inner Screen */}
            <div
              className="w-full h-full bg-background dark:bg-[#0b1120] overflow-hidden flex flex-col relative border border-slate-800/80"
              style={{ borderRadius: currDim.radius }}
            >
              {/* Mobile Status Bar with Dynamic Island */}
              <div className="h-10 bg-surface-container-low dark:bg-[#0f172a] px-6 flex items-center justify-between text-[11px] font-bold text-on-surface dark:text-white flex-shrink-0 z-30 select-none border-b border-surface-container-high/40 dark:border-slate-800/60">
                <span>9:41</span>
                <div className="w-24 h-4.5 bg-black rounded-full mx-auto flex items-center justify-center gap-1.5 px-2">
                  <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse"></span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs leading-none">signal_cellular_alt</span>
                  <span className="material-symbols-outlined text-xs leading-none">wifi</span>
                  <span className="material-symbols-outlined text-sm leading-none">battery_full</span>
                </div>
              </div>

              {/* Mobile App Header */}
              <div className="h-13 px-3.5 bg-surface/90 dark:bg-[#0f172a]/95 backdrop-blur-md flex items-center justify-between border-b dark:border-slate-800 flex-shrink-0 z-20">
                <div className="flex items-center gap-2">
                  <img
                    alt="FinDaddy Logo"
                    className="h-6 w-auto object-contain"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1XyxWNFAXrWEDy9ZxGCs0z8TUI_l3yX_NshGTkgEKgo_Up1D5CWIeQhMGG70P_xn_EnY2nrZXB3Jfm25WHIaTAcbGgP08yJcE669X7xc7OcTzm-7cNaFaQtm6ypNzz7dt5CVQbWYkg8tA95AaoQS-4cY-H3R7MLbLpqtE5eTCljvdk7gBIj6ZsKzJwqJlsinwNa9IBqfB4FmZuhcMLmE5qb2tKC7BIp4hUnM9ijqAF7HWmM8LFlst5KxARI"
                  />
                  <div>
                    <span className="font-headline-sm text-sm text-primary dark:text-[#818cf8] font-bold leading-none block">
                      FinDaddy
                    </span>
                    <span className="text-[9px] text-on-surface-variant dark:text-slate-400 font-mono">Mobile 390px</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    ₹
                  </div>
                  <img
                    alt="Ananya"
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-primary/30"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdieKsnLV-vhK_xb66TQPLLQViieeSqsdl8otIrzQez5Sf2jvmdJu5YARbamWbADD8cv6Eg7OmXSN7F8jcgPqNMSvf9CLREnP8b_qxxF5ZafvzfiCX5RBfShgE8PqyFoECDYO1si9KSz8slqXVem_xE1c8JghTOddVg0GCVp-EYoA5ZzHhbN1wFj72gpYYSNSLFNxBwTyyAmWue_gFyrwGADkeCrB901Tbw3b2mYcaxYXLi1-ZaiQqaA"
                  />
                </div>
              </div>

              {/* Scrollable Mobile Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3 no-scrollbar">
                {/* Greeting Hero */}
                <div className="rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary text-white p-3.5 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-tertiary-fixed">
                      4 Mo. Streak
                    </span>
                    <span className="text-[10px] font-mono text-white/80">Oct 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold leading-tight">Welcome, Ananya!</h4>
                      <p className="text-xs text-white/80 mt-0.5">Take-Home: <span className="font-bold font-mono">₹43,200</span></p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-black leading-none text-tertiary-fixed">84</span>
                      <span className="text-[7px] uppercase tracking-wider text-white/80">/100</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/20">
                    <button
                      className="py-1.5 px-2 rounded-xl bg-white text-primary text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                      onClick={() => openPayslipDetailModal('October 2024')}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">document_scanner</span>
                      <span>Scan Slip</span>
                    </button>
                    <button
                      className="py-1.5 px-2 rounded-xl bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1"
                      onClick={() => setIsFinDaddyOpen(true)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      <span>Ask AI</span>
                    </button>
                  </div>
                </div>

                {/* Primary Metric Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-surface-container-lowest dark:bg-[#162032] p-2.5 rounded-xl border border-transparent dark:border-white/5 shadow-sm">
                    <span className="text-[10px] text-on-surface-variant dark:text-slate-400 block">Gross CTC</span>
                    <span className="text-sm font-bold text-on-surface dark:text-white font-mono mt-0.5 block">₹50,000</span>
                    <span className="text-[9px] text-tertiary dark:text-emerald-400 font-bold">+8.0% YoY</span>
                  </div>
                  <div className="bg-surface-container-lowest dark:bg-[#162032] p-2.5 rounded-xl border border-transparent dark:border-white/5 shadow-sm">
                    <span className="text-[10px] text-on-surface-variant dark:text-slate-400 block">Savings Rate</span>
                    <span className="text-sm font-bold text-primary dark:text-[#818cf8] font-mono mt-0.5 block">38.0%</span>
                    <span className="text-[9px] text-tertiary dark:text-emerald-400 font-bold">Target Exceeded 🎯</span>
                  </div>
                </div>

                {/* Waterfall */}
                <div className="bg-surface-container-lowest dark:bg-[#162032] p-3 rounded-2xl border border-transparent dark:border-white/5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-on-surface dark:text-white">Waterfall Breakdown</h5>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:text-[#818cf8] font-semibold">New Regime</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container dark:bg-slate-800 overflow-hidden flex">
                    <div className="h-full bg-primary" style={{ width: '26.4%' }}></div>
                    <div className="h-full bg-tertiary" style={{ width: '24.0%' }}></div>
                    <div className="h-full bg-secondary" style={{ width: '36.0%' }}></div>
                    <div className="h-full bg-error" style={{ width: '13.6%' }}></div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between items-center py-0.5 border-b dark:border-slate-800">
                      <span className="text-on-surface-variant dark:text-slate-400 text-[11px]">In-Hand Net</span>
                      <span className="font-bold font-mono text-on-surface dark:text-white">₹43,200</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b dark:border-slate-800">
                      <span className="text-on-surface-variant dark:text-slate-400 text-[11px]">TDS Income Tax</span>
                      <span className="font-bold font-mono text-error dark:text-rose-400">-₹4,800</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-on-surface-variant dark:text-slate-400 text-[11px]">EPF + PT</span>
                      <span className="font-bold font-mono text-on-surface-variant dark:text-slate-300">-₹2,000</span>
                    </div>
                  </div>
                </div>

                {/* 50/30/20 Mini */}
                <div className="bg-surface-container-lowest dark:bg-[#162032] p-3 rounded-2xl border border-transparent dark:border-white/5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-on-surface dark:text-white">50/30/20 Budget Tracker</h5>
                    <span className="text-[9px] text-tertiary dark:text-emerald-400 font-bold">Optimal</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-on-surface dark:text-slate-300">Needs (45%)</span>
                        <span className="font-mono font-bold">₹22,500</span>
                      </div>
                      <div className="w-full bg-surface-container dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5">
                        <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-on-surface dark:text-slate-300">Wants (23%)</span>
                        <span className="font-mono font-bold">₹11,500</span>
                      </div>
                      <div className="w-full bg-surface-container dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5">
                        <div className="bg-secondary-container h-full rounded-full" style={{ width: '23%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-on-surface dark:text-slate-300">Wealth &amp; SIP (32%)</span>
                        <span className="font-mono font-bold text-tertiary dark:text-emerald-400">₹16,000</span>
                      </div>
                      <div className="w-full bg-surface-container dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5">
                        <div className="bg-tertiary-container h-full rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Bottom Tab Bar */}
              <div className="h-13 bg-surface-container-lowest/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-t border-surface-container-high dark:border-slate-800 flex items-center justify-around px-2 flex-shrink-0 z-20">
                <button
                  className="flex flex-col items-center gap-0.5 text-primary dark:text-[#818cf8] text-[9px] font-bold cursor-pointer"
                  onClick={() => handleMobileTabClick('dashboard')}
                >
                  <span className="material-symbols-outlined text-base">dashboard</span>
                  <span>Home</span>
                </button>
                <button
                  className="flex flex-col items-center gap-0.5 text-on-surface-variant dark:text-slate-400 hover:text-primary text-[9px] cursor-pointer"
                  onClick={() => handleMobileTabClick('payslip')}
                >
                  <span className="material-symbols-outlined text-base">receipt_long</span>
                  <span>Payslip</span>
                </button>
                <button
                  className="flex flex-col items-center gap-0.5 text-on-surface-variant dark:text-slate-400 hover:text-primary text-[9px] cursor-pointer"
                  onClick={() => handleMobileTabClick('goals')}
                >
                  <span className="material-symbols-outlined text-base">flag</span>
                  <span>Goals</span>
                </button>
                <button
                  className="flex flex-col items-center gap-0.5 text-secondary dark:text-purple-300 text-[9px] font-bold cursor-pointer"
                  onClick={() => handleMobileTabClick('ai')}
                >
                  <span className="material-symbols-outlined text-base animate-pulse">auto_awesome</span>
                  <span>AI Coach</span>
                </button>
              </div>

              {/* Home indicator pill */}
              <div className="h-3.5 bg-surface-container-low dark:bg-[#0f172a] flex items-center justify-center flex-shrink-0">
                <div className="w-28 h-1 bg-slate-400/60 dark:bg-slate-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
