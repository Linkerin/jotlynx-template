import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

import getSortedArticles from '@/utils/getSortedArticles';
import config from '@/website.config.json';

export async function GET() {
  const articles = await getCollection('articles');
  const sortedArticles = getSortedArticles(articles);

  return rss({
    title: config.rss?.title ?? config.meta.title ?? '',
    description: config.rss?.description ?? config.meta.description ?? '',
    site: config.astro.site,
    items: sortedArticles.map(article => ({
      title: article.data.title,
      pubDate: new Date(article.data.updated ?? article.data.created),
      description: article.data.description,
      link: `/articles/${article.id}`,
      categories: article.data.tags
    }))
  });
}
