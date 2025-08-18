import type { MarkdownHeading } from 'astro';

export type ToCProps = {
  headings: MarkdownHeading[];
  title?: string;
};
