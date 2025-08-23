import type { CollectionEntry } from 'astro:content';

import { SPECIAL_PAGES } from './constants';

function getSortedArticles(
  articles: CollectionEntry<'articles'>[],
  filter?: (article: CollectionEntry<'articles'>) => boolean
): CollectionEntry<'articles'>[] {
  articles.forEach(article => {
    console.log(article.id, article.id in SPECIAL_PAGES);
  });

  return articles
    .filter(article => {
      if (Object.values(SPECIAL_PAGES).includes(article.id as any))
        return false;
      if (filter) return filter(article);

      return true;
    })
    .sort(
      (a, b) =>
        Math.floor(b.data.created / 1000) - Math.floor(a.data.created / 1000)
    );
}

export default getSortedArticles;
