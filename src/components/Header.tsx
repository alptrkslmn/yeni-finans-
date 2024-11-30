import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sun,
  Moon,
  Bell,
  User,
  ChevronDown,
  Languages,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  mounted: boolean;
  isLangOpen: boolean;
  setIsLangOpen: (value: boolean) => void;
  language: 'tr' | 'en';
  setLanguage: (lang: 'tr' | 'en') => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (value: boolean) => void;
  isSidebarCollapsed: boolean;
  themeColor: string;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleTheme,
  mounted,
  isLangOpen,
  setIsLangOpen,
  language,
  setLanguage,
  isProfileOpen,
  setIsProfileOpen,
  isSidebarCollapsed,
  themeColor,
}) => {
  const { t } = useTranslation();

  return (
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
                <span>{t('profile')}</span>
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
                    {t('profile_settings')}
                  </Link>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 flex items-center`}
                  >
                    {t('logout')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
