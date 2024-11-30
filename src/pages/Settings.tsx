import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { PageLayout } from '../components/PageLayout';
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
  Plus,
  Filter,
  MoreVertical,
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

  const renderActions = () => (
    <>
      <button 
        className={`flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          isDarkMode 
            ? 'bg-primary/20 text-white hover:bg-primary/30' 
            : 'bg-primary/10 text-primary hover:bg-primary/20'
        }`}
      >
        <Plus className="w-4 h-4 mr-2" />
        {t('addNew')}
      </button>
      <button 
        className={`p-2 rounded-lg ${
          isDarkMode 
            ? 'text-gray-300 hover:bg-gray-700' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Filter className="w-5 h-5" />
      </button>
      <button 
        className={`p-2 rounded-lg ${
          isDarkMode 
            ? 'text-gray-300 hover:bg-gray-700' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <MoreVertical className="w-5 h-5" />
      </button>
    </>
  );

  return (
    <PageLayout 
      title={t('settings')} 
      subtitle={t('settingsSubtitle')}
      actions={renderActions()}
    >
      <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        {/* Tabs and Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {/* Sidebar Tabs */}
          <div className="p-4 border-r border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? (isDarkMode 
                          ? 'bg-primary/20 text-white' 
                          : 'bg-primary/10 text-primary')
                      : (isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-600 hover:bg-gray-100')
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3 p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}