import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Receipt, 
  Settings as SettingsIcon,
  Sun,
  Moon,
  Bell,
  User,
  ChevronDown,
  Languages,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'dashboard', href: '/', icon: LayoutDashboard },
  { name: 'transactions', href: '/transactions', icon: Receipt },
  { name: 'reports', href: '/reports', icon: FileText },
  { name: 'settings', href: '/settings', icon: SettingsIcon },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isDarkMode, toggleTheme, themeColor, language, setLanguage } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const getThemeClasses = (isActive: boolean) => {
    const baseClasses = `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
      isSidebarCollapsed ? 'justify-center' : ''
    }`;
    
    if (isActive) {
      return `${baseClasses} text-${themeColor}-600 bg-${themeColor}-50 dark:bg-${themeColor}-900/20 dark:text-${themeColor}-400`;
    }
    return `${baseClasses} text-gray-700 hover:text-${themeColor}-600 hover:bg-${themeColor}-50 dark:text-gray-200 dark:hover:bg-gray-700`;
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-r border-gray-200 dark:border-gray-700 transition-all duration-300 relative`}
      >
        {/* Collapse Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`absolute -right-3 top-6 p-1 rounded-full border ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } shadow-sm z-10`}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        <div className="h-16 flex items-center px-6">
          {!isSidebarCollapsed && (
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              FinanceApp
            </h1>
          )}
        </div>

        <nav className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={getThemeClasses(isActive)}
                title={isSidebarCollapsed ? t(item.name) : undefined}
              >
                <Icon className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
                {!isSidebarCollapsed && t(item.name)}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`h-16 flex items-center justify-between px-6 border-b ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex-1" />
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mounted && (isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />)}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Languages className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } ring-1 ring-black ring-opacity-5`}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setLanguage('tr');
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          language === 'tr'
                            ? `text-${themeColor}-600 bg-${themeColor}-50 dark:bg-${themeColor}-900/20`
                            : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Türkçe
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('en');
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          language === 'en'
                            ? `text-${themeColor}-600 bg-${themeColor}-50 dark:bg-${themeColor}-900/20`
                            : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        English
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bell className="w-5 h-5" />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  isDarkMode 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
                {!isSidebarCollapsed && (
                  <>
                    <span>Profil</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } ring-1 ring-black ring-opacity-5`}
                  >
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-sm ${
                          isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profil Ayarları
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 flex items-center`}
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className={`flex-1 overflow-auto p-6 ${
          isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
}