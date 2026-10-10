import React from 'react';

interface FinDaddyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const FinDaddyLogo: React.FC<FinDaddyLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', icon: 'w-4 h-4', text: 'text-base', subtext: 'text-[9px]' },
    md: { box: 'w-9 h-9', icon: 'w-5 h-5', text: 'text-lg', subtext: 'text-[10px]' },
    lg: { box: 'w-11 h-11', icon: 'w-6 h-6', text: 'text-xl', subtext: 'text-[11px]' },
    xl: { box: 'w-14 h-14', icon: 'w-8 h-8', text: 'text-2xl', subtext: 'text-xs' },
  };

  const { box, icon, text, subtext } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Premium Fintech Icon Badge */}
      <div
        className={`relative ${box} rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-600/25 ring-1 ring-white/20 transition-all duration-200 group-hover:scale-105 shrink-0 overflow-hidden`}
      >
        {/* Subtle interior glow & shine */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/25 pointer-events-none" />
        <div className="absolute -top-3 -right-3 w-7 h-7 bg-white/25 rounded-full blur-[2px] pointer-events-none" />

        {/* Custom Geometric Fintech SVG Mark (Shield + Rupee + Growth Ascender) */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${icon} text-white relative z-10 drop-shadow-sm`}
        >
          {/* Shield outline path */}
          <path
            d="M16 3L26 7.5V15.5C26 22 21.5 27 16 29C10.5 27 6 22 6 15.5V7.5L16 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-40"
          />
          {/* Indian Rupee ₹ & upward chevron glyph */}
          <path
            d="M11 10H21M11 13.5H19M11 13.5C13.5 13.5 17 14 17 17C17 19.5 14.5 20.5 12 20.5M16 20L21 25.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Sparkle star top-right */}
          <circle cx="23.5" cy="8.5" r="1.5" fill="#34d399" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-headline-sm ${text} font-black tracking-tight text-slate-900 dark:text-white flex items-center`}
            >
              Fin<span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Daddy</span>
            </span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20 text-[9px] font-black uppercase tracking-wider border border-emerald-500/20">
              PRO
            </span>
          </div>
          <span
            className={`font-label-tag ${subtext} text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mt-0.5`}
          >
            Salary &amp; Tax Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
