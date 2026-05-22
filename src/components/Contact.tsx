import { profile } from '../data/portfolio'

export default function Contact() {
  const links = [
    { label: 'GitHub', icon: '🐙', href: profile.links.github },
    { label: 'Twitter / X', icon: '🐦', href: profile.links.twitter },
    { label: 'Email', icon: '✉️', href: `mailto:${profile.links.email}` },
  ]

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-inner">
          <h2 className="section-title">
            <span>Contact</span>
          </h2>
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
