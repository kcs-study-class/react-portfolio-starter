import { Link } from 'react-router-dom'
import {
  FaLocationDot,
  FaArrowRight,
  FaGithub,
  FaArrowUpRightFromSquare,
} from 'react-icons/fa6'
import {
  works,
  CATEGORY_ICON,
  CATEGORY_ICON_FALLBACK,
  type Work,
} from '../data/portfolio'
import SafeImg from './SafeImg'

function WorkCard({ work }: { work: Work }) {
  const CategoryIcon = CATEGORY_ICON[work.category] ?? CATEGORY_ICON_FALLBACK

  return (
    <article className="work-card">
      <div className="work-thumbnail">
        <SafeImg
          src={work.thumbnail}
          alt={work.title}
          fallback={<CategoryIcon />}
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
              <span key={i} className="work-venue-tag"><FaLocationDot /> {v.name}　{v.date}</span>
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
            詳細を見る <FaArrowRight />
          </Link>
          {work.github && (
            <a href={work.github} className="btn btn-outline work-btn" target="_blank" rel="noreferrer">
              <FaGithub />
              GitHub
            </a>
          )}
          {work.link && (
            <a href={work.link} className="btn btn-outline work-btn" target="_blank" rel="noreferrer">
              <FaArrowUpRightFromSquare />
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
