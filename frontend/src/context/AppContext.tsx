import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavTab,
  ThemeMode,
  AccentColor,
  NotationMode,
  DensityMode,
  BudgetItem,
  GoalItem,
  SalarySlip,
  SalaryBreakdownItem,
  ChatMessage,
} from '../types';

interface ExplainModalState {
  isOpen: boolean;
  title: string;
  tag: string;
  description: string;
  formula: string;
}

interface AppContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  accentColor: AccentColor;
  setAccentColor: (accent: AccentColor) => void;
  notationMode: NotationMode;
  setNotationMode: (mode: NotationMode) => void;
  isMasked: boolean;
  setIsMasked: (masked: boolean) => void;
  toggleMasking: () => void;
  densityMode: DensityMode;
  setDensityMode: (mode: DensityMode) => void;
  highContrast: boolean;
  setHighContrast: (hc: boolean) => void;
  suppressPaise: boolean;
  setSuppressPaise: (sp: boolean) => void;
  reduceAnimations: boolean;
  setReduceAnimations: (ra: boolean) => void;
  activeProfile: string;
  setActiveProfile: (profile: string) => void;
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  budgetItems: BudgetItem[];
  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => void;
  updateBudgetItemAmount: (id: string, amount: number) => void;
  goals: GoalItem[];
  addGoal: (goal: Omit<GoalItem, 'id'>) => void;
  salarySlips: SalarySlip[];
  earningsItems: SalaryBreakdownItem[];
  updateEarningAmount: (id: string, amount: number) => void;
  deductionItems: SalaryBreakdownItem[];
  updateDeductionAmount: (id: string, amount: number) => void;
  isMobileSimulatorOpen: boolean;
  applyPayslipData: (gross: number, deductions: number) => void;
  setIsMobileSimulatorOpen: (open: boolean) => void;
  isFinDaddyOpen: boolean;
  setIsFinDaddyOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (sender: 'user' | 'assistant', text: string) => void;
  clearChat: () => void;
  explainModal: ExplainModalState;
  openExplainModal: (title: string, tag: string, description: string, formula: string) => void;
  closeExplainModal: () => void;
  addCategoryModalBucket: 'Needs' | 'Wants' | 'Savings' | null;
  openAddCategoryModal: (bucket: 'Needs' | 'Wants' | 'Savings') => void;
  closeAddCategoryModal: () => void;
  isAddGoalModalOpen: boolean;
  openAddGoalModal: () => void;
  closeAddGoalModal: () => void;
  payslipDetailModalMonth: string | null;
  openPayslipDetailModal: (month: string) => void;
  closePayslipDetailModal: () => void;
  toastMessage: string | null;
  toastIcon: string;
  showToast: (msg: string, icon?: string) => void;
  formatCurrency: (amount: number, overrideMask?: boolean) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [accentColor, setAccentColor] = useState<AccentColor>('indigo');
  const [notationMode, setNotationMode] = useState<NotationMode>('in');
  const [isMasked, setIsMasked] = useState<boolean>(false);
  const [densityMode, setDensityMode] = useState<DensityMode>('relaxed');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [suppressPaise, setSuppressPaise] = useState<boolean>(true);
  const [reduceAnimations, setReduceAnimations] = useState<boolean>(false);
  const [activeProfile, setActiveProfile] = useState<string>('Rohan Verma');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const [isMobileSimulatorOpen, setIsMobileSimulatorOpen] = useState<boolean>(false);
  const [isFinDaddyOpen, setIsFinDaddyOpen] = useState<boolean>(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');

  const [explainModal, setExplainModal] = useState<ExplainModalState>({
    isOpen: false,
    title: '',
    tag: '',
    description: '',
    formula: '',
  });

  const [addCategoryModalBucket, setAddCategoryModalBucket] = useState<'Needs' | 'Wants' | 'Savings' | null>(null);
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState<boolean>(false);
  const [payslipDetailModalMonth, setPayslipDetailModalMonth] = useState<string | null>(null);

  // Initial Budget Items
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    {
      id: 'b1',
      name: 'House Rent',
      subtext: 'Bengaluru HSR Layout • Flatshare',
      monthlyCap: 14000,
      spentDate: 14000,
      bucket: 'Needs',
      icon: 'apartment',
      statusText: 'Settled (1st Apr)',
    },
    {
      id: 'b2',
      name: 'Groceries & Cook',
      subtext: 'Blinkit/Zepto & Society Cook',
      monthlyCap: 4000,
      spentDate: 2800,
      bucket: 'Needs',
      icon: 'local_dining',
      statusText: '₹2,800 spent (Day 18)',
    },
    {
      id: 'b3',
      name: 'Utilities & WiFi',
      subtext: 'BESCOM + ACT Fibernet',
      monthlyCap: 1500,
      spentDate: 1500,
      bucket: 'Needs',
      icon: 'wifi',
      statusText: 'Paid via Auto-debit',
    },
    {
      id: 'b4',
      name: 'Metro & Commute',
      subtext: 'Namma Metro Smart Card + Quick Ride',
      monthlyCap: 1500,
      spentDate: 950,
      bucket: 'Needs',
      icon: 'subway',
      statusText: '₹950 recharged so far',
    },
    {
      id: 'b5',
      name: 'Dining & Delivery',
      subtext: 'Swiggy One + Zomato Gold orders',
      monthlyCap: 4500,
      spentDate: 2450,
      bucket: 'Wants',
      icon: 'restaurant',
      statusText: '11 orders logged • Avg ₹409',
    },
    {
      id: 'b6',
      name: 'OTT & App Subs',
      subtext: 'Netflix (Split), Spotify Duo, Prime',
      monthlyCap: 1200,
      spentDate: 1200,
      bucket: 'Wants',
      icon: 'smart_display',
      statusText: 'Renewals due on 28th',
    },
    {
      id: 'b7',
      name: 'Shopping & Tech',
      subtext: 'Myntra, Desk accessories',
      monthlyCap: 3500,
      spentDate: 2800,
      bucket: 'Wants',
      icon: 'shopping_bag',
      statusText: 'Cap active: ₹1,500 remaining',
    },
    {
      id: 'b8',
      name: 'Weekend Outings',
      subtext: 'Indiranagar cafe & Movie nights',
      monthlyCap: 2000,
      spentDate: 1000,
      bucket: 'Wants',
      icon: 'local_cafe',
      statusText: 'Paced at ₹1k / weekend',
    },
    {
      id: 'b9',
      name: 'Nifty 50 Index SIP',
      subtext: 'UTI Index Direct Growth • Groww',
      monthlyCap: 6000,
      spentDate: 6000,
      bucket: 'Savings',
      icon: 'candlestick_chart',
      statusText: 'Executed 5th of every month',
    },
    {
      id: 'b10',
      name: 'Emergency Liquid Fund',
      subtext: 'Parag Parikh Liquid Fund',
      monthlyCap: 3500,
      spentDate: 3500,
      bucket: 'Savings',
      icon: 'shield',
      statusText: 'Current Corpus: ₹24,500 (Goal: ₹1.2L)',
    },
    {
      id: 'b11',
      name: 'Digital Gold / Auto-Sweep',
      subtext: 'HDFC Flexi Auto-Sweep 7.1% p.a.',
      monthlyCap: 1500,
      spentDate: 1500,
      bucket: 'Savings',
      icon: 'savings',
      statusText: 'Instant T+0 withdrawal enabled',
    },
  ]);

  // Goals
  const [goals, setGoals] = useState<GoalItem[]>([
    {
      id: 'g1',
      title: 'Emergency Buffer (6 Mo)',
      targetAmount: 200000,
      currentAmount: 150000,
      targetDate: 'May 2025',
      monthlyAutoDebit: 5000,
      icon: '🛡️',
      onTrack: true,
      category: 'Security',
    },
    {
      id: 'g2',
      title: 'M3 Pro Workstation',
      targetAmount: 120000,
      currentAmount: 84000,
      targetDate: 'Dec 2024',
      monthlyAutoDebit: 6000,
      icon: '💻',
      onTrack: true,
      category: 'Productivity',
    },
    {
      id: 'g3',
      title: 'Goa Beach Retreat',
      targetAmount: 30000,
      currentAmount: 25000,
      targetDate: 'Nov 2024',
      monthlyAutoDebit: 2500,
      icon: '🌴',
      onTrack: true,
      category: 'Lifestyle',
    },
  ]);

  // Slips
  const [salarySlips] = useState<SalarySlip[]>([
    {
      id: 's1',
      month: 'October',
      year: 2024,
      creditDate: '31 Oct 2024',
      grossAmount: 50000,
      inHandAmount: 43200,
      tdsAmount: 4800,
      epfAmount: 1800,
      ptAmount: 200,
      verified: true,
    },
    {
      id: 's2',
      month: 'September',
      year: 2024,
      creditDate: '30 Sep 2024',
      grossAmount: 50000,
      inHandAmount: 43200,
      tdsAmount: 4800,
      epfAmount: 1800,
      ptAmount: 200,
      verified: true,
    },
    {
      id: 's3',
      month: 'August',
      year: 2024,
      creditDate: '31 Aug 2024',
      grossAmount: 50000,
      inHandAmount: 43200,
      tdsAmount: 4800,
      epfAmount: 1800,
      ptAmount: 200,
      verified: true,
    },
  ]);

  // Earnings Items
  const [earningsItems, setEarningsItems] = useState<SalaryBreakdownItem[]>([
    {
      id: 'earn-basic',
      label: 'Basic Salary',
      type: 'earning',
      amount: 25000,
      matchPercent: 99,
      subtext: 'Core taxable comp',
      tag: 'Fully Taxable',
      explanation:
        'The primary core of your CTC. Under Indian income tax laws, Basic Salary is 100% taxable with no direct exemptions. It forms the benchmark calculation base for statutory EPF (12%) and Gratuity.',
      formula: 'Statutory Baseline: Minimum 40-50% of CTC in compliant Indian wage codes.',
    },
    {
      id: 'earn-hra',
      label: 'House Rent Allowance (HRA)',
      type: 'earning',
      amount: 12500,
      matchPercent: 98,
      subtext: 'Tax exemptible under Old Regime',
      tag: 'Section 10(13A) Exemption',
      explanation:
        'Provided towards rented accommodation. Under the Old Tax Regime, you can claim partial/full exemption under Sec 10(13A) against actual rent receipts. Under the New Tax Regime, HRA is entirely taxable without exemption.',
      formula:
        'Least of: Actual HRA received, 50% of Basic (Metro) / 40% (Non-metro), or Rent paid minus 10% of Basic.',
    },
    {
      id: 'earn-special',
      label: 'Special Allowance',
      type: 'earning',
      amount: 10000,
      matchPercent: 99,
      subtext: 'General taxable pay buffer',
      tag: 'Fully Taxable Component',
      explanation:
        'Commonly used by Indian tech and corporate employers as a balancing figure to inflate gross CTC without expanding statutory obligations (such as PF and Gratuity). It does not carry any direct tax exemptions.',
      formula: 'Taxed at normal progressive slab rates under both Old and New Tax Regimes.',
    },
    {
      id: 'earn-convey',
      label: 'Conveyance Allowance',
      type: 'earning',
      amount: 2500,
      matchPercent: 95,
      subtext: 'Monthly commute component',
      tag: 'Taxable unless Specially Exempt',
      explanation:
        'Allowance paid for transit between residence and place of work. Previously carried an exemption up to ₹1,600/month, but this was merged into the Standard Deduction (₹50,000 / ₹75,000).',
      formula: 'Standard deduction automatically applies on aggregate salary.',
    },
  ]);

  // Deduction Items
  const [deductionItems, setDeductionItems] = useState<SalaryBreakdownItem[]>([
    {
      id: 'ded-epf',
      label: 'Provident Fund (EPF)',
      type: 'deduction',
      amount: 1800,
      matchPercent: 99,
      subtext: 'Retirement corpus (8.25% p.a. ROI)',
      tag: 'Section 80C Deduction (Old Regime)',
      explanation:
        'Statutory retirement savings administered by EPFO. 12% of Basic is deducted from your pay, matched by a mandatory 12% employer contribution (split between EPF & EPS). In Old Regime, your contribution is 80C deductible up to ₹1.5 Lakh.',
      formula:
        'Rule: 12% of Basic Salary (Statutory cap ₹1,800/mo applies if Basic > ₹15,000 and opted into statutory minimum).',
    },
    {
      id: 'ded-pt',
      label: 'Professional Tax (PT)',
      type: 'deduction',
      amount: 200,
      matchPercent: 100,
      subtext: 'State mandatory withholding',
      tag: 'State Government Levy',
      explanation:
        'A state-level tax levied on salaried individuals (e.g. Karnataka, Maharashtra, West Bengal). Maximum statutory ceiling is capped at ₹2,500 annually. Fully deductible from gross salary under Section 16(iii) in the Old Regime.',
      formula: 'State-specific slab. Karnataka/Maharashtra standard: ₹200/month (₹300 in Feb).',
    },
    {
      id: 'ded-tds',
      label: 'Tax Deducted at Source (TDS)',
      type: 'deduction',
      amount: 4800,
      matchPercent: 97,
      subtext: 'Section 192 monthly advance tax',
      tag: 'Section 192 Withholding',
      explanation:
        'Income tax deducted in advance by your employer based on your projected annual taxable earnings and declared regime. If too much TDS is cut, you will receive a refund when filing your ITR in July.',
      formula:
        'Computed as: (Projected Annual Tax - Allowed Exemptions) / Remaining months in Financial Year.',
    },
  ]);

  // Chat Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Arre Ananya, welcome back! 👋 I noticed you received your October in-hand of ₹43,200. Your 38% savings rate is rocking, but you still have ₹15,600 potential tax savings under 80C before March. Tap any question below or ask me about rent affordability, SIPs, or PF calculation!',
      timestamp: 'Just now',
      chips: [
        '🏠 20k Rent on 50k?',
        '💰 80C Tax Trick',
        '🔍 Form 16 TDS Breakdown',
      ],
    },
  ]);

  // Theme effect
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (themeMode === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [themeMode]);

  // Keyboard shortcut listener for Cmd/Ctrl + Shift + P
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        setIsMasked((prev) => !prev);
        showToast(isMasked ? 'Privacy Masking Disabled' : 'Privacy Masking Enabled (••••••)', 'visibility');
      }
      if (e.key === 't' || e.key === 'T') {
        const activeEl = document.activeElement?.tagName;
        if (activeEl !== 'INPUT' && activeEl !== 'TEXTAREA') {
          toggleTheme();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMasked]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    showToast(themeMode === 'dark' ? 'Switched to Daylight Mode' : 'Switched to Deep Financial Mode', 'palette');
  };

  const toggleMasking = () => {
    setIsMasked((prev) => !prev);
  };

  const showToast = (msg: string, icon = 'check_circle') => {
    setToastMessage(msg);
    setToastIcon(icon);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const formatCurrency = (amount: number, overrideMask = false): string => {
    if (isMasked && !overrideMask) {
      return '₹••••••';
    }
    const absVal = Math.abs(amount);
    let formatted = '';
    if (notationMode === 'in') {
      formatted = absVal.toLocaleString('en-IN');
    } else {
      formatted = absVal.toLocaleString('en-US');
    }
    const prefix = amount < 0 ? '-₹' : '₹';
    return `${prefix}${formatted}`;
  };

  const addBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      ...item,
      id: 'b_' + Date.now(),
    };
    setBudgetItems((prev) => [newItem, ...prev]);
    showToast(`Added ${item.name} (${formatCurrency(item.monthlyCap, true)}) to ${item.bucket}!`, 'add_circle');
  };

  const updateBudgetItemAmount = (id: string, amount: number) => {
    setBudgetItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, monthlyCap: amount } : item))
    );
  };

  const addGoal = (goal: Omit<GoalItem, 'id'>) => {
    const newGoal: GoalItem = {
      ...goal,
      id: 'g_' + Date.now(),
    };
    setGoals((prev) => [newGoal, ...prev]);
    showToast(`Added Goal: ${goal.title} (${formatCurrency(goal.targetAmount, true)})`, 'flag');
  };

  const updateEarningAmount = (id: string, amount: number) => {
    setEarningsItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount } : item))
    );
    showToast('Updated component amount!', 'check');
  };

  const updateDeductionAmount = (id: string, amount: number) => {
    setDeductionItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount } : item))
    );
    showToast('Updated deduction amount!', 'check');
  };
  

