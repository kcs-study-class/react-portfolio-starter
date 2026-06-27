import { useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import { skills, type Skill } from '../data/portfolio'

const CATEGORY_LABELS: Record<string, string> = {
  all: 'すべて',
  game: 'ゲーム',
  web: 'Web',
  language: '言語',
  graphic: 'グラフィック',
  sound: 'サウンド',
  vcs: 'バージョン管理',
  os: 'OS',
  tool: 'ツール・ライブラリ',
}

interface LevelConfig {
  max: number
  label: string
  color: string
}

const LEVEL_CONFIG: LevelConfig[] = [
  { max: 40, label: '学習中', color: '#888' },
  { max: 60, label: '基礎あり', color: '#60a5fa' },
  { max: 80, label: '実践可', color: '#a78bfa' },
  { max: 100, label: '得意', color: '#f472b6' },
]

function getLevelConfig(level: number): LevelConfig {
  return LEVEL_CONFIG.find((l) => level <= l.max) ?? LEVEL_CONFIG.at(-1)!
}

function SkillCard({ skill }: { skill: Skill }) {
  const config = getLevelConfig(skill.level)

  return (
    <div className="skill-card">
      <div className="skill-card-header">
        <div className="skill-card-title-row">
          <span className="skill-card-name">{skill.name}</span>
          <span className="skill-card-version">{skill.version}</span>
        </div>
        <span
          className="skill-card-badge"
          style={{ color: config.color, borderColor: config.color }}
        >
          {config.label}
        </span>
      </div>

      <div className="skill-bar-bg">
        <div
          className="skill-bar-fill"
          style={{ width: `${skill.level}%` }}
        />
      </div>

      <ul className="skill-capabilities">
        {skill.capabilities.map((cap) => (
          <li key={cap} className="skill-cap-tag">{cap}</li>
        ))}
      </ul>

      {skill.note && (
        <p className="skill-note">
          <span className="skill-note-icon"><FaStar /></span>
          {skill.note}
        </p>
      )}
    </div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', ...new Set(skills.map((s) => s.category))]

  const filtered =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory)

  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="section-title">
          <span>Skills</span>
        </h2>
        <p className="section-sub">技術スタック — バージョン・できること・経験を明記</p>

        <div className="skills-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`skill-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filtered.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
