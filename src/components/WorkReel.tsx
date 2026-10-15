import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { projects } from '../content/projects'
import type { TrackId } from '../content/tracks'
import { designs } from '../projects'
import { Link } from '../lib/router'
import { clamp01, Scale, Title } from '../lib/motion'

function useMedia(q: string) {
  const [on, setOn] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const fn = () => setOn(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [q])
  return on
}

export function WorkReel({ lens }: { lens: TrackId | null }) {
  const list = lens ? projects.filter((p) => p.tracks.includes(lens)) : projects
  const wide = useMedia('(min-width: 900px)')
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  const mode = !wide ? 'stack' : fine ? 'pan' : 'swipe'

  const vp = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const target = useRef(0)
  const dist = useRef(0)

  useEffect(() => {
    const v = vp.current
    const t = track.current
    if (!v || !t) return
    if (mode !== 'pan') {
      t.style.transform = ''
      return
    }
    let cur = target.current
    let raf = 0
    const measure = () => {
      dist.current = Math.max(0, t.scrollWidth - v.clientWidth)
      target.current = Math.min(target.current, dist.current)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(t)
    ro.observe(v)

    const move = (e: MouseEvent) => {
      const r = v.getBoundingClientRect()
      const k = clamp01((e.clientX - r.left - r.width * 0.14) / (r.width * 0.72))
      target.current = k * dist.current
    }
    const focus = (e: FocusEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.reel-card, .reel-end')
      if (!card) return
      target.current = Math.min(dist.current, Math.max(0, card.offsetLeft - v.clientWidth * 0.2))
    }
    const loop = () => {
      cur += (target.current - cur) * 0.07
      if (Math.abs(target.current - cur) < 0.1) cur = target.current
      t.style.transform = `translate3d(${(-cur).toFixed(1)}px,0,0)`
      v.parentElement?.style.setProperty('--p', dist.current ? (cur / dist.current).toFixed(4) : '0')
      raf = requestAnimationFrame(loop)
    }
    loop()
    v.addEventListener('mousemove', move)
    v.addEventListener('focusin', focus)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      v.removeEventListener('mousemove', move)
      v.removeEventListener('focusin', focus)
    }
  }, [mode, list.length])

  useEffect(() => {
    const v = vp.current
    if (!v || mode !== 'swipe') return
    const on = () => v.parentElement?.style.setProperty('--p', (v.scrollLeft / Math.max(1, v.scrollWidth - v.clientWidth)).toFixed(4))
    v.addEventListener('scroll', on, { passive: true })
    return () => v.removeEventListener('scroll', on)
  }, [mode])

  const step = (dir: 1 | -1) => {
    const v = vp.current
    if (!v) return
    const by = v.clientWidth * 0.6 * dir
    if (mode === 'swipe') v.scrollBy({ left: by, behavior: 'smooth' })
    else target.current = Math.min(dist.current, Math.max(0, target.current + by))
  }

  return (
    <section id="work" className={`reel reel-${mode}`}>
      <div className="reel-vp" ref={vp} data-lenis-prevent={mode === 'swipe' ? '' : undefined}>
        <div className="reel-track" ref={track}>
          <div className="reel-intro">
            <span className="sec-num">01 — Selected work</span>
            <Title parts={['Work that ', 'moves', ' businesses.']} className="reel-title" />
            <p>
              {list.length} projects, each with its full set of designed screens and a live prototype
              you can click through.
            </p>
            <span className="reel-hint">
              {mode === 'pan' ? 'Move your cursor ← →' : mode === 'swipe' ? 'Swipe →' : 'Tap a project ↓'}
            </span>
          </div>

          {list.map((p, i) => {
            const d = designs[p.id]
            const cover = d.screens[0]
            return (
              <Link
                key={p.id}
                to={`/work/${p.id}`}
                label={p.category}
                className="reel-card"
                data-cursor="View"
                style={{ '--cbg': d.hero.bg, '--cfg': d.hero.fg, '--cac': d.hero.accent } as CSSProperties}
              >
                <div className="reel-stage">
                  <div className="reel-screen">
                    <Scale width={cover.width ?? 1280}>{cover.render()}</Scale>
                  </div>
                  <span className="reel-count">{String(d.screens.length).padStart(2, '0')} screens</span>
                </div>
                <div className="reel-info">
                  <span className="reel-idx">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{p.category}</h3>
                    <span>{p.sector}</span>
                  </div>
                  <span className="reel-go" aria-hidden>
                    ↗
                  </span>
                </div>
              </Link>
            )
          })}

          <a href="#contact" className="reel-end" data-cursor="Talk">
            <span>Next could be yours</span>
            <b>
              Start a <em>project</em> →
            </b>
          </a>
        </div>
      </div>

      {mode !== 'stack' && (
        <div className="reel-bar">
          <div className="reel-progress" aria-hidden>
            <i />
          </div>
          <div className="reel-arrows">
            <button type="button" onClick={() => step(-1)} aria-label="Previous projects">
              ←
            </button>
            <button type="button" onClick={() => step(1)} aria-label="More projects">
              →
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
