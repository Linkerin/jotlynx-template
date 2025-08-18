import type { MarkdownHeading } from 'astro';

interface Group {
  depth: number;
  slug: string;
  text: string;
  children: Omit<Group, 'children'>[];
}

function groupHeadings(headings: MarkdownHeading[]): Group[] {
  const res: Group[] = [];
  let currentGroup: Group | null = null;
  for (const heading of headings) {
    if (heading.depth === 2) {
      currentGroup = { ...heading, children: [] };
      res.push(currentGroup);
    } else if (heading.depth === 3 && currentGroup) {
      currentGroup.children.push(heading);
    }
  }

  return res;
}

export default groupHeadings;
