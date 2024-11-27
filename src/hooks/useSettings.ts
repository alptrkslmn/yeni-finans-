import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate?: number;
}

export interface Country {
  code: string;
  name: string;
  localName: string;
  flag: string;
  currency: string;
  region: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon?: string;
  color?: string;
}

interface SettingsStore {
  currencies: Currency[];
  selectedCountries: Country[];
  categories: Category[];
  defaultCurrency: string;
  defaultCountry: string;
  dateFormat: string;
  numberFormat: string;
  addCurrency: (currency: Currency) => void;
  removeCurrency: (code: string) => void;
  addCountry: (country: Country) => void;
  removeCountry: (country: Country) => void;
  addCategory: (category: Category) => void;
  removeCategory: (id: string) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  setDefaultCurrency: (code: string) => void;
  setDefaultCountry: (code: string) => void;
  setDateFormat: (format: string) => void;
  setNumberFormat: (format: string) => void;
}

export const useSettings = create<SettingsStore>()(
  persist(
    (set) => ({
      currencies: [
        { code: 'TRY', name: 'Türk Lirası', symbol: '₺' },
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
      ],
      selectedCountries: [
        { code: 'TR', name: 'Türkiye', localName: 'Türkiye', flag: '🇹🇷', currency: 'TRY', region: 'Europe' },
        { code: 'US', name: 'United States', localName: 'United States', flag: '🇺🇸', currency: 'USD', region: 'North America' },
        { code: 'DE', name: 'Germany', localName: 'Germany', flag: '🇩🇪', currency: 'EUR', region: 'Europe' },
      ],
      categories: [
        { id: '1', name: 'Maaş', type: 'income', color: '#10B981' },
        { id: '2', name: 'Market', type: 'expense', color: '#EF4444' },
      ],
      defaultCurrency: 'TRY',
      defaultCountry: 'TR',
      dateFormat: 'DD.MM.YYYY',
      numberFormat: '#,##0.00',

      addCurrency: (currency) =>
        set((state) => ({
          currencies: [...state.currencies, currency],
        })),

      removeCurrency: (code) =>
        set((state) => ({
          currencies: state.currencies.filter((c) => c.code !== code),
        })),

      addCountry: (country) =>
        set((state) => ({
          selectedCountries: [...state.selectedCountries, country],
        })),

      removeCountry: (country) =>
        set((state) => ({
          selectedCountries: state.selectedCountries.filter((c) => c.code !== country.code),
        })),

      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),

      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      updateCategory: (id, category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...category } : c
          ),
        })),

      setDefaultCurrency: (code) =>
        set({ defaultCurrency: code }),

      setDefaultCountry: (code) =>
        set({ defaultCountry: code }),

      setDateFormat: (format) =>
        set({ dateFormat: format }),

      setNumberFormat: (format) =>
        set({ numberFormat: format }),
    }),
    {
      name: 'finance-settings',
    }
  )
);