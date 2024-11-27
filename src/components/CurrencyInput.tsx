import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useSettings } from '../hooks/useSettings';
import { useTheme } from '../hooks/useTheme';

interface CustomCurrencyInputProps {
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function CustomCurrencyInput({
  value,
  onValueChange,
  label,
  placeholder = '0.00',
  className = '',
}: CustomCurrencyInputProps) {
  const { isDarkMode } = useTheme();
  const { defaultCurrency, currencies } = useSettings();
  const currency = currencies.find(c => c.code === defaultCurrency);

  return (
    <div>
      {label && (
        <label className={`block text-sm font-medium mb-1 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {label}
        </label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-gray-500">
          {currency?.symbol}
        </span>
        <CurrencyInput
          value={value}
          onValueChange={onValueChange}
          placeholder={placeholder}
          decimalsLimit={2}
          className={`w-full pl-8 pr-3 py-2 rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-200' 
              : 'bg-white border-gray-300 text-gray-900'
          } ${className}`}
        />
      </div>
    </div>
  );
}