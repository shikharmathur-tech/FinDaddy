import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AddGoalModal: React.FC = () => {
  const { isAddGoalModalOpen, closeAddGoalModal, addGoal } = useApp();

  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [monthlyAutoDebit, setMonthlyAutoDebit] = useState('');
  const [icon, setIcon] = useState('🎯');

  if (!isAddGoalModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tAmt = parseInt(targetAmount, 10);
    const mSip = parseInt(monthlyAutoDebit, 10);
    if (!title.trim() || isNaN(tAmt) || tAmt <= 0) return;

    addGoal({
      title: title.trim(),
      targetAmount: tAmt,
      currentAmount: 0,
      targetDate: targetDate || 'Dec 2025',
      monthlyAutoDebit: isNaN(mSip) ? Math.round(tAmt / 12) : mSip,
      icon: icon || '🎯',
      onTrack: true,
      category: 'Milestone',
    });

    setTitle('');
    setTargetAmount('');
    setTargetDate('');
    setMonthlyAutoDebit('');
    closeAddGoalModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest dark:bg-[#1e293b] w-full max-w-md rounded-3xl p-5 lg:p-6 shadow-2xl space-y-4 border border-surface-container-high dark:border-slate-700 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-md text-base lg:text-lg font-bold text-on-surface dark:text-white">
            Create Financial Goal
          </h3>
          <button
            className="w-8 h-8 rounded-full bg-surface-container dark:bg-slate-800 flex items-center justify-center text-on-surface-variant dark:text-slate-300 hover:text-on-surface cursor-pointer"
            onClick={closeAddGoalModal}
            type="button"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="font-headline-sm text-xs font-bold text-on-surface dark:text-white block mb-1">
              Goal Title
            </label>
            <input
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-white font-body-md text-xs outline-none focus:bg-surface-container transition-all border border-transparent dark:border-slate-700 focus:border-primary"
              placeholder="e.g. Europe Trip, Bike Down Payment, MacBook Air"
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-headline-sm text-xs font-bold text-on-surface dark:text-white block mb-1">
                Target Amount (₹)
              </label>
              <input
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-white font-label-mono-data text-xs outline-none focus:bg-surface-container transition-all border border-transparent dark:border-slate-700 focus:border-primary"
                placeholder="100000"
                required
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="font-headline-sm text-xs font-bold text-on-surface dark:text-white block mb-1">
                Target Date
              </label>
              <input
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-white font-body-md text-xs outline-none focus:bg-surface-container transition-all border border-transparent dark:border-slate-700 focus:border-primary"
                placeholder="e.g. Dec 2025"
                required
                type="text"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-headline-sm text-xs font-bold text-on-surface dark:text-white block mb-1">
                Monthly SIP (₹)
              </label>
              <input
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-white font-label-mono-data text-xs outline-none focus:bg-surface-container transition-all border border-transparent dark:border-slate-700 focus:border-primary"
                placeholder="5000"
                type="number"
                value={monthlyAutoDebit}
                onChange={(e) => setMonthlyAutoDebit(e.target.value)}
              />
            </div>
            <div>
              <label className="font-headline-sm text-xs font-bold text-on-surface dark:text-white block mb-1">
                Icon Emoji
              </label>
              <div className="flex gap-1.5 pt-1">
                {['🎯', '🛡️', '💻', '🌴', '🚗', '💍'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border cursor-pointer ${
                      icon === emoji
                        ? 'border-primary bg-primary/10'
                        : 'border-transparent bg-surface-container-low dark:bg-slate-800'
                    }`}
                    onClick={() => setIcon(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              className="px-3 py-2 rounded-xl text-on-surface-variant dark:text-slate-400 font-headline-sm text-xs cursor-pointer"
              onClick={closeAddGoalModal}
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 rounded-xl bg-primary dark:bg-indigo-600 text-white font-headline-sm text-xs font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer"
              type="submit"
            >
              Launch Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
