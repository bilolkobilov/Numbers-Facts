export const validateNumber = (value: string): boolean => {
  return /^\d+$/.test(value);
};

export const formatDateNumber = (number: string): string => {
  if (number.includes('/')) {
    const [month, day] = number.split('/');
    return `${month}/${day}`;
  }
  return number;
};