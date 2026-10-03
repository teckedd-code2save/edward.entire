import { Link, useParams } from 'react-router-dom';
import { newArticles } from '../content/article-library';
import { articleOutline, articleProject, articleTitle, articleTopic, readingMinutes } from '../content/article-navigation';
import './ResearchWritingStudio.css';
import './PortfolioSections.css';

export default function ArticleViewer() {
  const { id } = useParams<{ id: string }>();
  const article = newArticles.find(item => item.id === id);
  if (!article) return <div className="reading-studio reading-not-found page-shell"><p className="studio-page-kicker">The journal</p><h1>Article not found.</h1><Link className="journal-read-link" to="/articles">Back to articles <span>↗</span></Link></div>;

  const outline = articleOutline(article);
  const project = articleProject(article);
  const next = newArticles[(newArticles.indexOf(article) + 1) % newArticles.length];
  function jumpToSection(sectionId: string) {
    const heading = document.getElementById(sectionId);
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
  return <div className="reading-studio">
    <header className="reading-header page-shell">
      <div className="reading-breadcrumb"><Link to="/articles">← The journal</Link><span>{articleTopic(article)}</span></div>
      <div className="reading-title"><p className="studio-page-kicker">About {readingMinutes(article)} min read</p><h1>{article.title}{' '}<br /><em>{article.accent}</em></h1><p className="reading-summary">{article.subtitle}</p><p className="reading-byline">{article.date.includes('Edward') ? article.date : `Edward Twumasi · ${article.date}`}</p></div>
    </header>
    <div className="page-shell reading-guide"><details><summary>In this note <span>{outline.headings.length} sections</span></summary><nav aria-label="Article sections">{outline.headings.map(heading => <button type="button" key={heading.id} onClick={() => jumpToSection(heading.id)}>{heading.label}<span aria-hidden="true">↓</span></button>)}</nav></details></div>
    <article className="reading-content page-shell"><div className="article-body" dangerouslySetInnerHTML={{ __html: outline.html }} /></article>
    <div className="reading-end page-shell reading-evidence-end"><div><span>Go from the note to the work</span><Link to={project.path}>{project.label} ↗</Link></div><div><span>Read next</span><Link to={`/article/${next.id}`}>{articleTitle(next)} →</Link></div></div>
  </div>;
}
