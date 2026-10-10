import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ThemeMode, AccentColor, NotationMode, DensityMode } from '../../types';

export const SettingsView: React.FC = () => {
  const {
    themeMode,
    setThemeMode,
    accentColor,
    setAccentColor,
    notationMode,
    setNotationMode,
    isMasked,
    setIsMasked,
    densityMode,
    setDensityMode,
    highContrast,
    setHighContrast,
    suppressPaise,
    setSuppressPaise,
    reduceAnimations,
    setReduceAnimations,
    activeProfile,
    formatCurrency,
    showToast,
  } = useApp();

  const [sandboxHovered, setSandboxHovered] = useState<boolean>(false);

  const handleResetDefaults = () => {
    setThemeMode('light');
    setAccentColor('indigo');
    setNotationMode('in');
    setIsMasked(false);
    setDensityMode('relaxed');
    setHighContrast(false);
    setSuppressPaise(true);
    setReduceAnimations(false);
    showToast('Reset all appearance & formatting options to defaults!');
  };

  const handleApplyPreferences = () => {
    showToast('Appearance settings saved and synced to your cloud profile!', 'save');
  };

  const getAccentColorClass = () => {
    switch (accentColor) {
      case 'emerald':
        return 'text-tertiary dark:text-emerald-400';
      case 'violet':
        return 'text-secondary dark:text-purple-400';
      case 'royal':
        return 'text-blue-600 dark:text-blue-400';
      case 'indigo':
      default:
        return 'text-primary dark:text-[#818cf8]';
    }
  };

  return (
    <div className="w-full px-4 lg:px-6 py-4 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Breadcrumb & Master Title Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-surface-container-lowest dark:bg-[#162032] p-5 lg:p-6 rounded-2xl shadow-sm border border-transparent dark:border-white/5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 font-label-tag text-xs uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
            <span>Settings</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-primary dark:text-[#818cf8] font-bold">Appearance &amp; Theme Preferences</span>
          </div>
          <h1 className="font-headline-lg text-2xl lg:text-3xl text-on-surface dark:text-white tracking-tight font-bold">
            Appearance &amp; Theme Controls
          </h1>
          <p className="font-body-md text-xs lg:text-sm text-on-surface-variant dark:text-slate-400 max-w-2xl">
            Tailor your FinDaddy interface for late-night tax audits or bright daylight budget reviews. Adjust contrast, density, and Indian financial typography preferences.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-high dark:bg-slate-800 px-4 py-2 rounded-xl self-start md:self-auto border border-transparent dark:border-white/5">
          <span className="material-symbols-outlined text-tertiary dark:text-emerald-400 text-base">chevron_forward</span>
          <span className="font-label-mono-data text-xs text-on-surface-variant dark:text-slate-400">
            Active Profile: <strong className="text-on-surface dark:text-white">{activeProfile}</strong>
          </span>
        </div>
      </div>

      {/* Theme Mode Selection Grid */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-[#818cf8] text-xl">palette</span>
            <h2 className="font-headline-sm text-sm lg:text-base font-bold text-on-surface dark:text-white">
              Base Atmosphere &amp; Mode
            </h2>
          </div>
          <span className="font-label-tag text-[10px] uppercase text-on-surface-variant dark:text-slate-400 bg-surface-container dark:bg-slate-800 px-3 py-1 rounded-full font-bold">
            3 Presets Available
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Daylight Mode Card */}
          <div
            className={`group relative flex flex-col justify-between bg-surface-container-lowest dark:bg-[#162032] p-4 rounded-2xl shadow-md cursor-pointer transition-all duration-200 border-2 ${
              themeMode === 'light' ? 'border-primary dark:border-[#818cf8]' : 'border-transparent'
            }`}
            onClick={() => setThemeMode('light')}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary-fixed"></span>
                  <span className="font-headline-sm text-sm font-bold text-on-surface dark:text-white">Daylight Mode</span>
                </div>
                {themeMode === 'light' && (
                  <span className="font-label-tag text-[10px] bg-tertiary-fixed text-on-tertiary-fixed-variant px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    Active
                  </span>
                )}
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant dark:text-slate-400 mb-3">
                Crisp pure white and indigo styling. Formulated for high-glare daytime environments and easy desk audits.
              </p>

              {/* Mock UI */}
              <div className="bg-surface-container-low dark:bg-slate-800 rounded-xl p-3 mb-3 shadow-inner">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-on-surface-variant uppercase font-mono">Net In-Hand</span>
                  <span className="text-[10px] text-tertiary bg-surface-container-highest px-1.5 py-0.2 rounded font-bold">FY24-25</span>
                </div>
                <div className="font-headline-sm text-base text-primary font-bold">₹43,200<span className="text-xs font-normal text-on-surface-variant">/mo</span></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t dark:border-slate-800 text-xs">
              <span className="text-on-surface-variant dark:text-slate-400 text-[11px]">Crisp &amp; Clean</span>
              <span className="font-bold text-primary dark:text-[#818cf8] flex items-center gap-1">
                <span>Selected</span>
                <span className="material-symbols-outlined text-sm">check</span>
              </span>
            </div>
          </div>

          {/* Deep Financial Mode Card */}
          <div
            className={`group relative flex flex-col justify-between bg-inverse-surface p-4 rounded-2xl shadow-md cursor-pointer transition-all duration-200 border-2 ${
              themeMode === 'dark' ? 'border-[#818cf8]' : 'border-transparent'
            }`}
            onClick={() => setThemeMode('dark')}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                  <span className="font-headline-sm text-sm font-bold text-white">Deep Financial</span>
                </div>
                <span className="font-label-tag text-[10px] bg-secondary text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  OLED Contrast
                </span>
              </div>
              <p className="font-body-sm text-xs text-outline-variant mb-3">
                Ultra-dark obsidian tone with electric neon accents. Reduces eye fatigue during tax filing deadlines.
              </p>

              {/* Mock UI */}
              <div className="bg-black/40 rounded-xl p-3 mb-3 shadow-inner text-white">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Net In-Hand</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded font-bold">TDS Saved</span>
                </div>
                <div className="font-headline-sm text-base text-[#a5b4fc] font-bold">₹43,200<span className="text-xs font-normal text-slate-400">/mo</span></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-700 text-xs">
              <span className="text-slate-400 text-[11px]">Battery &amp; Eye Saver</span>
              <span className="font-bold text-inverse-primary flex items-center gap-1">
                <span>Preview Dark</span>
                <span className="material-symbols-outlined text-sm">visibility</span>
              </span>
            </div>
          </div>

          {/* System Default Card */}
          <div
            className={`group relative flex flex-col justify-between bg-surface-container-lowest dark:bg-[#162032] p-4 rounded-2xl shadow-md cursor-pointer transition-all duration-200 border-2 ${
              themeMode === 'auto' ? 'border-primary dark:border-[#818cf8]' : 'border-transparent'
            }`}
            onClick={() => setThemeMode('auto')}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-inverse-surface"></span>
                  <span className="font-headline-sm text-sm font-bold text-on-surface dark:text-white">System Adaptive</span>
                </div>
                <span className="font-label-tag text-[10px] bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  Auto
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant dark:text-slate-400 mb-3">
                Automatically switches between Daylight and Deep Financial modes aligned with your operating system schedule.
              </p>

              <div className="rounded-xl overflow-hidden mb-3 flex h-16 shadow-inner">
                <div className="w-1/2 bg-surface-container-low dark:bg-slate-800 p-2.5 flex flex-col justify-between">
                  <span className="font-label-tag text-[9px] text-on-surface-variant uppercase">07:00 AM</span>
                  <span className="font-headline-sm text-sm text-primary font-bold">₹43,200</span>
                </div>
                <div className="w-1/2 bg-inverse-surface p-2.5 flex flex-col justify-between text-white">
                  <span className="font-label-tag text-[9px] text-outline-variant uppercase">07:00 PM</span>
                  <span className="font-headline-sm text-sm text-[#a5b4fc] font-bold">₹43,200</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t dark:border-slate-800 text-xs">
              <span className="text-on-surface-variant dark:text-slate-400 text-[11px]">Syncs with OS</span>
              <span className="font-bold text-on-surface-variant flex items-center gap-1 group-hover:text-primary">
                <span>Sync OS</span>
                <span className="material-symbols-outlined text-sm">schedule</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Configuration Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Detailed Display Settings (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Accent Palette Customizer */}
          <div className="bg-surface-container-lowest dark:bg-[#162032] p-5 lg:p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-transparent dark:border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary dark:text-[#818cf8] text-xl">colorize</span>
                <h3 className="font-headline-sm text-sm lg:text-base font-bold text-on-surface dark:text-white">
                  Accent Color &amp; Contrast Tuning
                </h3>
              </div>
              <span className="font-label-tag text-xs text-on-surface-variant dark:text-slate-400">
                Applied across all Rupee trackers
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                [
                  { id: 'indigo', name: 'Vibrant Indigo', sub: 'Default Brand', bg: 'bg-primary' },
                  { id: 'royal', name: 'Royal Deep', sub: 'Subdued Tech', bg: 'bg-blue-600' },
                  { id: 'emerald', name: 'Emerald Wealth', sub: 'Tax Savings Focused', bg: 'bg-tertiary' },
                  { id: 'violet', name: 'Cyber Violet', sub: 'Dynamic Modern', bg: 'bg-secondary' },
                ] as const
              ).map((acc) => (
                <button
                  key={acc.id}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all cursor-pointer border ${
                    accentColor === acc.id
                      ? 'bg-surface-container dark:bg-slate-700 border-primary dark:border-[#818cf8]'
                      : 'bg-surface-container-low dark:bg-slate-800 border-transparent hover:bg-surface-container'
                  }`}
                  onClick={() => setAccentColor(acc.id as AccentColor)}
                  type="button"
                >
                  <div className={`w-7 h-7 rounded-full ${acc.bg} shadow-md flex items-center justify-center text-white`}>
                    {accentColor === acc.id && <span className="material-symbols-outlined text-sm">check</span>}
                  </div>
                  <span className="font-body-md text-xs font-bold text-on-surface dark:text-white">{acc.name}</span>
                  <span className="font-label-tag text-[10px] text-on-surface-variant dark:text-slate-400">{acc.sub}</span>
                </button>
              ))}
            </div>

            {/* High Contrast Row */}
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low dark:bg-slate-800/80 rounded-xl border border-transparent dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container-high dark:bg-slate-700 flex items-center justify-center text-primary dark:text-[#818cf8]">
                  <span className="material-symbols-outlined text-xl">contrast</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md text-xs font-bold text-on-surface dark:text-white">
                    High Contrast Text &amp; Metric Outlines
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                    Reinforces 7:1 WCAG contrast for slab rates and deduction breakdowns.
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked={highContrast}
                  className="sr-only peer"
                  type="checkbox"
                  onChange={(e) => setHighContrast(e.target.checked)}
                />
                <div className="w-11 h-6 bg-surface-container-highest dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Indian Financial Formats & Privacy Masking */}
          <div className="bg-surface-container-lowest dark:bg-[#162032] p-5 lg:p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-transparent dark:border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary dark:text-[#818cf8] text-xl">currency_rupee</span>
                <h3 className="font-headline-sm text-sm lg:text-base font-bold text-on-surface dark:text-white">
                  Financial Number Display &amp; Privacy
                </h3>
              </div>
              <span className="font-label-tag text-xs bg-surface-container dark:bg-slate-800 px-3 py-1 rounded-full text-on-surface-variant dark:text-slate-400 font-bold">
                India Standard
              </span>
            </div>

            {/* Indian vs International Numbering System */}
            <div className="flex flex-col gap-2">
              <label className="font-body-md text-xs font-bold text-on-surface dark:text-white">
                Numerical Grouping Notation
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className={`p-3.5 rounded-xl cursor-pointer flex flex-col gap-1 transition-all border ${
                    notationMode === 'in'
                      ? 'bg-surface-container-high dark:bg-slate-700 border-primary dark:border-[#818cf8]'
                      : 'bg-surface-container-low dark:bg-slate-800 border-transparent hover:bg-surface-container'
                  }`}
                  onClick={() => setNotationMode('in')}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-xs font-bold text-on-surface dark:text-white">
                      Lakhs &amp; Crores (Indian)
                    </span>
                    <span className="material-symbols-outlined text-primary dark:text-[#818cf8] text-base">
                      {notationMode === 'in' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <div className="font-label-mono-data text-xs text-primary dark:text-[#818cf8] font-bold">
                    ₹12,50,000 / annum
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                    Grouping: 3, 2, 2 format. Recommended for IT returns, EPF, and CTC.
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl cursor-pointer flex flex-col gap-1 transition-all border ${
                    notationMode === 'intl'
                      ? 'bg-surface-container-high dark:bg-slate-700 border-primary dark:border-[#818cf8]'
                      : 'bg-surface-container-low dark:bg-slate-800 border-transparent hover:bg-surface-container'
                  }`}
                  onClick={() => setNotationMode('intl')}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-xs font-bold text-on-surface dark:text-white">
                      Millions / International
                    </span>
                    <span className="material-symbols-outlined text-outline text-base">
                      {notationMode === 'intl' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <div className="font-label-mono-data text-xs text-on-surface dark:text-white font-bold">
                    ₹1,250,000 / annum
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                    Grouping: 3, 3 format. Useful for global multi-currency compensation.
                  </p>
                </div>
              </div>
            </div>

            {/* Public Privacy Mode Masking */}
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low dark:bg-slate-800/80 rounded-xl border border-transparent dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container-high dark:bg-slate-700 flex items-center justify-center text-primary dark:text-[#818cf8]">
                  <span className="material-symbols-outlined text-xl">visibility_off</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-body-md text-xs font-bold text-on-surface dark:text-white">Public Privacy Masking</span>
                    <span className="font-label-tag text-[10px] bg-surface-container dark:bg-slate-700 text-primary dark:text-[#818cf8] font-bold px-1.5 py-0.2 rounded">
                      Cmd + Shift + P
                    </span>
                  </div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                    Replaces sensitive CTC and payslip amounts with •••• until cursor hover.
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked={isMasked}
                  className="sr-only peer"
                  type="checkbox"
                  onChange={(e) => setIsMasked(e.target.checked)}
                />
                <div className="w-11 h-6 bg-surface-container-highest dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* Suppress Trailing Paise */}
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low dark:bg-slate-800/80 rounded-xl border border-transparent dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container-high dark:bg-slate-700 flex items-center justify-center text-primary dark:text-[#818cf8]">
                  <span className="material-symbols-outlined text-xl">decimal_decrease</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md text-xs font-bold text-on-surface dark:text-white">Suppress Trailing Paise (.00)</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                    Cleaner layout for whole rupee values; preserves decimals for statutory taxes.
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked={suppressPaise}
                  className="sr-only peer"
                  type="checkbox"
                  onChange={(e) => setSuppressPaise(e.target.checked)}
                />
                <div className="w-11 h-6 bg-surface-container-highest dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* UI Density & Motion */}
          <div className="bg-surface-container-lowest dark:bg-[#162032] p-5 lg:p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-transparent dark:border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary dark:text-[#818cf8] text-xl">density_medium</span>
                <h3 className="font-headline-sm text-sm lg:text-base font-bold text-on-surface dark:text-white">
                  Data Density &amp; Motion Controls
                </h3>
              </div>
              <span className="font-label-tag text-xs text-on-surface-variant dark:text-slate-400">Visual Ergonomics</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className={`p-3.5 rounded-xl cursor-pointer flex flex-col gap-1 transition-all border ${
                  densityMode === 'relaxed'
                    ? 'bg-surface-container-high dark:bg-slate-700 border-primary dark:border-[#818cf8]'
                    : 'bg-surface-container-low dark:bg-slate-800 border-transparent hover:bg-surface-container'
                }`}
                onClick={() => setDensityMode('relaxed')}
              >
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-xs font-bold text-on-surface dark:text-white">Relaxed Spacing (Default)</span>
                  <span className="material-symbols-outlined text-primary dark:text-[#818cf8] text-base">check_circle</span>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                  Generous breathing room. Ideal for initial pay planning and mobile-first tablets.
                </p>
              </div>

              <div
                className={`p-3.5 rounded-xl cursor-pointer flex flex-col gap-1 transition-all border ${
                  densityMode === 'compact'
                    ? 'bg-surface-container-high dark:bg-slate-700 border-primary dark:border-[#818cf8]'
                    : 'bg-surface-container-low dark:bg-slate-800 border-transparent hover:bg-surface-container'
                }`}
                onClick={() => setDensityMode('compact')}
              >
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-xs font-bold text-on-surface dark:text-white">Compact Data Dense</span>
                  <span className="material-symbols-outlined text-outline text-base">radio_button_unchecked</span>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                  High row density. Recommended for multi-payslip tax filing and deduction ledgers.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-surface-container-low dark:bg-slate-800/80 rounded-xl border border-transparent dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container-high dark:bg-slate-700 flex items-center justify-center text-primary dark:text-[#818cf8]">
                  <span className="material-symbols-outlined text-xl">motion_photos_off</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md text-xs font-bold text-on-surface dark:text-white">Reduce Chart Animations</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                    Disables radial gauge spinners and animated tax waterfall transition runs.
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked={reduceAnimations}
                  className="sr-only peer"
                  type="checkbox"
                  onChange={(e) => setReduceAnimations(e.target.checked)}
                />
                <div className="w-11 h-6 bg-surface-container-highest dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Sandbox Preview (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="sticky top-20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary dark:text-[#818cf8] text-xl">play_circle</span>
                <h3 className="font-headline-sm text-sm lg:text-base font-bold text-on-surface dark:text-white">
                  Live Sandbox Preview
                </h3>
              </div>
              <span className="font-label-tag text-xs uppercase text-tertiary dark:text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-tertiary dark:bg-emerald-400 animate-pulse"></span> Live Render
              </span>
            </div>

            {/* Preview Box */}
            <div
              className={`p-5 rounded-2xl shadow-xl flex flex-col gap-4 transition-all duration-300 border border-transparent dark:border-white/10 ${
                themeMode === 'dark' ? 'bg-[#1e293b] text-white' : 'bg-surface-container-lowest text-on-surface'
              } ${highContrast ? 'ring-2 ring-primary' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-label-tag text-[10px] uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
                  Payroll Snapshot
                </span>
                <span className="font-label-tag text-[10px] bg-tertiary-fixed/40 dark:bg-emerald-950 text-tertiary dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  New Regime FY25
                </span>
              </div>

              {/* In-Hand Figure */}
              <div
                className="flex flex-col gap-1 cursor-pointer"
                onMouseEnter={() => setSandboxHovered(true)}
                onMouseLeave={() => setSandboxHovered(false)}
              >
                <span className="font-body-sm text-xs text-on-surface-variant dark:text-slate-400">Estimated Monthly In-Hand</span>
                <div className="flex items-baseline justify-between">
                  <span className={`font-headline-lg text-2xl font-bold tracking-tight ${getAccentColorClass()}`}>
                    {isMasked && !sandboxHovered ? '₹••••••' : formatCurrency(43200, true)}
                  </span>
                  <span className="font-label-mono-data text-xs text-tertiary dark:text-emerald-400 font-bold bg-surface-container-high dark:bg-slate-700 px-2 py-0.5 rounded">
                    +8.4% YoY
                  </span>
                </div>
                <span className="font-label-tag text-[10px] text-on-surface-variant dark:text-slate-400">
                  {isMasked ? 'Hover amount to unveil privacy mask' : 'Privacy unmasked'}
                </span>
              </div>

              {/* Gauge */}
              <div className="bg-surface-container-low dark:bg-slate-800 p-3 rounded-xl flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-body-sm text-xs font-bold text-on-surface dark:text-white">Tax Optimization Score</span>
                  <span className="font-label-tag text-[10px] text-tertiary dark:text-emerald-400 font-bold">
                    Optimal Section 80CCD (1B) usage
                  </span>
                </div>
                <div className="relative w-11 h-11 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-highest dark:text-slate-700"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    ></path>
                    <path
                      className="text-tertiary dark:text-emerald-400"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="84, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    ></path>
                  </svg>
                  <span className="absolute font-label-mono-data text-xs font-bold">84</span>
                </div>
              </div>

              {/* Mini Table */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-1 text-on-surface-variant dark:text-slate-400 border-b dark:border-slate-800">
                  <span>Employee PF (EPF)</span>
                  <span className="font-label-mono-data font-semibold text-on-surface dark:text-white">₹1,800</span>
                </div>
                <div className="flex justify-between py-1 text-on-surface-variant dark:text-slate-400 border-b dark:border-slate-800">
                  <span>Standard Deduction</span>
                  <span className="font-label-mono-data font-semibold text-on-surface dark:text-white">₹6,250</span>
                </div>
                <div className="flex justify-between py-1 text-on-surface-variant dark:text-slate-400">
                  <span>Professional Tax (PT)</span>
                  <span className="font-label-mono-data font-semibold text-on-surface dark:text-white">₹200</span>
                </div>
              </div>

              <button
                className="w-full bg-primary-container dark:bg-indigo-600 hover:bg-primary text-white font-headline-sm text-xs font-bold py-2 px-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                onClick={() => showToast('Preview download initiated!', 'download')}
                type="button"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Download Form 16 / Slip</span>
              </button>
            </div>

            {/* Quick Keyboard Tip */}
            <div className="bg-surface-container-high dark:bg-slate-800 p-3.5 rounded-2xl flex flex-col gap-1 border border-transparent dark:border-white/5">
              <div className="flex items-center gap-1.5 text-primary dark:text-[#818cf8] font-bold text-xs">
                <span className="material-symbols-outlined text-base">laptop_mac</span>
                <span>Keyboard Maestro</span>
              </div>
              <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400">
                Press <kbd className="px-1.5 py-0.5 bg-surface-container-lowest dark:bg-slate-900 rounded font-label-mono-data text-on-surface dark:text-white border dark:border-slate-700">T</kbd> anywhere on FinDaddy to quickly cycle color themes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Sticky Footer Bar */}
      <div className="sticky bottom-4 z-30 bg-surface-container-lowest/95 dark:bg-[#162032]/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-surface-container-high dark:border-slate-700">
        <div className="flex items-center gap-2 text-on-surface-variant dark:text-slate-400 text-xs">
          <span className="material-symbols-outlined text-tertiary dark:text-emerald-400 text-base">check_circle</span>
          <span>All preferences automatically sync with your secure cloud profile.</span>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant dark:text-slate-300 bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high transition-colors cursor-pointer"
            onClick={handleResetDefaults}
            type="button"
          >
            Reset to Defaults
          </button>
          <button
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 active:scale-95 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            onClick={handleApplyPreferences}
            type="button"
          >
            <span className="material-symbols-outlined text-base">save</span>
            <span>Apply Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
