import { NumberFact, FormData } from '../types';

const BASE_URL = 'http://numbersapi.com';

function formatDateNumber(dateStr: string): string {
  if (!dateStr) return '1/1';
  return dateStr;
}

export const fetchNumberFact = async (formData: FormData): Promise<NumberFact> => {
  try {
    let url = BASE_URL;
    
    if (formData.mode === 'random') {
      url += `/random/${formData.type}`;
    } else {
      const number = formData.type === 'date' 
        ? formatDateNumber(formData.number || '1') 
        : formData.number || '1';
      url += `/${number}/${formData.type}`;
    }
    
    url += '?json';
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      text: data.text,
      found: data.found,
      type: data.type
    };
  } catch (error) {
    throw new Error('Failed to fetch number fact');
  }
};