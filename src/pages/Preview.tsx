import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { 
  Download,
  Printer,
  Share2,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  FileText,
  Calendar,
  DollarSign
} from 'lucide-react';

export function Preview() {
  const { isDarkMode, themeColor } = useTheme();
  const currentDate = new Date().toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const invoiceData = {
    number: 'INV-2024-001',
    date: currentDate,
    dueDate: '30 Mart 2024',
    company: {
      name: 'Teknoloji A.Ş.',
      address: 'Levent Mah. İş Kuleleri No:123',
      city: 'İstanbul, Türkiye',
      phone: '+90 (212) 555 0123',
      email: 'info@teknolojiAS.com',
      website: 'www.teknolojiAS.com'
    },
    client: {
      name: 'Yazılım Ltd. Şti.',
      address: 'Çankaya Cad. Ankara Plaza No:45',
      city: 'Ankara, Türkiye',
      phone: '+90 (312) 444 5678',
      email: 'info@yazilimltd.com'
    },
    items: [
      {
        description: 'Web Uygulama Geliştirme',
        quantity: 1,
        price: 25000,
        total: 25000
      },
      {
        description: 'UI/UX Tasarım',
        quantity: 1,
        price: 15000,
        total: 15000
      },
      {
        description: 'Sunucu Bakım (Aylık)',
        quantity: 12,
        price: 1500,
        total: 18000
      }
    ],
    subtotal: 58000,
    tax: 10440,
    total: 68440
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Fatura Önizleme
        </h1>
        <div className="flex items-center gap-3">
          <button className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            isDarkMode 
              ? `bg-${themeColor}-900/20 text-${themeColor}-400 hover:bg-${themeColor}-900/30` 
              : `bg-${themeColor}-50 text-${themeColor}-600 hover:bg-${themeColor}-100`
          }`}>
            <Share2 className="w-4 h-4 mr-2" />
            Paylaş
          </button>
          <button className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            isDarkMode 
              ? `bg-${themeColor}-900/20 text-${themeColor}-400 hover:bg-${themeColor}-900/30` 
              : `bg-${themeColor}-50 text-${themeColor}-600 hover:bg-${themeColor}-100`
          }`}>
            <Printer className="w-4 h-4 mr-2" />
            Yazdır
          </button>
          <button className={`flex items-center px-4 py-2 rounded-lg text-white transition-colors bg-${themeColor}-500 hover:bg-${themeColor}-600`}>
            <Download className="w-4 h-4 mr-2" />
            İndir
          </button>
        </div>
      </div>

      {/* Invoice Preview */}
      <div className={`rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Invoice Header */}
        <div className="p-8 border-b dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                FATURA
              </h2>
              <div className="mt-4 space-y-1">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-gray-400" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Fatura No: {invoiceData.number}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Tarih: {invoiceData.date}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Son Ödeme: {invoiceData.dueDate}
                  </span>
                </div>
              </div>
            </div>
            <div className={`text-right ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className="text-3xl font-bold mb-2">{invoiceData.company.name}</div>
              <div className="space-y-1 text-sm text-gray-500">
                <div className="flex items-center justify-end">
                  <MapPin className="w-4 h-4 mr-1" />
                  {invoiceData.company.address}
                </div>
                <div>{invoiceData.company.city}</div>
                <div className="flex items-center justify-end">
                  <Phone className="w-4 h-4 mr-1" />
                  {invoiceData.company.phone}
                </div>
                <div className="flex items-center justify-end">
                  <Mail className="w-4 h-4 mr-1" />
                  {invoiceData.company.email}
                </div>
                <div className="flex items-center justify-end">
                  <Globe className="w-4 h-4 mr-1" />
                  {invoiceData.company.website}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="p-8 border-b dark:border-gray-700">
          <div className="flex items-start space-x-4">
            <Building2 className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Fatura Adresi
              </h3>
              <div className={`space-y-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="font-medium">{invoiceData.client.name}</div>
                <div>{invoiceData.client.address}</div>
                <div>{invoiceData.client.city}</div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {invoiceData.client.phone}
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {invoiceData.client.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="p-8">
          <table className="w-full">
            <thead>
              <tr className={`text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <th className="pb-4">Açıklama</th>
                <th className="pb-4 text-right">Miktar</th>
                <th className="pb-4 text-right">Birim Fiyat</th>
                <th className="pb-4 text-right">Toplam</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {invoiceData.items.map((item, index) => (
                <tr key={index} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  <td className="py-4">{item.description}</td>
                  <td className="py-4 text-right">{item.quantity}</td>
                  <td className="py-4 text-right">
                    {item.price.toLocaleString('tr-TR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })} ₺
                  </td>
                  <td className="py-4 text-right">
                    {item.total.toLocaleString('tr-TR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })} ₺
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-8 border-t dark:border-gray-700">
            <div className="pt-8 space-y-4">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Ara Toplam</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {invoiceData.subtotal.toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} ₺
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>KDV (%18)</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {invoiceData.tax.toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} ₺
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t dark:border-gray-700">
                <span className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Toplam
                </span>
                <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {invoiceData.total.toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} ₺
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-12 pt-8 border-t dark:border-gray-700">
            <h4 className={`font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Notlar
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Bu fatura elektronik olarak oluşturulmuştur ve geçerli bir imza gerektirmez.
              Ödeme koşulları: Fatura tarihinden itibaren 15 gün içinde.
              Geç ödemeler için yasal faiz uygulanacaktır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}