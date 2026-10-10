import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const FinDaddyAI: React.FC = () => {
  const {
    isFinDaddyOpen,
    setIsFinDaddyOpen,
    chatMessages,
    addChatMessage,
    clearChat,
  } = useApp();

  const [inputVal, setInputVal] = useState('');

  const generateResponse = (query: string): string => {
    const lower = query.toLowerCase();
    if (lower.includes('20k') || lower.includes('rent') || lower.includes('afford')) {
      return `<b>Bro, straight talk on 20k Rent on 50k salary:</b><br/>• Your monthly take-home is <b>₹43,200</b>.<br/>• A ₹20,000 rent consumes <b>46.3%</b> of your entire in-hand cash! ⚠️<br/>• Recommended golden rule for Tier-1 cities (Bangalore/Mumbai/Gurgaon) is under <b>30-35%</b> (around ₹13k–₹15k max).<br/>💡 <i>FinDaddy Tip:</i> Consider a flatshare or staying near the metro to cap rent under ₹14,000. That leaves ₹6,000 extra for your Goa Trip & emergency buffer! 🏖️`;
    }
    if (lower.includes('15,000') || lower.includes('tax') || lower.includes('80c') || lower.includes('save')) {
      return `<b>Here is how to pocket that ₹15,600 tax rebate:</b><br/>• Under Section 80C, you can invest up to ₹1.5 Lakh in ELSS Mutual Funds or PPF.<br/>• Your current EPF already locks in ~₹21,600/yr automatically.<br/>• Putting the remaining into a 3-year lock-in ELSS Fund (like Parag Parikh or Quant Tax Saver) saves you ₹15,600 in net TDS.<br/>⚡ <i>Action:</i> Download your 80C declaration form before 15th January for payroll deduction halt!`;
    }
    if (lower.includes('form 16') || lower.includes('tds') || lower.includes('deduction')) {
      return `<b>Form 16 &amp; Payslip Demystified:</b><br/>1. <b>TDS (₹4,800/mo):</b> Income tax deducted directly at source and deposited to Govt TRACES.<br/>2. <b>EPF (₹1,800/mo):</b> 12% of Basic. Employer matches this, earning 8.25% risk-free interest.<br/>3. <b>Professional Tax (₹200):</b> State govt levy (standard across Maharashtra/Karnataka).<br/>✅ Verified: Your Form 26AS is 100% matched with zero pending dues.`;
    }
    if (lower.includes('raise') || lower.includes('appraisal') || lower.includes('simulate')) {
      return `<b>Simulating a 20% Raise (₹6.0 LPA ➔ ₹7.2 LPA):</b><br/>• New Gross Monthly: <b>₹60,000</b> (up from ₹50,000)<br/>• Projected Take-Home: <b>₹51,840</b> (+₹8,640 net jump)<br/>• Recommended move: Channel 50% of the raise straight to your <i>M3 MacBook</i> &amp; emergency buffer to avoid lifestyle inflation!`;
    }
    if (lower.includes('epf') || lower.includes('pf') || lower.includes('provident')) {
      return `<b>EPF Breakdown:</b><br/>• Employee contribution: 12% of Basic (capped at ₹1,800/mo statutory standard).<br/>• Employer match: 12% (split: 3.67% to EPF + 8.33% to EPS pension corpus).<br/>• Current EPFO Interest Rate: <b>8.25% per annum</b> compound, sovereign guaranteed and tax-free upon maturity!`;
    }
    return `Got you! For your <b>₹50,000 CTC</b>, you are already beating 88% of first-year peers in India with your 38% automated savings rate.<br/><br/>You can explore our <b>Tax Regime Comparison Calculator</b> or <b>Scenario Simulator</b> for instant mathematical projections. What else would you like to optimize? 🚀`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    addChatMessage('user', text);
    setInputVal('');

    setTimeout(() => {
      const reply = generateResponse(text);
      addChatMessage('assistant', reply);
    }, 500);
  };

  return (
    <>
      {/* Docked Bottom Bar */}
      <div className="fixed bottom-0 left-0 lg:left-72 right-0 z-30 bg-surface/90 dark:bg-[#0f172a]/95 backdrop-blur-xl border-t border-surface-container-high dark:border-slate-800 px-3 lg:px-6 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-all duration-300">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-3">
          {/* Left badge & prompt chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-secondary to-primary text-white font-headline-sm text-xs font-bold shadow-md hover:brightness-110 transition-all flex-shrink-0 cursor-pointer"
              onClick={() => setIsFinDaddyOpen(!isFinDaddyOpen)}
              type="button"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-ping"></span>
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <span>FinDaddy AI</span>
            </button>

            <span className="text-xs text-on-surface-variant dark:text-slate-400 hidden xl:inline">Ask anything:</span>

            <button
              className="px-3 py-1 rounded-full bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-slate-200 border border-outline-variant/60 dark:border-slate-700 text-xs whitespace-nowrap hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors cursor-pointer"
              onClick={() => {
                setIsFinDaddyOpen(true);
                handleSend('Can I afford 20k rent on 50k salary?');
              }}
              type="button"
            >
              💬 Can I afford 20k rent on 50k salary?
            </button>

            <button
              className="px-3 py-1 rounded-full bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-slate-200 border border-outline-variant/60 dark:border-slate-700 text-xs whitespace-nowrap hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors cursor-pointer"
              onClick={() => {
                setIsFinDaddyOpen(true);
                handleSend('How to save ₹15,000 extra tax?');
              }}
              type="button"
            >
              ⚡ How to save ₹15,000 extra tax?
            </button>

            <button
              className="hidden md:inline-flex px-3 py-1 rounded-full bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-slate-200 border border-outline-variant/60 dark:border-slate-700 text-xs whitespace-nowrap hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors cursor-pointer"
              onClick={() => {
                setIsFinDaddyOpen(true);
                handleSend('Explain my Form 16 / TDS deductions in simple terms');
              }}
              type="button"
            >
              📜 Explain Form 16 &amp; TDS
            </button>
          </div>

          {/* Right Expand Action */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary-container/20 dark:bg-primary-container/30 text-primary dark:text-[#818cf8] hover:bg-primary-container/30 text-xs font-bold transition-all cursor-pointer"
              onClick={() => setIsFinDaddyOpen(!isFinDaddyOpen)}
              type="button"
            >
              <span>{isFinDaddyOpen ? 'Hide Chat' : 'Open Chat'}</span>
              <span className="material-symbols-outlined text-base">
                {isFinDaddyOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Chat Drawer */}
      <div
        className={`fixed bottom-0 right-4 lg:right-6 z-50 w-full max-w-md bg-surface-container-lowest dark:bg-[#1e293b] rounded-t-3xl shadow-2xl border border-surface-container-high dark:border-slate-700 flex flex-col transition-transform duration-300 ease-in-out ${
          isFinDaddyOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: '560px' }}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-t-3xl text-white flex items-center justify-between flex-shrink-0 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-lg shadow-inner border border-white/30">
              💸
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-sm font-bold leading-none">FinDaddy AI</span>
                <span className="px-2 py-0.2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-extrabold uppercase">
                  Live Advisor
                </span>
              </div>
              <p className="text-[11px] text-on-primary-container mt-0.5">Your Gen-Z Indian salary &amp; tax companion</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              onClick={clearChat}
              title="Reset conversation"
              type="button"
            >
              <span className="material-symbols-outlined text-base">restart_alt</span>
            </button>
            <button
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              onClick={() => setIsFinDaddyOpen(false)}
              title="Minimize Drawer"
              type="button"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface-container-low/40 dark:bg-slate-900/60 font-body-sm text-xs">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 text-xs shadow">
                  🤖
                </div>
              )}
              <div
                className={`p-3 rounded-2xl shadow-sm text-xs leading-relaxed max-w-[85%] ${
                  msg.sender === 'user'
                    ? 'bg-primary dark:bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 rounded-tl-none border border-surface-container-high/60 dark:border-slate-700/80'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </div>
          ))}
        </div>

        {/* Chips */}
        <div className="px-3 py-2 border-t border-surface-container dark:border-slate-800 bg-surface-container-lowest dark:bg-[#1e293b] flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
          <button
            className="px-2.5 py-1 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-xs text-on-surface dark:text-slate-300 whitespace-nowrap transition-colors cursor-pointer"
            onClick={() => handleSend('Can I afford 20k rent on 50k salary?')}
            type="button"
          >
            🏠 20k Rent on 50k?
          </button>
          <button
            className="px-2.5 py-1 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-xs text-on-surface dark:text-slate-300 whitespace-nowrap transition-colors cursor-pointer"
            onClick={() => handleSend('How to save ₹15,000 extra tax?')}
            type="button"
          >
            💰 80C Tax Trick
          </button>
          <button
            className="px-2.5 py-1 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-xs text-on-surface dark:text-slate-300 whitespace-nowrap transition-colors cursor-pointer"
            onClick={() => handleSend('Explain my Form 16 / TDS deductions in simple terms')}
            type="button"
          >
            🔍 Form 16 Breakdown
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-2.5 bg-surface-container-lowest dark:bg-[#1e293b] border-t border-surface-container dark:border-slate-800 flex items-center gap-2 flex-shrink-0">
          <input
            className="flex-1 bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-white placeholder:text-outline dark:placeholder:text-slate-400 px-3.5 py-2 rounded-xl text-xs outline-none border border-transparent focus:border-primary dark:focus:border-indigo-400 transition-all"
            placeholder="Ask FinDaddy (e.g. 'Should I do ELSS or PPF?')..."
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button
            className="w-9 h-9 rounded-xl bg-primary dark:bg-indigo-600 hover:bg-primary/90 text-white flex items-center justify-center transition-transform active:scale-95 shadow-md flex-shrink-0 cursor-pointer"
            onClick={() => handleSend()}
            type="button"
          >
            <span className="material-symbols-outlined text-base">send</span>
          </button>
        </div>
      </div>
    </>
  );
};
