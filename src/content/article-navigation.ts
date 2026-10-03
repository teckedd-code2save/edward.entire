import type { Article } from './article-library';

export const articleTopics = ['All notes', 'Backend rules', 'Language AI', 'Operations'] as const;
export type ArticleTopic = typeof articleTopics[number];

export function articleTopic(article: Article): ArticleTopic {
  if (article.tags.includes('groundcontrol')) return 'Operations';
  if (article.tags.includes('bnl')) return 'Backend rules';
  return 'Language AI';
}

export function articleTitle(article: Article) {
  return `${article.title} ${article.accent}`.trim();
}

export function readingMinutes(article: Article) {
  const words = article.html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function articleProject(article: Article) {
  if (article.tags.includes('bnl')) return { path: '/playground/bnl', label: 'Try the BNL playground' };
  if (article.tags.includes('groundcontrol')) return { path: '/projects/groundcontrol', label: 'Explore GroundControl' };
  return { path: '/research', label: 'Explore the research' };
}

// Article HTML is authored in this repository. IDs are generated rather than
// using hash anchors, which would interfere with the application's HashRouter.
export function articleOutline(article: Article) {
  const headings: { id: string; label: string }[] = [];
  const html = article.html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, label: string) => {
    const id = `note-section-${headings.length + 1}`;
    headings.push({ id, label: label.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&') });
    return `<h2 id="${id}" tabindex="-1">${label}</h2>`;
  });
  return { html, headings };
}
