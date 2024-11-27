import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';
import { CountrySettings } from '../components/settings/CountrySettings';
import { CurrencySettings } from '../components/settings/CurrencySettings';
import { 
  Palette,
  Globe,
  DollarSign,
  Building2,
  Tag,
  Users,
  Bell,
  Lock,
  CreditCard,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Settings() {
  const { isDarkMode, themeColor } = useTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', icon: Palette, label: 'Görünüm' },
    { id: 'countries', icon: Globe, label: 'Ülkeler' },
    { id: 'currencies', icon: DollarSign, label: 'Para Birimleri' },
    { id: 'institutions', icon: Building2, label: 'Kurumlar' },
    { id: 'categories', icon: Tag, label: 'Kategoriler' },
    { id: 'users', icon: Users, label: 'Kullanıcılar' },
    { id: 'notifications', icon: Bell, label: 'Bildirimler' },
    { id: 'security', icon: Lock, label: 'Güvenlik' },
    { id: 'payment', icon: CreditCard, label: 'Ödeme Yöntemleri' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'appearance':
        return <AppearanceSettings />;
      case 'countries':
        return <CountrySettings />;
      case 'currencies':
        return <CurrencySettings />;
      // Diğer sekmelerin içerikleri buraya eklenecek
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex space-x-8">
        {/* Sol Menü */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? `bg-${themeColor}-50 text-${themeColor}-600 dark:bg-${themeColor}-900/20 dark:text-${themeColor}-400`
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sağ İçerik */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`p-6 rounded-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-sm`}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}