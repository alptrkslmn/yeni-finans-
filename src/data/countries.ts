export type Country = {
  code: string;
  name: string;
  localName: string;
  flag: string;
  currency: string;
  languages: string[];
  region: 'Avrupa' | 'Asya' | 'Afrika' | 'Kuzey Amerika' | 'Güney Amerika' | 'Okyanusya';
}

export const countries: Country[] = [
  {
    code: 'TR', 
    name: 'Türkiye', 
    localName: 'Turkey', 
    flag: '🇹🇷', 
    currency: 'TRY', 
    languages: ['tr'], 
    region: 'Avrupa'
  },
  {
    code: 'DE', 
    name: 'Almanya', 
    localName: 'Germany', 
    flag: '🇩🇪', 
    currency: 'EUR', 
    languages: ['de'], 
    region: 'Avrupa'
  },
  {
    code: 'FR', 
    name: 'Fransa', 
    localName: 'France', 
    flag: '🇫🇷', 
    currency: 'EUR', 
    languages: ['fr'], 
    region: 'Avrupa'
  },
  {
    code: 'IT', 
    name: 'İtalya', 
    localName: 'Italy', 
    flag: '🇮🇹', 
    currency: 'EUR', 
    languages: ['it'], 
    region: 'Avrupa'
  },
  {
    code: 'ES', 
    name: 'İspanya', 
    localName: 'Spain', 
    flag: '🇪🇸', 
    currency: 'EUR', 
    languages: ['es'], 
    region: 'Avrupa'
  },
  {
    code: 'GB', 
    name: 'Birleşik Krallık', 
    localName: 'United Kingdom', 
    flag: '🇬🇧', 
    currency: 'GBP', 
    languages: ['en'], 
    region: 'Avrupa'
  },
  {
    code: 'RU', 
    name: 'Rusya', 
    localName: 'Russia', 
    flag: '🇷🇺', 
    currency: 'RUB', 
    languages: ['ru'], 
    region: 'Avrupa'
  },
  {
    code: 'UA', 
    name: 'Ukrayna', 
    localName: 'Ukraine', 
    flag: '🇺🇦', 
    currency: 'UAH', 
    languages: ['uk'], 
    region: 'Avrupa'
  },
  {
    code: 'PL', 
    name: 'Polonya', 
    localName: 'Poland', 
    flag: '🇵🇱', 
    currency: 'PLN', 
    languages: ['pl'], 
    region: 'Avrupa'
  },
  {
    code: 'GR', 
    name: 'Yunanistan', 
    localName: 'Greece', 
    flag: '🇬🇷', 
    currency: 'EUR', 
    languages: ['el'], 
    region: 'Avrupa'
  },
  {
    code: 'US', 
    name: 'Amerika Birleşik Devletleri', 
    localName: 'United States', 
    flag: '🇺🇸', 
    currency: 'USD', 
    languages: ['en'], 
    region: 'Kuzey Amerika'
  },
  {
    code: 'CA', 
    name: 'Kanada', 
    localName: 'Canada', 
    flag: '🇨🇦', 
    currency: 'CAD', 
    languages: ['en', 'fr'], 
    region: 'Kuzey Amerika'
  },
  {
    code: 'MX', 
    name: 'Meksika', 
    localName: 'Mexico', 
    flag: '🇲🇽', 
    currency: 'MXN', 
    languages: ['es'], 
    region: 'Kuzey Amerika'
  },
  {
    code: 'DO', 
    name: 'Dominik Cumhuriyeti', 
    localName: 'Dominican Republic', 
    flag: '🇩🇴', 
    currency: 'DOP', 
    languages: ['es'], 
    region: 'Kuzey Amerika'
  },
  {
    code: 'BR', 
    name: 'Brezilya', 
    localName: 'Brazil', 
    flag: '🇧🇷', 
    currency: 'BRL', 
    languages: ['pt'], 
    region: 'Güney Amerika'
  },
  {
    code: 'AR', 
    name: 'Arjantin', 
    localName: 'Argentina', 
    flag: '🇦🇷', 
    currency: 'ARS', 
    languages: ['es'], 
    region: 'Güney Amerika'
  },
  {
    code: 'CO', 
    name: 'Kolombiya', 
    localName: 'Colombia', 
    flag: '🇨🇴', 
    currency: 'COP', 
    languages: ['es'], 
    region: 'Güney Amerika'
  },
  {
    code: 'PE', 
    name: 'Peru', 
    localName: 'Peru', 
    flag: '🇵🇪', 
    currency: 'PEN', 
    languages: ['es'], 
    region: 'Güney Amerika'
  },
  {
    code: 'CN', 
    name: 'Çin', 
    localName: 'China', 
    flag: '🇨🇳', 
    currency: 'CNY', 
    languages: ['zh'], 
    region: 'Asya'
  },
  {
    code: 'JP', 
    name: 'Japonya', 
    localName: 'Japan', 
    flag: '🇯🇵', 
    currency: 'JPY', 
    languages: ['ja'], 
    region: 'Asya'
  },
  {
    code: 'IN', 
    name: 'Hindistan', 
    localName: 'India', 
    flag: '🇮🇳', 
    currency: 'INR', 
    languages: ['hi', 'en'], 
    region: 'Asya'
  },
  {
    code: 'SA', 
    name: 'Suudi Arabistan', 
    localName: 'Saudi Arabia', 
    flag: '🇸🇦', 
    currency: 'SAR', 
    languages: ['ar'], 
    region: 'Asya'
  },
  {
    code: 'KR', 
    name: 'Güney Kore', 
    localName: 'South Korea', 
    flag: '🇰🇷', 
    currency: 'KRW', 
    languages: ['ko'], 
    region: 'Asya'
  },
  {
    code: 'IR', 
    name: 'İran', 
    localName: 'Iran', 
    flag: '🇮🇷', 
    currency: 'IRR', 
    languages: ['fa'], 
    region: 'Asya'
  },
  {
    code: 'TH', 
    name: 'Tayland', 
    localName: 'Thailand', 
    flag: '🇹🇭', 
    currency: 'THB', 
    languages: ['th'], 
    region: 'Asya'
  },
  {
    code: 'ZA', 
    name: 'Güney Afrika', 
    localName: 'South Africa', 
    flag: '🇿🇦', 
    currency: 'ZAR', 
    languages: ['en', 'af', 'zu'], 
    region: 'Afrika'
  },
  {
    code: 'EG', 
    name: 'Mısır', 
    localName: 'Egypt', 
    flag: '🇪🇬', 
    currency: 'EGP', 
    languages: ['ar'], 
    region: 'Afrika'
  },
  {
    code: 'NG', 
    name: 'Nijerya', 
    localName: 'Nigeria', 
    flag: '🇳🇬', 
    currency: 'NGN', 
    languages: ['en'], 
    region: 'Afrika'
  },
  {
    code: 'MA', 
    name: 'Fas', 
    localName: 'Morocco', 
    flag: '🇲🇦', 
    currency: 'MAD', 
    languages: ['ar'], 
    region: 'Afrika'
  },
  {
    code: 'KE', 
    name: 'Kenya', 
    localName: 'Kenya', 
    flag: '🇰🇪', 
    currency: 'KES', 
    languages: ['en', 'sw'], 
    region: 'Afrika'
  },
  {
    code: 'AU', 
    name: 'Avustralya', 
    localName: 'Australia', 
    flag: '🇦🇺', 
    currency: 'AUD', 
    languages: ['en'], 
    region: 'Okyanusya'
  },
  {
    code: 'NZ', 
    name: 'Yeni Zelanda', 
    localName: 'New Zealand', 
    flag: '🇳🇿', 
    currency: 'NZD', 
    languages: ['en', 'mi'], 
    region: 'Okyanusya'
  },
  {
    code: 'FJ', 
    name: 'Fiji', 
    localName: 'Fiji', 
    flag: '🇫🇯', 
    currency: 'FJD', 
    languages: ['en', 'fj'], 
    region: 'Okyanusya'
  },
  {
    code: 'AE', 
    name: 'Birleşik Arap Emirlikleri', 
    localName: 'United Arab Emirates', 
    flag: '🇦🇪', 
    currency: 'AED', 
    languages: ['ar'], 
    region: 'Asya'
  },
  {
    code: 'IL', 
    name: 'İsrail', 
    localName: 'Israel', 
    flag: '🇮🇱', 
    currency: 'ILS', 
    languages: ['he', 'ar'], 
    region: 'Asya'
  },
  {
    code: 'QA', 
    name: 'Katar', 
    localName: 'Qatar', 
    flag: '🇶🇦', 
    currency: 'QAR', 
    languages: ['ar'], 
    region: 'Asya'
  },
  {
    code: 'ID', 
    name: 'Endonezya', 
    localName: 'Indonesia', 
    flag: '🇮🇩', 
    currency: 'IDR', 
    languages: ['id'], 
    region: 'Asya'
  },
  {
    code: 'MY', 
    name: 'Malezya', 
    localName: 'Malaysia', 
    flag: '🇲🇾', 
    currency: 'MYR', 
    languages: ['ms'], 
    region: 'Asya'
  },
  {
    code: 'SG', 
    name: 'Singapur', 
    localName: 'Singapore', 
    flag: '🇸🇬', 
    currency: 'SGD', 
    languages: ['en', 'ms', 'zh', 'ta'], 
    region: 'Asya'
  },
  {
    code: 'DZ', 
    name: 'Cezayir', 
    localName: 'Algeria', 
    flag: '🇩🇿', 
    currency: 'DZD', 
    languages: ['ar'], 
    region: 'Afrika'
  },
  {
    code: 'TN', 
    name: 'Tunus', 
    localName: 'Tunisia', 
    flag: '🇹🇳', 
    currency: 'TND', 
    languages: ['ar'], 
    region: 'Afrika'
  },
  {
    code: 'GH', 
    name: 'Gana', 
    localName: 'Ghana', 
    flag: '🇬🇭', 
    currency: 'GHS', 
    languages: ['en'], 
    region: 'Afrika'
  },
  {
    code: 'JM', 
    name: 'Jamaika', 
    localName: 'Jamaica', 
    flag: '🇯🇲', 
    currency: 'JMD', 
    languages: ['en'], 
    region: 'Kuzey Amerika'
  },
  {
    code: 'CU', 
    name: 'Küba', 
    localName: 'Cuba', 
    flag: '🇨🇺', 
    currency: 'CUP', 
    languages: ['es'], 
    region: 'Kuzey Amerika'
  },
  {
    code: 'PG', 
    name: 'Papua Yeni Gine', 
    localName: 'Papua New Guinea', 
    flag: '🇵🇬', 
    currency: 'PGK', 
    languages: ['en'], 
    region: 'Okyanusya'
  },
  {
    code: 'SB', 
    name: 'Solomon Adaları', 
    localName: 'Solomon Islands', 
    flag: '🇸🇧', 
    currency: 'SBD', 
    languages: ['en'], 
    region: 'Okyanusya'
  },
  {
    code: 'AF',
    name: 'Afganistan',
    localName: 'Afghanistan',
    flag: '🇦🇫',
    currency: 'AFN',
    languages: ['ps', 'uz', 'tk'],
    region: 'Asya'
  },
  {
    code: 'AZ',
    name: 'Azerbaycan',
    localName: 'Azerbaijan',
    flag: '🇦🇿',
    currency: 'AZN',
    languages: ['az'],
    region: 'Asya'
  },
  {
    code: 'KZ',
    name: 'Kazakistan',
    localName: 'Kazakhstan',
    flag: '🇰🇿',
    currency: 'KZT',
    languages: ['kk', 'ru'],
    region: 'Asya'
  },
  {
    code: 'KG',
    name: 'Kırgızistan',
    localName: 'Kyrgyzstan',
    flag: '🇰🇬',
    currency: 'KGS',
    languages: ['ky', 'ru'],
    region: 'Asya'
  },
  {
    code: 'AL',
    name: 'Arnavutluk',
    localName: 'Albania',
    flag: '🇦🇱',
    currency: 'ALL',
    languages: ['sq'],
    region: 'Avrupa'
  },
  {
    code: 'XK',
    name: 'Kosova',
    localName: 'Kosovo',
    flag: '🇽🇰',
    currency: 'EUR',
    languages: ['sq', 'sr'],
    region: 'Avrupa'
  },
  {
    code: 'MK',
    name: 'Kuzey Makedonya',
    localName: 'North Macedonia',
    flag: '🇲🇰',
    currency: 'MKD',
    languages: ['mk'],
    region: 'Avrupa'
  },
  {
    code: 'RS',
    name: 'Sırbistan',
    localName: 'Serbia',
    flag: '🇷🇸',
    currency: 'RSD',
    languages: ['sr'],
    region: 'Avrupa'
  },
  {
    code: 'GE',
    name: 'Gürcistan',
    localName: 'Georgia',
    flag: '🇬🇪',
    currency: 'GEL',
    languages: ['ka'],
    region: 'Asya'
  },
  {
    code: 'PH',
    name: 'Filipinler',
    localName: 'Philippines',
    flag: '🇵🇭',
    currency: 'PHP',
    languages: ['en', 'tl'],
    region: 'Asya'
  },
  {
    code: 'CI',
    name: 'Fildişi Sahili',
    localName: 'Ivory Coast',
    flag: '🇨🇮',
    currency: 'XOF',
    languages: ['fr'],
    region: 'Afrika'
  },
  {
    code: 'CM',
    name: 'Kamerun',
    localName: 'Cameroon',
    flag: '🇨🇲',
    currency: 'XAF',
    languages: ['en', 'fr'],
    region: 'Afrika'
  },
  {
    code: 'ML',
    name: 'Mali',
    localName: 'Mali',
    flag: '🇲🇱',
    currency: 'XOF',
    languages: ['fr'],
    region: 'Afrika'
  },
  {
    code: 'NE',
    name: 'Nijer',
    localName: 'Niger',
    flag: '🇳🇪',
    currency: 'XOF',
    languages: ['fr'],
    region: 'Afrika'
  },
  {
    code: 'SN',
    name: 'Senegal',
    localName: 'Senegal',
    flag: '🇸🇳',
    currency: 'XOF',
    languages: ['fr'],
    region: 'Afrika'
  },
  {
    code: 'SL',
    name: 'Sierra Leone',
    localName: 'Sierra Leone',
    flag: '🇸🇱',
    currency: 'SLL',
    languages: ['en'],
    region: 'Afrika'
  },
  {
    code: 'TZ',
    name: 'Tanzanya',
    localName: 'Tanzania',
    flag: '🇹🇿',
    currency: 'TZS',
    languages: ['sw', 'en'],
    region: 'Afrika'
  },
  {
    code: 'HT',
    name: 'Haiti',
    localName: 'Haiti',
    flag: '🇭🇹',
    currency: 'HTG',
    languages: ['fr', 'ht'],
    region: 'Kuzey Amerika'
  }
];
