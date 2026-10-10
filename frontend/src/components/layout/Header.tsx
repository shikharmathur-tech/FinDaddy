import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    themeMode,
    toggleTheme,
    currency,
    setCurrency,
    activeProfile,
    setActiveProfile,
    setIsMobileSimulatorOpen,
    setActiveTab,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchSuggestions = [
    { title: 'Section 80C (PPF, ELSS, EPF)', tab: 'tax-comparison' as const, sub: 'Tax Regime Engine' },
    { title: 'HRA Exemption Section 10(13A)', tab: 'tax-comparison' as const, sub: 'House Rent Allowance' },
    { title: 'EPF 12% Statutory Ceiling', tab: 'upload-payslip' as const, sub: 'Salary Audit & Breakdown' },
    { title: '50/30/20 Monthly Allocation', tab: 'budget-planner' as const, sub: 'Smart In-Hand Budget' },
    { title: '3-Year Appraisal Simulator', tab: 'scenario-simulator' as const, sub: 'Wealth Trajectory' },
    { title: 'NPS 80CCD(1B) Tier 1', tab: 'tax-comparison' as const, sub: 'Additional ₹50,000 exemption' },
  ];

  const filteredSuggestions = searchQuery.trim()
    ? searchSuggestions.filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : searchSuggestions;

  const notifications = [
    { id: 1, text: 'TRACES 26AS Match: Oct TDS (₹4,800) successfully reconciled with TAN', time: '10m ago', unread: true },
    { id: 2, text: 'March 31 Deadline: ₹15,600 tax savings opportunity pending under 80C', time: '2h ago', unread: true },
    { id: 3, text: 'SIP Alert: Nifty 50 Index SIP (₹6,000) scheduled for 5th of this month', time: '1d ago', unread: false },
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl z-40 shadow-xs border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="h-16 w-full px-4 lg:px-6 flex items-center justify-between gap-3 lg:gap-4">
        {/* Search Input with Popover Suggestions */}
        <div className="relative flex-1 max-w-md">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg pointer-events-none">
              search
            </span>
            <input
              className="w-full pl-9 pr-4 py-2 bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl font-body-md text-sm outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all border border-slate-200 dark:border-slate-700/60"
              placeholder="Search deductions, slabs, 80C, EPF..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
          </div>

          {/* Search Dropdown Results */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 px-3 py-1">
                Quick Shortcuts & Tax Slabs
              </div>
              <div className="space-y-1">
                {filteredSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs transition-colors"
                    onMouseDown={() => {
                      setActiveTab(item.tab);
                      setSearchQuery('');
                      showToast(`Navigated to ${item.title}`);
                    }}
                  >
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block">{item.title}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{item.sub}</span>
                    </div>
                    <span className="material-symbols-outlined text-sm text-indigo-600 dark:text-[#818cf8]">arrow_forward</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Action Icons & Toggles */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Mobile Preview 390px Button */}
          <div className="hidden sm:inline-flex items-center p-0.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <button
              className="px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 cursor-pointer"
              onClick={() => setIsMobileSimulatorOpen(true)}
              title="Open Mobile 390px Device Simulator"
              type="button"
            >
              <span className="material-symbols-outlined text-sm leading-none text-indigo-600 dark:text-indigo-400">smartphone</span>
              <span className="hidden md:inline">Mobile Preview</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold leading-tight border border-indigo-200 dark:border-indigo-800">
                390px
              </span>
            </button>
          </div>

          {/* Currency Pill */}
          <div
            className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 cursor-pointer select-none hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
            onClick={() => {
              const next = currency === 'INR' ? 'USD' : 'INR';
              setCurrency(next);
              showToast(`Currency benchmark set to ${next}`);
            }}
            title="Toggle display currency benchmark"
          >
            <span className="font-label-mono-data text-xs text-indigo-700 dark:text-[#818cf8] font-bold">
              {currency === 'INR' ? '₹ INR' : '$ USD'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>

          {/* Theme Toggle Button */}
          <button
            aria-label="Toggle Theme Mode"
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-white transition-all border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer"
            onClick={toggleTheme}
            title={themeMode === 'dark' ? 'Switch to Daylight Mode (T)' : 'Switch to Deep Financial Mode (T)'}
            type="button"
          >
            <span className="material-symbols-outlined text-xl">
              {themeMode === 'dark' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* Notifications Button & Dropdown */}
          <div className="relative">
            <button
              className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
              onClick={() => setIsNotifOpen((prev) => !prev)}
              type="button"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface dark:ring-[#0f172a]"></span>
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-surface-container-high dark:border-slate-700 p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b dark:border-slate-700 mb-2">
                  <span className="font-headline-sm text-xs font-bold text-on-surface dark:text-white">Recent Alerts</span>
                  <span className="text-[10px] text-tertiary dark:text-emerald-400 font-bold uppercase tracking-wider">3 New</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-xl bg-surface-container-low dark:bg-slate-800 text-xs space-y-1">
                      <p className="text-on-surface dark:text-slate-200 leading-snug">{n.text}</p>
                      <span className="text-[10px] text-on-surface-variant dark:text-slate-400 font-mono">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Lockup & Switcher */}
          <div className="relative">
            <div
              className="flex items-center gap-2 pl-1 cursor-pointer select-none"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            >
              <div className="relative">
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 dark:ring-indigo-500/40"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdieKsnLV-vhK_xb66TQPLLQViieeSqsdl8otIrzQez5Sf2jvmdJu5YARbamWbADD8cv6Eg7OmXSN7F8jcgPqNMSvf9CLREnP8b_qxxF5ZafvzfiCX5RBfShgE8PqyFoECDYO1si9KSz8slqXVem_xE1c8JghTOddVg0GCVp-EYoA5ZzHhbN1wFj72gpYYSNSLFNxBwTyyAmWue_gFyrwGADkeCrB901Tbw3b2mYcaxYXLi1-ZaiQqaA"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-tertiary dark:bg-emerald-400 ring-2 ring-surface dark:ring-slate-900"></span>
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="font-body-md text-xs font-bold leading-none text-on-surface dark:text-slate-100">
                  {activeProfile}
                </span>
                <span className="font-label-tag text-[10px] text-on-surface-variant dark:text-slate-400 leading-tight">
                  FY 2024-25 • Salaried
                </span>
              </div>
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-surface-container-high dark:border-slate-700 p-2 z-50 animate-in fade-in">
                <div className="px-3 py-2 border-b dark:border-slate-700">
                  <p className="font-bold text-xs text-on-surface dark:text-white">{activeProfile}</p>
                  <p className="text-[11px] text-on-surface-variant dark:text-slate-400">Software Engineer • Bangalore</p>
                </div>
                <div className="p-1 space-y-1">
                  <button
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between ${
                      activeProfile === 'Rohan Verma' ? 'bg-primary/10 text-primary dark:text-[#818cf8] font-bold' : 'text-on-surface dark:text-slate-300 hover:bg-surface-container-low dark:hover:bg-slate-800'
                    }`}
                    onClick={() => {
                      setActiveProfile('Rohan Verma');
                      setIsProfileOpen(false);
                      showToast('Switched to Rohan Verma profile');
                    }}
                  >
                    <span>Rohan Verma (6 LPA)</span>
                    {activeProfile === 'Rohan Verma' && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                  <button
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between ${
                      activeProfile === 'Ananya Sharma' ? 'bg-primary/10 text-primary dark:text-[#818cf8] font-bold' : 'text-on-surface dark:text-slate-300 hover:bg-surface-container-low dark:hover:bg-slate-800'
                    }`}
                    onClick={() => {
                      setActiveProfile('Ananya Sharma');
                      setIsProfileOpen(false);
                      showToast('Switched to Ananya Sharma profile');
                    }}
                  >
                    <span>Ananya Sharma (8 LPA)</span>
                    {activeProfile === 'Ananya Sharma' && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
