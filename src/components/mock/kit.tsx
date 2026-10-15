import type { CSSProperties, ReactNode } from 'react'

export const v = (vars: Record<string, string | number>) => vars as CSSProperties

export function Browser({ url, children, dark }: { url: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className={`mk-browser ${dark ? 'mk-dark-chrome' : ''}`}>
      <div className="mk-chrome">
        <span className="mk-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="mk-url">{url}</span>
        <span className="mk-chrome-r" />
      </div>
      <div className="mk-view">{children}</div>
    </div>
  )
}

export function Phone({ children, time = '9:41', dark }: { children: ReactNode; time?: string; dark?: boolean }) {
  return (
    <div className={`mk-phone ${dark ? 'dark' : ''}`}>
      <div className="mk-phone-screen">
        <div className="mk-status">
          <b>{time}</b>
          <span className="mk-island" />
          <span className="mk-sig">
            <i />
            <i />
            <i />
            <em />
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}

export function PhoneRow({ children, bg, note }: { children: ReactNode; bg?: string; note?: ReactNode }) {
  return (
    <div className="mk-phonerow" style={{ background: bg }}>
      {children}
      {note && <div className="mk-phonenote">{note}</div>}
    </div>
  )
}

export type Shape =
  | 'tote'
  | 'wallet'
  | 'duffel'
  | 'tee'
  | 'board'
  | 'bottle'
  | 'orb'
  | 'loaf'
  | 'jar'
  | 'cap'
  | 'suit'
  | 'leaf'
  | 'panel'
  | 'house'

export function Art({
  tone,
  shape,
  h = 260,
  bg,
  label,
  radius,
  className,
  w,
}: {
  tone: string
  shape: Shape
  h?: number | string
  bg?: string
  label?: string
  radius?: number
  className?: string
  w?: number | string
}) {
  return (
    <div className={`mk-art ${className ?? ''}`} style={v({ '--tone': tone, '--artbg': bg ?? 'var(--soft)', ...(w === undefined ? {} : { width: w }), height: h, borderRadius: radius ?? 'var(--r-img, 4px)' })}>
      <span className={`sh sh-${shape}`} />
      {label && <span className="mk-art-label">{label}</span>}
    </div>
  )
}

export function Product({
  tone,
  shape,
  name,
  price,
  note,
  h = 260,
  badge,
}: {
  tone: string
  shape: Shape
  name: string
  price: string
  note?: string
  h?: number
  badge?: string
}) {
  return (
    <div className="mk-product">
      <div style={{ position: 'relative' }}>
        <Art tone={tone} shape={shape} h={h} />
        {badge && <span className="mk-badge mk-pbadge">{badge}</span>}
      </div>
      <div className="between" style={{ marginTop: 12 }}>
        <b className="mk-pname">{name}</b>
        <span>{price}</span>
      </div>
      {note && <span className="mk-small">{note}</span>}
    </div>
  )
}

export function Nav({ logo, links, right, center }: { logo: ReactNode; links?: string[]; right?: ReactNode; center?: boolean }) {
  return (
    <div className={`mk-nav ${center ? 'center' : ''}`}>
      {center ? (
        <>
          <div className="mk-links">{links?.map((l) => <span key={l}>{l}</span>)}</div>
          <div className="mk-logo">{logo}</div>
          <div className="mk-navr">{right}</div>
        </>
      ) : (
        <>
          <div className="mk-logo">{logo}</div>
          <div className="mk-links">{links?.map((l) => <span key={l}>{l}</span>)}</div>
          <div className="mk-navr">{right}</div>
        </>
      )}
    </div>
  )
}

export function Input({ label, value, w, ph }: { label?: string; value?: string; w?: number | string; ph?: string }) {
  return (
    <div className="mk-field" style={{ width: w }}>
      {label && <span className="mk-label">{label}</span>}
      <div className={`mk-input ${value ? '' : 'ph'}`}>{value ?? ph ?? ''}</div>
    </div>
  )
}

export function Stars({ n = 5, of = 5 }: { n?: number; of?: number }) {
  return (
    <span className="mk-stars" aria-hidden>
      {'★'.repeat(n)}
      <span style={{ opacity: 0.25 }}>{'★'.repeat(of - n)}</span>
    </span>
  )
}

export function Bars({ values, h = 140, labels }: { values: number[]; h?: number; labels?: string[] }) {
  return (
    <div className="mk-bars" style={{ height: h }}>
      {values.map((x, i) => (
        <div key={i} className="mk-bar">
          <i style={{ height: `${x}%` }} />
          {labels && <span>{labels[i]}</span>}
        </div>
      ))}
    </div>
  )
}

export function Spark({ values, w = 160, h = 40, color = 'var(--acc)', fill }: { values: number[]; w?: number; h?: number; color?: string; fill?: boolean }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const pts = values.map((y, i) => [(i / (values.length - 1)) * w, h - 4 - ((y - min) / (max - min || 1)) * (h - 8)])
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      {fill && <path d={`${d} L${w},${h} L0,${h} Z`} fill={color} opacity="0.12" />}
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function Sheet({
  title,
  no,
  rev = 'B',
  children,
  dark,
}: {
  title: string
  no: string
  rev?: string
  children: ReactNode
  dark?: boolean
}) {
  return (
    <div className={`mk-sheet ${dark ? 'dark' : ''}`}>
      <div className="mk-sheet-body">{children}</div>
      <div className="mk-titleblock">
        <div>
          <span>Title</span>
          <b>{title}</b>
        </div>
        <div>
          <span>Drawing</span>
          <b>{no}</b>
        </div>
        <div>
          <span>Rev</span>
          <b>{rev}</b>
        </div>
        <div>
          <span>Status</span>
          <b>Concept</b>
        </div>
      </div>
    </div>
  )
}

type Tok = { t: string; c?: string }

function highlight(line: string): Tok[] {
  const re = /(#.*$|\{\{.*?\}\}|\{%.*?%\}|"[^"]*"|^\s*-?\s*[\w.-]+:(?=\s|$)|\b(?:config|edit|set|next|end|def|return|for|in|if|import|from)\b|\b\d+(?:\.\d+)*\b)/g
  const out: Tok[] = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(line))) {
    if (m.index > last) out.push({ t: line.slice(last, m.index) })
    const s = m[0]
    const c = s.startsWith('#')
      ? 'cm'
      : s.startsWith('{')
        ? 'tp'
        : s.startsWith('"')
          ? 'st'
          : s.trimEnd().endsWith(':')
            ? 'ky'
            : /^\d/.test(s)
              ? 'nm'
              : 'kw'
    out.push({ t: s, c })
    last = m.index + s.length
    if (s.length === 0) re.lastIndex++
  }
  if (last < line.length) out.push({ t: line.slice(last) })
  return out
}

export function Code({ lines, start = 1, mark }: { lines: string[]; start?: number; mark?: Record<number, 'add' | 'del' | 'hl'> }) {
  return (
    <pre className="mk-code">
      {lines.map((l, i) => (
        <span key={i} className={`mk-cl ${mark?.[i + start] ?? ''}`}>
          <span className="mk-ln">{i + start}</span>
          {highlight(l).map((tk, j) => (
            <span key={j} className={tk.c}>
              {tk.t}
            </span>
          ))}
          {'\n'}
        </span>
      ))}
    </pre>
  )
}
