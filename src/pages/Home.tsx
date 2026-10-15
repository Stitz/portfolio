import { useRef, type CSSProperties } from 'react'
import { profile, skills } from '../content/profile'
import { tracks, trackById, type TrackId } from '../content/tracks'
import { Contact } from '../components/Contact'
import { Experience, Process, Services, Skills } from '../components/Sections'
import { clamp01, useScrollFrame, Words } from '../lib/motion'
import { WorkReel } from '../components/WorkReel'

const fallback = ['Websites, apps and ', 'virtual assistants', ' that grow your business.']

export function Home({ lens, onLens, ready }: { lens: TrackId | null; onLens: (id: TrackId | null) => void; ready: boolean }) {
  const pickFromServices = (id: TrackId) => {
    onLens(id)
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <Hero lens={lens} onLens={onLens} ready={ready} />
      <Marquee />
      <Statement />
      <WorkReel lens={lens} />
      <main>
        <Services lens={lens} onLens={pickFromServices} />
        <Experience lens={lens} />
        <Skills lens={lens} />
        <Process />
        <Contact lens={lens} />
      </main>
    </>
  )
}

function Hero({ lens, onLens, ready }: { lens: TrackId | null; onLens: (id: TrackId | null) => void; ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const track = trackById(lens)

  useScrollFrame(ref, (r) => {
    ref.current?.style.setProperty('--p', clamp01(-r.top / r.height).toFixed(3))
  })

  return (
    <section
      className={`hero ${ready ? 'in' : ''}`}
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
    >
      <div className="hero-bg" aria-hidden>
        <div className="hero-orb a" />
        <div className="hero-orb b" />
        <div className="hero-spot" />
        <div className="hero-lines" />
      </div>

      <div className="hero-inner">
        <div className="hero-meta">
          <span className="status">
            <i aria-hidden /> {profile.availability}
          </span>
          <span>{profile.title}</span>
          <span>{profile.location}</span>
        </div>

        <h1 className="hero-title" key={lens ?? 'all'}>
          <Words parts={track?.headline ?? fallback} delay={80} stagger={70} />
        </h1>

        <div className="hero-foot">
          <p className="hero-intro">{track?.intro ?? profile.intro}</p>
          <a href="#contact" className="badge" data-magnetic aria-label="Start a project">
            <svg viewBox="0 0 140 140" aria-hidden>
              <defs>
                <path id="badge-circle" d="M70,70 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0" />
              </defs>
              <text>
                <textPath href="#badge-circle" textLength="336" lengthAdjust="spacing">Available for projects · Let’s talk ·</textPath>
              </text>
            </svg>
            <span>↘</span>
          </a>
        </div>

        <div className="lens" role="group" aria-label="What are you hiring for?">
          <span className="lens-label">I’m hiring for</span>
          <div className="lens-row">
            {tracks.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`lens-pill ${lens === t.id ? 'on' : ''}`}
                aria-pressed={lens === t.id}
                onClick={() => onLens(lens === t.id ? null : t.id)}
              >
                <span>{t.index}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden>
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}

function Marquee() {
  const a = tracks.map((t) => t.label)
  const b = skills.flatMap((s) => s.items).slice(0, 18)
  return (
    <div className="mq" aria-hidden>
      <div className="mq-row">
        <div className="mq-inner">
          {[...a, ...a].map((w, i) => (
            <span key={i} className={i % 2 ? 'o' : ''}>
              {w}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>
      <div className="mq-row rev small">
        <div className="mq-inner">
          {[...b, ...b].map((w, i) => (
            <span key={i}>
              {w}
              <i>/</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Statement() {
  const ref = useRef<HTMLElement>(null)
  const words = profile.intro.split(' ')
  useScrollFrame(ref, (r, vh) => {
    const p = clamp01((vh * 0.85 - r.top) / (r.height + vh * 0.25))
    ref.current?.style.setProperty('--p', p.toFixed(3))
  })
  return (
    <section className="statement" ref={ref}>
      <span className="sec-num">00 — Intro</span>
      <p style={{ '--n': words.length } as CSSProperties}>
        {words.map((w, i) => (
          <span key={i} style={{ '--i': i } as CSSProperties}>
            {w}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}

