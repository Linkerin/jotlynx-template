import satori from 'satori';

import config from '@/website.config.json';
import { MAX_CHAR, OG_STYLES } from './constants';
import getOgLogo from './getOgLogo';
import getSatoriOptions from './getSatoriOptions';

async function getArticleOgImage(
  title: string,
  description?: string
): Promise<string> {
  const formattedDescription =
    description && description.length > MAX_CHAR
      ? description.slice(0, MAX_CHAR) + '...'
      : description;

  const satoriOptions = await getSatoriOptions();

  const svg = await satori(
    {
      type: 'div',
      props: {
        lang: config.meta.htmlLang ?? 'en',
        style: {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: OG_STYLES.colors.bg,
          fontFamily: 'Lora',
          fontSize: OG_STYLES.fontSize,
          lineHeight: 1.4,
          height: '100%',
          width: '100%',
          padding: '75px 90px 30px'
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                height: '429px',
                width: '100%'
              },
              children: [
                {
                  type: 'p',
                  props: {
                    style: {
                      color: OG_STYLES.colors.accent,
                      fontSize: '2em',
                      margin: 0
                    },
                    children: title
                  }
                },
                {
                  type: 'p',
                  props: {
                    style: {
                      fontFamily: 'Open Sans',
                      margin: 0
                    },
                    children: formattedDescription
                  }
                }
              ]
            }
          },
          getOgLogo({ containerStyles: { justifyContent: 'flex-end' } })
        ]
      }
    },
    satoriOptions
  );

  return svg;
}

export default getArticleOgImage;
