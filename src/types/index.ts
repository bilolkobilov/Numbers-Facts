export interface NumberFact {
  text: string;
  found: boolean;
  type: string;
}

export interface FormData {
  type: 'math' | 'trivia' | 'date';
  mode: 'manual' | 'random';
  number?: string;
}

export type Language = 'en' | 'ru' | 'uz';

export interface Translation {
  [key: string]: string;
}