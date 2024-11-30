import { useState } from 'react';
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
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'appearance':
        return <AppearanceSettings />;
      case 'countries':
        return <CountrySettings />;
      case 'currencies':
        return <CurrencySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{t('settings')}</h1>
      </div>
      <div className="flex space-x-8">
        <div className="w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? `bg-${themeColor}-100 dark:bg-${themeColor}-900/20 text-${themeColor}-600 dark:text-${themeColor}-400`
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{t(`settingsPages.${tab.id}`)}</span>
            </button>
          ))}
        </div>

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