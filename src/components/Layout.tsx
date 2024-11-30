import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';

export function Layout({ children }: { children: React.ReactNode }) {
  const { isDarkMode, toggleTheme, themeColor, language, setLanguage } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeClasses = (isActive: boolean) => {
    const baseClasses = `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
      isSidebarCollapsed ? 'justify-center' : ''
    }`;
    
    if (isActive) {
      return `${baseClasses} text-primary bg-primary/10 dark:text-white dark:bg-primary/20`;
    }
    return `${baseClasses} text-gray-600 hover:text-primary hover:bg-primary/10 dark:text-gray-300 dark:hover:text-primary dark:hover:bg-primary/20`;
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        isDarkMode={isDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        getThemeClasses={getThemeClasses}
        location={location}
        t={t}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          mounted={mounted}
          isLangOpen={isLangOpen}
          setIsLangOpen={setIsLangOpen}
          language={language}
          setLanguage={setLanguage as (lang: string) => void}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          isSidebarCollapsed={isSidebarCollapsed}
          themeColor={themeColor}
        />
        <main className={`flex-1 overflow-auto p-10 ${
          isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
}