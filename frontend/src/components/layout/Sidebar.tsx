import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavTab } from '../../types';
import { FinDaddyLogo } from '../common/FinDaddyLogo';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, setIsFinDaddyOpen } = useApp();

  const navItems: { path: NavTab; label: string; icon: string; badge?: string }[] = [
    { path: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: 'upload-payslip', label: 'Upload Payslip', icon: 'document_scanner' },
    { path: 'tax-comparison', label: 'Tax Comparison', icon: 'balance' },
    { path: 'budget-planner', label: 'Budget Planner', icon: 'pie_chart' },
    { path: 'scenario-simulator', label: 'Scenario Simulator', icon: 'trending_up' },
    { path: 'financial-goals', label: 'Financial Goals', icon: 'flag' },
    { path: 'ai-coach', label: 'AI Coach & Insights', icon: 'auto_awesome', badge: 'FinDaddy' },
    { path: 'reports', label: 'Reports', icon: 'receipt_long' },
    { path: 'hr-portal', label: 'HR Portal', icon: 'corporate_fare' },
    { path: 'settings', label: 'Settings & Theme', icon: 'settings' },
  ];

  const handleNavClick = (path: NavTab) => {
    if (path === 'ai-coach') {
      setIsFinDaddyOpen(true);
    }
    setActiveTab(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-[#0f172a] z-50 flex flex-col justify-between shadow-sm border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#0f172a]">
            <div
              className="cursor-pointer select-none group"
              onClick={() => handleNavClick('dashboard')}
            >
              <FinDaddyLogo size="md" />
            </div>

            {/* Mobile close button */}
            <button
              className="lg:hidden p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              onClick={onClose}
              type="button"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.path;
                return (
                  <button
                    key={item.path}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-body-md text-sm transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 dark:bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    onClick={() => handleNavClick(item.path)}
                    type="button"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bank Grade Safety Badge */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl mx-2 mb-3 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-1">
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span className="font-label-tag text-[10px] uppercase tracking-wider font-bold">
                Bank Grade Safety
              </span>
            </div>
            <p className="font-body-sm text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Your financial data is encrypted and zero-knowledge protected under RBI norms.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
