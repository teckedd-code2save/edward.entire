import { Link } from 'react-router-dom';
import { newArticles } from '../content/article-library';
import './ResearchWritingStudio.css';

const articles = newArticles;

export default function Articles() {
  const [featured, ...index] = articles;
  const title = (article: typeof articles[number]) => `${article.title}${'accent' in article ? ` ${article.accent}` : ''}`;

  return (
    <div className="writing-studio">
      <header className="journal-masthead page-shell">
        <div className="journal-edition"><p className="studio-page-kicker">Edward Twumasi / Field notes</p><span>Engineering · Research · Operations</span></div>
        <div className="journal-intro"><h1>Engineering<br /><em>notes.</em></h1><p>Detailed accounts of systems I have built, the failures that changed them, and the evidence behind each engineering decision.</p></div>
        <div className="journal-rule"><span>The journal</span><span>{String(articles.length).padStart(2, '0')} essays / From the workbench</span></div>
      </header>

      <section className="page-shell journal-feature-section" aria-label="Featured essay">
        <article className="journal-feature">
          <div className="journal-feature-copy">
            <p className="journal-meta">Latest note <span>/</span> {featured.date}</p>
            <h2><Link to={`/article/${featured.id}`}>{title(featured)}</Link></h2>
            <p className="journal-deck">{featured.description}</p>
            <div className="journal-tags">{featured.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <Link className="journal-read-link" to={`/article/${featured.id}`}>Read the essay <span>↗</span></Link>
          </div>
          <div className="journal-manuscript" aria-hidden="true">
            <div className="manuscript-page manuscript-page-back" />
            <div className="manuscript-page">
              <div className="manuscript-topline"><span>LANGUAGE RESEARCH</span><span>01 / 03</span></div>
              <span className="manuscript-quote">Understanding<br />is only<br /><em>the beginning.</em></span>
              <div className="manuscript-boundary"><span>INTERPRETATION</span><i>→</i><span>REVIEWED REPLY</span></div>
              <div className="manuscript-bottomline"><span>Ghana Health AI</span><span>Research notes / 2026</span></div>
            </div>
          </div>
        </article>
      </section>

      <section className="page-shell journal-index" aria-labelledby="journal-index-heading">
        <div className="journal-index-heading"><h2 id="journal-index-heading">More from the notebook</h2><span>Selected essays</span></div>
        {index.map((article, i) => <Link className="journal-row" key={article.id} to={`/article/${article.id}`}>
          <span className="journal-row-number">{String(i + 2).padStart(2, '0')}</span>
          <div className="journal-row-title"><p className="journal-meta">{article.date}</p><h3>{title(article)}</h3><span>{article.subtitle}</span></div>
          <div className="journal-row-summary"><p>{article.description}</p><div className="journal-tags">{article.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
          <span className="journal-row-arrow" aria-hidden="true">↗</span>
        </Link>)}
      </section>

      <section className="journal-standard">
        <div className="page-shell"><p className="studio-page-kicker">Editorial standard</p><h2>Written from<br /><span>production evidence.</span></h2><p>Each article links its argument to a working system, measured result, production incident, or research artifact.</p></div>
      </section>
    </div>
  );
}
