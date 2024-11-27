import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useSettings } from '../../hooks/useSettings';
import { Search, Plus, X, Check } from 'lucide-react';
import { currencies } from '../../data/currencies';
import { motion, AnimatePresence } from 'framer-motion';

export function CurrencySettings() {
  const { isDarkMode, themeColor } = useTheme();
  const { addCurrency, removeCurrency, setDefaultCurrency, defaultCurrency } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Arama */}
      <div className={`flex items-center px-3 py-2 rounded-lg ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Para birimi ara..."
          className="ml-2 bg-transparent border-none outline-none w-full"
        />
      </div>

      {/* Para Birimleri Listesi */}
      <div className="grid grid-cols-2 gap-4">
        {filteredCurrencies.map((currency) => (
          <motion.div
            key={currency.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center justify-between p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-sm`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{currency.flag}</span>
              <div>
                <h3 className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {currency.name}
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {currency.code} - {currency.symbol}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {defaultCurrency === currency.code ? (
                <span className={`px-2 py-1 rounded-full text-sm ${
                  isDarkMode 
                    ? `bg-${themeColor}-900/20 text-${themeColor}-400` 
                    : `bg-${themeColor}-50 text-${themeColor}-600`
                }`}>
                  Varsayılan
                </span>
              ) : (
                <button
                  onClick={() => setDefaultCurrency(currency.code)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Check className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => addCurrency(currency)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? `bg-${themeColor}-900/20 text-${themeColor}-400` 
                    : `bg-${themeColor}-50 text-${themeColor}-600`
                }`}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}