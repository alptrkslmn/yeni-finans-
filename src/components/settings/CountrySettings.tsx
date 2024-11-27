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
  const [selectedSubregion, setSelectedSubregion] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Tüm bölgeleri ve alt bölgeleri hesapla
  const { regions, subregions } = useMemo(() => {
    const regionsSet = new Set(countries.map(country => country.region));
    const subregionsSet = new Set(countries.map(country => country.subregion));
    
    return {
      regions: ['all', ...Array.from(regionsSet)].sort(),
      subregions: ['all', ...Array.from(subregionsSet)].sort(),
    };
  }, []);

  // Bölgeye göre alt bölgeleri filtrele
  const filteredSubregions = useMemo(() => {
    if (selectedRegion === 'all') return subregions;
    const filtered = new Set(
      countries
        .filter(country => country.region === selectedRegion)
        .map(country => country.subregion)
    );
    return ['all', ...Array.from(filtered)].sort();
  }, [selectedRegion, subregions]);

  // Ülkeleri filtrele ve sırala
  const filteredCountries = useMemo(() => {
    return countries
      .filter(country => {
        const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            country.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
        const matchesSubregion = selectedSubregion === 'all' || country.subregion === selectedSubregion;
        return matchesSearch && matchesRegion && matchesSubregion;
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'tr'));
  }, [searchTerm, selectedRegion, selectedSubregion]);

  // Bölge adını Türkçeleştir
  const getLocalizedRegionName = (region: string) => {
    const regionNames: Record<string, string> = {
      'all': 'Tüm Bölgeler',
      'Europe': 'Avrupa',
      'Asia': 'Asya',
      'Africa': 'Afrika',
      'Americas': 'Amerika',
      'Oceania': 'Okyanusya',
    };
    return regionNames[region] || region;
  };

  // Alt bölge adını Türkçeleştir
  const getLocalizedSubregionName = (subregion: string) => {
    const subregionNames: Record<string, string> = {
      'all': 'Tüm Alt Bölgeler',
      'Balkans': 'Balkanlar',
      'Caucasus': 'Kafkaslar',
      'Central Asia': 'Orta Asya',
      'Middle East': 'Orta Doğu',
      'North Africa': 'Kuzey Afrika',
      'West Africa': 'Batı Afrika',
      'East Africa': 'Doğu Afrika',
      'Western Europe': 'Batı Avrupa',
      'Eastern Europe': 'Doğu Avrupa',
      'Southern Europe': 'Güney Avrupa',
      'Northern Europe': 'Kuzey Avrupa',
      'North America': 'Kuzey Amerika',
      'South America': 'Güney Amerika',
      'Central America': 'Orta Amerika',
      'Eastern Asia': 'Doğu Asya',
      'Southern Asia': 'Güney Asya',
      'South-Eastern Asia': 'Güneydoğu Asya',
      'Western Asia': 'Batı Asya',
    };
    return subregionNames[subregion] || subregion;
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
          } text-white transition-colors`}
        >
          <Plus className="w-5 h-5 mr-2" />
          Ülke Ekle
        </button>
      </div>

      {/* Seçili Ülkeler */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Seçili Ülkeler
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCountries.map((country) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-center justify-between p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-sm border border-gray-200 dark:border-gray-700`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <h3 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {country.name}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {country.currency}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeCountry(country)}
                className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ülke Ekleme Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`fixed inset-x-4 top-20 bottom-20 rounded-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } p-6 shadow-xl overflow-hidden md:inset-x-auto md:left-1/2 md:right-auto md:w-full md:max-w-xl md:-translate-x-1/2`}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Ülke Ekle
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Filtreler */}
                <div className="space-y-4 mb-6">
                  {/* Arama */}
                  <div className={`flex items-center px-3 py-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Ülke ara..."
                      className="ml-2 bg-transparent border-none outline-none w-full text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Bölge Seçimi */}
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={selectedRegion}
                      onChange={(e) => {
                        setSelectedRegion(e.target.value);
                        setSelectedSubregion('all');
                      }}
                      className={`px-3 py-2 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white border-gray-600' 
                          : 'bg-white text-gray-900 border-gray-200'
                      } border outline-none`}
                    >
                      {regions.map(region => (
                        <option key={region} value={region}>
                          {getLocalizedRegionName(region)}
                        </option>
                      ))}
                    </select>

                    <select
                      value={selectedSubregion}
                      onChange={(e) => setSelectedSubregion(e.target.value)}
                      className={`px-3 py-2 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white border-gray-600' 
                          : 'bg-white text-gray-900 border-gray-200'
                      } border outline-none`}
                    >
                      {filteredSubregions.map(subregion => (
                        <option key={subregion} value={subregion}>
                          {getLocalizedSubregionName(subregion)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Ülke Listesi */}
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-2">
                    {filteredCountries.map((country) => {
                      const isSelected = selectedCountries.some(c => c.code === country.code);
                      return (
                        <motion.button
                          key={country.code}
                          onClick={() => isSelected ? removeCountry(country) : addCountry(country)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                            isSelected
                              ? isDarkMode
                                ? 'bg-green-900/20 text-green-400'
                                : 'bg-green-50 text-green-600'
                              : isDarkMode
                                ? 'hover:bg-gray-700'
                                : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{country.flag}</span>
                            <div className="text-left">
                              <span className={`font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {country.name}
                              </span>
                              <p className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                {getLocalizedSubregionName(country.subregion)}
                              </p>
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-5 h-5" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}