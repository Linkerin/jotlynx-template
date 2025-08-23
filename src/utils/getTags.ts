import type { CollectionEntry } from 'astro:content';

function getTags(articles: CollectionEntry<'articles'>[]): string[] {
  const tagsArr = articles
    .map(article => article.data.tags)
    .flat()
    .filter(Boolean) as string[];

  return [...new Set(tagsArr)];
}

export default getTags;
