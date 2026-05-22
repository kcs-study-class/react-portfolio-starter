import { Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Works from './components/Works'
import Contact from './components/Contact'
import GameJams from './components/GameJams'
import Certifications from './components/Certifications'
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
      <Footer />
    </>
  )
}
