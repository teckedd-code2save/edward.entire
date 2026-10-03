import { Link, useSearchParams } from 'react-router-dom';
import { newArticles } from '../content/article-library';
import { articleTitle, articleTopic, articleTopics, readingMinutes } from '../content/article-navigation';
import './ResearchWritingStudio.css';
import './PortfolioSections.css';

export default function Articles() {
  const [params, setParams] = useSearchParams();
  const topic = articleTopics.find(item => item === params.get('topic')) ?? 'All notes';
  const [featured, ...notes] = newArticles;
  const visible = notes.filter(article => topic === 'All notes' || articleTopic(article) === topic);

  return <div className="writing-studio">
    <header className="journal-masthead page-shell">
      <div className="journal-edition"><p className="studio-page-kicker">Edward Twumasi / Field notes</p><span>Written from the work</span></div>
      <div className="journal-intro"><h1>What the build <br /><em>taught me.</em></h1><p>The decisions, experiments, and failures behind the products. Pick a question. Follow it back to the work.</p></div>
      <div className="journal-rule"><span>Read · Inspect · Try</span><span>{newArticles.length} notes from the workbench</span></div>
    </header>
    <section className="page-shell journal-feature-section" aria-label="Featured essay">
      <article className="journal-feature">
        <div className="journal-feature-copy">
          <p className="journal-meta">Start here / About {readingMinutes(featured)} min read</p>
          <h2><Link to={`/article/${featured.id}`}>{articleTitle(featured)}</Link></h2>
          <p className="journal-deck">Bring a small dataset. Change a rule. See exactly what the browser executes. A practical first session with the BNL compiler I built.</p>
          <div className="section-actions"><Link className="journal-read-link" to={`/article/${featured.id}`}>Read the guide <span aria-hidden="true">↗</span></Link><Link className="section-link" to="/playground/bnl">Try it in the editor →</Link></div>
        </div>
        <figure className="journal-product-proof"><img src="/images/bnl/bnl-production-execution-20260928.jpg" width="1357" height="932" alt="The BNL playground executing a rule and displaying its result" /><figcaption>A real browser execution · recorded 28 September 2026</figcaption></figure>
      </article>
    </section>
    <section className="page-shell journal-index" aria-labelledby="journal-index-heading">
      <div className="journal-index-heading"><h2 id="journal-index-heading">Follow your curiosity.</h2><span role="status">{visible.length} {visible.length === 1 ? 'note' : 'notes'}</span></div>
      <div className="section-filters" role="group" aria-label="Filter notes by subject">{articleTopics.map(item => <button key={item} type="button" aria-pressed={topic === item} onClick={() => setParams(item === 'All notes' ? {} : { topic: item }, { replace: true })}>{item}</button>)}</div>
      {visible.map((article, index) => <Link className="journal-row" key={article.id} to={`/article/${article.id}`}>
        <span className="journal-row-number">{String(index + 1).padStart(2, '0')}</span>
        <div className="journal-row-title"><p className="journal-meta">{articleTopic(article)} / About {readingMinutes(article)} min</p><h3>{articleTitle(article)}</h3><span>{article.date}</span></div>
        <div className="journal-row-summary"><p>{article.description}</p></div><span className="journal-row-arrow" aria-hidden="true">↗</span>
      </Link>)}
    </section>
    <section className="section-next"><div className="page-shell section-next-inner"><div><p className="eyebrow">Keep exploring</p><h2>The story has a working version.</h2></div><Link className="section-link" to="/projects">Explore the projects →</Link></div></section>
  </div>;
}
