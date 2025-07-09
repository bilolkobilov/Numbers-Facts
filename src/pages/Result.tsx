import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { FormData, NumberFact } from '../types';
import { fetchNumberFact } from '../services/numbersApi';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [fact, setFact] = useState<NumberFact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formData = location.state as FormData;

  useEffect(() => {
    if (!formData) {
      navigate('/');
      return;
    }

    const getFact = async () => {
      try {
        setLoading(true);
        const result = await fetchNumberFact(formData);
        setFact(result);
      } catch (err) {
        setError(t('errorFetching'));
      } finally {
        setLoading(false);
      }
    };

    getFact();
  }, [formData, navigate, t]);

  if (!formData) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'math':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'trivia':
        return (
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'date':
        return (
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'math':
        return 'bg-blue-100 border-blue-200 text-blue-800';
      case 'trivia':
        return 'bg-purple-100 border-purple-200 text-purple-800';
      case 'date':
        return 'bg-green-100 border-green-200 text-green-800';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-800';
    }
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Input Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                {getIcon(formData.type)}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                  {t('yourInput')}
                </h2>
                <p className="text-gray-600">
                  {t('selectedOptions')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">{t('type')}:</span>
                <span className={`px-3 py-1 rounded-lg border font-medium ${getTypeColor(formData.type)}`}>
                  {t(formData.type)}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">{t('mode')}:</span>
                <span className="px-3 py-1 rounded-lg border bg-gray-100 border-gray-200 text-gray-800 font-medium">
                  {t(formData.mode)}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">{t('number')}:</span>
                <span className="px-3 py-1 rounded-lg border bg-gray-100 border-gray-200 text-gray-800 font-medium">
                  {formData.mode === 'random' ? t('random') : formData.number}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <Button
                onClick={() => navigate('/')}
                variant="secondary"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                {t('backToHome')}
              </Button>
            </div>
          </div>

          {/* Right Side - Fact Display */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {t('fact')}
              </h2>
              <p className="text-gray-600">
                {loading ? t('fetchingFact') : t('hereIsYourFact')}
              </p>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <LoadingSpinner />
                <span className="mt-4 text-gray-600 text-lg">{t('loading')}</span>
              </div>
            )}

            {error && (
              <div className="py-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <p className="text-red-700 font-medium mb-4">{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    {t('tryAgain')}
                  </Button>
                </div>
              </div>
            )}

            {fact && !loading && !error && (
              <div className="py-4">
                <div className={`${getTypeColor(formData.type)} border rounded-xl p-6`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getIcon(formData.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg leading-relaxed">
                        {fact.text}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    {t('getAnotherFact')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;