import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { useTheme } from '../hooks/useTheme';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {label && (
        <label className={`block text-sm font-medium mb-1 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {label}
        </label>
      )}
      <button
        className="w-10 h-10 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute z-10 mt-2">
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
}