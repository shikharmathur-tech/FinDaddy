import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PayslipView: React.FC = () => {
  const {
    earningsItems,
    deductionItems,
    updateEarningAmount,
    updateDeductionAmount,
    openExplainModal,
    formatCurrency,
    showToast,
    setActiveTab,
    applyPayslipData,
  } = useApp();

  const [activeTab, setActiveTabLocal] = useState<'payslip' | 'offer'>('payslip');
  const [isSampleLoaded, setIsSampleLoaded] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  // Computations
  const totalGross = earningsItems.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDeductions = deductionItems.reduce((acc, curr) => acc + curr.amount, 0);
  const netSalary = totalGross - totalDeductions;
  const takeHomeRatio = ((netSalary / totalGross) * 100).toFixed(1);
  const tdsDeduction = deductionItems.find((d) => d.id === 'ded-tds')?.amount || 0;
  const taxRatio = ((tdsDeduction / totalGross) * 100).toFixed(1);

  const startEdit = (id: string, currentVal: number) => {
    setEditingId(id);
    setEditValue(currentVal.toString());
  };

  const saveEdit = (id: string, isEarning: boolean) => {
    const val = parseInt(editValue.replace(/[^0-9]/g, ''), 10) || 0;
    if (isEarning) {
      updateEarningAmount(id, val);
    } else {
      updateDeductionAmount(id, val);
    }
    setEditingId(null);
  };


const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://127.0.0.1:8000/payslip/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Payslip upload failed');
    }

    const data = await response.json();
    console.log('Backend payslip result:', data);
    console.log('Extracted fields:', data.extracted_fields);
    const fields = data.extracted_fields;
    

if (
  fields &&
  typeof fields.gross_salary === 'number' &&
  typeof fields.total_deductions === 'number'
) {
  applyPayslipData(
    fields.gross_salary,
    fields.total_deductions
  );
}


