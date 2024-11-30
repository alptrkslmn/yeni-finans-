import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeColor = 
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'indigo';

export interface ThemeStore {
  isDarkMode: boolean;
  themeColor: ThemeColor;
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: string;
  toggleDarkMode: () => void;
  toggleTheme: () => void;
  setThemeColor: (color: ThemeColor) => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setFontFamily: (family: string) => void;
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      themeColor: 'blue',
      fontSize: 'medium',
      fontFamily: 'Inter',
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setThemeColor: (color) => set({ themeColor: color }),
      setFontSize: (size) => set({ fontSize: size }),
      setFontFamily: (family) => set({ fontFamily: family })
    }),
    {
      name: 'theme-storage'
    }
  )
);
