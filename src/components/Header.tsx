import { Link } from 'react-router-dom'
import { FaSun, FaMoon } from 'react-icons/fa6'
import { profile } from '../data/portfolio'

interface Props {
  theme: string
  onThemeToggle: () => void
}

export default function Header({ theme, onThemeToggle }: Props) {
  const navItems = [
    { label: 'About', hash: 'about' },
    { label: 'Skills', hash: 'skills' },
    { label: 'Works', hash: 'works' },
    { label: 'Jams', hash: 'gamejams' },
    { label: 'Certs', hash: 'certifications' },
    { label: 'Contact', hash: 'contact' },
  ]

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          {/* ロゴ: 常にホームへ戻る */}
          <Link to="/" className="header-logo">
            {profile.nameEn.split(' ')[0]}
            <span>.</span>
          </Link>
          <nav>
            <ul className="header-nav">
              {navItems.map((item) => (
                <li key={item.label}>
                  {/* "/#about" 形式で指定すれば、サブページからもホーム→該当セクションへ遷移できる
                      （ScrollToTop が hash を見てスクロールする） */}
                  <Link to={`/#${item.hash}`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={theme === 'dark' ? 'ライトモードに切替' : 'ダークモードに切替'}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </header>
  )
}
