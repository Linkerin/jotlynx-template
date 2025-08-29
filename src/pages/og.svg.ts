import type { APIRoute } from 'astro';

import getDefaultOgImage from '@/utils/og/getDefaultOgImage';

export const GET: APIRoute = async () => {
  try {
    const svg = await getDefaultOgImage();

    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, immutable, no-transform, max-age=2419200' // 8 weeks
      }
    });
  } catch (err) {
    console.error(err);
    return new Response('Failed to generate an Open Graph image', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
};
