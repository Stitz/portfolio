import { useCallback, useEffect, useRef, useState } from 'react'
import { profile } from './content/profile'
import { projects } from './content/projects'
import { tracks, type TrackId } from './content/tracks'
import { Cursor, Curtain, Grain, Intro } from './components/Cinema'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { ProjectPage } from './pages/ProjectPage'
import { setNavigator } from './lib/router'
import { initSmooth, reducedMotion, scrollToTarget } from './lib/smooth'

type Theme = 'light' | 'dark'

function readLens(): TrackId | null {
  const v = new URLSearchParams(window.location.search).get('for')
  return tracks.some((t) => t.id === v) ? (v as TrackId) : null
}

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
  }
  return 'dark'
}

function scrollToHash(hash: string, immediate: boolean) {
  const el = hash ? document.querySelector<HTMLElement>(hash) : null
  scrollToTarget(el ?? 0, immediate)
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [lens, setLensState] = useState<TrackId | null>(readLens)
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [ready, setReady] = useState(false)
  const [curtain, setCurtain] = useState<{ phase: 'idle' | 'cover' | 'reveal'; label: string }>({ phase: 'idle', label: '' })
  const busy = useRef(false)

  useEffect(() => initSmooth(), [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
    }
  }, [theme])

  useEffect(() => {
    const go = (to: string, label = '') => {
      const url = new URL(to, window.location.href)
      const samePage = url.pathname === window.location.pathname
      if (samePage) {
        window.history.pushState(null, '', url)
        scrollToHash(url.hash, false)
        return
      }
      if (busy.current) return
      busy.current = true
      const fast = reducedMotion()
      setCurtain({ phase: 'cover', label })
      window.setTimeout(
        () => {
          window.history.pushState(null, '', url)
          setPath(url.pathname)
          setLensState(readLens())
          requestAnimationFrame(() => scrollToHash(url.hash, true))
          setCurtain({ phase: 'reveal', label })
          window.setTimeout(() => {
            setCurtain({ phase: 'idle', label: '' })
            busy.current = false
          }, 800)
        },
        fast ? 0 : 700,
      )
    }
    setNavigator(go)
    const onPop = () => {
      setPath(window.location.pathname)
      setLensState(readLens())
    }
    window.addEventListener('popstate', onPop)
    return () => {
      setNavigator(null)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  useEffect(() => {
    const m = path.match(/^\/work\/([\w-]+)/)
    document.title = m ? `${projects.find((p) => p.id === m[1])?.category ?? "Work"} — ${profile.name}` : `${profile.name} — Web, App & AI Assistant Development`
  }, [path])

  const setLens = useCallback((id: TrackId | null) => {
    setLensState(id)
    const url = new URL(window.location.href)
    if (id) url.searchParams.set('for', id)
    else url.searchParams.delete('for')
    window.history.replaceState(null, '', url)
  }, [])

  const projectId = path.match(/^\/work\/([\w-]+)/)?.[1]

  return (
    <>
      <Intro onDone={() => setReady(true)} />
      <Curtain phase={curtain.phase} label={curtain.label} />
      <Cursor />
      <Grain />
      <Header theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} home={!projectId} />
      <div key={path}>{projectId ? <ProjectPage id={projectId} /> : <Home lens={lens} onLens={setLens} ready={ready} />}</div>
      <footer className="ftr">
        <div className="ftr-big" aria-hidden>
          {profile.name}
        </div>
        <div className="ftr-row">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Projects shown are concept builds for fictional brands unless stated otherwise.</span>
          <a href="#top" onClick={(e) => (e.preventDefault(), scrollToTarget(0))}>
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  )
}
