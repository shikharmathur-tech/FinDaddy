import React from 'react';
import { useApp } from '../../context/AppContext';

export const PayslipDetailModal: React.FC = () => {
  const {
    payslipDetailModalMonth,
    closePayslipDetailModal,
    earningsItems,
    deductionItems,
    formatCurrency,
    showToast,
    setIsFinDaddyOpen,
  } = useApp();

  if (!payslipDetailModalMonth) return null;

  const totalGross = earningsItems.reduce((acc, i) => acc + i.amount, 0);
  const totalDeductions = deductionItems.reduce((acc, i) => acc + i.amount, 0);
  const netSalary = totalGross - totalDeductions;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest dark:bg-[#1e293b] w-full max-w-2xl rounded-2xl shadow-2xl border border-surface-container-high dark:border-slate-700 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-surface-container dark:border-slate-800 flex items-center justify-between bg-surface-container-low dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary dark:text-[#a5b4fc] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">receipt_long</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-sm lg:text-base font-bold text-on-surface dark:text-white">
                  Itemized Payslip: {payslipDetailModalMonth}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed/40 dark:bg-emerald-950 text-tertiary dark:text-emerald-400 font-label-tag text-[10px] font-bold uppercase">
                  Form 26AS Match
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant dark:text-slate-400">
                Employer: RazorTech Solutions India Pvt Ltd • DIN: 00492817
              </p>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-lg bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high text-on-surface-variant dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            onClick={closePayslipDetailModal}
            type="button"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Summary Banner */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-surface-container dark:bg-slate-800/80 rounded-xl text-center">
            <div>
              <span className="font-body-sm text-xs text-on-surface-variant dark:text-slate-400">Gross Earnings</span>
              <p className="font-label-currency-md text-base font-bold text-on-surface dark:text-white mt-0.5">
                {formatCurrency(totalGross)}
              </p>
            </div>
            <div className="border-x dark:border-slate-700">
              <span className="font-body-sm text-xs text-error dark:text-rose-400">Total Deductions</span>
              <p className="font-label-currency-md text-base font-bold text-error dark:text-rose-400 mt-0.5">
                -{formatCurrency(totalDeductions)}
              </p>
            </div>
            <div>
              <span className="font-body-sm text-xs text-tertiary dark:text-emerald-400">Net Take-Home</span>
              <p className="font-label-currency-md text-base font-bold text-primary dark:text-[#a5b4fc] mt-0.5">
                {formatCurrency(netSalary)}
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Earnings */}
            <div className="space-y-1.5">
              <span className="font-headline-sm text-xs font-bold text-on-surface dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Earnings Components
              </span>
              <div className="space-y-1 bg-surface-container-low dark:bg-slate-800/40 p-3 rounded-xl text-xs font-label-mono-data">
                {earningsItems.map((item) => (
                  <div key={item.id} className="flex justify-between py-1 border-b dark:border-slate-800">
                    <span className="text-on-surface dark:text-slate-300 font-sans">{item.label}</span>
                    <span className="font-bold text-on-surface dark:text-white">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deductions */}
            <div className="space-y-1.5">
              <span className="font-headline-sm text-xs font-bold text-on-surface dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-error"></span> Statutory Deductions
              </span>
              <div className="space-y-1 bg-surface-container-low dark:bg-slate-800/40 p-3 rounded-xl text-xs font-label-mono-data">
                {deductionItems.map((item) => (
                  <div key={item.id} className="flex justify-between py-1 border-b dark:border-slate-800">
                    <span className="text-on-surface dark:text-slate-300 font-sans">{item.label}</span>
                    <span className="font-bold text-error dark:text-rose-400">-{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance & Form 26AS verification block */}
          <div className="p-3 rounded-xl bg-tertiary-fixed/20 dark:bg-emerald-950/40 border border-tertiary/20 dark:border-emerald-800/40 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-tertiary dark:text-emerald-400 text-lg flex-shrink-0">verified</span>
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-on-surface dark:text-emerald-300">TRACES / Form 26AS Cross-Check Complete</p>
              <p className="text-on-surface-variant dark:text-slate-300">
                The TDS of ₹4,800 has been matched with ITD deductor TAN: MUMT09827F. No discrepancies detected.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-surface-container dark:border-slate-800 bg-surface-container-low dark:bg-slate-900/60 flex items-center justify-between">
          <button
            className="text-xs text-primary dark:text-[#a5b4fc] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            onClick={() => {
              closePayslipDetailModal();
              setIsFinDaddyOpen(true);
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span>Ask FinDaddy about this payslip</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              className="px-3.5 py-1.5 rounded-xl bg-surface-container-high dark:bg-slate-800 hover:bg-surface-container text-on-surface dark:text-white font-headline-sm text-xs font-bold transition-colors cursor-pointer"
              onClick={() => showToast('Downloading digital stamped payslip PDF...', 'download')}
              type="button"
            >
              Download PDF
            </button>
            <button
              className="px-4 py-1.5 rounded-xl bg-primary dark:bg-indigo-600 text-white font-headline-sm text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer"
              onClick={closePayslipDetailModal}
              type="button"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
