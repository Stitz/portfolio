import { Browser, Input, Phone, PhoneRow, Spark, v } from '../components/mock/kit'
import type { Design } from './types'

const brand = v({
  '--bg': '#FFFFFF',
  '--fg': '#14213D',
  '--mute': '#6B7690',
  '--line': '#E3E8F0',
  '--soft': '#F3F6FA',
  '--acc': '#2457A6',
  '--acc-fg': '#FFFFFF',
  '--disp': "'Geist', sans-serif",
  '--r': '8px',
})

const PINK = '#EA4B71'

const N = { w: 168, h: 64 }
const nodes = [
  { id: 'wh', x: 40, y: 250, k: 'Webhook', l: 'Website enquiry', c: '#7B61FF' },
  { id: 'va', x: 250, y: 250, k: 'Code', l: 'Validate + clean', c: '#F59E0B' },
  { id: 'dd', x: 460, y: 250, k: 'GoHighLevel', l: 'Find contact', c: '#2457A6' },
  { id: 'if', x: 670, y: 250, k: 'IF', l: 'Bookable treatment?', c: '#10B981' },
  { id: 'op', x: 880, y: 130, k: 'GoHighLevel', l: 'Create opportunity', c: '#2457A6' },
  { id: 'sm', x: 1090, y: 130, k: 'Twilio', l: 'SMS booking link', c: '#E11D48' },
  { id: 'sl', x: 1090, y: 30, k: 'Slack', l: 'Notify front desk', c: '#4A154B' },
  { id: 'nu', x: 880, y: 370, k: 'GoHighLevel', l: 'Add to nurture', c: '#2457A6' },
  { id: 'em', x: 1090, y: 370, k: 'Email', l: 'Day-1 welcome', c: '#0EA5E9' },
  { id: 'er', x: 40, y: 470, k: 'Error Trigger', l: 'On any failure', c: '#EF4444' },
  { id: 'al', x: 250, y: 470, k: 'Slack', l: '#automation-alerts', c: '#4A154B' },
]
const links: [string, string, string?][] = [
  ['wh', 'va'],
  ['va', 'dd'],
  ['dd', 'if'],
  ['if', 'op', 'true'],
  ['if', 'nu', 'false'],
  ['op', 'sm'],
  ['op', 'sl'],
  ['nu', 'em'],
  ['er', 'al'],
]
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

function Canvas() {
  return (
    <svg viewBox="0 0 1300 560" width="1300" height="560" className="bl-canvas" aria-hidden>
      <defs>
        <pattern id="bl-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1.1" fill="#D5DBE5" />
        </pattern>
      </defs>
      <rect width="1300" height="560" fill="url(#bl-dots)" />
      {links.map(([a, b, lab]) => {
        const s = byId[a]
        const t = byId[b]
        const x1 = s.x + N.w
        const y1 = s.y + N.h / 2
        const x2 = t.x
        const y2 = t.y + N.h / 2
        const mx = (x1 + x2) / 2
        return (
          <g key={a + b}>
            <path d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} stroke="#9AA6BC" strokeWidth="2" fill="none" />
            <circle cx={x2} cy={y2} r="4" fill="#9AA6BC" />
            {lab && (
              <text x={mx} y={(y1 + y2) / 2 - 6} fontSize="11" fill="#6B7690" textAnchor="middle" fontFamily="Geist Mono">
                {lab}
              </text>
            )}
          </g>
        )
      })}
      {nodes.map((n) => (
        <g key={n.id} transform={`translate(${n.x},${n.y})`}>
          <rect width={N.w} height={N.h} rx="10" fill="#fff" stroke="#D5DBE5" strokeWidth="1.5" />
          <rect width="6" height={N.h} rx="3" fill={n.c} />
          <text x="18" y="25" fontSize="10.5" fill="#6B7690" fontFamily="Geist Mono" style={{ textTransform: 'uppercase' }}>
            {n.k}
          </text>
          <text x="18" y="45" fontSize="14" fill="#14213D" fontFamily="Geist" fontWeight="500">
            {n.l}
          </text>
          <circle cx={N.w - 14} cy="14" r="5" fill="#10B981" />
        </g>
      ))}
    </svg>
  )
}

