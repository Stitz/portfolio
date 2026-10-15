import type { ReactNode } from 'react'
import { Bars, Browser, Phone, PhoneRow, v } from '../components/mock/kit'
import type { Design } from './types'

const brand = v({
  '--bg': '#F7F6F2',
  '--fg': '#1F2933',
  '--mute': '#6A7380',
  '--line': '#E4E2DB',
  '--soft': '#EFEDE6',
  '--acc': '#E2A03F',
  '--acc-fg': '#1F2933',
  '--disp': "'Bricolage Grotesque', sans-serif",
  '--r': '8px',
})

function Shell({ active, children, title, actions }: { active: string; title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mk fw-app" style={brand}>
      <aside className="fw-side">
        <div className="fw-brand">
          <span className="fw-sun" />
          Fieldwork
        </div>
        {['Dashboard', 'Pipeline', 'Jobs', 'Surveys', 'Customers', 'Reports', 'Settings'].map((x) => (
          <span key={x} className={x === active ? 'on' : ''}>
            {x}
          </span>
        ))}
        <div className="fw-me">
          <span className="fw-av">KM</span>
          <div className="stack">
            <b>Kai Moana</b>
            <span>Sales lead</span>
          </div>
        </div>
      </aside>
      <main className="fw-main">
        <div className="fw-top">
          <h1 className="mk-h2">{title}</h1>
          <div className="fw-search">⌕ Search jobs, customers, addresses</div>
          {actions}
        </div>
        {children}
      </main>
    </div>
  )
}

const stages = [
  { n: 'Enquiry', c: '#94A3B8', jobs: [['Okafor residence', '6.6 kW', '₱390k', 'Web form'], ['Greenway Café', '15 kW', '₱850k', 'Referral'], ['Hill St units', '24 kW', '₱1.3M', 'Phone']] },
  { n: 'Qualified', c: '#4F86C6', jobs: [['Tan family', '8.2 kW', '₱470k', 'Calculator'], ['Rua Marae', '30 kW', '₱1.6M', 'Web form']] },
  { n: 'Site survey', c: '#8A6BC2', jobs: [['Northside Storage', '40 kW', '₱2.1M', 'Survey Thu'], ['Patel home', '9 kW', '₱500k', 'Survey Fri']] },
  { n: 'Proposal', c: '#E2A03F', jobs: [['Bay Vets', '18 kW', '₱960k', 'Sent 2d ago']] },
  { n: 'Signed', c: '#2F9E5F', jobs: [['Reyes duplex', '10 kW', '₱570k', 'Install 3 Nov'], ['Lime Cycles', '12 kW', '₱670k', 'Deposit paid']] },
]

