import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { 
    isDarkMode, 
    themeColor, 
    fontFamily, 
    fontSize,
    headingColor,
    textColor,
    sidebarColor,
    headerColor,
    contentColor
  } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    
    // Dark mode
    root.classList.toggle('dark', isDarkMode);

    // Font family
    root.style.setProperty('--font-family', fontFamily);

    // Font size
    const fontSizeMap = {
      small: '12px',
      medium: '16px',
      large: '20px'
    };
    root.style.setProperty('--font-size', fontSizeMap[fontSize]);

    // Theme color
    root.style.setProperty('--theme-color', themeColor);

    // Component-specific colors
    root.style.setProperty('--heading-color', headingColor);
    root.style.setProperty('--text-color', textColor);
    root.style.setProperty('--sidebar-color', sidebarColor);
    root.style.setProperty('--header-color', headerColor);
    root.style.setProperty('--content-color', contentColor);

    // Update body background and text color based on dark mode
    document.body.style.backgroundColor = isDarkMode ? '#111827' : '#f9fafb';
    document.body.style.color = textColor;
  }, [
    isDarkMode, 
    themeColor, 
    fontFamily, 
    fontSize,
    headingColor,
    textColor,
    sidebarColor,
    headerColor,
    contentColor
  ]);

  return <>{children}</>;
};
