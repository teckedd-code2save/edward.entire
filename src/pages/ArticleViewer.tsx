import { Link, useParams } from 'react-router-dom';
import { newArticles } from '../content/article-library';
import './ResearchWritingStudio.css';

const articles: Record<string, {title: string; accent: string; date: string; html: string}> = Object.fromEntries(
  newArticles.map((article) => [article.id, article]),
);

export default function ArticleViewer() {
  const { id } = useParams<{ id: string }>();
  const article = id && Object.hasOwn(articles, id) ? articles[id] : null;

  if (!article) return (
    <div className="reading-studio reading-not-found page-shell"><p className="studio-page-kicker">The journal</p><h1>Article not found.</h1><Link className="journal-read-link" to="/articles">Back to articles <span>↗</span></Link></div>
  );

  return (
    <div className="reading-studio">
      <header className="reading-header page-shell">
        <div className="reading-breadcrumb"><Link to="/articles">← The journal</Link><span>Engineering notes</span></div>
        <div className="reading-title"><p className="studio-page-kicker">From the workbench</p><h1>{article.title}{' '}<br /><em>{article.accent}</em></h1><p className="reading-byline">{article.date.includes('Edward') ? article.date : `Edward Twumasi · ${article.date}`}</p></div>
      </header>

      <article className="reading-content page-shell"><div className="article-body" dangerouslySetInnerHTML={{ __html: article.html }} /></article>
      <div className="reading-end page-shell"><span>End of note</span><Link to="/articles">Return to the journal <span>↗</span></Link></div>
    </div>
  );
}
