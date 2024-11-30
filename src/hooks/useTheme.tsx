import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { fontSizeMap, type ThemeContextType, type FontFamilyType, type FontSizeType } from '../constants/theme';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [themeColor, setThemeColor] = useState(() => {
    const saved = localStorage.getItem('themeColor');
    return saved || 'blue';
  });

  const [fontFamily, setFontFamily] = useState<FontFamilyType>(() => {
    const saved = localStorage.getItem('fontFamily');
    return (saved as FontFamilyType) || 'Inter';
  });

  const [fontSize, setFontSize] = useState<FontSizeType>(() => {
    const saved = localStorage.getItem('fontSize');
    return (saved as FontSizeType) || 'medium';
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    const saved = localStorage.getItem('primaryColor');
    return saved || '#1e40af';
  });

  const [headerColor, setHeaderColor] = useState(() => {
    const saved = localStorage.getItem('headerColor');
    return saved || '#ffffff';
  });

  const [sidebarColor, setSidebarColor] = useState(() => {
    const saved = localStorage.getItem('sidebarColor');
    return saved || '#1e293b';
  });

  const [navHeaderColor, setNavHeaderColor] = useState(() => {
    const saved = localStorage.getItem('navHeaderColor');
    return saved || '#1e293b';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('themeColor', themeColor);
    localStorage.setItem('fontFamily', fontFamily);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('headerColor', headerColor);
    localStorage.setItem('sidebarColor', sidebarColor);
    localStorage.setItem('navHeaderColor', navHeaderColor);

    // Apply theme changes to document root
    const root = document.documentElement;
    
    // Dark mode
    root.classList.toggle('dark', isDarkMode);
    
    // Colors
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--header-color', headerColor);
    root.style.setProperty('--sidebar-color', sidebarColor);
    root.style.setProperty('--nav-header-color', navHeaderColor);
    
    // Typography
    root.style.setProperty('--font-family', `"${fontFamily}", sans-serif`);
    root.style.setProperty('--font-size', fontSizeMap[fontSize]);
    
    // Update body background and text color based on dark mode
    document.body.style.backgroundColor = isDarkMode ? '#111827' : '#f9fafb';
    document.body.style.color = isDarkMode ? '#f9fafb' : '#111827';
  }, [isDarkMode, themeColor, fontFamily, fontSize, primaryColor, headerColor, sidebarColor, navHeaderColor]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const value = {
    isDarkMode,
    themeColor,
    fontFamily,
    fontSize,
    primaryColor,
    headerColor,
    sidebarColor,
    navHeaderColor,
    toggleTheme,
    setThemeColor,
    setFontFamily,
    setFontSize,
    setPrimaryColor,
    setHeaderColor,
    setSidebarColor,
    setNavHeaderColor,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
