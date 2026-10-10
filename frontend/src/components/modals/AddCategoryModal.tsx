import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AddCategoryModal: React.FC = () => {
  const {
    addCategoryModalBucket,
    closeAddCategoryModal,
    addBudgetItem,
  } = useApp();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [bucket, setBucket] = useState<'Needs' | 'Wants' | 'Savings'>(addCategoryModalBucket || 'Needs');

  // Sync bucket when modal opens
  React.useEffect(() => {
    if (addCategoryModalBucket) {
      setBucket(addCategoryModalBucket);
    }
  }, [addCategoryModalBucket]);

  if (!addCategoryModalBucket) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseInt(amount, 10);
    if (!name.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    let icon = 'category';
    if (bucket === 'Needs') icon = 'receipt';
    if (bucket === 'Wants') icon = 'local_mall';
    if (bucket === 'Savings') icon = 'savings';

    addBudgetItem({
      name: name.trim(),
      subtext: 'Custom allocated category',
      monthlyCap: parsedAmount,
      spentDate: 0,
      bucket,
      icon,
      statusText: 'Tracking initialized',
    });

    setName('');
    setAmount('');
    closeAddCategoryModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest dark:bg-[#1e293b] w-full max-w-md rounded-3xl p-5 lg:p-6 shadow-2xl space-y-4 border border-surface-container-high dark:border-slate-700 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-md text-base lg:text-lg font-bold text-on-surface dark:text-white">
            Add {bucket} Item
          </h3>
          <button
            className="w-8 h-8 rounded-full bg-surface-container dark:bg-slate-800 flex items-center justify-center text-on-surface-variant dark:text-slate-300 hover:text-on-surface cursor-pointer"
            onClick={closeAddCategoryModal}
            type="button"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="font-headline-sm text-xs font-bold text-on-surface dark:text-white block mb-1">
              Category Name
            </label>
            <input
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-white font-body-md text-xs outline-none focus:bg-surface-container transition-all border border-transparent dark:border-slate-700 focus:border-primary"
              placeholder="e.g. House Cleaning, Weekend Trek, Swiggy Instamart"
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-headline-sm text-xs font-bold text-on-surface dark:text-white block mb-1">
              Monthly Budget Cap (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-headline-sm text-xs text-on-surface-variant">
                ₹
              </span>
              <input
                className="w-full pl-7 pr-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-white font-label-mono-data text-xs outline-none focus:bg-surface-container transition-all border border-transparent dark:border-slate-700 focus:border-primary"
                placeholder="2500"
                required
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="font-headline-sm text-xs font-bold text-on-surface dark:text-white block mb-1.5">
              Assign to Bucket
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                className={`py-2 rounded-xl text-center font-headline-sm text-xs font-bold transition-all cursor-pointer ${
                  bucket === 'Needs'
                    ? 'bg-primary dark:bg-indigo-600 text-white shadow-sm'
                    : 'bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300'
                }`}
                onClick={() => setBucket('Needs')}
                type="button"
              >
                Needs (50%)
              </button>
              <button
                className={`py-2 rounded-xl text-center font-headline-sm text-xs font-bold transition-all cursor-pointer ${
                  bucket === 'Wants'
                    ? 'bg-secondary dark:bg-purple-600 text-white shadow-sm'
                    : 'bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300'
                }`}
                onClick={() => setBucket('Wants')}
                type="button"
              >
                Wants (30%)
              </button>
              <button
                className={`py-2 rounded-xl text-center font-headline-sm text-xs font-bold transition-all cursor-pointer ${
                  bucket === 'Savings'
                    ? 'bg-tertiary dark:bg-emerald-600 text-white shadow-sm'
                    : 'bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300'
                }`}
                onClick={() => setBucket('Savings')}
                type="button"
              >
                Savings (20%)
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              className="px-3 py-2 rounded-xl text-on-surface-variant dark:text-slate-400 font-headline-sm text-xs cursor-pointer"
              onClick={closeAddCategoryModal}
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 rounded-xl bg-primary dark:bg-indigo-600 text-white font-headline-sm text-xs font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer"
              type="submit"
            >
              Save Allocation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
