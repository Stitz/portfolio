import type { ReactNode } from 'react'
import { Art, Browser, Phone, PhoneRow, Spark, v } from '../components/mock/kit'
import type { Design } from './types'

const brand = v({
  '--bg': '#F6F2EA',
  '--fg': '#22201C',
  '--mute': '#77705F',
  '--line': '#E2DACB',
  '--soft': '#EDE6D8',
  '--acc': '#4E5B3A',
  '--acc-fg': '#FFFFFF',
  '--disp': "'Instrument Serif', serif",
  '--r': '999px',
  '--r-img': '12px',
})

const TERRA = '#C8643B'
const OLIVE = '#4E5B3A'

const logo = (
  <span className="cv-logo">
    <i />
    Casa Verde
  </span>
)

const homes = [
  { a: '14 Rosa St, Northcote', d: '2 bed · 1 bath · 78 m²', p: '₱8,500,000', t: '#C8643B' },
  { a: '3/22 Albert Rd, Kingsland', d: '2 bed · 2 bath · 84 m²', p: '₱8,900,000', t: '#8C9A6E' },
  { a: '7 Wren Lane, Grey Lynn', d: '3 bed · 2 bath · 132 m²', p: '₱15.5M', t: '#B88E5A' },
  { a: '41 Hill Tce, Mt Eden', d: '4 bed · 2 bath · 180 m²', p: '₱21M', t: '#6E7F8C' },
]

function Bubble({ me, children }: { me?: boolean; children: ReactNode }) {
  return <div className={`cv-msg ${me ? 'me' : ''}`}>{children}</div>
}

function ToolChip({ children }: { children: ReactNode }) {
  return <span className="cv-tool">⚙ {children}</span>
}

function ListingMini({ h }: { h: (typeof homes)[number] }) {
  return (
    <div className="cv-mini">
      <Art tone={h.t} shape="house" h={64} w={72} radius={8} />
      <div className="stack">
        <b>{h.p}</b>
        <span>{h.a}</span>
        <span className="mk-small">{h.d}</span>
      </div>
    </div>
  )
}

function AgentCanvas() {
  const node = (x: number, y: number, w: number, k: string, l: string, c: string) => (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height="64" rx="10" fill="#fff" stroke="#D5D0C4" strokeWidth="1.5" />
      <rect width="6" height="64" rx="3" fill={c} />
      <text x="18" y="25" fontSize="10.5" fill="#77705F" fontFamily="Geist Mono">
        {k.toUpperCase()}
      </text>
      <text x="18" y="45" fontSize="14" fill="#22201C" fontFamily="Geist" fontWeight="500">
        {l}
      </text>
    </g>
  )
  const sub = (cx: number, label: string, kind: string, c: string) => (
    <g>
      <path d={`M${cx} 300 V376`} stroke="#B9B2A3" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx={cx} cy="410" r="32" fill="#fff" stroke={c} strokeWidth="2" />
      <text x={cx} y="414" textAnchor="middle" fontSize="18" fill={c}>
        {kind}
      </text>
      <text x={cx} y="462" textAnchor="middle" fontSize="12" fill="#22201C" fontFamily="Geist" fontWeight="500">
        {label}
      </text>
    </g>
  )
  return (
    <svg viewBox="0 0 1280 520" width="1280" height="520" aria-hidden>
      <defs>
        <pattern id="cv-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1.1" fill="#DDD6C8" />
        </pattern>
      </defs>
      <rect width="1280" height="520" fill="url(#cv-dots)" />
      {node(40, 120, 190, 'Chat trigger', 'Website chat', '#7B61FF')}
      {node(40, 250, 190, 'Webhook', 'Messaging channel', '#0EA5E9')}
      <path d="M230 152 C290 152 290 230 360 230 M230 282 C290 282 290 240 360 240" stroke="#9A9384" strokeWidth="2" fill="none" />
      <g transform="translate(360,170)">
        <rect width="420" height="130" rx="14" fill="#fff" stroke={OLIVE} strokeWidth="2.5" />
        <rect width="420" height="40" rx="14" fill={OLIVE} />
        <rect y="26" width="420" height="14" fill={OLIVE} />
        <text x="20" y="26" fontSize="13" fill="#fff" fontFamily="Geist Mono">
          AI AGENT · “Vera”
        </text>
        <text x="20" y="72" fontSize="15" fill="#22201C" fontFamily="Geist" fontWeight="500">
          Answer from listings + FAQ. Book viewings.
        </text>
        <text x="20" y="96" fontSize="13" fill="#77705F" fontFamily="Geist">
          Hand off on price negotiation, complaints, legal.
        </text>
      </g>
      {sub(400, 'Chat model', '✦', '#7B61FF')}
      {sub(480, 'Memory', '◷', '#0EA5E9')}
      {sub(580, 'search_listings', '⌕', TERRA)}
      {sub(660, 'check_calendar', '▦', TERRA)}
      {sub(740, 'book_viewing', '✓', TERRA)}
      <path d="M780 235 H860" stroke="#9A9384" strokeWidth="2" />
      {node(860, 140, 190, 'IF', 'Needs a human?', '#10B981')}
      {node(860, 270, 190, 'Respond', 'Reply to chat', '#7B61FF')}
      <path d="M860 235 C840 235 840 172 860 172 M860 235 C840 235 840 302 860 302" stroke="#9A9384" strokeWidth="2" fill="none" />
      {node(1070, 80, 180, 'Slack', 'Ping agent on duty', '#4A154B')}
      {node(1070, 200, 180, 'CRM', 'Create / update lead', '#2457A6')}
      <path d="M1050 172 C1060 172 1060 112 1070 112 M1050 172 C1060 172 1060 232 1070 232" stroke="#9A9384" strokeWidth="2" fill="none" />
      <text x="1072" y="330" fontSize="11" fill="#77705F" fontFamily="Geist Mono">
        Schedule 07:30 → morning summary
      </text>
    </svg>
  )
}

