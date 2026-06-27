import { FaArrowRight } from 'react-icons/fa6'
import { profile } from '../data/portfolio'
import SafeImg from './SafeImg'

export default function Hero() {
  return (
    <section className="hero section" id="hero">
      <div className="container">
        <div className="avatar-placeholder">
          <SafeImg
            src={profile.avatar}
            alt={profile.name}
            fallback={profile.nameEn.charAt(0)}
          />
        </div>

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
            制作物を見る <FaArrowRight />
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
