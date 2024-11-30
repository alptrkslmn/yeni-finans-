import React, { useState, useMemo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useSettings } from '../../hooks/useSettings';
import { Search, Plus, X, Check } from 'lucide-react';
import { countries } from '../../data/countries';
import { motion, AnimatePresence } from 'framer-motion';

export function CountrySettings() {
  const { isDarkMode, themeColor } = useTheme();
  const { selectedCountries, addCountry, removeCountry } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Tüm bölgeleri hesapla
  const regions = useMemo(() => {
    const regionsSet = new Set(countries.map(country => country.region));
    return ['all', ...Array.from(regionsSet)].sort();
  }, []);

  // Ülkeleri filtrele ve sırala
  const filteredCountries = useMemo(() => {
    return countries
      .filter(country => {
        const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            country.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'tr'));
  }, [searchTerm, selectedRegion]);

  // Bölge adını Türkçeleştir
  const getLocalizedRegionName = (region: string) => {
    const regionNames: Record<string, string> = {
      'all': 'Tüm Bölgeler',
      'Avrupa': 'Avrupa',
      'Asya': 'Asya',
      'Afrika': 'Afrika',
      'Kuzey Amerika': 'Kuzey Amerika',
      'Güney Amerika': 'Güney Amerika',
      'Okyanusya': 'Okyanusya'
    };
    return regionNames[region] || region;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Ülke Ayarları
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className={`flex items-center px-4 py-2 rounded-lg ${
            isDarkMode 
              ? `bg-${themeColor}-600 hover:bg-${themeColor}-700` 
              : `bg-${themeColor}-500 hover:bg-${themeColor}-600`
          } text-white`}
        >
          <Plus className="w-5 h-5 mr-2" />
          Ülke Ekle
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Ülke ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {getLocalizedRegionName(region)}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Countries List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Seçili Ülkeler
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCountries.map((countryCode) => {
            const country = countries.find((c) => c.code === countryCode);
            if (!country) return null;
            
            return (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'bg-white'
                } shadow-sm`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {country.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {country.localName}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCountry(country.code)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Country Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Ülke Ekle
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCountries
                    .filter((country) => !selectedCountries.includes(country.code))
                    .map((country) => (
                      <motion.button
                        key={country.code}
                        onClick={() => {
                          addCountry(country.code);
                          setShowAddModal(false);
                        }}
                        className={`p-4 rounded-lg border ${
                          isDarkMode ? 'dark:border-gray-700' : ''
                        } hover:border-${themeColor}-500 flex justify-between items-center w-full`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{country.flag}</span>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {country.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {country.localName}
                            </p>
                          </div>
                        </div>
                        <Plus className={`w-5 h-5 text-${themeColor}-500`} />
                      </motion.button>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}