export const design: Design = {
  hero: { bg: '#1F2933', fg: '#F7F6F2', accent: '#E2A03F' },
  brand,
  role: 'Workshop facilitation, CRM design, React build',
  year: '2026',
  screens: [
    {
      title: 'Dashboard',
      caption: 'The owner’s Monday view: pipeline value, this week’s surveys, and what got signed.',
      render: () => (
        <Shell active="Dashboard" title="Good morning, Kai" actions={<span className="mk-btn acc">+ New job</span>}>
          <div className="g4" style={{ gap: 16 }}>
            {[
              ['Open pipeline', '₱8.7M', '+12% vs last month'],
              ['Surveys this week', '7', '3 today'],
              ['Signed this month', '4', '₱2.5M'],
              ['Avg. days to sign', '18', '−5 days'],
            ].map(([a, b, c]) => (
              <div key={a} className="fw-kpi">
                <span className="mk-small">{a}</span>
                <b>{b}</b>
                <span className="fw-delta">{c}</span>
              </div>
            ))}
          </div>
          <div className="g2" style={{ gridTemplateColumns: '1.4fr 1fr', gap: 16, marginTop: 16 }}>
            <div className="fw-panel">
              <div className="between">
                <b>Signed kW by month</b>
                <span className="mk-small">2026</span>
              </div>
              <Bars values={[30, 42, 38, 55, 48, 62, 70, 58, 76, 84]} labels={['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O']} h={200} />
            </div>
            <div className="fw-panel">
              <b>Upcoming surveys</b>
              {[
                ['Today 10:00', 'Northside Storage', '14 Quay Rd'],
                ['Today 14:30', 'Patel home', '8 Kowhai St'],
                ['Thu 09:00', 'Rua Marae', 'SH2, Te Puke'],
                ['Fri 11:00', 'Hill St units', '22 Hill St'],
              ].map(([t, n, a]) => (
                <div key={n} className="fw-row">
                  <span className="fw-time">{t}</span>
                  <div className="stack">
                    <b>{n}</b>
                    <span className="mk-small">{a}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      ),
    },
    {
      title: 'Pipeline',
      caption: 'Stages named after what happens on site. Every card shows size, value and the next thing it needs.',
      render: () => (
        <Shell active="Pipeline" title="Pipeline" actions={<span className="mk-select">All installers ▾</span>}>
          <div className="fw-board">
            {stages.map((s) => (
              <div key={s.n} className="fw-col">
                <div className="fw-colhead" style={{ borderColor: s.c }}>
                  <b>{s.n}</b>
                  <span>{s.jobs.length}</span>
                </div>
                {s.jobs.map(([n, kw, val, nx]) => (
                  <div key={n} className="fw-card">
                    <b>{n}</b>
                    <div className="between mk-small">
                      <span>{kw}</span>
                      <span>{val}</span>
                    </div>
                    <span className="fw-next">{nx}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Shell>
      ),
    },
    {
      title: 'Job record',
      caption: 'Everything about one job on one page — system design, documents, people and a full activity trail.',
      render: () => (
        <Shell active="Jobs" title="Northside Storage" actions={<span className="mk-btn acc">Move to Proposal →</span>}>
          <div className="fw-stepper">
            {['Enquiry', 'Qualified', 'Site survey', 'Proposal', 'Signed', 'Installed'].map((s, i) => (
              <span key={s} className={i < 2 ? 'done' : i === 2 ? 'now' : ''}>
                {s}
              </span>
            ))}
          </div>
          <div className="g2" style={{ gridTemplateColumns: '1.3fr 1fr', gap: 16, marginTop: 16 }}>
            <div className="stack" style={{ gap: 16 }}>
              <div className="fw-panel">
                <b>System</b>
                <div className="g3" style={{ gap: 12, marginTop: 10 }}>
                  {[
                    ['Size', '40 kW'],
                    ['Panels', '92 × 440 W'],
                    ['Inverter', '2 × 20 kW'],
                    ['Roof', 'Long-run iron'],
                    ['Est. yield', '58 MWh/yr'],
                    ['Value', '₱2,080,000'],
                  ].map(([a, b]) => (
                    <div key={a} className="stack">
                      <span className="mk-small">{a}</span>
                      <b>{b}</b>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fw-panel">
                <b>Documents</b>
                {['Site photos (24)', 'Roof plan v2.pdf', 'Load profile.csv', 'Proposal draft.pdf'].map((d) => (
                  <div key={d} className="fw-doc">
                    <span className="fw-file" />
                    {d}
                  </div>
                ))}
              </div>
            </div>
            <div className="fw-panel">
              <b>Activity</b>
              {[
                ['Today 10:42', 'Survey completed by Rangi — 24 photos uploaded'],
                ['Today 08:10', 'Reminder SMS sent to site contact'],
                ['Mon 15:22', 'Moved to Site survey by Kai'],
                ['Mon 09:05', 'Call logged — wants payback under 6 years'],
                ['12 Oct', 'Enquiry via savings calculator'],
              ].map(([t, a]) => (
                <div key={t} className="fw-act">
                  <i />
                  <div className="stack">
                    <span>{a}</span>
                    <span className="mk-small">{t}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      ),
    },
    {
      title: 'Lead capture site',
      caption: 'The savings calculator on the public site feeds the CRM directly — leads arrive pre-sized and qualified.',
      render: () => (
        <Browser url="fieldworksolar.co">
          <div className="mk" style={{ ...brand, background: '#1F2933', color: '#F7F6F2' }}>
            <div className="mk-nav" style={{ borderColor: '#ffffff1a' }}>
              <div className="fw-brand" style={{ color: '#fff' }}>
                <span className="fw-sun" />
                Fieldwork Solar
              </div>
              <div className="mk-links" style={{ color: '#ffffffaa' }}>
                {['Homes', 'Business', 'Batteries', 'Our work'].map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
              <span className="mk-btn acc">Free site survey</span>
            </div>
            <div className="g2" style={{ gridTemplateColumns: '1.1fr 1fr', gap: 56, padding: '72px 56px 80px', alignItems: 'center' }}>
              <div className="stack" style={{ gap: 20 }}>
                <h1 className="mk-h1" style={{ fontSize: 76, fontWeight: 700, letterSpacing: '-0.03em' }}>
                  Your roof could pay your <span style={{ color: 'var(--acc)' }}>power bill.</span>
                </h1>
                <p style={{ fontSize: 18, opacity: 0.7, maxWidth: 440 }}>
                  Local installers, real site surveys, and a straight answer on payback before you spend a cent.
                </p>
              </div>
              <div className="fw-calc">
                <b className="mk-h3">Estimate your savings</b>
                <div className="stack" style={{ gap: 8 }}>
                  <div className="between">
                    <span className="mk-label">Monthly power bill</span>
                    <b>₱11,000</b>
                  </div>
                  <span className="sl-range">
                    <i style={{ width: '46%', background: 'var(--acc)' }} />
                  </span>
                </div>
                <div className="stack" style={{ gap: 8 }}>
                  <span className="mk-label">Roof facing</span>
                  <div className="g4" style={{ gap: 6 }}>
                    {['North', 'East', 'West', 'Flat'].map((x, i) => (
                      <span key={x} className={`mk-chip c ${i === 0 ? 'on' : ''}`}>
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="fw-result">
                  <div className="stack">
                    <span className="mk-small">Suggested system</span>
                    <b>8.2 kW</b>
                  </div>
                  <div className="stack">
                    <span className="mk-small">Est. yearly saving</span>
                    <b>₱85,000</b>
                  </div>
                  <div className="stack">
                    <span className="mk-small">Payback</span>
                    <b>5.6 yrs</b>
                  </div>
                </div>
                <span className="mk-btn block acc">Book my free survey →</span>
              </div>
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'Surveyor app',
      caption: 'Built for a ladder: big targets, works offline, photos attach straight to the job record.',
      width: 1200,
      render: () => (
        <PhoneRow bg="#E2A03F">
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="stack" style={{ padding: '8px 18px', gap: 4 }}>
                <span className="mk-small">Thursday · 3 surveys</span>
                <h2 className="mk-h1" style={{ fontSize: 28, fontWeight: 700 }}>
                  Today’s route
                </h2>
              </div>
              <div className="stack" style={{ padding: 14, gap: 10 }}>
                {[
                  ['10:00', 'Northside Storage', '14 Quay Rd · 40 kW', 'Next'],
                  ['14:30', 'Patel home', '8 Kowhai St · 9 kW', ''],
                  ['16:00', 'Bay Vets', '3 Marine Pde · 18 kW', ''],
                ].map(([t, n, d, s]) => (
                  <div key={n} className={`fw-mcard ${s ? 'next' : ''}`}>
                    <span className="fw-time">{t}</span>
                    <div className="stack">
                      <b>{n}</b>
                      <span className="mk-small">{d}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mk-sticky">
                <span className="mk-btn block acc">Start navigation</span>
              </div>
            </div>
          </Phone>
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="mk-mnav">
                <span>←</span>
                <b>Survey · Northside</b>
                <span className="mk-small">3/6</span>
              </div>
              <div className="stack" style={{ padding: 14, gap: 12 }}>
                <b>Roof photos</b>
                <div className="g3" style={{ gap: 6 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="fw-photo" style={{ filter: `hue-rotate(${i * 12}deg)` }} />
                  ))}
                  <span className="fw-photo add">＋</span>
                </div>
                {[
                  ['Roof pitch measured', true],
                  ['Switchboard photo', true],
                  ['Shading check (AM/PM)', true],
                  ['Inverter location agreed', false],
                ].map(([l, ok]) => (
                  <span key={l as string} className="mk-check lg">
                    <i className={ok ? 'on' : ''} />
                    {l as string}
                  </span>
                ))}
              </div>
              <div className="mk-sticky">
                <span className="mk-btn block">Save · syncs when online</span>
              </div>
            </div>
          </Phone>
        </PhoneRow>
      ),
    },
  ],
}
