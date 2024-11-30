import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useSettings } from '../stores/settings';
import { CustomCurrencyInput } from './CurrencyInput';
import { CustomDatePicker } from './DatePicker';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  X,
  Plus,
} from 'lucide-react';
import { format } from 'date-fns';

interface TransactionFormProps {
  onSubmit: (data: TransactionData) => void;
  onCancel: () => void;
  initialData?: Partial<TransactionData>;
}

interface TransactionData {
  amount: number;
  description: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  paymentMethod: string;
  currency?: string;
  isRecurring?: boolean;
  attachments?: File[];
  tags?: string[];
}

interface SelectOption {
  value: string;
  label: string;
}

export function TransactionForm({ onSubmit, onCancel, initialData }: TransactionFormProps) {
  const { isDarkMode, themeColor } = useTheme();
  const { categories, paymentMethods, currencies } = useSettings();
  const [isRecurring, setIsRecurring] = useState(initialData?.isRecurring || false);
  const [attachments, setAttachments] = useState<File[]>(initialData?.attachments || []);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [amount, setAmount] = useState(initialData?.amount?.toString() || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [date, setDate] = useState(initialData?.date || format(new Date(), 'yyyy-MM-dd'));
  const [type, setType] = useState<'income' | 'expense'>(initialData?.type || 'expense');
  const [category, setCategory] = useState(initialData?.category || '');
  const [paymentMethod, setPaymentMethod] = useState(initialData?.paymentMethod || '');
  const [currency, setCurrency] = useState(initialData?.currency || '');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
    onDrop: (acceptedFiles) => {
      setAttachments((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const typeOptions: SelectOption[] = [
    { value: 'income', label: 'Gelir' },
    { value: 'expense', label: 'Gider' }
  ];

  const categoryOptions: SelectOption[] = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const paymentMethodOptions: SelectOption[] = paymentMethods.map((method) => ({
    value: method,
    label: method,
  }));

  const currencyOptions: SelectOption[] = currencies.map((currency: string) => ({
    value: currency,
    label: currency,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    
    onSubmit({
      amount: parseFloat(amount.replace(/[^0-9.-]+/g, '')),
      description,
      date: format(new Date(date), 'yyyy-MM-dd'),
      type,
      category,
      paymentMethod,
      currency,
      isRecurring,
      attachments,
      tags,
    });
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* İşlem Tipi ve Tarih */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            İşlem Tipi
          </label>
          <Select
            options={typeOptions}
            value={typeOptions.find(option => option.value === type)}
            onChange={(option) => option && setType(option.value as 'income' | 'expense')}
            className="react-select-container"
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: `var(--color-${themeColor}-500)`,
                primary75: `var(--color-${themeColor}-400)`,
                primary50: `var(--color-${themeColor}-300)`,
                primary25: `var(--color-${themeColor}-200)`,
              },
            })}
          />
        </div>
        <CustomDatePicker
          selected={date ? new Date(date) : null}
          onChange={(newDate: Date | null) => newDate && setDate(format(newDate, 'yyyy-MM-dd'))}
          label="Tarih"
        />
      </div>

      {/* Açıklama */}
      <div>
        <label className={`block text-sm font-medium mb-1 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Açıklama
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full px-3 py-2 rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-200' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder="İşlem açıklaması"
        />
      </div>

      {/* Kategori ve Tutar */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Kategori
          </label>
          <Select
            options={categoryOptions}
            value={categoryOptions.find(option => option.value === category)}
            onChange={(option) => option && setCategory(option.value)}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <CustomCurrencyInput
          value={amount}
          onValueChange={(value: string | undefined) => setAmount(value || '')}
          label="Tutar"
        />
      </div>

      {/* Ödeme Yöntemi ve Para Birimi */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Ödeme Yöntemi
          </label>
          <Select
            options={paymentMethodOptions}
            value={paymentMethodOptions.find(option => option.value === paymentMethod)}
            onChange={(option) => option && setPaymentMethod(option.value)}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Para Birimi
          </label>
          <Select
            options={currencyOptions}
            value={currencyOptions.find(option => option.value === currency)}
            onChange={(option) => setCurrency(option?.value || '')}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>

      {/* Etiketler */}
      <div>
        <label className={`block text-sm font-medium mb-1 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Etiketler
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                isDarkMode
                  ? `bg-${themeColor}-900/20 text-${themeColor}-400`
                  : `bg-${themeColor}-50 text-${themeColor}-700`
              }`}
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className={`flex-1 px-3 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-200' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Yeni etiket ekle"
          />
          <button
            onClick={handleAddTag}
            className={`px-3 py-2 rounded-lg ${
              isDarkMode
                ? `bg-${themeColor}-900/20 text-${themeColor}-400`
                : `bg-${themeColor}-50 text-${themeColor}-700`
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Dosya Yükleme */}
      <div>
        <label className={`block text-sm font-medium mb-1 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Ekler
        </label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 text-center ${
            isDarkMode
              ? 'border-gray-600 hover:border-gray-500'
              : 'border-gray-300 hover:border-gray-400'
          } ${isDragActive ? 'border-blue-500' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Dosyaları sürükleyip bırakın veya seçmek için tıklayın
          </p>
        </div>
        {attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <span className="text-sm truncate">{file.name}</span>
                <button
                  onClick={() => handleRemoveAttachment(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Düzenli İşlem */}
      <div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="recurring"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
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
        
        <AnimatePresence>
          {isRecurring && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 grid grid-cols-2 gap-4"
            >
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Tekrar Sıklığı
                </label>
                <Select
                  options={[
                    { value: 'daily', label: 'Günlük' },
                    { value: 'weekly', label: 'Haftalık' },
                    { value: 'monthly', label: 'Aylık' },
                    { value: 'yearly', label: 'Yıllık' },
                  ]}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
              <CustomDatePicker
                selected={null}
                onChange={() => {}}
                label="Bitiş Tarihi"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notlar */}
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

      {/* Butonlar */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className={`px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          İptal
        </button>
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg text-white ${
            `bg-${themeColor}-500 hover:bg-${themeColor}-600`
          }`}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}