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
            {profile.nameEn.split(' ')[0]}
            <span>.</span>
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
