import Lenis from 'lenis'

let lenis: Lenis | null = null
let locked = false

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initSmooth() {
  const root = document.documentElement
  const onAnchor = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
    if (!a) return
    const hash = a.getAttribute('href') ?? '#'
    const target = hash === '#' || hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash)
    if (target === null) return
    e.preventDefault()
    scrollToTarget(target)
  }
  document.addEventListener('click', onAnchor)

  if (reducedMotion()) {
    return () => document.removeEventListener('click', onAnchor)
  }

  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1 })
  if (locked) lenis.stop()
  let raf = 0
  const loop = (t: number) => {
    lenis?.raf(t)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
  lenis.on('scroll', () => {
    const v = Math.max(-25, Math.min(25, lenis?.velocity ?? 0))
    root.style.setProperty('--vel', v.toFixed(2))
  })

  return () => {
    cancelAnimationFrame(raf)
    document.removeEventListener('click', onAnchor)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTarget(target: number | HTMLElement, immediate = false) {
  const offset = typeof target === 'number' ? 0 : -72
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, duration: 1.4 })
    return
  }
  const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' })
}

export function lockScroll(on: boolean) {
  locked = on
  document.documentElement.classList.toggle('locked', on)
  if (on) lenis?.stop()
  else lenis?.start()
}
