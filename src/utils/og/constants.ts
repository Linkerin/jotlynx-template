import config from '@/website.config.json';

export const MAX_CHAR = 256;

export const OG_STYLES = {
  fontSize: '2rem',
  colors: {
    bg: config.openGraph?.colors?.bg || '#fcfcfc',
    accent: config.openGraph?.colors?.accent || '#3453b2',
    text: config.openGraph?.colors?.text || '#1c1d21'
  }
} as const;