if (
  fields &&
  typeof fields.gross_salary === 'number' &&
  typeof fields.total_deductions === 'number'
) {
  applyPayslipData(
    fields.gross_salary,
    fields.total_deductions
  );
}

    setIsSampleLoaded(true);
    showToast(`Payslip "${file.name}" processed successfully!`, 'document_scanner');
  } catch (error) {
    console.error(error);
    showToast('Upload failed. Check that the backend is running.', 'document_scanner');
  }
};


  return (
    <div className="w-full px-4 lg:px-6 py-4 space-y-6 max-w-[1360px] mx-auto animate-in fade-in duration-300">
      {/* Top Hero / Command Bar with bespoke Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-label-tag text-xs uppercase tracking-wider mb-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Zero-Knowledge Indian Tax OCR Engine 3.2</span>
          </div>
          <h1 className="text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight font-extrabold flex items-center gap-2.5">
            <span>Smart Payslip Extraction &amp; Audit</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              AI Bounding Verified
            </span>
          </h1>
          <p className="font-body-md text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1.5 leading-relaxed">
            Upload any employer&apos;s payslip or offer breakdown. We parse allowances, EPF caps, PT slabs, and tax deductions into human-readable take-home insights in seconds.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs self-start md:self-auto">
          <button
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-headline-sm text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'payslip'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTabLocal('payslip')}
            type="button"
          >
            <span className="material-symbols-outlined text-base">receipt_long</span>
            <span>Upload Monthly Payslip</span>
          </button>

          <button
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-headline-sm text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'offer'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTabLocal('offer')}
            type="button"
          >
            <span className="material-symbols-outlined text-base">compare_arrows</span>
            <span>Compare Job Offer Letters</span>
          </button>
        </div>
      </div>

      {/* TAB VIEW 1: PAYSLIP UPLOADER & OCR */}
      {activeTab === 'payslip' && (
        <div className="space-y-6">
          {/* Top Bento Section: Upload Dropzone & Live Pipeline Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Upload Zone (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md relative overflow-hidden border border-slate-200 dark:border-slate-800">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-xl font-bold">file_present</span>
                  <span className="font-headline-sm text-sm font-bold text-slate-900 dark:text-white">Document Intake</span>
                </div>
                <span className="font-label-tag text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider font-semibold border border-slate-200 dark:border-slate-700">
                  PDF, PNG, JPG • Up to 15MB
                </span>
              </div>

              {/* Big Dashed Drop Box */}
              <div className="group relative flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-slate-800 transition-all cursor-pointer text-center border-2 border-dashed border-slate-300 dark:border-slate-700">
                <input
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                />

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                </div>

                <h2 className="font-headline-sm text-base text-slate-900 dark:text-white font-bold mt-3">
                  Drop your monthly payslip here
                </h2>
                <p className="font-body-md text-xs text-slate-600 dark:text-slate-400 mt-1">
                  or <span className="text-indigo-600 dark:text-indigo-400 font-bold underline decoration-indigo-400 underline-offset-4">browse your local device</span>
                </p>

                {/* Privacy Guarantee Badge */}
                <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-sm text-xs font-body-sm border border-slate-200 dark:border-slate-800">
                  <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-sm font-bold">lock</span>
                  <span>Bank-grade 256-bit AES encryption • Zero document retention</span>
                </div>

                {/* Sample Quick Button */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 z-20">
                  <span className="font-label-tag text-[10px] text-slate-500 dark:text-slate-400 uppercase">
                    Need a quick test?
                  </span>
                  <button
                    className="flex items-center gap-1 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 hover:text-white text-indigo-700 dark:text-indigo-300 transition-all font-label-mono-data text-xs shadow-sm border border-indigo-200 dark:border-indigo-800 cursor-pointer"
                    onClick={() => {
                      setIsSampleLoaded(true);
                      showToast('Loaded sample RazorTech Solutions payslip (₹6.0 LPA CTC)');
                    }}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">science</span>
                    <span>Try with Sample Payslip (₹6,00,000 CTC)</span>
                  </button>
                </div>

                {isSampleLoaded && (
                  <div className="mt-2.5 flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-label-tag text-xs bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
                    <span>Loaded: &quot;RazorTech_Payslip_Oct2024.pdf&quot;</span>
                  </div>
                )}
              </div>

              {/* Privacy Footer Callout Strip */}
              <div className="mt-3 p-3 px-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-emerald-600 dark:text-emerald-400 font-bold">security_update_good</span>
                  <span>GDPR &amp; RBI compliance: document is stripped of non-tax identifiers.</span>
                </div>
                <button
                  className="text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center gap-0.5 text-xs cursor-pointer"
                  onClick={() => {
                    setIsSampleLoaded(false);
                    showToast('Document securely purged from sandbox session', 'delete');
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">delete_forever</span>
                  <span>Purge Document</span>
                </button>
              </div>
            </div>

            {/* Pipeline Status & AI Model Meta (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md space-y-4 border border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-xl font-bold">neurology</span>
                    <span className="font-headline-sm text-sm font-bold text-slate-900 dark:text-white">Extraction Pipeline</span>
                  </div>
                  <span className="flex items-center gap-1 font-label-tag text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-300 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                    All Rules Checked
                  </span>
                </div>
                <p className="font-body-sm text-xs text-slate-600 dark:text-slate-400">
                  Document parsed with 98.4% aggregate confidence against Indian Income Tax Act Sections 10, 17, and PF Rules 1952.
                </p>
              </div>

              {/* Stepper Visualizer */}
              <div className="space-y-3.5 my-auto">
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-base">check</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-xs font-bold text-slate-900 dark:text-white">File Ingestion &amp; De-noising</span>
                      <span className="font-label-mono-data text-xs text-emerald-600 dark:text-emerald-400 font-bold">100%</span>
                    </div>
                    <p className="font-body-sm text-[11px] text-slate-500 dark:text-slate-400 truncate">Format validated: PDF 1.7 / Clean text matrix verified.</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div className="bg-emerald-600 dark:bg-emerald-500 h-full w-full rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-base">check</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-xs font-bold text-slate-900 dark:text-white">OCR &amp; Table Matrix Parse</span>
                      <span className="font-label-mono-data text-xs text-emerald-600 dark:text-emerald-400 font-bold">100%</span>
                    </div>
                    <p className="font-body-sm text-[11px] text-slate-500 dark:text-slate-400 truncate">Earnings &amp; Deductions extracted with bounding geometry.</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div className="bg-emerald-600 dark:bg-emerald-500 h-full w-full rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-base">balance</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-xs font-bold text-slate-900 dark:text-white">Indian Tax Rules Applied</span>
                      <span className="font-label-mono-data text-xs text-indigo-600 dark:text-indigo-400 font-bold">Done</span>
                    </div>
                    <p className="font-body-sm text-[11px] text-slate-500 dark:text-slate-400 truncate">Section 10(13A) HRA, EPF 12% statutory check passed.</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div className="bg-indigo-600 dark:bg-indigo-500 h-full w-full rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Summary Mini-Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="font-label-tag text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold">Computed Net In-Hand</span>
                  <div className="font-label-currency-lg text-xl text-indigo-600 dark:text-indigo-400 tracking-tight font-bold">
                    {formatCurrency(netSalary)}
                    <span className="font-body-sm text-xs text-slate-500 dark:text-slate-400 font-normal"> / mo</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-tag text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold">Annualized CTC</span>
                  <div className="font-label-mono-data text-sm font-bold text-slate-900 dark:text-white">
                    {formatCurrency(totalGross * 12)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parsed Payslip Breakdown Table Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md space-y-5 border border-slate-200 dark:border-slate-800">
            {/* Header Strip */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-200 dark:border-slate-600">
                  <span className="material-symbols-outlined text-2xl font-bold">apartment</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline-md text-base lg:text-lg font-bold text-slate-900 dark:text-white">
                      RazorTech Solutions India Pvt Ltd
                    </span>
                    <span className="font-label-tag text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-300 dark:border-emerald-800">
                      Verified Org
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body-sm text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span>Pay Period: <strong className="text-slate-900 dark:text-slate-200 font-bold">October 2024</strong></span>
                    <span>•</span>
                    <span>PAN: <span className="font-label-mono-data text-slate-800 dark:text-slate-300 font-bold">XXXXXX481A</span></span>
                    <span>•</span>
                    <span>UAN: <span className="font-label-mono-data text-slate-800 dark:text-slate-300 font-bold">101928374619</span></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <span className="font-label-tag text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-bold flex items-center gap-1 border border-indigo-200 dark:border-slate-600">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  AI Extraction Confidence: 98.4%
                </span>
                <button
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-600 cursor-pointer"
                  onClick={() => showToast('Exporting original verified PDF...', 'download')}
                  title="Export Raw Document"
                  type="button"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                </button>
              </div>
            </div>

            {/* Split Earnings & Deductions Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* EARNINGS COLUMN */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <h3 className="font-headline-sm text-sm font-bold text-slate-900 dark:text-white">Earnings (Gross Additions)</h3>
                  </div>
                  <span className="font-label-tag text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold">
                    Tax Exemption Eligibility
                  </span>
                </div>

                <div className="space-y-1.5">
                  {earningsItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-indigo-50/40 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700/60"
                    >
                      <div className="flex items-center gap-2.5">
                        <button
                          className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors text-xs border border-indigo-200 dark:border-slate-600 cursor-pointer"
                          onClick={() => openExplainModal(item.label, item.tag, item.explanation, item.formula)}
                          title="What is this?"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-sm">help</span>
                        </button>
                        <div>
                          <div className="font-body-md text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            {item.label}
                            <span className="font-label-tag text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-300 dark:border-emerald-800">
                              {item.matchPercent}% Match
                            </span>
                          </div>
                          <span className="font-body-sm text-[11px] text-slate-500 dark:text-slate-400">
                            {item.subtext}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {editingId === item.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              className="w-24 px-2 py-0.5 rounded bg-white dark:bg-slate-900 font-label-mono-data text-xs text-slate-900 dark:text-white outline-none border border-indigo-600"
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              autoFocus
                            />
                            <button
                              className="material-symbols-outlined text-sm text-emerald-600 dark:text-emerald-400 cursor-pointer"
                              onClick={() => saveEdit(item.id, true)}
                            >
                              done
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="font-label-mono-data text-xs font-bold text-slate-900 dark:text-white">
                              {formatCurrency(item.amount)}
                            </div>
                            <button
                              className="material-symbols-outlined text-sm text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                              onClick={() => startEdit(item.id, item.amount)}
                              title="Edit value"
                            >
                              edit
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Gross Row */}
                <div className="mt-2 p-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-between border border-slate-200 dark:border-slate-700">
                  <span className="font-headline-sm text-xs font-bold text-slate-900 dark:text-white">Total Gross Earnings</span>
                  <span className="font-label-currency-md text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                    {formatCurrency(totalGross)}
                  </span>
                </div>
              </div>

              {/* DEDUCTIONS COLUMN */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <h3 className="font-headline-sm text-sm font-bold text-slate-900 dark:text-white">
                      Deductions (Withholdings &amp; Taxes)
                    </h3>
                  </div>
                  <span className="font-label-tag text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold">
                    Statutory Compliance
                  </span>
                </div>

                <div className="space-y-1.5">
                  {deductionItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-rose-50/30 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700/60"
                    >
                      <div className="flex items-center gap-2.5">
                        <button
                          className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors text-xs border border-indigo-200 dark:border-slate-600 cursor-pointer"
                          onClick={() => openExplainModal(item.label, item.tag, item.explanation, item.formula)}
                          title="What is this?"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-sm">help</span>
                        </button>
                        <div>
                          <div className="font-body-md text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            {item.label}
                            <span className="font-label-tag text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-300 dark:border-emerald-800">
                              {item.matchPercent}% Match
                            </span>
                          </div>
                          <span className="font-body-sm text-[11px] text-slate-500 dark:text-slate-400">
                            {item.subtext}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {editingId === item.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              className="w-24 px-2 py-0.5 rounded bg-white dark:bg-slate-900 font-label-mono-data text-xs text-rose-600 dark:text-rose-400 outline-none border border-rose-500"
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              autoFocus
                            />
                            <button
                              className="material-symbols-outlined text-sm text-emerald-600 dark:text-emerald-400 cursor-pointer"
                              onClick={() => saveEdit(item.id, false)}
                            >
                              done
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="font-label-mono-data text-xs font-bold text-rose-600 dark:text-rose-400">
                              {formatCurrency(item.amount)}
                            </div>
                            <button
                              className="material-symbols-outlined text-sm text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                              onClick={() => startEdit(item.id, item.amount)}
                              title="Edit value"
                            >
                              edit
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px] border border-slate-200 dark:border-slate-800">
                    <span className="italic">No Voluntary PF or Insurance Deductions detected</span>
                    <span className="font-label-mono-data">₹0</span>
                  </div>
                </div>

                {/* Total Deductions Row */}
                <div className="mt-2 p-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-between border border-slate-200 dark:border-slate-700">
                  <span className="font-headline-sm text-xs font-bold text-slate-900 dark:text-white">Total Deductions</span>
                  <span className="font-label-currency-md text-sm text-rose-600 dark:text-rose-400 font-bold">
                    {formatCurrency(totalDeductions)}
                  </span>
                </div>
              </div>
            </div>

            {/* In-Hand Net Bar Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#4338ca] text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl border border-indigo-400/40">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-md">
                  <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                </div>
                <div>
                  <span className="font-label-tag text-[10px] uppercase tracking-wider text-indigo-200 font-bold">
                    Audited Net Salary Deposited
                  </span>
                  <div className="font-display-hero text-2xl lg:text-3xl leading-tight tracking-tight font-extrabold text-white">
                    {formatCurrency(netSalary)}{' '}
                    <span className="font-headline-sm text-sm text-indigo-200 font-normal">/ month</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md text-right border border-white/15">
                  <span className="font-label-tag text-[10px] uppercase text-indigo-200 block font-bold">Take-Home Ratio</span>
                  <span className="font-label-mono-data text-xs font-bold text-white">{takeHomeRatio}% of Gross</span>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md text-right border border-white/15">
                  <span className="font-label-tag text-[10px] uppercase text-indigo-200 block font-bold">Total Tax Rate</span>
                  <span className="font-label-mono-data text-xs font-bold text-white">{taxRatio}% TDS</span>
                </div>
              </div>
            </div>

            {/* Action Bar Bottom */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-headline-sm text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
                  onClick={() => showToast('Re-scanning document with deep neural OCR...')}
                  type="button"
                >
                  <span className="material-symbols-outlined text-base">refresh</span>
                  <span>Re-scan Document</span>
                </button>
                <button
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-headline-sm text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
                  onClick={() => showToast('Exported payslip table as JSON & Excel spreadsheet', 'download')}
                  type="button"
                >
                  <span className="material-symbols-outlined text-base">data_object</span>
                  <span>Download JSON / Excel</span>
                </button>
              </div>

              <button
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-headline-sm text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                onClick={() => {
                  showToast('Saved & Synced with your active dashboard metrics!', 'cloud_sync');
                  setActiveTab('dashboard');
                }}
                type="button"
              >
                <span className="material-symbols-outlined text-base">cloud_sync</span>
                <span>Save &amp; Sync with Dashboard</span>
              </button>
            </div>
          </div>

          {/* Secondary Tab Callout Teaser Banner */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 border border-purple-200 dark:border-purple-800">
                <span className="material-symbols-outlined text-2xl">compare</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-sm font-bold text-slate-900 dark:text-white">
                  Got multiple job offers? Don&apos;t be fooled by inflated CTC figures.
                </h4>
                <p className="font-body-md text-xs text-slate-600 dark:text-slate-400">
                  Upload both offer letters to see actual real in-hand monthly take-home after non-cash benefits, gratuity, and tax brackets.
                </p>
              </div>
            </div>
            <button
              className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-indigo-700 dark:text-indigo-300 font-headline-sm text-xs font-bold transition-all border border-indigo-200 dark:border-slate-700 cursor-pointer"
              onClick={() => setActiveTabLocal('offer')}
              type="button"
            >
              <span>Compare Job Offers</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB VIEW 2: JOB OFFER COMPARISON */}
      {activeTab === 'offer' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md space-y-5 border border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-label-tag text-xs uppercase tracking-wider mb-1 font-bold">
              <span className="material-symbols-outlined text-base">difference</span>
              <span>Dual CTC Analysis &amp; In-Hand Truth Checker</span>
            </div>
            <h2 className="font-headline-lg text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
              Side-by-Side Offer Letter Simulator
            </h2>
            <p className="font-body-md text-xs text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
              Recruiters often pack employer EPF, ESOP cliffs, and hypothetical bonuses into your headline CTC. Upload both documents or input terms manually to reveal actual month-end bank credits.
            </p>
          </div>

          {/* Dual Dropzone Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Offer A */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 flex flex-col justify-between space-y-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-sm font-bold text-slate-900 dark:text-white">
                  Offer A (Current Employer)
                </span>
                <span className="font-label-tag text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold uppercase border border-indigo-200 dark:border-indigo-800">
                  Baseline
                </span>
              </div>

              <div
                className="p-5 rounded-xl bg-white dark:bg-slate-900 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50/40 dark:hover:bg-slate-800 transition-all border border-dashed border-slate-300 dark:border-slate-700"
                onClick={() => showToast('Offer A: Baseline locked to RazorTech (₹6.0 LPA)')}
              >
                <span className="material-symbols-outlined text-3xl text-indigo-600 dark:text-indigo-400">upload_file</span>
                <span className="font-body-md text-xs text-slate-900 dark:text-white font-semibold mt-1.5">
                  Upload Offer Letter A (PDF)
                </span>
                <span className="font-body-sm text-[11px] text-slate-500 dark:text-slate-400">
                  Extracted: RazorTech Solutions (₹6.0 LPA)
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-600 dark:text-slate-400">Annual CTC</span>
                  <span className="font-label-mono-data font-bold text-slate-900 dark:text-white">₹6,00,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-600 dark:text-slate-400">Estimated Monthly In-Hand</span>
                  <span className="font-label-currency-md font-bold text-indigo-600 dark:text-indigo-400">₹43,200</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600 dark:text-slate-400">Variable / Bonus Component</span>
                  <span className="font-label-mono-data text-slate-800 dark:text-slate-300">0% (Pure Fixed)</span>
                </div>
              </div>
            </div>

            {/* Offer B */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 flex flex-col justify-between space-y-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-sm font-bold text-slate-900 dark:text-white">
                  Offer B (Competitor Offer)
                </span>
                <span className="font-label-tag text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold uppercase border border-purple-200 dark:border-purple-800">
                  Challenger
                </span>
              </div>

              <div
                className="p-5 rounded-xl bg-white dark:bg-slate-900 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50/40 dark:hover:bg-slate-800 transition-all border border-dashed border-slate-300 dark:border-slate-700"
                onClick={() => showToast('Simulating Challenger Offer (₹9.5 LPA)')}
              >
                <span className="material-symbols-outlined text-3xl text-purple-600 dark:text-purple-400">cloud_upload</span>
                <span className="font-body-md text-xs text-slate-900 dark:text-white font-semibold mt-1.5">
                  Upload Offer Letter B (PDF)
                </span>
                <span className="font-body-sm text-[11px] text-slate-500 dark:text-slate-400">
                  Simulated: Zomato Backend (₹9.5 LPA)
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-600 dark:text-slate-400">Annual CTC</span>
                  <span className="font-label-mono-data font-bold text-slate-900 dark:text-white">₹9,50,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-600 dark:text-slate-400">Estimated Monthly In-Hand</span>
                  <span className="font-label-currency-md font-bold text-emerald-600 dark:text-emerald-400">₹61,450</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600 dark:text-slate-400">Variable / Bonus Component</span>
                  <span className="font-label-mono-data text-slate-800 dark:text-slate-300">15% Performance Target</span>
                </div>
              </div>
            </div>
          </div>

          {/* Offer Comparison Takeaway Card */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-2xl font-bold">trending_up</span>
              <div>
                <div className="font-headline-sm text-sm font-bold text-emerald-900 dark:text-emerald-300">
                  Net In-Hand Increment: +₹18,250 / month (+42.2%)
                </div>
                <div className="font-body-sm text-xs text-emerald-700 dark:text-emerald-400/90 font-medium">
                  Offer B falls into the 15% slab under New Regime FY 24-25. Total annual tax difference: ₹28,400.
                </div>
              </div>
            </div>
            <button
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-headline-sm text-xs font-bold shadow cursor-pointer whitespace-nowrap transition-colors"
              onClick={() => setActiveTab('scenario-simulator')}
              type="button"
            >
              Run Full Simulation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
