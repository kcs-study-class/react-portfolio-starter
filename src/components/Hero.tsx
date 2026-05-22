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
          <a href="#works" className="btn btn-primary">
            制作物を見る →
          </a>
          <a href="#contact" className="btn btn-outline">
            連絡する
          </a>
        </div>
      </div>

      <div className="hero-scroll">Scroll</div>
    </section>
  )
}
