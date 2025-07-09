import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'EN' },
    { code: 'ru', name: 'RU' },
    { code: 'uz', name: 'UZ' }
  ];

  return (
    <div className="flex gap-2">
      {languages.map(({ code, name }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === code
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;