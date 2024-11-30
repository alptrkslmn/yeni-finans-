import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  tr: {
    translation: {
      dashboard: 'Gösterge Paneli',
      transactions: 'İşlemler',
      settings: 'Ayarlar',
      settingsPages: {
        appearance: 'Görünüm',
        currency: 'Para Birimi',
        country: 'Ülke',
        users: 'Kullanıcılar',
        notifications: 'Bildirimler',
        security: 'Güvenlik',
        countries: 'Ülkeler',
        currencies: 'Para Birimleri',
        institutions: 'Kurumlar',
        categories: 'Kategoriler'
      },
      reports: 'Raporlar',
      appearance: 'Görünüm',
      profile: 'Profil Ayarları',
      users: 'Kullanıcılar',
      notifications: 'Bildirimler',
      security: 'Güvenlik',
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
      exportAsPDF: 'PDF olarak indir',
      exportAsExcel: 'Excel olarak indir',
      print: 'Yazdır',
      export: 'Dışa Aktar',
      completed: 'Tamamlandı',
      pending: 'Beklemede',
      failed: 'Başarısız',
      newTransaction: 'Yeni İşlem',
    },
  },
  en: {
    translation: {
      dashboard: 'Dashboard',
      transactions: 'Transactions',
      settings: 'Settings',
      settingsPages: {
        appearance: 'Appearance',
        currency: 'Currency',
        country: 'Country',
        users: 'Users',
        notifications: 'Notifications',
        security: 'Security',
        countries: 'Countries',
        currencies: 'Currencies',
        institutions: 'Institutions',
        categories: 'Categories'
      },
      reports: 'Reports',
      appearance: 'Appearance',
      profile: 'Profile Settings',
      users: 'Users',
      notifications: 'Notifications',
      security: 'Security',
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
      exportAsPDF: 'Export as PDF',
      exportAsExcel: 'Export as Excel',
      print: 'Print',
      export: 'Export',
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
      newTransaction: 'New Transaction',
    }
  }
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