import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { ColorPicker } from '../ColorPicker';
import { Moon, Sun } from 'lucide-react';
import Select from 'react-select';

const fontFamilies = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Raleway', label: 'Raleway' },
] as const;

const fontSizes = [
  { value: 14, label: 'Küçük' },
  { value: 16, label: 'Orta' },
  { value: 18, label: 'Büyük' },
] as const;

export function AppearanceSettings() {
  const {
    isDarkMode,
    themeColor,
    fontFamily,
    fontSize,
    headingColor,
    toggleTheme,
    setThemeColor,
    setFontFamily,
    setFontSize,
    setHeadingColor,
  } = useTheme();

  const themeColors = [
    { name: 'Blue', value: 'blue' },
    { name: 'Purple', value: 'purple' },
    { name: 'Green', value: 'green' },
    { name: 'Red', value: 'red' },
    { name: 'Orange', value: 'orange' },
    { name: 'Pink', value: 'pink' },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Tema Modu */}
      <div>
        <h3 className="text-lg font-medium mb-4">Tema Modu</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              !isDarkMode
                ? `bg-${themeColor}-100 text-${themeColor}-600`
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            <Sun className="w-5 h-5 mr-2" />
            Aydınlık
          </button>
          <button
            onClick={toggleTheme}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isDarkMode
                ? `bg-${themeColor}-100 text-${themeColor}-600`
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            <Moon className="w-5 h-5 mr-2" />
            Karanlık
          </button>
        </div>
      </div>

      {/* Tema Rengi */}
      <div>
        <h3 className="text-lg font-medium mb-4">Tema Rengi</h3>
        <div className="grid grid-cols-6 gap-3">
          {themeColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setThemeColor(color.value)}
              className={`w-10 h-10 rounded-lg bg-${color.value}-500 ${
                themeColor === color.value ? 'ring-2 ring-offset-2' : ''
              }`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Font Ayarları */}
      <div>
        <h3 className="text-lg font-medium mb-4">Yazı Tipi</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Font Ailesi</label>
            <Select<{ value: string; label: string }>
              value={fontFamilies.find((f) => f.value === fontFamily)}
              onChange={(option) => option && setFontFamily(option.value)}
              options={fontFamilies}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Font Boyutu</label>
            <Select<{ value: number; label: string }>
              value={fontSizes.find((f) => f.value === fontSize)}
              onChange={(option) => option && setFontSize(option.value)}
              options={fontSizes}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>
      </div>

      {/* Başlık Rengi */}
      <div>
        <h3 className="text-lg font-medium mb-4">Başlık Rengi</h3>
        <ColorPicker
          color={headingColor}
          onChange={setHeadingColor}
        />
      </div>

      {/* Önizleme */}
      <div>
        <h3 className="text-lg font-medium mb-4">Önizleme</h3>
        <div
          className={`p-6 rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-sm`}
          style={{ fontFamily }}
        >
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: headingColor }}
          >
            Örnek Başlık
          </h1>
          <p className={`text-base ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`} style={{ fontSize: `${fontSize}px` }}>
            Bu bir örnek paragraftır. Font ailesi, boyutu ve renk ayarlarını
            test etmek için kullanılmaktadır.
          </p>
        </div>
      </div>
    </div>
  );
}