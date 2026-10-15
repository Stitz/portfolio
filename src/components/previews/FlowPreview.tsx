import { useEffect, useState } from 'react'

const W = 132
const H = 58

const nodes = [
  { x: 12, y: 112, kind: 'Webhook', label: 'Form submitted' },
  { x: 178, y: 112, kind: 'HTTP', label: 'Enrich lead' },
  { x: 344, y: 112, kind: 'IF', label: 'Qualified?' },
  { x: 510, y: 32, kind: 'GoHighLevel', label: 'Create opportunity' },
  { x: 510, y: 192, kind: 'GoHighLevel', label: 'Nurture sequence' },
  { x: 676, y: 32, kind: 'Slack', label: 'Notify front desk' },
]

const edges: [number, number, string?][] = [
  [0, 1],
  [1, 2],
  [2, 3, 'true'],
  [2, 4, 'false'],
  [3, 5],
]

const runPath = [0, 1, 2, 3, 5]
const log = [
  'POST /webhook/enquiry · 200',
  'Enriched: Maria L. · new patient · Invisalign',
  'Rule matched: treatment ∈ bookable, contact verified',
  'Opportunity created in “New patients” · slot offered',
  'Posted to #front-desk',
]

function edgePath(a: (typeof nodes)[number], b: (typeof nodes)[number]) {
  const x1 = a.x + W
  const y1 = a.y + H / 2
  const x2 = b.x
  const y2 = b.y + H / 2
  const mx = (x1 + x2) / 2
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
}

export function FlowPreview() {
  const [step, setStep] = useState(-1)
  const running = step >= 0 && step < runPath.length

  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => setStep((s) => s + 1), 650)
    return () => clearTimeout(t)
  }, [step, running])

  const done = new Set(runPath.slice(0, Math.max(0, step + 1)))

  return (
    <div className="pv pv-flow">
      <div className="fl-bar">
        <span>
          <b>Enquiry → Booking</b> <em>n8n · active</em>
        </span>
        <button type="button" onClick={() => setStep(0)} disabled={running}>
          {running ? 'Running…' : step >= runPath.length ? 'Run again' : 'Test workflow'}
        </button>
      </div>
      <svg viewBox="0 0 820 270" className="fl-canvas" role="img" aria-label="Automation workflow diagram">
        <defs>
          <pattern id="fl-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className="fl-dot" />
          </pattern>
        </defs>
        <rect width="820" height="270" fill="url(#fl-dots)" />
        {edges.map(([a, b, label]) => {
          const active = done.has(a) && done.has(b)
          return (
            <g key={`${a}-${b}`}>
              <path d={edgePath(nodes[a], nodes[b])} className={`fl-edge ${active ? 'on' : ''}`} />
              {label && (
                <text
                  x={(nodes[a].x + W + nodes[b].x) / 2}
                  y={(nodes[a].y + nodes[b].y) / 2 + H / 2 + (label === 'true' ? -8 : 16)}
                  className="fl-elabel"
                  textAnchor="middle"
                >
                  {label}
                </text>
              )}
            </g>
          )
        })}
        {nodes.map((n, i) => (
          <g key={i} transform={`translate(${n.x},${n.y})`} className={`fl-node ${done.has(i) ? 'on' : ''}`}>
            <rect width={W} height={H} rx="8" />
            <text x="12" y="22" className="fl-kind">
              {n.kind}
            </text>
            <text x="12" y="42" className="fl-label">
              {n.label}
            </text>
            {done.has(i) && <circle cx={W - 12} cy="12" r="4" className="fl-ok" />}
          </g>
        ))}
      </svg>
      <ol className="fl-log" aria-live="polite">
        {step < 0 && <li className="muted">Press “Test workflow” to run with sample data.</li>}
        {log.slice(0, Math.max(0, step + 1)).map((l, i) => (
          <li key={i}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            {l}
          </li>
        ))}
      </ol>
    </div>
  )
}
