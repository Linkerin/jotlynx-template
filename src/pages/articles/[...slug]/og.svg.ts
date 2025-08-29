import type { APIRoute } from 'astro';

import config from '@/website.config.json';
import { getCollection } from 'astro:content';
import getSortedArticles from '@/utils/getSortedArticles';
import getArticleOgImage from '@/utils/og/getArticleOgImage';

export async function getStaticPaths() {
  if (config.openGraph?.noGeneratedImages) {
    return [];
  }

  const rawArticles = await getCollection('articles');
  const articles = getSortedArticles(
    rawArticles,
    article => !article.data?.ogImage
  );

  return articles.map(article => ({
    params: { slug: article.id },
    props: { article }
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (config.openGraph?.noGeneratedImages) {
    return new Response('Failed to generate an Open Graph image', {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }

  const articleData = props.article.data;

  const svg = await getArticleOgImage(
    articleData.title,
    articleData.description
  );

  try {
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, immutable, no-transform, max-age=2419200' // 8 weeks
      }
    });
  } catch (err) {
    return new Response('Failed to generate an Open Graph image', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
};
