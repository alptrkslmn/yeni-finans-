import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending' | 'cancelled';
  reference: string;
  paymentMethod: string;
  notes?: string;
  attachments?: string[];
  tags?: string[];
  recurring?: boolean;
  recurringPeriod?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  recurringEndDate?: string;
  createdAt: string;
  updatedAt: string;
  currency: string;
  exchangeRate?: number;
  originalAmount?: number;
  originalCurrency?: string;
  location?: string;
  project?: string;
  department?: string;
  customFields?: Record<string, any>;
}

interface TransactionsStore {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  getTransactionsByDateRange: (startDate: string, endDate: string) => Transaction[];
  getTransactionsByCategory: (category: string) => Transaction[];
  getTransactionsByType: (type: 'income' | 'expense') => Transaction[];
  getTotalsByCategory: () => Record<string, number>;
  getTotalsByType: () => { income: number; expense: number };
}

export const useTransactions = create<TransactionsStore>()(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction: (transaction) => {
        const now = new Date().toISOString();
        const newTransaction = {
          ...transaction,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }));
      },

      updateTransaction: (id, transaction) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id
              ? { ...t, ...transaction, updatedAt: new Date().toISOString() }
              : t
          ),
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      getTransactionsByDateRange: (startDate, endDate) => {
        return get().transactions.filter(
          (t) => t.date >= startDate && t.date <= endDate
        );
      },

      getTransactionsByCategory: (category) => {
        return get().transactions.filter((t) => t.category === category);
      },

      getTransactionsByType: (type) => {
        return get().transactions.filter((t) => t.type === type);
      },

      getTotalsByCategory: () => {
        return get().transactions.reduce((acc, transaction) => {
          const { category, amount, type } = transaction;
          const value = type === 'expense' ? -amount : amount;
          acc[category] = (acc[category] || 0) + value;
          return acc;
        }, {} as Record<string, number>);
      },

      getTotalsByType: () => {
        return get().transactions.reduce(
          (acc, transaction) => {
            if (transaction.type === 'income') {
              acc.income += transaction.amount;
            } else {
              acc.expense += transaction.amount;
            }
            return acc;
          },
          { income: 0, expense: 0 }
        );
      },
    }),
    {
      name: 'finance-transactions',
    }
  )
);