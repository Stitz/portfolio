import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react'

export function useInView<T extends Element>(threshold = 0.15): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])
  return [ref, seen]
}

type RevealProps = HTMLAttributes<HTMLDivElement> & { delay?: number; variant?: 'up' | 'fade' | 'scale' }

export function Reveal({ delay = 0, variant = 'up', className, style, children, ...rest }: RevealProps) {
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`rv rv-${variant} ${seen ? 'in' : ''} ${className ?? ''}`}
      style={{ ...style, '--d': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  )
}

type Run = { t: string; em: boolean }

function toWords(parts: string[]): Run[][] {
  const words: Run[][] = [[]]
  parts.forEach((p, pi) => {
    const em = pi % 2 === 1
    for (const ch of p) {
      const w = words[words.length - 1]
      if (ch === ' ') {
        if (w.length) words.push([])
        continue
      }
      const last = w[w.length - 1]
      if (last && last.em === em) last.t += ch
      else w.push({ t: ch, em })
    }
  })
  return words.filter((w) => w.length)
}

export function Words({ parts, delay = 0, stagger = 55 }: { parts: string[]; delay?: number; stagger?: number }) {
  const words = toWords(parts)
  return (
    <span className="split" aria-label={parts.join('')}>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className="split-w">
            <span style={{ "--wd": `${delay + i * stagger}ms` } as CSSProperties}>
              {w.map((r, j) => (r.em ? <em key={j}>{r.t}</em> : <span key={j}>{r.t}</span>))}
            </span>
          </span>{' '}
        </span>
      ))}
    </span>
  )
}

export function Title({
  as: Tag = 'h2',
  parts,
  className,
  delay,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'p'
  parts: string[]
  className?: string
  delay?: number
}) {
  const [ref, seen] = useInView<HTMLHeadingElement>(0.3)
  return (
    <Tag ref={ref} className={`${className ?? ''} ${seen ? 'in' : ''}`}>
      <Words parts={parts} delay={delay} />
    </Tag>
  )
}

export function useScrollFrame(ref: RefObject<HTMLElement>, cb: (r: DOMRect, vh: number) => void) {
  const cbRef = useRef(cb)
  cbRef.current = cb
  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const el = ref.current
      if (el) cbRef.current(el.getBoundingClientRect(), window.innerHeight)
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

export function Scale({ width = 1280, children, className }: { width?: number; children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState({ s: 0, h: 0 })

  useLayoutEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    const measure = () => {
      const s = o.clientWidth / width
      setBox({ s, h: i.offsetHeight * s })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(o)
    ro.observe(i)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={outer} className={`scale ${className ?? ''}`} style={{ height: box.h || undefined }}>
      <div ref={inner} className="scale-inner" style={{ width, transform: `scale(${box.s})`, opacity: box.s ? 1 : 0 }}>
        {children}
      </div>
    </div>
  )
}