const applyPayslipData = (gross: number, deductions: number) => {
  setEarningsItems([
    {
      id: 'earn-basic',
      label: 'Gross Salary',
      type: 'earning',
      amount: gross,
      matchPercent: 100,
      subtext: 'Extracted from uploaded payslip',
      tag: 'Verified',
      explanation: 'Gross salary extracted from uploaded payslip',
    } as SalaryBreakdownItem,
  ]);

  setDeductionItems((prev) => {
    if (prev.length === 0) {
      return [
        {
          id: 'deduction-total',
          label: 'Total Deductions',
          type: 'deduction',
          amount: deductions,
          matchPercent: 100,
          subtext: 'Extracted from uploaded payslip',
          tag: 'Verified',
          explanation: 'Total deductions extracted from uploaded payslip',
        } as SalaryBreakdownItem,
      ];
    }

    return [
      {
        ...prev[0],
        amount: deductions,
        label: 'Total Deductions',
        subtext: 'Extracted from uploaded payslip',
        tag: 'Verified',
      },
    ];
  });
};



  const addChatMessage = (sender: 'user' | 'assistant', text: string) => {
    const newMsg: ChatMessage = {
      id: 'm_' + Date.now(),
      sender,
      text,
      timestamp: 'Just now',
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: 'm_reset',
        sender: 'assistant',
        text: 'Conversation reset! 🚀 How can I assist with your Indian payroll or tax scenario today?',
        timestamp: 'Just now',
      },
    ]);
  };

  const openExplainModal = (title: string, tag: string, description: string, formula: string) => {
    setExplainModal({
      isOpen: true,
      title,
      tag,
      description,
      formula,
    });
  };

  const closeExplainModal = () => {
    setExplainModal((prev) => ({ ...prev, isOpen: false }));
  };

  const openAddCategoryModal = (bucket: 'Needs' | 'Wants' | 'Savings') => {
    setAddCategoryModalBucket(bucket);
  };

  const closeAddCategoryModal = () => {
    setAddCategoryModalBucket(null);
  };

  const openAddGoalModal = () => {
    setIsAddGoalModalOpen(true);
  };

  const closeAddGoalModal = () => {
    setIsAddGoalModalOpen(false);
  };

  const openPayslipDetailModal = (month: string) => {
    setPayslipDetailModalMonth(month);
  };

  const closePayslipDetailModal = () => {
    setPayslipDetailModalMonth(null);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        themeMode,
        setThemeMode,
        toggleTheme,
        accentColor,
        setAccentColor,
        notationMode,
        setNotationMode,
        isMasked,
        setIsMasked,
        toggleMasking,
        densityMode,
        setDensityMode,
        highContrast,
        setHighContrast,
        suppressPaise,
        setSuppressPaise,
        reduceAnimations,
        setReduceAnimations,
        activeProfile,
        setActiveProfile,
        currency,
        setCurrency,
        budgetItems,
        addBudgetItem,
        updateBudgetItemAmount,
        goals,
        addGoal,
        salarySlips,
        earningsItems,
        updateEarningAmount,
        deductionItems,
        updateDeductionAmount,
        applyPayslipData,
        isMobileSimulatorOpen,
        setIsMobileSimulatorOpen,
        isFinDaddyOpen,
        setIsFinDaddyOpen,
        chatMessages,
        addChatMessage,
        clearChat,
        explainModal,
        openExplainModal,
        closeExplainModal,
        addCategoryModalBucket,
        openAddCategoryModal,
        closeAddCategoryModal,
        isAddGoalModalOpen,
        openAddGoalModal,
        closeAddGoalModal,
        payslipDetailModalMonth,
        openPayslipDetailModal,
        closePayslipDetailModal,
        toastMessage,
        toastIcon,
        showToast,
        formatCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
