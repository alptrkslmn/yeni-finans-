import create from 'zustand';

interface Category {
  id: string;
  name: string;
}

interface SettingsStore {
  categories: Category[];
  paymentMethods: string[];
  currencies: string[];
  setCategories: (categories: Category[]) => void;
  setPaymentMethods: (methods: string[]) => void;
  setCurrencies: (currencies: string[]) => void;
}

export const useSettings = create<SettingsStore>((set) => ({
  categories: [
    { id: 'food', name: 'Food & Drinks' },
    { id: 'transport', name: 'Transportation' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'health', name: 'Health' },
  ],
  paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer'],
  currencies: ['USD', 'EUR', 'TRY', 'GBP'],
  setCategories: (categories) => set({ categories }),
  setPaymentMethods: (methods) => set({ paymentMethods: methods }),
  setCurrencies: (currencies) => set({ currencies }),
}));
