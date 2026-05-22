import { profile } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <p>© {year} {profile.nameEn} — Built with React + Vite</p>
      </div>
    </footer>
  )
}
