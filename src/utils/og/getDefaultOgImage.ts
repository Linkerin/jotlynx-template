import satori from 'satori';

import config from '@/website.config.json';
import getSatoriOptions from './getSatoriOptions';
import { OG_STYLES } from './constants';
import getOgLogo from './getOgLogo';

async function getDefaultOgImage(): Promise<string> {
  const satoriOptions = await getSatoriOptions();

  const svg = await satori(
    {
      type: 'div',
      props: {
        lang: config.meta.htmlLang ?? 'en',
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          backgroundColor: OG_STYLES.colors.bg,
          fontFamily: 'Lora',
          fontSize: OG_STYLES.fontSize,
          lineHeight: 1.4,
          height: '100%',
          width: '100%',
          padding: '75px 90px 30px'
        },
        children: [
          getOgLogo({
            containerStyles: {
              fontSize: '2em',
              gap: '1rem',
              justifyContent: 'center',
              paddingLeft: '0rem'
            },
            imgProps: { height: 80 }
          }),
          {
            type: 'p',
            props: {
              style: { fontSize: '1.25em' },
              children: config.meta.description
            }
          }
        ]
      }
    },
    satoriOptions
  );

  return svg;
}

export default getDefaultOgImage;