export const design: Design = {
  hero: { bg: '#2B2A22', fg: '#F6F2EA', accent: '#E08A5E' },
  brand,
  role: 'Conversation design, n8n AI agent, chat widget',
  year: '2026',
  screens: [
    {
      title: 'Website + chat assistant',
      caption: 'The assistant lives on every page. It answers from live listings and shows homes right in the conversation.',
      render: () => (
        <Browser url="casaverde.co.nz">
          <div className="mk" style={{ ...brand, position: 'relative', height: 800, overflow: 'hidden' }}>
            <div className="mk-nav">
              <div className="mk-logo">{logo}</div>
              <div className="mk-links">
                {['Buy', 'Rent', 'Sell', 'Our agents', 'Journal'].map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
              <span className="mk-btn acc">Book a valuation</span>
            </div>
            <div className="cv-hero">
              <div className="stack" style={{ gap: 18, maxWidth: 520 }}>
                <span className="mk-eyebrow">Inner-west homes · 42 listed</span>
                <h1 className="mk-h1" style={{ fontSize: 78 }}>
                  Find the one that <em style={{ color: TERRA }}>feels like home.</em>
                </h1>
                <div className="cv-search">
                  <span>Northcote, Kingsland…</span>
                  <span>2+ beds</span>
                  <span>Up to ₱10M</span>
                  <b>Search</b>
                </div>
              </div>
              <Art tone={TERRA} shape="house" h={420} w={360} bg="#EAD9C7" radius={18} />
            </div>
            <div className="g4" style={{ padding: '0 40px', gap: 18 }}>
              {homes.map((h) => (
                <div key={h.a} className="stack" style={{ gap: 6 }}>
                  <Art tone={h.t} shape="house" h={150} />
                  <b>{h.p}</b>
                  <span className="mk-small">{h.a}</span>
                </div>
              ))}
            </div>
            <div className="cv-widget">
              <div className="cv-whead">
                <span className="cv-avatar">V</span>
                <div className="stack">
                  <b>Vera · Casa Verde</b>
                  <span>Virtual assistant · replies instantly</span>
                </div>
              </div>
              <div className="cv-wbody">
                <Bubble>Hi! I’m Vera. Ask me about any of our homes, or book a viewing.</Bubble>
                <Bubble me>Any 2-bed places under ₱9M near the city?</Bubble>
                <ToolChip>search_listings · beds ≥ 2 · max ₱9M</ToolChip>
                <Bubble>
                  Two match right now:
                  <ListingMini h={homes[0]} />
                  <ListingMini h={homes[1]} />
                  Want me to book a viewing for either?
                </Bubble>
              </div>
              <div className="cv-chips">
                <span>Book 14 Rosa St</span>
                <span>Open homes this weekend</span>
              </div>
              <div className="cv-input">Type a message…</div>
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'Messaging channel',
      caption: 'Same brain on the messaging app. It books into the agent’s calendar — and knows when to bring a person in.',
      width: 1200,
      render: () => (
        <PhoneRow bg="#DCD3C2">
          <Phone>
            <div className="mk mk-m cv-chat" style={brand}>
              <div className="cv-phead">
                <span className="cv-avatar">V</span>
                <div className="stack">
                  <b>Casa Verde</b>
                  <span>Assistant · online</span>
                </div>
              </div>
              <div className="cv-thread">
                <span className="cv-day">Sat 9:12 pm</span>
                <Bubble me>Can I see 14 Rosa St this weekend?</Bubble>
                <ToolChip>check_calendar · Marco · Sun</ToolChip>
                <Bubble>Marco has Sunday 10:30 or 1:00 free. Which suits you?</Bubble>
                <Bubble me>10:30 please</Bubble>
                <ToolChip>book_viewing · Sun 10:30</ToolChip>
                <Bubble>
                  Booked ✓ Sunday 10:30 at 14 Rosa St with Marco. I’ve sent a calendar invite and the floor plan.
                </Bubble>
              </div>
            </div>
          </Phone>
          <Phone>
            <div className="mk mk-m cv-chat" style={brand}>
              <div className="cv-phead">
                <span className="cv-avatar">V</span>
                <div className="stack">
                  <b>Casa Verde</b>
                  <span>Assistant · online</span>
                </div>
              </div>
              <div className="cv-thread">
                <Bubble me>Would the owners take ₱8M?</Bubble>
                <ToolChip>handoff · reason: price negotiation</ToolChip>
                <Bubble>
                  That’s a question for Marco, not me — I’ve passed him our chat so he has the context. He usually replies
                  within 15 minutes.
                </Bubble>
                <span className="cv-sys">Marco joined the conversation</span>
                <div className="cv-msg agent">
                  <b>Marco · Agent</b>
                  Hi Sam! Happy to talk numbers. Are you free for a quick call after the viewing on Sunday?
                </div>
              </div>
              <div className="cv-pinput">Message…</div>
            </div>
          </Phone>
        </PhoneRow>
      ),
    },
    {
      title: 'The n8n AI agent',
      caption: 'Two channels, one agent. Its tools are real actions — search, check, book — and every reply passes a handoff check.',
      render: () => (
        <div className="mk" style={brand}>
          <div className="cv-edtop">
            <b>Vera — virtual assistant</b>
            <span className="bl-pill">Active</span>
            <span className="mk-small">2 triggers · 5 tools · last run 14s ago</span>
          </div>
          <AgentCanvas />
        </div>
      ),
    },
    {
      title: 'Knowledge & guardrails',
      caption: 'The team edits listings and rules in plain language — and can test the assistant before anything goes live.',
      render: () => (
        <div className="mk cv-admin" style={brand}>
          <div className="cv-edtop">
            <b>Assistant settings</b>
            <span className="mk-small">Knowledge · Rules · Test</span>
          </div>
          <div className="g2" style={{ gridTemplateColumns: '1.3fr 1fr', gap: 20, padding: 24 }}>
            <div className="stack" style={{ gap: 14 }}>
              <div className="between">
                <b className="mk-h3">Listings (synced from Google Sheets)</b>
                <span className="mk-small">Updated 6 min ago</span>
              </div>
              <div className="mk-table">
                <div className="th">
                  <span>Address</span>
                  <span>Beds</span>
                  <span>Price</span>
                  <span>Status</span>
                </div>
                {homes.map((h, i) => (
                  <div className="tr" key={h.a}>
                    <span>{h.a}</span>
                    <span>{h.d.split(' ')[0]}</span>
                    <span>{h.p}</span>
                    <span className={`bl-st ${i === 2 ? 'retried' : 'success'}`}>{i === 2 ? 'Under offer' : 'Available'}</span>
                  </div>
                ))}
              </div>
              <b className="mk-h3" style={{ marginTop: 8 }}>
                FAQ the assistant can use
              </b>
              {['What are your open-home times?', 'Do you handle rentals?', 'How do I get a valuation?'].map((q) => (
                <div key={q} className="cv-faq">
                  <span>{q}</span>
                  <span className="mk-small">Edit</span>
                </div>
              ))}
            </div>
            <div className="stack" style={{ gap: 14 }}>
              <div className="cv-rules">
                <b className="mk-h3">Rules</b>
                {[
                  ['Tone', 'Warm, brief, no jargon. First name once known.'],
                  ['Only answer from', 'Listings sheet + FAQ. Never guess prices.'],
                  ['Hand to a person', 'Negotiation · complaints · legal · anything unsure'],
                  ['Agent hours', 'Mon–Sat 8:00–18:00 · after hours → book a callback'],
                ].map(([a, b]) => (
                  <div key={a} className="cv-rule">
                    <span className="mk-label">{a}</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <div className="cv-test">
                <span className="mk-label">Test console</span>
                <div className="cv-msg me">Is 7 Wren Lane still available?</div>
                <ToolChip>search_listings · 7 Wren Lane</ToolChip>
                <div className="cv-msg">It’s under offer at the moment — want me to tell you if it comes back?</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Morning summary',
      caption: 'What the assistant did overnight, waiting in the team’s inbox at 7:30 — with the chats that need a human first.',
      render: () => (
        <div className="mk cv-admin" style={brand}>
          <div className="cv-edtop">
            <b>Assistant overview</b>
            <span className="mk-small">Last 7 days</span>
          </div>
          <div className="g4" style={{ gap: 16, padding: '20px 24px' }}>
            {[
              ['Conversations', '86', [8, 11, 9, 14, 12, 15, 17]],
              ['Outside office hours', '61%', [55, 58, 60, 57, 62, 64, 61]],
              ['Viewings booked', '14', [1, 2, 1, 3, 2, 2, 3]],
              ['Handed to an agent', '9', [2, 1, 1, 2, 1, 1, 1]],
            ].map(([k, n, s]) => (
              <div key={k as string} className="bl-kpi">
                <span className="mk-small">{k as string}</span>
                <b>{n as string}</b>
                <Spark values={s as number[]} w={220} h={44} fill color={OLIVE} />
              </div>
            ))}
          </div>
          <div className="g2" style={{ gridTemplateColumns: '1.3fr 1fr', gap: 20, padding: '0 24px 24px' }}>
            <div className="mk-table">
              <div className="th">
                <span>When</span>
                <span>Channel</span>
                <span>Intent</span>
                <span>Outcome</span>
              </div>
              {[
                ['21:12', 'Messaging', 'Viewing', 'Booked Sun 10:30'],
                ['21:40', 'Messaging', 'Price', 'Handed to Marco'],
                ['22:05', 'Web chat', 'Search', '2 listings sent'],
                ['23:51', 'Web chat', 'Valuation', 'Callback Mon 9:00'],
                ['06:58', 'Web chat', 'Rentals', 'Answered from FAQ'],
              ].map((r) => (
                <div className="tr" key={r[0]}>
                  {r.map((c, i) => (
                    <span key={i} className={i === 0 ? 'mono' : ''}>
                      {c}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="cv-email">
              <span className="mk-small">To: team@casaverde · 07:30</span>
              <b className="mk-h3">Overnight: 11 chats, 3 viewings, 1 needs you</b>
              <p className="mk-p">
                <b style={{ color: 'var(--fg)' }}>Needs a reply:</b> Sam (14 Rosa St) asked about price — Marco is on it.
              </p>
              <p className="mk-p">Booked: Sun 10:30 Rosa St · Sun 1:00 Albert Rd · Mon 9:00 valuation callback.</p>
              <span className="mk-btn acc" style={{ alignSelf: 'start' }}>
                Open conversations
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ],
}