export const design: Design = {
  hero: { bg: '#14213D', fg: '#F3F6FA', accent: PINK },
  brand,
  role: 'Process mapping, n8n + GoHighLevel build',
  year: '2026',
  screens: [
    {
      title: 'The workflow',
      caption: 'Eleven nodes, two paths and an error branch — every failure lands in Slack with the payload attached.',
      width: 1300,
      render: () => (
        <div className="mk bl-editor" style={brand}>
          <div className="bl-top">
            <b>Enquiry → Booking</b>
            <span className="bl-pill on">Active</span>
            <span className="mk-small">Last run 38s ago · 1,204 executions this month</span>
            <span style={{ marginLeft: 'auto' }} className="mk-btn" data-x>
              Test workflow
            </span>
          </div>
          <Canvas />
        </div>
      ),
    },
    {
      title: 'Booking page',
      caption: 'The form that starts it all: short, specific, and it tells patients exactly what happens next.',
      render: () => (
        <Browser url="brightlinedental.com/book">
          <div className="mk" style={brand}>
            <div className="mk-nav">
              <div className="mk-logo bl-logo">
                <i />
                Brightline Dental
              </div>
              <div className="mk-links">
                {['Treatments', 'Our team', 'Prices', 'Contact'].map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
              <span className="mk-btn">Book online</span>
            </div>
            <div className="g2" style={{ gridTemplateColumns: '1fr 1fr', gap: 64, padding: '64px 64px 72px', background: 'linear-gradient(180deg,#F3F6FA,#fff)' }}>
              <div className="stack" style={{ gap: 18 }}>
                <span className="mk-eyebrow" style={{ color: 'var(--acc)' }}>
                  New patients
                </span>
                <h1 className="mk-h1" style={{ fontSize: 60, fontWeight: 600, letterSpacing: '-0.03em' }}>
                  Book a consultation in under a minute.
                </h1>
                <p className="mk-p" style={{ fontSize: 17 }}>
                  Tell us what you need and we’ll text you a link to pick a time — usually within a minute, day or night.
                </p>
                <div className="stack" style={{ gap: 10, marginTop: 10 }}>
                  {['Instant text with available times', 'Reminders 24h and 2h before', 'Reschedule from the same link'].map((x) => (
                    <span key={x} className="bl-tick">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bl-form">
                <b className="mk-h3">Your details</b>
                <div className="g2" style={{ gap: 12 }}>
                  <Input label="First name" value="Maria" />
                  <Input label="Last name" value="Lopez" />
                </div>
                <Input label="Mobile" value="+64 21 555 0182" />
                <div className="stack" style={{ gap: 6 }}>
                  <span className="mk-label">What can we help with?</span>
                  <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
                    {['Check-up', 'Invisalign', 'Whitening', 'Implants', 'Emergency'].map((t, i) => (
                      <span key={t} className={`mk-chip ${i === 1 ? 'on' : ''}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="stack" style={{ gap: 6 }}>
                  <span className="mk-label">Best time</span>
                  <div className="g3" style={{ gap: 8 }}>
                    {['Mornings', 'Afternoons', 'Saturdays'].map((t, i) => (
                      <span key={t} className={`mk-chip c ${i === 2 ? 'on' : ''}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="mk-btn block acc">Send — we’ll text you times</span>
                <span className="mk-small" style={{ textAlign: 'center' }}>
                  No account needed · We never share your number
                </span>
              </div>
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'Patient messages',
      caption: 'The messages the workflow sends. Written like a person at the front desk would write them.',
      width: 1200,
      render: () => (
        <PhoneRow bg="#DDF1EA">
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="bl-thread-head">
                <span className="bl-avatar">B</span>
                <b>Brightline Dental</b>
              </div>
              <div className="bl-thread">
                <span className="bl-day">Today 11:47 pm</span>
                <span className="bl-msg">
                  Hi Maria, thanks for your Invisalign enquiry! Pick a consultation time here: brightl.in/b/7Kq2 — Brightline Dental
                </span>
                <span className="bl-msg me">Booked for Saturday 10am 🙂</span>
                <span className="bl-msg">
                  You’re booked: Sat 18 Oct, 10:00 with Dr. Patel. Reply C to confirm or R to reschedule.
                </span>
                <span className="bl-msg me">C</span>
                <span className="bl-day">Fri 9:00 am</span>
                <span className="bl-msg">Reminder: see you tomorrow at 10:00. Parking is free behind the clinic.</span>
              </div>
            </div>
          </Phone>
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="mk-mnav">
                <span>‹ Inbox</span>
                <span />
                <span>⋯</span>
              </div>
              <div className="stack" style={{ padding: '0 18px', gap: 12 }}>
                <b className="mk-h3">Welcome to Brightline — what to expect</b>
                <span className="mk-small">Brightline Dental · to Maria</span>
                <div className="bl-mailhero">
                  <i />
                  <b>Your first visit</b>
                </div>
                <p className="mk-p mk-small">
                  Hi Maria — your consultation is 45 minutes. We’ll take a 3D scan, talk through options and give you a
                  written quote. No pressure, no surprise fees.
                </p>
                <span className="mk-btn block acc">Add to calendar</span>
              </div>
            </div>
          </Phone>
        </PhoneRow>
      ),
    },
    {
      title: 'Pipeline in GoHighLevel',
      caption: 'Opportunities arrive already tagged with source and treatment — the front desk just works the board.',
      render: () => (
        <div className="mk bl-ghl" style={brand}>
          <div className="bl-ghl-side">
            <span className="bl-logo">
              <i />
            </span>
            {['▦', '☰', '◷', '✉', '◔', '⚙'].map((x, i) => (
              <span key={i} className={i === 1 ? 'on' : ''}>
                {x}
              </span>
            ))}
          </div>
          <div className="stack" style={{ flex: 1 }}>
            <div className="bl-top">
              <b>Opportunities</b>
              <span className="mk-select">Pipeline: New patients ▾</span>
              <span className="mk-small" style={{ marginLeft: 'auto' }}>
                38 open · ₱1.85M
              </span>
            </div>
            <div className="bl-board">
              {[
                ['New enquiry', '#94A3B8', [['Maria Lopez', 'Invisalign', 'Website', '38s']]],
                ['Link sent', '#F59E0B', [['Tom Reid', 'Implants', 'Google Ads', '2m'], ['Ana Silva', 'Check-up', 'Website', '1h']]],
                ['Booked', '#2457A6', [['Liam Chen', 'Whitening', 'Instagram', 'Sat 9:00'], ['Priya N.', 'Invisalign', 'Referral', 'Mon 14:30']]],
                ['Attended', '#10B981', [['Grace Ho', 'Implants', 'Website', 'Yesterday']]],
                ['Plan accepted', '#7B61FF', [['Ben Ward', 'Invisalign', 'Google Ads', '₱180,000']]],
              ].map(([stage, c, cards]) => (
                <div key={stage as string} className="bl-col">
                  <div className="bl-colhead" style={{ borderColor: c as string }}>
                    <b>{stage as string}</b>
                    <span>{(cards as string[][]).length}</span>
                  </div>
                  {(cards as string[][]).map(([n, t, s, w]) => (
                    <div key={n} className="bl-card">
                      <b>{n}</b>
                      <span className="mk-small">{t}</span>
                      <div className="between">
                        <span className="bl-src">{s}</span>
                        <span className="mk-small">{w}</span>
                      </div>
                      {s === 'Website' && w.endsWith('s') && <span className="bl-auto">⚡ created by automation</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Run monitor',
      caption: 'A one-page health view for the owner: what ran, what failed, what retried — and how fast leads got a reply.',
      render: () => (
        <div className="mk bl-mon" style={brand}>
          <div className="bl-top">
            <b>Automation health</b>
            <span className="mk-small">Last 7 days</span>
          </div>
          <div className="g4" style={{ gap: 16, padding: '20px 24px' }}>
            {[
              ['Enquiries handled', '214', [12, 18, 15, 22, 30, 26, 34]],
              ['Median first reply', '41s', [60, 52, 48, 45, 44, 42, 41]],
              ['Booked from link', '63%', [48, 51, 55, 54, 58, 61, 63]],
              ['Failed runs', '2', [1, 0, 0, 1, 0, 0, 0]],
            ].map(([k, n, s]) => (
              <div key={k as string} className="bl-kpi">
                <span className="mk-small">{k as string}</span>
                <b>{n as string}</b>
                <Spark values={s as number[]} w={220} h={44} fill color={k === 'Failed runs' ? '#EF4444' : '#2457A6'} />
              </div>
            ))}
          </div>
          <div style={{ padding: '0 24px 24px' }}>
            <div className="mk-table">
              <div className="th">
                <span>Started</span>
                <span>Workflow</span>
                <span>Trigger</span>
                <span>Duration</span>
                <span>Status</span>
              </div>
              {[
                ['23:47:12', 'Enquiry → Booking', 'Webhook', '1.8s', 'Success'],
                ['23:02:40', 'Reminder 24h', 'Schedule', '0.6s', 'Success'],
                ['21:15:03', 'Enquiry → Booking', 'Webhook', '4.1s', 'Retried'],
                ['18:30:00', 'Review request', 'Schedule', '2.2s', 'Success'],
                ['16:44:51', 'Enquiry → Booking', 'Webhook', '—', 'Error'],
                ['16:45:20', 'Enquiry → Booking', 'Manual retry', '1.9s', 'Success'],
              ].map((r) => (
                <div key={r[0]} className="tr">
                  {r.map((c, i) => (
                    <span key={i} className={i === 4 ? `bl-st ${c.toLowerCase()}` : ''}>
                      {c}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ],
}
