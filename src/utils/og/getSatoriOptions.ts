import type { SatoriOptions } from 'satori';

async function getFonts() {
  const openSansReq = fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-500-normal.ttf'
  );
  const loraReq = fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/lora@latest/latin-600-normal.ttf'
  );

  const [openSansRes, loraRes] = await Promise.all([openSansReq, loraReq]);

  if (!openSansRes.ok || !loraRes.ok) {
    throw new Error('Roboto fonts could not be loaded');
  }

  const openSans = await openSansRes.arrayBuffer();
  const lora = await loraRes.arrayBuffer();

  return { lora, openSans };
}

async function getSatoriOptions(): Promise<SatoriOptions> {
  const { lora, openSans } = await getFonts();
  const satoriOptions: SatoriOptions = {
    debug: false,
    height: 630,
    width: 1200,
    fonts: [
      {
        name: 'Lora',
        data: lora,
        weight: 600,
        style: 'normal'
      },
      {
        name: 'Open Sans',
        data: openSans,
        weight: 500,
        style: 'normal'
      }
    ]
  };

  return satoriOptions;
}

export default getSatoriOptions;
