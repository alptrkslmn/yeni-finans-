import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      dashboard: 'Gösterge Paneli',
      transactions: 'İşlemler',
      settings: 'Ayarlar',
      reports: 'Raporlar',
      appearance: 'Görünüm',
      profile: 'Profil Ayarları',
      notifications: 'Bildirimler',
      security: 'Güvenlik',
      payment: 'Ödeme Yöntemleri',
      language: 'Dil ve Bölge',
      themeColors: 'Tema Renkleri',
      darkMode: 'Karanlık Mod',
      today: 'Bugün',
      thisWeek: 'Bu Hafta',
      thisMonth: 'Bu Ay',
      thisYear: 'Bu Yıl',
      viewAll: 'Tümünü Gör',
      recentTransactions: 'Son İşlemler',
      totalIncome: 'Toplam Gelir',
      totalExpense: 'Toplam Gider',
      activeUsers: 'Aktif Kullanıcılar',
      growthRate: 'Büyüme Oranı',
      comparedToPrevMonth: 'geçen aya göre',
      filter: 'Filtrele',
      exportAll: 'Tümünü Dışa Aktar',
      download: 'İndir',
      completed: 'Tamamlandı',
      pending: 'Beklemede',
      failed: 'Başarısız',
    },
  },
  en: {
    translation: {
      dashboard: 'Dashboard',
      transactions: 'Transactions',
      settings: 'Settings',
      reports: 'Reports',
      appearance: 'Appearance',
      profile: 'Profile Settings',
      notifications: 'Notifications',
      security: 'Security',
      payment: 'Payment Methods',
      language: 'Language & Region',
      themeColors: 'Theme Colors',
      darkMode: 'Dark Mode',
      today: 'Today',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      thisYear: 'This Year',
      viewAll: 'View All',
      recentTransactions: 'Recent Transactions',
      totalIncome: 'Total Income',
      totalExpense: 'Total Expense',
      activeUsers: 'Active Users',
      growthRate: 'Growth Rate',
      comparedToPrevMonth: 'compared to last month',
      filter: 'Filter',
      exportAll: 'Export All',
      download: 'Download',
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;