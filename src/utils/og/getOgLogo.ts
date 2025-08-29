import config from '@/website.config.json';
import { OG_STYLES } from './constants';
import type {} from 'satori';

interface GetOpLogoParams {
  containerStyles?: Record<string, string>;
  imgProps?: Record<string, any>;
}

function getOgLogo({ containerStyles, imgProps }: GetOpLogoParams) {
  return config.logo?.text || (config.astro?.site && config.logo?.image)
    ? {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            height: '96px',
            width: '100%',
            paddingLeft: '0.5rem',
            ...containerStyles
          },
          children: [
            config.logo.image && config.astro.site
              ? {
                  type: 'img',
                  props: {
                    src: `${config.astro.site}/${config.logo.image}`,
                    height: 50,
                    ...imgProps
                  }
                }
              : null,
            {
              type: 'p',
              props: {
                style: {
                  color: OG_STYLES.colors.text,
                  fontFamily: 'Open Sans'
                },
                children: config.logo?.text ?? ''
              }
            }
          ]
        }
      }
    : null;
}

export default getOgLogo;
