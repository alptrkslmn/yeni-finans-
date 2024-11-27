import React from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from '../hooks/useTheme';

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function CustomDatePicker({
  selected,
  onChange,
  label,
  placeholder = 'Tarih seçin',
  className = '',
}: CustomDatePickerProps) {
  const { isDarkMode } = useTheme();

  return (
    <div>
      {label && (
        <label className={`block text-sm font-medium mb-1 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {label}
        </label>
      )}
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        placeholderText={placeholder}
        className={`w-full px-3 py-2 rounded-lg border ${
          isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-gray-200' 
            : 'bg-white border-gray-300 text-gray-900'
        } ${className}`}
        dateFormat="dd.MM.yyyy"
      />
    </div>
  );
}