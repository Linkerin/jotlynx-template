import { LOCAL_STORAGE_KEYS } from './constants';

export type ColorScheme = 'light' | 'system' | 'dark';
type HTML = HTMLElement | null;

export const HTML_DATA_ATTR = 'jlColorScheme';

export function handleHtmlProp(html: HTML, scheme: ColorScheme) {
  if (!html) return;
  const htmlPropValue: Exclude<ColorScheme, 'system'> | null =
    scheme === 'system' ? null : scheme === 'dark' ? 'dark' : 'light';
  if (!htmlPropValue) {
    html.dataset[HTML_DATA_ATTR] = 'system';
  } else {
    html.dataset[HTML_DATA_ATTR] = htmlPropValue;
  }
}

export function getColorScheme(): ColorScheme {
  if (!('localStorage' in window)) return 'system';

  const savedColorScheme = localStorage.getItem(
    LOCAL_STORAGE_KEYS.colorScheme
  ) as ColorScheme | null;

  const colorScheme: ColorScheme = savedColorScheme || 'system';

  return colorScheme;
}

export function setColorScheme(html: HTML, colorScheme: ColorScheme) {
  if (!('localStorage' in window)) return;
  localStorage.setItem(LOCAL_STORAGE_KEYS.colorScheme, colorScheme);
  handleHtmlProp(html, colorScheme);
}
