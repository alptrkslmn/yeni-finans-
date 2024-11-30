import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileSpreadsheet, Printer, FileText, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface ExportMenuProps {
  onExportPDF?: () => void;
  onExportExcel?: () => void;
  onPrint?: () => void;
}

export function ExportMenu({ onExportPDF, onExportExcel, onPrint }: ExportMenuProps) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Menü dışına tıklandığında menüyü kapat
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      icon: FileText,
      label: t('exportAsPDF'),
      onClick: onExportPDF,
      disabled: !onExportPDF
    },
    {
      icon: FileSpreadsheet,
      label: t('exportAsExcel'),
      onClick: onExportExcel,
      disabled: !onExportExcel
    },
    {
      icon: Printer,
      label: t('print'),
      onClick: onPrint,
      disabled: !onPrint
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors ${
          isDarkMode
            ? 'hover:bg-gray-800'
            : 'hover:bg-gray-100'
        }`}
        aria-label={t('export')}
      >
        <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } border border-gray-200 dark:border-gray-700 z-50`}>
          <div className="py-1">
            {menuItems.map((item, index) => {
              if (item.disabled) return null;
              
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
