import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeColor = 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'pink';
type Language = 'tr' | 'en';
type FontFamily = 
  | 'Inter'
  | 'Roboto'
  | 'Open Sans'
  | 'Montserrat'
  | 'Poppins'
  | 'Raleway';

type FontSize = {
  base: number;
  scale: number;
};

interface ThemeStore {
  isDarkMode: boolean;
  themeColor: ThemeColor;
  language: Language;
  fontFamily: FontFamily;
  fontSize: FontSize;
  headingColor: string;
  toggleTheme: () => void;
  setThemeColor: (color: ThemeColor) => void;
  setLanguage: (lang: Language) => void;
  setFontFamily: (font: FontFamily) => void;
  setFontSize: (size: FontSize) => void;
  setHeadingColor: (color: string) => void;
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      themeColor: 'blue',
      language: 'tr',
      fontFamily: 'Inter',
      fontSize: { base: 16, scale: 1.2 },
      headingColor: '#1F2937',
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setThemeColor: (color) => set({ themeColor: color }),
      setLanguage: (lang) => set({ language: lang }),
      setFontFamily: (font) => set({ fontFamily: font }),
      setFontSize: (size) => set({ fontSize: size }),
      setHeadingColor: (color) => set({ headingColor: color }),
    }),
    {
      name: 'theme-storage',
    }
  )
);