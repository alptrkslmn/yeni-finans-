import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download, Filter } from 'lucide-react';

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t('reports')}
        </h1>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            {t('filter')}
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            <Download className="w-4 h-4 mr-2" />
            {t('exportAll')}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}

export default Reports;
