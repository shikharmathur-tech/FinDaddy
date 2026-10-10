import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { DashboardView } from './components/dashboard/DashboardView';
import { PayslipView } from './components/payslip/PayslipView';
import { TaxComparisonView } from './components/tax/TaxComparisonView';
import { BudgetPlannerView } from './components/budget/BudgetPlannerView';
import { ScenarioSimulatorView } from './components/simulator/ScenarioSimulatorView';
import { FinancialGoalsView } from './components/goals/FinancialGoalsView';
import { ReportsView } from './components/reports/ReportsView';
import { HRPortalView } from './components/hr/HRPortalView';
import { SettingsView } from './components/settings/SettingsView';
import { FinDaddyAI } from './components/ai/FinDaddyAI';
import { ExplainModal } from './components/modals/ExplainModal';
import { AddCategoryModal } from './components/modals/AddCategoryModal';
import { AddGoalModal } from './components/modals/AddGoalModal';
import { PayslipDetailModal } from './components/modals/PayslipDetailModal';
import { MobileSimulatorModal } from './components/modals/MobileSimulatorModal';

const AppContent: React.FC = () => {
  const { activeTab, toastMessage, toastIcon, setActiveTab, showToast } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'upload-payslip':
        return <PayslipView />;
      case 'tax-comparison':
        return <TaxComparisonView />;
      case 'budget-planner':
        return <BudgetPlannerView />;
      case 'scenario-simulator':
        return <ScenarioSimulatorView />;
      case 'financial-goals':
        return <FinancialGoalsView />;
      case 'reports':
        return <ReportsView />;
      case 'hr-portal':
        return <HRPortalView />;
      case 'settings':
        return <SettingsView />;
      case 'ai-coach':
      case 'dashboard':
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0b1120] text-on-surface dark:text-[#f1f5f9] antialiased selection:bg-primary-container selection:text-on-primary transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

      {/* Main Container with 72-width offset on desktop */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Mobile Top Navigation Trigger */}
        <MobileNav onOpenSidebar={() => setIsMobileSidebarOpen(true)} />

        {/* Main Content Viewport */}
        <main className="w-full pt-16 min-h-[calc(100vh-64px)] pb-24 transition-colors duration-200">
          {renderActiveView()}
        </main>

        {/* Global Footer */}
        <footer className="w-full bg-surface-container-low dark:bg-[#0f172a] py-4 border-t dark:border-slate-800 transition-colors duration-200 z-10">
          <div className="w-full px-4 lg:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant dark:text-slate-400 font-body-sm text-xs">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-tertiary dark:text-emerald-400">lock</span>
              <span>Your financial data is encrypted and zero-knowledge protected under RBI norms.</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white transition-colors cursor-pointer"
                onClick={() => showToast('FinDaddy 24x7 Help & CA Concierge ready')}
              >
                Help &amp; Support
              </button>
              <button
                className="text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white transition-colors cursor-pointer"
                onClick={() => setActiveTab('tax-comparison')}
              >
                Tax Glossary
              </button>
              <span className="font-label-tag text-[10px] text-on-surface-variant dark:text-slate-500">
                © 2025 FinDaddy • FirstPaycheck India
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* FinDaddy AI Bottom Docked & Expandable Assistant */}
      <FinDaddyAI />

      {/* Interactive Modals */}
      <ExplainModal />
      <AddCategoryModal />
      <AddGoalModal />
      <PayslipDetailModal />
      <MobileSimulatorModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200 pointer-events-none">
          <div className="bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/10">
            <span className="material-symbols-outlined text-emerald-400 text-lg">{toastIcon}</span>
            <span className="font-body-md text-xs font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
