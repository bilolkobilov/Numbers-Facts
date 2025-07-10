import { NumberFact, FormData } from '../types';

const PROXY_URL = 'https://api.allorigins.win/raw?url=';
const BASE_URL = 'http://numbersapi.com';

function formatDateNumber(dateStr: string): string {
  if (!dateStr) return '1/1';
  return dateStr;
}

export const fetchNumberFact = async (formData: FormData): Promise<NumberFact> => {
  try {
    let apiUrl = BASE_URL;
    
    if (formData.mode === 'random') {
      apiUrl += `/random/${formData.type}`;
    } else {
      const number = formData.type === 'date' 
        ? formatDateNumber(formData.number || '1') 
        : formData.number || '1';
      apiUrl += `/${number}/${formData.type}`;
    }
    
    apiUrl += '?json';
    
    const url = process.env.NODE_ENV === 'production' 
      ? `${PROXY_URL}${encodeURIComponent(apiUrl)}`
      : apiUrl;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      text: data.text,
      found: data.found,
      type: data.type
    };
  } catch (error) {
    console.error('Error fetching number fact:', error);
    throw new Error('Failed to fetch number fact');
  }
};