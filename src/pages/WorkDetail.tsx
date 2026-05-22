import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { works } from '../data/portfolio'

const CATEGORY_EMOJI: Record<string, string> = {
  game: '🎮',
  web: '🌐',
  '3d': '🧊',
}

interface SafeImgProps {
  src: string
  alt: string
  className?: string
  fallback: string
}

function SafeImg({ src, alt, className, fallback }: SafeImgProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return <span>{fallback}</span>
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="wd-section">
      <h2 className="wd-section-title">{title}</h2>
      <div className="wd-section-body">{children}</div>
    </div>
  )
}

function MetaRow({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="wd-meta-row">
      <dt className="wd-meta-label">{label}</dt>
      <dd className="wd-meta-value">{value}</dd>
    </div>
  )
}

export default function WorkDetail() {
  const { id } = useParams()
  const work = works.find((w) => w.id === Number(id))

  if (!work) return <Navigate to="/" replace />

  return (
    <div className="wd-page">
      <div className="container">

        <Link to="/#works" className="wd-back">← 作品一覧に戻る</Link>

        <div className="wd-hero">
          <div className="wd-hero-thumbnail">
            {work.thumbnail
              ? <SafeImg src={work.thumbnail} alt={work.title} fallback={CATEGORY_EMOJI[work.category] ?? '📁'} />
              : <span>{CATEGORY_EMOJI[work.category] ?? '📁'}</span>}
          </div>
          <div className="wd-hero-info">
            <p className="work-category-badge">{work.genre}</p>
            <h1 className="wd-title">{work.title}</h1>
            <p className="wd-description">{work.description}</p>
            <div className="work-tags" style={{ marginTop: 16 }}>
              {work.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="wd-hero-links">
              {work.github && (
                <a href={work.github} className="btn btn-outline" target="_blank" rel="noreferrer">
                  GitHub →
                </a>
              )}
              {work.link && (
                <a href={work.link} className="btn btn-primary" target="_blank" rel="noreferrer">
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        </div>

        {work.screenshots?.length > 0 && (
          <Section title="スクリーンショット">
            <div className="wd-screenshots">
              {work.screenshots.map((src, i) => (
                <SafeImg key={i} src={src} alt={`${work.title} screenshot ${i + 1}`} className="wd-screenshot-img" fallback="🖼" />
              ))}
            </div>
          </Section>
        )}

        <Section title="基本情報">
          <dl className="wd-meta-grid">
            <MetaRow label="制作期間" value={work.period} />
            <MetaRow label="チーム構成" value={work.team} />
            <MetaRow label="担当箇所" value={work.role} />
            <MetaRow label="プラットフォーム" value={work.platform?.join(' / ')} />
          </dl>
          {work.venues?.length > 0 && (
            <div className="wd-venues">
              <p className="wd-venues-label">出展・公開先</p>
              <div className="wd-venues-list">
                {work.venues.map((v, i) => (
                  <div key={i} className="wd-venue-item">
                    <span className="wd-venue-icon">📍</span>
                    <span className="wd-venue-name">{v.name}</span>
                    <span className="wd-venue-date">{v.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>

        <div className="wd-tech-grid">
          {work.techPoints && (
            <Section title="こだわった技術ポイント">
              <p className="wd-text">{work.techPoints}</p>
            </Section>
          )}
          {work.designNotes && (
            <Section title="設計上の工夫">
              <p className="wd-text">{work.designNotes}</p>
            </Section>
          )}
          {work.implementationTheme && (
            <Section title="実装解説テーマ">
              <p className="wd-text wd-theme">{work.implementationTheme}</p>
            </Section>
          )}
          {work.troubleshooting && (
            <Section title="詰まった問題と解決策">
              <p className="wd-text">{work.troubleshooting}</p>
            </Section>
          )}
          {work.performance && (
            <Section title="パフォーマンス改善の工夫">
              <p className="wd-text">{work.performance}</p>
            </Section>
          )}
        </div>

      </div>
    </div>
  )
}
