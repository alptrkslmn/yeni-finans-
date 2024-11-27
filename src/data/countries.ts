export interface Country {
  code: string;
  name: string;
  localName: string;
  flag: string;
  currency: string;
  languages: string[];
  region: string;
  subregion: string;
}

export const countries: Country[] = [
  // Türkiye
  {
    code: 'TR',
    name: 'Turkey',
    localName: 'Türkiye',
    flag: '🇹🇷',
    currency: 'TRY',
    languages: ['tr'],
    region: 'Asia',
    subregion: 'Western Asia'
  },

  // Balkanlar
  {
    code: 'AL',
    name: 'Albania',
    localName: 'Arnavutluk',
    flag: '🇦🇱',
    currency: 'ALL',
    languages: ['sq'],
    region: 'Europe',
    subregion: 'Balkans'
  },
  {
    code: 'BG',
    name: 'Bulgaria',
    localName: 'Bulgaristan',
    flag: '🇧🇬',
    currency: 'BGN',
    languages: ['bg'],
    region: 'Europe',
    subregion: 'Balkans'
  },
  {
    code: 'HR',
    name: 'Croatia',
    localName: 'Hırvatistan',
    flag: '🇭🇷',
    currency: 'EUR',
    languages: ['hr'],
    region: 'Europe',
    subregion: 'Balkans'
  },
  {
    code: 'GR',
    name: 'Greece',
    localName: 'Yunanistan',
    flag: '🇬🇷',
    currency: 'EUR',
    languages: ['el'],
    region: 'Europe',
    subregion: 'Balkans'
  },
  {
    code: 'RO',
    name: 'Romania',
    localName: 'Romanya',
    flag: '🇷🇴',
    currency: 'RON',
    languages: ['ro'],
    region: 'Europe',
    subregion: 'Balkans'
  },
  {
    code: 'RS',
    name: 'Serbia',
    localName: 'Sırbistan',
    flag: '🇷🇸',
    currency: 'RSD',
    languages: ['sr'],
    region: 'Europe',
    subregion: 'Balkans'
  },

  // Kafkaslar
  {
    code: 'AM',
    name: 'Armenia',
    localName: 'Ermenistan',
    flag: '🇦🇲',
    currency: 'AMD',
    languages: ['hy'],
    region: 'Asia',
    subregion: 'Caucasus'
  },
  {
    code: 'AZ',
    name: 'Azerbaijan',
    localName: 'Azerbaycan',
    flag: '🇦🇿',
    currency: 'AZN',
    languages: ['az'],
    region: 'Asia',
    subregion: 'Caucasus'
  },
  {
    code: 'GE',
    name: 'Georgia',
    localName: 'Gürcistan',
    flag: '🇬🇪',
    currency: 'GEL',
    languages: ['ka'],
    region: 'Asia',
    subregion: 'Caucasus'
  },

  // Orta Asya
  {
    code: 'KZ',
    name: 'Kazakhstan',
    localName: 'Kazakistan',
    flag: '🇰🇿',
    currency: 'KZT',
    languages: ['kk', 'ru'],
    region: 'Asia',
    subregion: 'Central Asia'
  },
  {
    code: 'KG',
    name: 'Kyrgyzstan',
    localName: 'Kırgızistan',
    flag: '🇰🇬',
    currency: 'KGS',
    languages: ['ky', 'ru'],
    region: 'Asia',
    subregion: 'Central Asia'
  },
  {
    code: 'TJ',
    name: 'Tajikistan',
    localName: 'Tacikistan',
    flag: '🇹🇯',
    currency: 'TJS',
    languages: ['tg', 'ru'],
    region: 'Asia',
    subregion: 'Central Asia'
  },
  {
    code: 'TM',
    name: 'Turkmenistan',
    localName: 'Türkmenistan',
    flag: '🇹🇲',
    currency: 'TMT',
    languages: ['tk', 'ru'],
    region: 'Asia',
    subregion: 'Central Asia'
  },
  {
    code: 'UZ',
    name: 'Uzbekistan',
    localName: 'Özbekistan',
    flag: '🇺🇿',
    currency: 'UZS',
    languages: ['uz', 'ru'],
    region: 'Asia',
    subregion: 'Central Asia'
  },

  // Afrika
  {
    code: 'EG',
    name: 'Egypt',
    localName: 'Mısır',
    flag: '🇪🇬',
    currency: 'EGP',
    languages: ['ar'],
    region: 'Africa',
    subregion: 'North Africa'
  },
  {
    code: 'MA',
    name: 'Morocco',
    localName: 'Fas',
    flag: '🇲🇦',
    currency: 'MAD',
    languages: ['ar'],
    region: 'Africa',
    subregion: 'North Africa'
  },
  {
    code: 'TN',
    name: 'Tunisia',
    localName: 'Tunus',
    flag: '🇹🇳',
    currency: 'TND',
    languages: ['ar'],
    region: 'Africa',
    subregion: 'North Africa'
  },
  {
    code: 'LY',
    name: 'Libya',
    localName: 'Libya',
    flag: '🇱🇾',
    currency: 'LYD',
    languages: ['ar'],
    region: 'Africa',
    subregion: 'North Africa'
  },
  {
    code: 'NG',
    name: 'Nigeria',
    localName: 'Nijerya',
    flag: '🇳🇬',
    currency: 'NGN',
    languages: ['en'],
    region: 'Africa',
    subregion: 'West Africa'
  },
  {
    code: 'KE',
    name: 'Kenya',
    localName: 'Kenya',
    flag: '🇰🇪',
    currency: 'KES',
    languages: ['en', 'sw'],
    region: 'Africa',
    subregion: 'East Africa'
  },

  // Batı Avrupa
  {
    code: 'DE',
    name: 'Germany',
    localName: 'Almanya',
    flag: '🇩🇪',
    currency: 'EUR',
    languages: ['de'],
    region: 'Europe',
    subregion: 'Western Europe'
  },
  {
    code: 'FR',
    name: 'France',
    localName: 'Fransa',
    flag: '🇫🇷',
    currency: 'EUR',
    languages: ['fr'],
    region: 'Europe',
    subregion: 'Western Europe'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    localName: 'Birleşik Krallık',
    flag: '🇬🇧',
    currency: 'GBP',
    languages: ['en'],
    region: 'Europe',
    subregion: 'Western Europe'
  },
  {
    code: 'IT',
    name: 'Italy',
    localName: 'İtalya',
    flag: '🇮🇹',
    currency: 'EUR',
    languages: ['it'],
    region: 'Europe',
    subregion: 'Southern Europe'
  },
  {
    code: 'ES',
    name: 'Spain',
    localName: 'İspanya',
    flag: '🇪🇸',
    currency: 'EUR',
    languages: ['es'],
    region: 'Europe',
    subregion: 'Southern Europe'
  },

  // Amerika
  {
    code: 'US',
    name: 'United States',
    localName: 'Amerika Birleşik Devletleri',
    flag: '🇺🇸',
    currency: 'USD',
    languages: ['en'],
    region: 'Americas',
    subregion: 'North America'
  },
  {
    code: 'CA',
    name: 'Canada',
    localName: 'Kanada',
    flag: '🇨🇦',
    currency: 'CAD',
    languages: ['en', 'fr'],
    region: 'Americas',
    subregion: 'North America'
  },
  {
    code: 'BR',
    name: 'Brazil',
    localName: 'Brezilya',
    flag: '🇧🇷',
    currency: 'BRL',
    languages: ['pt'],
    region: 'Americas',
    subregion: 'South America'
  },
  {
    code: 'AR',
    name: 'Argentina',
    localName: 'Arjantin',
    flag: '🇦🇷',
    currency: 'ARS',
    languages: ['es'],
    region: 'Americas',
    subregion: 'South America'
  },
  {
    code: 'MX',
    name: 'Mexico',
    localName: 'Meksika',
    flag: '🇲🇽',
    currency: 'MXN',
    languages: ['es'],
    region: 'Americas',
    subregion: 'North America'
  },

  // Asya
  {
    code: 'CN',
    name: 'China',
    localName: 'Çin',
    flag: '🇨🇳',
    currency: 'CNY',
    languages: ['zh'],
    region: 'Asia',
    subregion: 'Eastern Asia'
  },
  {
    code: 'JP',
    name: 'Japan',
    localName: 'Japonya',
    flag: '🇯🇵',
    currency: 'JPY',
    languages: ['ja'],
    region: 'Asia',
    subregion: 'Eastern Asia'
  },
  {
    code: 'KR',
    name: 'South Korea',
    localName: 'Güney Kore',
    flag: '🇰🇷',
    currency: 'KRW',
    languages: ['ko'],
    region: 'Asia',
    subregion: 'Eastern Asia'
  },
  {
    code: 'IN',
    name: 'India',
    localName: 'Hindistan',
    flag: '🇮🇳',
    currency: 'INR',
    languages: ['hi', 'en'],
    region: 'Asia',
    subregion: 'Southern Asia'
  },
  {
    code: 'ID',
    name: 'Indonesia',
    localName: 'Endonezya',
    flag: '🇮🇩',
    currency: 'IDR',
    languages: ['id'],
    region: 'Asia',
    subregion: 'South-Eastern Asia'
  },

  // Orta Doğu
  {
    code: 'SA',
    name: 'Saudi Arabia',
    localName: 'Suudi Arabistan',
    flag: '🇸🇦',
    currency: 'SAR',
    languages: ['ar'],
    region: 'Asia',
    subregion: 'Middle East'
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    localName: 'Birleşik Arap Emirlikleri',
    flag: '🇦🇪',
    currency: 'AED',
    languages: ['ar'],
    region: 'Asia',
    subregion: 'Middle East'
  },
  {
    code: 'IR',
    name: 'Iran',
    localName: 'İran',
    flag: '🇮🇷',
    currency: 'IRR',
    languages: ['fa'],
    region: 'Asia',
    subregion: 'Middle East'
  },
  {
    code: 'IQ',
    name: 'Iraq',
    localName: 'Irak',
    flag: '🇮🇶',
    currency: 'IQD',
    languages: ['ar'],
    region: 'Asia',
    subregion: 'Middle East'
  },
  {
    code: 'IL',
    name: 'Israel',
    localName: 'İsrail',
    flag: '🇮🇱',
    currency: 'ILS',
    languages: ['he'],
    region: 'Asia',
    subregion: 'Middle East'
  }
];