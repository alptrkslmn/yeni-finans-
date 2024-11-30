import React from 'react';
import { Link, Location } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { TFunction } from 'i18next';

interface SidebarProps {
  isDarkMode: boolean;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (value: boolean) => void;
  getThemeClasses: (isActive: boolean) => string;
  location: Location;
  t: TFunction;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isDarkMode,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  getThemeClasses,
  location,
  t,
}) => {
  const navigation = [
    { name: 'dashboard', href: '/', icon: LayoutDashboard },
    { name: 'transactions', href: '/transactions', icon: Receipt },
    { name: 'reports', href: '/reports', icon: FileText },
    { name: 'settings', href: '/settings', icon: SettingsIcon },
  ];

  return (
    <div 
      className={`${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      } ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-r border-gray-200 dark:border-gray-700 transition-all duration-300 relative`}
    >
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className={`absolute -right-3 top-6 p-1 rounded-full border shadow-sm z-10 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-gray-300 hover:text-gray-100' 
            : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'
        }`}
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
  );
};
