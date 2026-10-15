import { useEffect, useRef, useState } from 'react'
import { profile } from '../content/profile'
import { lockScroll, reducedMotion } from '../lib/smooth'

export function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [enabled] = useState(() => window.matchMedia('(pointer: fine)').matches && !reducedMotion())

  useEffect(() => {
    if (!enabled) return
    let x = -100
    let y = -100
    let rx = x
    let ry = y
    let raf = 0
    let mag: HTMLElement | null = null
    const root = document.documentElement

    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`
      const t = e.target as HTMLElement
      setLabel(t.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '')
      ring.current?.classList.toggle('hover', !!t.closest('a, button, [role="button"], label'))

      const m = t.closest<HTMLElement>('[data-magnetic]')
      if (mag && mag !== m) mag.style.transform = ''
      mag = m
      if (m) {
        const r = m.getBoundingClientRect()
        m.style.transform = `translate(${(x - r.left - r.width / 2) * 0.28}px, ${(y - r.top - r.height / 2) * 0.35}px)`
      }
    }
    const leave = () => {
      x = -100
      y = -100
    }
    const loop = () => {
      rx += (x - rx) * 0.15
      ry += (y - ry) * 0.15
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    root.classList.add('has-cursor')
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div className="cur-ring" ref={ring} aria-hidden>
        <span className={label ? 'labelled' : ''}>
          <b>{label}</b>
        </span>
      </div>
      <div className="cur-dot" ref={dot} aria-hidden />
    </>
  )
}

export function Intro({ onDone }: { onDone: () => void }) {
  const [skip] = useState(() => {
    try {
      if (sessionStorage.getItem('intro')) return true
      sessionStorage.setItem('intro', '1')
    } catch {
    }
    return reducedMotion()
  })
  const [n, setN] = useState(0)
  const [phase, setPhase] = useState<'count' | 'leave' | 'gone'>(skip ? 'gone' : 'count')
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    if (skip) {
      done.current()
      return
    }
    lockScroll(true)
    const start = performance.now()
    const dur = 1900
    let raf = 0
    const timers: number[] = []
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur)
      setN(Math.round(100 * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(tick)
      else {
        timers.push(window.setTimeout(() => setPhase('leave'), 250))
        timers.push(
          window.setTimeout(() => {
            lockScroll(false)
            done.current()
          }, 650),
        )
        timers.push(window.setTimeout(() => setPhase('gone'), 1500))
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      lockScroll(false)
    }
  }, [skip])

  if (phase === 'gone') return null
  return (
    <div className={`intro ${phase}`} aria-hidden>
      <div className="intro-top">
        <span>{profile.name}</span>
        <span>Portfolio — {new Date().getFullYear()}</span>
      </div>
      <div className="intro-mid">
        {['Websites', 'Apps', 'Assistants'].map((w, i) => (
          <span key={w} className="intro-word" style={{ animationDelay: `${150 + i * 420}ms` }}>
            {w}
          </span>
        ))}
      </div>
      <div className="intro-bot">
        <span className="intro-count">{String(n).padStart(3, '0')}</span>
        <span className="intro-bar">
          <i style={{ transform: `scaleX(${n / 100})` }} />
        </span>
      </div>
    </div>
  )
}

export function Curtain({ phase, label }: { phase: 'idle' | 'cover' | 'reveal'; label: string }) {
  return (
    <div className={`curtain ${phase}`} aria-hidden>
      <span>{label}</span>
    </div>
  )
}

export function Grain() {
  return <div className="grain" aria-hidden />
}
