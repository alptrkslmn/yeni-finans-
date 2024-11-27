import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Clock,
  Calendar,
  Filter,
  MoreVertical,
  Download,
  Wallet,
  CreditCard,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';

export function Dashboard() {
  const { isDarkMode, themeColor } = useTheme();
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const stats = [
    {
      title: t('totalIncome'),
      value: '54.234,12 ₺',
      change: '+12.5%',
      icon: Wallet,
      trend: 'up',
      chartData: [
        { name: 'P1', value: 4000 },
        { name: 'P2', value: 3000 },
        { name: 'P3', value: 5000 },
        { name: 'P4', value: 4500 },
        { name: 'P5', value: 6000 },
      ]
    },
    {
      title: t('totalExpense'),
      value: '21.345,67 ₺',
      change: '-8.1%',
      icon: CreditCard,
      trend: 'down',
      chartData: [
        { name: 'P1', value: 2000 },
        { name: 'P2', value: 2800 },
        { name: 'P3', value: 1800 },
        { name: 'P4', value: 2500 },
        { name: 'P5', value: 2100 },
      ]
    },
    {
      title: t('activeUsers'),
      value: '245',
      change: '+23.1%',
      icon: Users,
      trend: 'up',
      chartData: [
        { name: 'P1', value: 180 },
        { name: 'P2', value: 200 },
        { name: 'P3', value: 220 },
        { name: 'P4', value: 235 },
        { name: 'P5', value: 245 },
      ]
    },
    {
      title: t('growthRate'),
      value: '18.2%',
      change: '+4.3%',
      icon: PieChart,
      trend: 'up',
      chartData: [
        { name: 'P1', value: 12 },
        { name: 'P2', value: 14 },
        { name: 'P3', value: 16 },
        { name: 'P4', value: 17 },
        { name: 'P5', value: 18.2 },
      ]
    }
  ];

  const monthlyData = [
    { name: 'Oca', gelir: 4000, gider: 2400 },
    { name: 'Şub', gelir: 3000, gider: 1398 },
    { name: 'Mar', gelir: 2000, gider: 9800 },
    { name: 'Nis', gelir: 2780, gider: 3908 },
    { name: 'May', gelir: 1890, gider: 4800 },
    { name: 'Haz', gelir: 2390, gider: 3800 },
    { name: 'Tem', gelir: 3490, gider: 4300 },
    { name: 'Ağu', gelir: 4000, gider: 2400 },
    { name: 'Eyl', gelir: 3000, gider: 1398 },
    { name: 'Eki', gelir: 2000, gider: 9800 },
    { name: 'Kas', gelir: 2780, gider: 3908 },
    { name: 'Ara', gelir: 1890, gider: 4800 }
  ];

  const recentTransactions = [
    {
      id: 1,
      title: 'Market Alışverişi',
      amount: '-234,50 ₺',
      date: '14:30',
      type: 'expense',
      category: 'Market'
    },
    {
      id: 2,
      title: 'Maaş Ödemesi',
      amount: '+12.500,00 ₺',
      date: '09:15',
      type: 'income',
      category: 'Maaş'
    },
    {
      id: 3,
      title: 'Elektrik Faturası',
      amount: '-450,75 ₺',
      date: 'Dün',
      type: 'expense',
      category: 'Fatura'
    },
    {
      id: 4,
      title: 'Freelance Proje',
      amount: '+3.500,00 ₺',
      date: 'Dün',
      type: 'income',
      category: 'Freelance'
    },
    {
      id: 5,
      title: 'Kira Ödemesi',
      amount: '-3.250,00 ₺',
      date: '2 gün önce',
      type: 'expense',
      category: 'Kira'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('dashboard')}
          </h1>
          <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Finansal durumunuza genel bakış
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Calendar className="w-4 h-4" />
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className={`bg-transparent outline-none ${
                isDarkMode ? 'text-gray-200' : 'text-gray-600'
              }`}
            >
              <option value="today">{t('today')}</option>
              <option value="week">{t('thisWeek')}</option>
              <option value="month">{t('thisMonth')}</option>
              <option value="year">{t('thisYear')}</option>
            </select>
          </div>
          <button className={`p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
            <Filter className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          return (
            <div
              key={stat.title}
              className={`relative overflow-hidden p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-sm hover:shadow-md transition-all duration-300 group`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${
                    isDarkMode ? `bg-${themeColor}-900/20` : `bg-${themeColor}-50`
                  }`}>
                    <Icon className={`w-5 h-5 text-${themeColor}-500`} />
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="mt-4">
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold mt-2 tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className={`flex items-center px-2 py-1 rounded-full text-sm ${
                    stat.trend === 'up' 
                      ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20' 
                      : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
                  }`}>
                    <TrendIcon className="w-4 h-4 mr-1" />
                    {stat.change}
                  </div>
                  
                  <div className="w-24 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stat.chartData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={`${stat.trend === 'up' ? '#22c55e' : '#ef4444'}`}
                          strokeWidth={2} 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Gelir ve Gider Analizi
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Aylık karşılaştırmalı analiz
              </p>
            </div>
            <button className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}>
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="name" 
                  stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                  fontSize={12}
                />
                <YAxis 
                  stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                  }}
                  labelStyle={{
                    color: isDarkMode ? '#e5e7eb' : '#374151',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}
                />
                <Bar 
                  dataKey="gelir" 
                  fill={`${isDarkMode ? '#34d399' : '#10b981'}`}
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="gider" 
                  fill={`${isDarkMode ? '#f87171' : '#ef4444'}`}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('recentTransactions')}
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Son finansal işlemleriniz
              </p>
            </div>
            <button className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isDarkMode 
                ? `bg-${themeColor}-900/20 text-${themeColor}-400 hover:bg-${themeColor}-900/30` 
                : `bg-${themeColor}-50 text-${themeColor}-600 hover:bg-${themeColor}-100`
            }`}>
              {t('viewAll')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-750 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'income'
                      ? 'bg-green-100 dark:bg-green-900/20'
                      : 'bg-red-100 dark:bg-red-900/20'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className={`w-5 h-5 ${
                        transaction.type === 'income'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`} />
                    ) : (
                      <TrendingDown className={`w-5 h-5 ${
                        transaction.type === 'income'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`} />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {transaction.title}
                    </p>
                    <div className="flex items-center mt-1 space-x-2">
                      <Clock className={`w-4 h-4 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {transaction.date}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`font-semibold ${
                  transaction.type === 'income'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}