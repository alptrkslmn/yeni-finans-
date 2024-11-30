import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExportMenu } from '../components/ExportMenu';
import { DateRangePicker } from '../components/DateRangePicker';
import {
  Grid2X2,
  LayoutList,
  Plus,
  Printer,
  TrendingUp,
  TrendingDown,
  Edit2,
  Trash2,
  X
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  paymentMethod: string;
  tags?: string[];
  recurring?: boolean;
  recurringPeriod?: 'monthly' | 'weekly' | 'yearly';
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

type SortField = 'date' | 'description' | 'category' | 'amount' | 'type' | 'status';
type SortOrder = 'asc' | 'desc';

export function Transactions() {
  const { isDarkMode, themeColor } = useTheme();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedType, setSelectedType] = React.useState<'all' | 'income' | 'expense'>('all');
  const [selectedStatus, setSelectedStatus] = React.useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('list');
  const [isAddingTransaction, setIsAddingTransaction] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState<{field: SortField, order: SortOrder}>({
    field: 'date',
    order: 'desc'
  });
  const [selectedDateRange, setSelectedDateRange] = React.useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const categories = {
    income: [
      'Maaş',
      'Serbest Çalışma',
      'Yatırım Geliri',
      'Kira Geliri',
      'Danışmanlık',
      'Diğer Gelirler'
    ],
    expense: [
      'Kira',
      'Faturalar',
      'Market',
      'Ulaşım',
      'Sağlık',
      'Eğitim',
      'Eğlence',
      'Giyim',
      'Teknoloji',
      'Sigorta',
      'Kredi Ödemeleri',
      'Yemek',
      'Spor',
      'Bakım',
      'Hediyeler',
      'Seyahat',
      'Ev Giderleri',
      'Diğer Giderler'
    ]
  };

  const paymentMethods = [
    'Nakit',
    'Banka Kartı',
    'Kredi Kartı',
    'Havale/EFT',
    'Kripto Para',
    'Diğer'
  ];

  const transactions: Transaction[] = [
    {
      id: 1,
      date: '2024-03-15',
      description: 'Maaş Ödemesi',
      category: 'Maaş',
      amount: 15000,
      type: 'income',
      status: 'completed',
      reference: 'SAL-2024-001',
      paymentMethod: 'Havale/EFT',
      tags: ['Düzenli Gelir'],
      recurring: true,
      recurringPeriod: 'monthly'
    },
    {
      id: 2,
      date: '2024-03-14',
      description: 'Market Alışverişi',
      category: 'Market',
      amount: 750.50,
      type: 'expense',
      status: 'completed',
      reference: 'EXP-2024-001',
      paymentMethod: 'Kredi Kartı',
      tags: ['Temel İhtiyaçlar']
    },
    // ... Diğer işlemler buraya eklenebilir
  ];

  const handleSort = (field: SortField) => {
    setSortConfig(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const { field, order } = sortConfig;
    const multiplier = order === 'asc' ? 1 : -1;

    switch (field) {
      case 'date':
        return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'description':
        return multiplier * a.description.localeCompare(b.description);
      case 'category':
        return multiplier * a.category.localeCompare(b.category);
      case 'amount':
        return multiplier * (a.amount - b.amount);
      case 'type':
        return multiplier * a.type.localeCompare(b.type);
      case 'status':
        return multiplier * a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const filteredTransactions = sortedTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    const matchesDateRange = !selectedDateRange.startDate || !selectedDateRange.endDate || 
                            (transaction.date >= selectedDateRange.startDate?.toISOString().split('T')[0] && 
                             transaction.date <= selectedDateRange.endDate?.toISOString().split('T')[0]);
    
    return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesDateRange;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortConfig.field !== field) return <Grid2X2 className="w-4 h-4 text-gray-400" />;
    return sortConfig.order === 'asc' ? 
      <LayoutList className="w-4 h-4" /> : 
      <Printer className="w-4 h-4" />;
  };

  // Export fonksiyonları
  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const exportTransactions = sortedTransactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
      const matchesType = selectedType === 'all' || transaction.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
      const matchesDateRange = !selectedDateRange.startDate || !selectedDateRange.endDate || 
                              (transaction.date >= selectedDateRange.startDate?.toISOString().split('T')[0] && 
                               transaction.date <= selectedDateRange.endDate?.toISOString().split('T')[0]);
      
      return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesDateRange;
    });

    const tableHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>İşlemler</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f8f9fa; }
            .amount { text-align: right; }
            .amount.income { color: #10B981; }
            .amount.expense { color: #EF4444; }
            .status { text-transform: capitalize; }
            .status.completed { color: #10B981; }
            .status.pending { color: #F59E0B; }
            .status.failed { color: #EF4444; }
          </style>
        </head>
        <body>
          <h1>İşlemler</h1>
          <table>
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Açıklama</th>
                <th>Kategori</th>
                <th>Tutar</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              ${exportTransactions.map(transaction => `
                <tr>
                  <td>${transaction.date}</td>
                  <td>${transaction.description}</td>
                  <td>${transaction.category}</td>
                  <td class="amount ${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </td>
                  <td class="status ${transaction.status}">${transaction.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const handleExportExcel = () => {
    const exportTransactions = sortedTransactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
      const matchesType = selectedType === 'all' || transaction.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
      const matchesDateRange = !selectedDateRange.startDate || !selectedDateRange.endDate || 
                              (transaction.date >= selectedDateRange.startDate?.toISOString().split('T')[0] && 
                               transaction.date <= selectedDateRange.endDate?.toISOString().split('T')[0]);
      
      return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesDateRange;
    });

    // Başlık satırı
    const headers = ['Tarih', 'Açıklama', 'Kategori', 'Tutar', 'Tür', 'Durum'];
    
    // İşlem verilerini CSV formatına dönüştür
    const csvContent = [
      headers.join(','),
      ...exportTransactions.map(transaction => [
        transaction.date,
        `"${transaction.description.replace(/"/g, '""')}"`, // Açıklamadaki virgülleri ve tırnak işaretlerini düzelt
        transaction.category,
        transaction.amount,
        transaction.type === 'income' ? 'Gelir' : 'Gider',
        transaction.status === 'completed' ? 'Tamamlandı' : 
          transaction.status === 'pending' ? 'Beklemede' : 'Başarısız'
      ].join(','))
    ].join('\n');

    // CSV dosyasını oluştur ve indir
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `islemler_${new Date().toLocaleDateString('tr-TR')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const exportTransactions = sortedTransactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
      const matchesType = selectedType === 'all' || transaction.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
      const matchesDateRange = !selectedDateRange.startDate || !selectedDateRange.endDate || 
                              (transaction.date >= selectedDateRange.startDate?.toISOString().split('T')[0] && 
                               transaction.date <= selectedDateRange.endDate?.toISOString().split('T')[0]);
      
      return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesDateRange;
    });

    const tableHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>İşlemler</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f8f9fa; }
            .amount { text-align: right; }
            .amount.income { color: #10B981; }
            .amount.expense { color: #EF4444; }
            .status { text-transform: capitalize; }
            .status.completed { color: #10B981; }
            .status.pending { color: #F59E0B; }
            .status.failed { color: #EF4444; }
            @media print {
              body { -webkit-print-color-adjust: exact; }
              th { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <h1>İşlemler</h1>
          <table>
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Açıklama</th>
                <th>Kategori</th>
                <th>Tutar</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              ${exportTransactions.map(transaction => `
                <tr>
                  <td>${transaction.date}</td>
                  <td>${transaction.description}</td>
                  <td>${transaction.category}</td>
                  <td class="amount ${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </td>
                  <td class="status ${transaction.status}">${transaction.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTypeChange = (type: 'all' | 'income' | 'expense') => {
    setSelectedType(type);
  };

  const handleStatusChange = (status: 'all' | 'completed' | 'pending' | 'failed') => {
    setSelectedStatus(status);
  };

  const handleDateRangeChange = (range: DateRange) => {
    setSelectedDateRange(range);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t('transactions')}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tüm finansal işlemlerinizi görüntüleyin ve yönetin
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsAddingTransaction(true)}
            className={`flex items-center px-4 py-2 rounded-lg text-white transition-colors ${
              isDarkMode ? `bg-${themeColor}-600 hover:bg-${themeColor}-700` : `bg-${themeColor}-500 hover:bg-${themeColor}-600`
            }`}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('newTransaction')}
          </button>
          <ExportMenu
            onExportPDF={handleExportPDF}
            onExportExcel={handleExportExcel}
            onPrint={handlePrint}
          />
          <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? `bg-${themeColor}-100 dark:bg-${themeColor}-900/20 text-${themeColor}-600 dark:text-${themeColor}-400`
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? `bg-${themeColor}-100 dark:bg-${themeColor}-900/20 text-${themeColor}-600 dark:text-${themeColor}-400`
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filtering and search controls */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="min-w-[200px] flex-1">
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="İşlemlerde ara..."
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>

        <div className="min-w-[150px]">
          <select 
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="all">Tüm Kategoriler</option>
            {categories.expense.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="min-w-[150px]">
          <select 
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value as 'all' | 'income' | 'expense')}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="all">Tüm İşlem Türleri</option>
            <option value="income">Gelir</option>
            <option value="expense">Gider</option>
          </select>
        </div>

        <div className="min-w-[150px]">
          <select 
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value as 'all' | 'completed' | 'pending' | 'failed')}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="completed">Tamamlandı</option>
            <option value="pending">Beklemede</option>
            <option value="failed">Başarısız</option>
          </select>
        </div>

        <div className="min-w-[400px] flex-1">
          <DateRangePicker
            startDate={selectedDateRange.startDate}
            endDate={selectedDateRange.endDate}
            onChange={handleDateRangeChange}
          />
        </div>
      </div>

      {/* Excel-like Table View */}
      <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`text-left ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <th className="px-6 py-4">
                  <button 
                    onClick={() => handleSort('date')}
                    className="flex items-center space-x-2 font-medium"
                  >
                    <span>Tarih</span>
                    <SortIcon field="date" />
                  </button>
                </th>
                <th className="px-6 py-4">Açıklama</th>
                <th className="px-6 py-4">
                  <button 
                    onClick={() => handleSort('category')}
                    className="flex items-center space-x-2 font-medium"
                  >
                    <span>Kategori</span>
                    <SortIcon field="category" />
                  </button>
                </th>
                <th className="px-6 py-4">
                  <button 
                    onClick={() => handleSort('amount')}
                    className="flex items-center space-x-2 font-medium"
                  >
                    <span>Tutar</span>
                    <SortIcon field="amount" />
                  </button>
                </th>
                <th className="px-6 py-4">Ödeme Yöntemi</th>
                <th className="px-6 py-4">
                  <button 
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-2 font-medium"
                  >
                    <span>Durum</span>
                    <SortIcon field="status" />
                  </button>
                </th>
                <th className="px-6 py-4">Etiketler</th>
                <th className="px-6 py-4">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                  <tr className={`${
                    isDarkMode 
                      ? 'hover:bg-gray-750' 
                      : 'hover:bg-gray-50'
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.date).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${
                          transaction.type === 'income'
                            ? 'bg-green-100 dark:bg-green-900/20'
                            : 'bg-red-100 dark:bg-red-900/20'
                        }`}>
                          {transaction.type === 'income' ? (
                            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <div className={`font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {transaction.description}
                          </div>
                          <div className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {transaction.reference}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${
                        transaction.type === 'income'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.type === 'expense' ? '-' : '+'}
                        {transaction.amount.toLocaleString('tr-TR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })} ₺
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {transaction.paymentMethod}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {transaction.status === 'completed' ? 'Tamamlandı' :
                         transaction.status === 'pending' ? 'Beklemede' : 'İptal Edildi'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {transaction.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              isDarkMode 
                                ? `bg-${themeColor}-900/20 text-${themeColor}-400`
                                : `bg-${themeColor}-50 text-${themeColor}-700`
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}>
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500`}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <React.Fragment>
        {isAddingTransaction && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div
              className={`w-full max-w-2xl rounded-lg shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } p-6`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Yeni İşlem Ekle
                </h3>
                <button
                  onClick={() => setIsAddingTransaction(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      İşlem Tipi
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}>
                      <option value="income">Gelir</option>
                      <option value="expense">Gider</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Tarih
                    </label>
                    <input
                      type="date"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-200' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Açıklama
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="İşlem açıklaması"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Kategori
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}>
                      {categories.expense.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Tutar
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className={`w-full pl-8 pr-3 py-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-200' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="0.00"
                      />
                      <span className="absolute left-3 top-2.5 text-gray-500">₺</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Ödeme Yöntemi
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}>
                      {paymentMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Durum
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}>
                      <option value="completed">Tamamlandı</option>
                      <option value="pending">Beklemede</option>
                      <option value="cancelled">İptal Edildi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Notlar
                  </label>
                  <textarea
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    rows={3}
                    placeholder="İşlem hakkında ek notlar..."
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="recurring"
                    className="rounded border-gray-300"
                  />
                  <label
                    htmlFor="recurring"
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Düzenli İşlem
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsAddingTransaction(false)}
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  İptal
                </button>
                <button className={`px-4 py-2 rounded-lg text-white ${
                  `bg-${themeColor}-500 hover:bg-${themeColor}-600`
                }`}>
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
}