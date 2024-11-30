import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download, Filter, Plus, MoreVertical, Grid2X2, LayoutList } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { PageLayout } from '../components/PageLayout';

interface Report {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  status: 'completed' | 'pending' | 'failed';
}

const sampleReports: Report[] = [
  {
    id: '1',
    title: 'Aylık Finansal Rapor',
    description: 'Tüm finansal işlemlerin aylık özeti',
    date: '2024-01-01',
    type: 'Finansal',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Kurum Analiz Raporu',
    description: 'Kurumların performans ve işlem analizi',
    date: '2024-01-15',
    type: 'Analiz',
    status: 'completed'
  },
  {
    id: '3',
    title: 'İşlem Özet Raporu',
    description: 'Son 30 günlük işlem özeti',
    date: '2024-01-30',
    type: 'İşlem',
    status: 'pending'
  }
];

export function Reports() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'failed':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
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
        {t('createReport')}
      </button>
      <button 
        className={`p-2 rounded-lg ${
          isDarkMode 
            ? 'text-gray-300 hover:bg-gray-700' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Download className="w-5 h-5" />
      </button>
    </>
  );

  return (
    <PageLayout 
      title={t('reports')} 
      subtitle={t('reportsSubtitle')}
      actions={renderActions()}
    >
      <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        {/* View Mode Toggle */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' 
                  ? (isDarkMode ? 'bg-primary/20 text-white' : 'bg-primary/10 text-primary')
                  : (isDarkMode ? 'text-gray-500 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')
              }`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' 
                  ? (isDarkMode ? 'bg-primary/20 text-white' : 'bg-primary/10 text-primary')
                  : (isDarkMode ? 'text-gray-500 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')
              }`}
            >
              <Grid2X2 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
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
          </div>
        </div>

        {/* Reports Content */}
        <div className="p-4">
          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      {t('title')}
                    </th>
                    <th scope="col" className="py-3 px-6">
                      {t('description')}
                    </th>
                    <th scope="col" className="py-3 px-6">
                      {t('date')}
                    </th>
                    <th scope="col" className="py-3 px-6">
                      {t('status')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleReports.map((report) => (
                    <tr key={report.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="py-4 px-6">
                        {report.title}
                      </td>
                      <td className="py-4 px-6">
                        {report.description}
                      </td>
                      <td className="py-4 px-6">
                        {new Date(report.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {t(report.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sampleReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {report.title}
                      </h3>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {t(report.status)}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(report.date).toLocaleDateString()}
                    </span>
                    <button className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/30">
                      <Download className="w-4 h-4 mr-1" />
                      {t('download')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default Reports;
