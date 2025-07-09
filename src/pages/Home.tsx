import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { FormData } from '../types';
import { validateNumber } from '../utils/validation';
import Button from '../components/Button';
import Select from '../components/Select';
import Input from '../components/Input';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    type: 'math',
    mode: 'manual',
    number: ''
  });
  const [error, setError] = useState('');

  const typeOptions = [
    { value: 'math', label: t('math') },
    { value: 'trivia', label: t('trivia') },
    { value: 'date', label: t('date') }
  ];

  const modeOptions = [
    { value: 'manual', label: t('manual') },
    { value: 'random', label: t('random') }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.mode === 'manual') {
      if (!formData.number) {
        setError(t('error'));
        return;
      }

      if (formData.type === 'date') {
        const dateRegex = /^\d{1,2}\/\d{1,2}$/;
        if (!dateRegex.test(formData.number)) {
          setError(t('dateError'));
          return;
        }
      } else {
        if (!validateNumber(formData.number)) {
          setError(t('error'));
          return;
        }
      }
    }

    navigate('/result', { state: formData });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1"></div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {t('title')}
              </h1>
              <p className="text-gray-600 text-lg">
                {t('subtitle')}
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Select
                  options={typeOptions}
                  value={formData.type}
                  onChange={(value) => setFormData({ ...formData, type: value as 'math' | 'trivia' | 'date' })}
                  label={t('selectType')}
                />

                <Select
                  options={modeOptions}
                  value={formData.mode}
                  onChange={(value) => setFormData({ ...formData, mode: value as 'manual' | 'random' })}
                  label={t('selectMode')}
                />

                {formData.mode === 'manual' && (
                  <Input
                    type="text"
                    value={formData.number ?? ''}
                    onChange={(value) => setFormData({ ...formData, number: value })}
                    placeholder={formData.type === 'date' ? t('enterDate') : t('enterNumber')}
                    label={formData.type === 'date' ? t('enterDate') : t('enterNumber')}
                    error={error}
                  />
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  {t('getFact')}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{t('mathFactsTitle')}</h3>
                    <p className="text-gray-600">{t('mathFactsDescription')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{t('numberTriviaTitle')}</h3>
                    <p className="text-gray-600">{t('numberTriviaDescription')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{t('dateFactsTitle')}</h3>
                    <p className="text-gray-600">{t('dateFactsDescription')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;