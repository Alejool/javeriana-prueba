import { EMAIL_REGEX, JAVERIANA_EMAIL_REGEX } from '@/shared/constants';

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validateJaverianaEmail = (email: string): boolean => {
  return JAVERIANA_EMAIL_REGEX.test(email);
};

export const normalizeText = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};

export const capitalizeWords = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const normalizeLeadData = (data: {
  fullName: string;
  email: string;
  phone?: string;
}) => {
  return {
    fullName: capitalizeWords(normalizeText(data.fullName)),
    email: normalizeText(data.email.toLowerCase()),
    phone: data.phone ? normalizeText(data.phone) : undefined,
  };
};
