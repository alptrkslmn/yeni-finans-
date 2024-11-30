export const fontSizeMap = {
  small: '14px',
  medium: '16px',
  large: '18px',
} as const;

export type FontFamilyType = 'Inter' | 'Roboto' | 'Open Sans' | 'Montserrat' | 'Poppins' | 'Raleway';
export type FontSizeType = keyof typeof fontSizeMap;

export interface ThemeContextType {
  isDarkMode: boolean;
  themeColor: string;
  fontFamily: FontFamilyType;
  fontSize: FontSizeType;
  primaryColor: string;
  headerColor: string;
  sidebarColor: string;
  navHeaderColor: string;
  toggleTheme: () => void;
  setThemeColor: (color: string) => void;
  setFontFamily: (font: FontFamilyType) => void;
  setFontSize: (size: FontSizeType) => void;
  setPrimaryColor: (color: string) => void;
  setHeaderColor: (color: string) => void;
  setSidebarColor: (color: string) => void;
  setNavHeaderColor: (color: string) => void;
}
