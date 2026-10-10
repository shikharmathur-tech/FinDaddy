export type NavTab =
  | 'dashboard'
  | 'upload-payslip'
  | 'tax-comparison'
  | 'budget-planner'
  | 'scenario-simulator'
  | 'financial-goals'
  | 'ai-coach'
  | 'reports'
  | 'hr-portal'
  | 'settings';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type AccentColor = 'indigo' | 'royal' | 'emerald' | 'violet';
export type NotationMode = 'in' | 'intl';
export type DensityMode = 'relaxed' | 'compact';

export interface BudgetItem {
  id: string;
  name: string;
  subtext: string;
  monthlyCap: number;
  spentDate: number;
  bucket: 'Needs' | 'Wants' | 'Savings';
  icon: string;
  statusText: string;
}

export interface GoalItem {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  monthlyAutoDebit: number;
  icon: string;
  onTrack: boolean;
  category: string;
}

export interface SalarySlip {
  id: string;
  month: string;
  year: number;
  creditDate: string;
  grossAmount: number;
  inHandAmount: number;
  tdsAmount: number;
  epfAmount: number;
  ptAmount: number;
  verified: boolean;
}

export interface SalaryBreakdownItem {
  id: string;
  label: string;
  type: 'earning' | 'deduction';
  amount: number;
  matchPercent: number;
  subtext: string;
  tag: string;
  explanation: string;
  formula: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  chips?: string[];
}
