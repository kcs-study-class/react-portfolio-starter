import { Link } from 'react-router-dom'
import {
  works,
  CATEGORY_EMOJI,
  CATEGORY_EMOJI_FALLBACK,
  type Work,
} from '../data/portfolio'
import SafeImg from './SafeImg'

function WorkCard({ work }: { work: Work }) {
  return (
    <article className="work-card">
      <div className="work-thumbnail">
        <SafeImg
          src={work.thumbnail}
          alt={work.title}
          fallback={CATEGORY_EMOJI[work.category] ?? CATEGORY_EMOJI_FALLBACK}
        />
      </div>

      <div className="work-body">
        <p className="work-category-badge">{work.genre}</p>
        <h3 className="work-title">{work.title}</h3>
        <p className="work-description">{work.description}</p>

        <p className="work-meta">期間：<span>{work.period}</span></p>
        <p className="work-meta">担当：<span>{work.role}</span></p>
        <p className="work-meta">PF：<span>{work.platform?.join(' / ')}</span></p>
        {work.venues?.length > 0 && (
          <div className="work-venues">
            {work.venues.map((v, i) => (
              <span key={i} className="work-venue-tag">📍 {v.name}　{v.date}</span>
            ))}
          </div>
        )}

        <div className="work-tags">
          {work.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="work-links">
          <Link to={`/works/${work.id}`} className="btn btn-primary work-btn">
            詳細を見る →
          </Link>
          {work.github && (
            <a href={work.github} className="btn btn-outline work-btn" target="_blank" rel="noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </a>
          )}
          {work.link && (
            <a href={work.link} className="btn btn-outline work-btn" target="_blank" rel="noreferrer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Works() {
  return (
    <section className="section" id="works">
      <div className="container">
        <h2 className="section-title"><span>Works</span></h2>
        <p className="section-sub">制作実績</p>

        <div className="works-grid">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  )
}
