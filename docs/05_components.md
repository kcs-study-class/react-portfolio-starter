# 第5章：コンポーネントを作る

データが定義できたら、各セクションのコンポーネントを1つずつ作ります。  
ファイルの拡張子は `.tsx`（TypeScript 内で TSX 構文を使えるファイル。詳しくは [第3章](./03_react_basics.md) のメモを参照）です。

---

## App.tsx — ページ全体の骨格

まずすべてのコンポーネントをまとめる `App.tsx` を作ります。

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Works from './components/Works'
import GameJams from './components/GameJams'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import WorkDetail from './pages/WorkDetail'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Works />
      <GameJams />
      <Certifications />
      <Contact />
      <footer className="footer">
        <div className="container">
          <p>© 2026 山田太郎 — Built with React + Vite</p>
        </div>
      </footer>
    </>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <ScrollToTop />
      <Header theme={theme} onThemeToggle={toggle} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works/:id" element={<WorkDetail />} />
        </Routes>
      </main>
    </>
  )
}
```

**ポイント**:
- `HomePage` は一覧ページのセクション構成だけを管理します
- `WorkDetail` は別ルート（`/works/:id`）で表示します
- `useTheme` フックで取得した `toggle` を `Header` に渡します

---

## ScrollToTop — ページ遷移時のスクロール制御

ページを移動したときに自動でトップに戻るコンポーネントです。

```tsx
// src/components/ScrollToTop.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // ハッシュ（#works など）がある場合は対象要素へスクロール
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    } else {
      // ハッシュがない場合はページトップへ
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
```

**ポイント**: `setTimeout(..., 0)` を使うのは、Reactが DOM を描画するのを1フレーム待つためです。

---

## useTheme — テーマ切替フック

フックファイルは `.ts`（TSX 構文（`<div>` などのタグ）を含まないため `.tsx` ではなく `.ts` で十分）です。

```ts
// src/hooks/useTheme.ts
import { useState, useEffect } from 'react'

export function useTheme(): { theme: string; toggle: () => void } {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') ?? 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggle }
}
```

**ポイント**: 戻り値の型 `{ theme: string; toggle: () => void }` を明示することで、  
呼び出し側で `theme` と `toggle` の型が自動補完されます。  
`localStorage` に保存しているので、ページをリロードしてもテーマが維持されます。

---

## Header — 固定ナビゲーション

Props を受け取るコンポーネントには `interface` で型を定義します。

```tsx
// src/components/Header.tsx
import { profile } from '../data/portfolio'

interface Props {
  theme: string
  onThemeToggle: () => void
}

export default function Header({ theme, onThemeToggle }: Props) {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Works', href: '#works' },
    { label: 'Jams', href: '#gamejams' },
    { label: 'Certs', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <a href="#hero" className="header-logo">
            {profile.nameEn.split(' ')[0]}<span>.</span>
          </a>
          <nav>
            <ul className="header-nav">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={theme === 'dark' ? 'ライトモードに切替' : 'ダークモードに切替'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}
```

**ポイント**:
- `interface Props` で受け取れる値の型を定義します
- `navItems` を配列で定義して `map()` で生成することで、項目の追加・削除がしやすくなります
- `theme` と `onThemeToggle` は `App.tsx` から Props で受け取ります

---

## Hero — ファーストビュー

```tsx
// src/components/Hero.tsx
import { profile } from '../data/portfolio'

export default function Hero() {
  return (
    <section className="hero section" id="hero">
      <div className="container">
        <div className="avatar-placeholder">🎮</div>

        <p className="hero-eyebrow">Portfolio</p>

        <h1 className="hero-name">
          <span className="gradient">{profile.name}</span>
          <span className="hero-name-en">{profile.nameEn}</span>
        </h1>

        <p className="hero-role">{profile.role}</p>

        {profile.motto && (
          <blockquote className="hero-motto">
            <span className="hero-motto-mark">"</span>
            {profile.motto}
            <span className="hero-motto-mark">"</span>
          </blockquote>
        )}

        <div className="hero-actions">
          <a href="#works" className="btn btn-primary">制作物を見る →</a>
          <a href="#contact" className="btn btn-outline">連絡する</a>
        </div>
      </div>
      <div className="hero-scroll">Scroll</div>
    </section>
  )
}
```

**ポイント**: `profile.motto` が `null` のときは `{profile.motto && (...)}` で表示しません。

---

## About — 自己紹介

```tsx
// src/components/About.tsx
import { profile, timeline } from '../data/portfolio'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title"><span>About</span></h2>
        <p className="section-sub">自己紹介</p>

        <div className="about-grid">
          <div className="about-card">
            <h3>Profile</h3>
            <p className="about-bio">{profile.bio}</p>

            <dl className="profile-school">
              <div className="profile-school-row">
                <dt>学校</dt>
                <dd>{profile.school}</dd>
              </div>
              <div className="profile-school-row">
                <dt>学科</dt>
                <dd>{profile.department}</dd>
              </div>
              <div className="profile-school-row">
                <dt>卒業</dt>
                <dd className="profile-graduation">{profile.graduationYear}</dd>
              </div>
            </dl>
          </div>

          <div className="about-card">
            <h3>Timeline</h3>
            <ul className="timeline">
              {timeline.map((item, index) => (
                <li key={index}>
                  <p className="timeline-year">{item.year}</p>
                  <p className="timeline-event">{item.event}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Skills — スキル一覧（フィルター付き）

フィルターボタンの状態を `useState` で管理します。  
`Skill` 型は `portfolio.ts` から `import` して使います。

```tsx
// src/components/Skills.tsx
import { useState } from 'react'
import { skills, type Skill } from '../data/portfolio'

const CATEGORY_LABELS: Record<string, string> = {
  all: 'すべて',
  game: 'ゲーム',
  web: 'Web',
  language: '言語',
  // ...
}

interface LevelConfig {
  max: number
  label: string
  color: string
}

const LEVEL_CONFIG: LevelConfig[] = [
  { max: 40,  label: '学習中', color: '#888' },
  { max: 60,  label: '基礎あり', color: '#60a5fa' },
  { max: 80,  label: '実践可',   color: '#a78bfa' },
  { max: 100, label: '得意',     color: '#f472b6' },
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
        <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
      </div>
      <ul className="skill-capabilities">
        {skill.capabilities.map((cap) => (
          <li key={cap} className="skill-cap-tag">{cap}</li>
        ))}
      </ul>
      {skill.note && (
        <p className="skill-note">
          <span className="skill-note-icon">✦</span>
          {skill.note}
        </p>
      )}
    </div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', ...new Set(skills.map((s) => s.category))]

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="section-title"><span>Skills</span></h2>
        <p className="section-sub">技術スタック</p>

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
```

**ポイント**:
- `type Skill` を `import` して `{ skill: Skill }` と型を付けます
- `getLevelConfig` の引数・戻り値に型を付けることで補完が効きます
- `new Set(skills.map(...))` でカテゴリの重複を除いたフィルターボタンを自動生成します

---

## SafeImg — 画像表示の共通コンポーネント

Works 一覧と WorkDetail の両方で **「画像が無い／読み込みに失敗したら絵文字を出す」** という同じ処理が必要になります。  
同じコードを2箇所に書く（コピペする）と、片方を直したときにもう片方を直し忘れる **バグの温床** になります。  
共通のコンポーネントとして切り出しましょう。

```tsx
// src/components/SafeImg.tsx
import { useState } from 'react'

interface Props {
  src: string | null
  alt: string
  className?: string
  fallback: string
}

export default function SafeImg({ src, alt, className, fallback }: Props) {
  const [failed, setFailed] = useState(false)

  // src が null、または読み込みに失敗したらフォールバックを表示
  if (!src || failed) return <span>{fallback}</span>

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
```

**ポイント**:
- `src` を `string | null` にして、`null`（画像未設定）も読み込み失敗もまとめて1つの分岐で処理できます
- `onError` は `<img>` の読み込みが失敗したとき（404、ネットワークエラーなど）に発火するイベントです
- `useState(false)` で「失敗したかどうか」を覚えておき、失敗後は再度読み込まないようにします
- `className?` の `?` は **省略可能** という意味です（呼び出し側で渡さなくてもOK）

> **DRY原則**: Don't Repeat Yourself（同じことを繰り返すな）。  
> 同じロジックが2箇所以上に出てきたら、共通化を検討するサインです。

---

## Works — 制作物一覧

`WorkCard` を子コンポーネントに分離します。詳細ページへは `<Link>` で遷移します。  
サムネイル画像は先ほど作った `SafeImg` を使い、カテゴリ別の絵文字（`CATEGORY_EMOJI`）は `portfolio.ts` から `import` します。

```tsx
// src/components/Works.tsx
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
        <p className="work-meta">PF：<span>{work.platform?.join(' / ')}</span></p>

        {work.venues?.length > 0 && (
          <div className="work-venues">
            {work.venues.map((v, i) => (
              <span key={i} className="work-venue-tag">📍 {v.name}　{v.date}</span>
            ))}
          </div>
        )}

        <div className="work-tags">
          {work.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
        </div>

        <div className="work-links">
          <Link to={`/works/${work.id}`} className="btn btn-primary work-btn">
            詳細を見る →
          </Link>
          {work.github && (
            <a href={work.github} className="btn btn-outline work-btn"
               target="_blank" rel="noreferrer">GitHub</a>
          )}
          {work.link && (
            <a href={work.link} className="btn btn-outline work-btn"
               target="_blank" rel="noreferrer">Live Demo</a>
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
          {works.map((work) => <WorkCard key={work.id} work={work} />)}
        </div>
      </div>
    </section>
  )
}
```

---

## WorkDetail — 作品詳細ページ

`useParams()` でURLの `:id` を取得し、該当する作品データを見つけて表示します。

```tsx
// src/pages/WorkDetail.tsx
import { useParams, Link, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import {
  works,
  CATEGORY_EMOJI,
  CATEGORY_EMOJI_FALLBACK,
} from '../data/portfolio'
import SafeImg from '../components/SafeImg'

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

  // 存在しないIDならトップに戻す
  if (!work) return <Navigate to="/" replace />

  // 2回使うので変数化（同じ式を繰り返さない）
  const categoryEmoji = CATEGORY_EMOJI[work.category] ?? CATEGORY_EMOJI_FALLBACK

  return (
    <div className="wd-page">
      <div className="container">
        <Link to="/#works" className="wd-back">← 作品一覧に戻る</Link>

        <div className="wd-hero">
          <div className="wd-hero-thumbnail">
            <SafeImg src={work.thumbnail} alt={work.title} fallback={categoryEmoji} />
          </div>
          <div className="wd-hero-info">
            <p className="work-category-badge">{work.genre}</p>
            <h1 className="wd-title">{work.title}</h1>
            <p className="wd-description">{work.description}</p>
          </div>
        </div>

        <Section title="基本情報">
          <dl className="wd-meta-grid">
            <MetaRow label="制作期間" value={work.period} />
            <MetaRow label="チーム構成" value={work.team} />
            <MetaRow label="担当箇所" value={work.role} />
            <MetaRow label="プラットフォーム" value={work.platform?.join(' / ')} />
          </dl>
        </Section>

        {/* 技術詳細（値があるときだけ表示） */}
        <div className="wd-tech-grid">
          {work.techPoints && (
            <Section title="こだわった技術ポイント">
              <p className="wd-text">{work.techPoints}</p>
            </Section>
          )}
          {work.troubleshooting && (
            <Section title="詰まった問題と解決策">
              <p className="wd-text">{work.troubleshooting}</p>
            </Section>
          )}
          {/* designNotes / implementationTheme / performance も同様 */}
        </div>
      </div>
    </div>
  )
}
```

**ポイント**:
- `works.find((w) => w.id === Number(id))` でURLの文字列 `'1'` を数値 `1` に変換して検索します
- `ReactNode` 型は「TSX として表示できるもの全般（要素・文字列・数値・配列など）」を表します。`children` の型によく使います
- `MetaRow` の `value` が `string | undefined` なのは `platform?.join(...)` が undefined を返し得るためです
- サムネイル表示は `SafeImg` に任せているので、`work.thumbnail` が `null` でも自動でフォールバックの絵文字が出ます。同じロジックを Works.tsx と二重に書く必要がありません

---

## GameJams — ゲームジャム参加実績

基本パターンは Works と同じです。データを `import` してカードコンポーネントに `map()` で展開します。

```tsx
// src/components/GameJams.tsx
import { gameJams, type GameJam } from '../data/portfolio'

function JamCard({ jam }: { jam: GameJam }) {
  return (
    <article className="jam-card">
      <div className="jam-header">
        <h3 className="jam-name">{jam.name}</h3>
        <div className="jam-header-sub">
          {jam.date && <p className="jam-date">{jam.date}</p>}
          {jam.result && <span className="jam-result">🏆 {jam.result}</span>}
        </div>
      </div>

      {jam.theme && (
        <div className="jam-theme">
          <span className="jam-theme-label">テーマ</span>
          <span className="jam-theme-text">{jam.theme}</span>
        </div>
      )}

      <p className="jam-description">{jam.description}</p>

      <div className="jam-meta-row">
        <div className="jam-meta-item">
          <span className="jam-meta-label">PF</span>
          <span className="jam-meta-value">{jam.platform.join(' / ')}</span>
        </div>
        <div className="jam-meta-item">
          <span className="jam-meta-label">担当</span>
          <span className="jam-meta-value">{jam.role}</span>
        </div>
        <div className="jam-meta-item">
          <span className="jam-meta-label">チーム</span>
          <span className="jam-meta-value">{jam.team}</span>
        </div>
      </div>

      {jam.reflection && (
        <div className="jam-reflection">
          <span className="jam-reflection-icon">💡</span>
          <p>{jam.reflection}</p>
        </div>
      )}

      {jam.url && (
        <div className="jam-footer">
          <a href={jam.url} className="btn btn-outline work-btn" target="_blank" rel="noreferrer">
            制作物を見る →
          </a>
        </div>
      )}
    </article>
  )
}

export default function GameJams() {
  return (
    <section className="section" id="gamejams">
      <div className="container">
        <h2 className="section-title"><span>Game Jams</span></h2>
        <p className="section-sub">学校外部ゲームジャム参加実績</p>

        <div className="jam-grid">
          {gameJams.map((jam, i) => (
            <JamCard key={i} jam={jam} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

**ポイント**:
- `jam.result` のような `null` を取り得る値は `{jam.result && (...)}` でガードします
- `jam.platform.join(' / ')` で配列をスラッシュ区切りの文字列に変換します（`['WebGL', 'Windows']` → `'WebGL / Windows'`）

---

## Certifications — 資格・実績

`CertStatus` ユニオン型を活用して **取得済み/受験予定/取得予定/学習中** のステータスごとに色を切り替えます。  
データ駆動でスタイルを変える典型例です。

```tsx
// src/components/Certifications.tsx
import { certifications, type Certification, type CertStatus } from '../data/portfolio'

// ステータスごとの色設定（オブジェクトでまとめて管理）
const STATUS_CONFIG: Record<CertStatus, { color: string; bg: string; border: string }> = {
  '取得済み': { color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.3)' },
  '受験予定': { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.3)' },
  '取得予定': { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)' },
  '学習中':   { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)' },
}

// カテゴリごとのアイコン絵文字
const CATEGORY_ICONS: Record<string, string> = {
  '国家資格':     '🏛',
  '免許':         '🪪',
  'ベンダー認定': '🏅',
  '競プロ':       '⚡',
}

function StatusBadge({ status }: { status: CertStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span
      className="cert-status"
      style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
    >
      {status}
    </span>
  )
}

function CertRow({ cert }: { cert: Certification }) {
  return (
    <div className="cert-row">
      <div className="cert-icon">{CATEGORY_ICONS[cert.category] ?? '📋'}</div>

      <div className="cert-main">
        <div className="cert-name-row">
          <p className="cert-name">{cert.name}</p>
          {cert.score && <span className="cert-score">{cert.score}</span>}
        </div>
        <p className="cert-date">{cert.date}</p>
      </div>

      <div className="cert-meta">
        <span className="cert-category">{cert.category}</span>
      </div>

      <StatusBadge status={cert.status} />
    </div>
  )
}

export default function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <h2 className="section-title"><span>Certifications</span></h2>
        <p className="section-sub">資格・実績</p>

        <div className="cert-list">
          {certifications.map((cert, i) => (
            <CertRow key={i} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

**ポイント**:
- `Record<CertStatus, ...>` のキーが **ユニオン型** なので、4種のステータスを書き忘れるとコンパイルエラーになります。型が「漏れ」を防いでくれる好例です
- `STATUS_CONFIG[status]` で動的に値を取り出せるのは、ユニオン型のキーがコンパイル時に網羅されているおかげです
- 想定外のカテゴリには `?? '📋'` でデフォルトアイコンを表示します

---

## Contact — 連絡先

外部リンクと `mailto:` で挙動を変える小さな工夫が入っています。

```tsx
// src/components/Contact.tsx
import { profile } from '../data/portfolio'

export default function Contact() {
  const links = [
    { label: 'GitHub',      icon: '🐙', href: profile.links.github },
    { label: 'Twitter / X', icon: '🐦', href: profile.links.twitter },
    { label: 'Email',       icon: '✉️', href: `mailto:${profile.links.email}` },
  ]

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-inner">
          <h2 className="section-title"><span>Contact</span></h2>
          <p className="section-sub">連絡先</p>

          <p className="contact-desc">
            お仕事のご依頼・インターンの募集・コラボレーションなど、
            お気軽にご連絡ください。
            <br />
            学生のため、返信にお時間をいただく場合があります。
          </p>

          <div className="contact-links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="contact-link-item"
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
              >
                <span className="contact-link-icon">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

**ポイント**:
- `mailto:` リンクを新しいタブで開くのは UX 的に不自然なので、`startsWith('mailto')` で判定して `target` を切り替えています
- `target` に `undefined` を渡すと **属性自体が出力されません**。空文字列 `""` を渡すのとは違う挙動なので注意

---

## 次のステップ

→ [第6章：ReactとVueの比較](./06_vue_comparison.md)
