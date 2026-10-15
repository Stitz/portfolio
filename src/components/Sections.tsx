import { experience, skills } from '../content/profile'
import { projects } from '../content/projects'
import { tracks, trackById, type TrackId } from '../content/tracks'
import { Link } from '../lib/router'
import { Reveal, Title } from '../lib/motion'

function Head({ num, parts, sub }: { num: string; parts: string[]; sub: string }) {
  return (
    <div className="sec-head">
      <span className="sec-num">{num}</span>
      <Title parts={parts} />
      <Reveal delay={200}>
        <p>{sub}</p>
      </Reveal>
    </div>
  )
}

export function Services({ lens, onLens }: { lens: TrackId | null; onLens: (id: TrackId) => void }) {
  const active = trackById(lens)
  const related = active ? projects.filter((p) => p.tracks.includes(active.id)) : []

  return (
    <section className="sec" id="services">
      <Head
        num="02 — Services"
        parts={active ? ['What you ', 'get', '.'] : ['Six ways I can ', 'help', '.']}
        sub="Fixed scope, a clear timeline, and documentation you keep. No retainers unless you want one."
      />

      {active ? (
        <div className="svc-detail">
          <Reveal>
            <span className="svc-idx">{active.index}</span>
            <h3>{active.label}</h3>
            <dl className="svc-facts">
              <div>
                <dt>Typical timeline</dt>
                <dd>{active.timeline}</dd>
              </div>
              <div>
                <dt>Usual stack</dt>
                <dd>{active.stack.join(', ')}</dd>
              </div>
              <div>
                <dt>See it in practice</dt>
                <dd className="svc-related">
                  {related.map((p) => (
                    <Link key={p.id} to={`/work/${p.id}`} label={p.category} className="link">
                      {p.category} ↗
                    </Link>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
          <ol className="svc-list">
            {active.deliverables.map((d, i) => (
              <Reveal key={d} delay={i * 70}>
                <li>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {d}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      ) : (
        <div className="svc-table" role="list">
          {tracks.map((t, i) => (
            <Reveal key={t.id} delay={i * 60}>
              <button type="button" role="listitem" className="svc-row" onClick={() => onLens(t.id)} data-cursor="Focus">
                <span className="svc-idx">{t.index}</span>
                <span className="svc-name">{t.label}</span>
                <span className="svc-stack">{t.stack.join(' · ')}</span>
                <span className="svc-time">{t.timeline}</span>
                <span className="svc-go" aria-hidden>
                  →
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}

export function Experience({ lens }: { lens: TrackId | null }) {
  return (
    <section className="sec" id="experience">
      <Head
        num="03 — Experience"
        parts={['Where I’ve ', 'been', '.']}
        sub="Built on years of keeping production systems running — careful changes, monitoring, and documentation you can hand over."
      />
      <ol className="xp">
        {experience.map((r) => {
          const dim = lens !== null && !r.tracks.includes(lens)
          return (
            <Reveal key={r.role + r.period}>
              <li className={`xp-row ${dim ? 'dim' : ''}`}>
                <span className="xp-period">{r.period}</span>
                <div className="xp-main">
                  <h3>{r.role}</h3>
                  <p className="xp-org">{r.org}</p>
                  <p>{r.summary}</p>
                  <ul className="plain">
                    {r.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          )
        })}
      </ol>
    </section>
  )
}

export function Skills({ lens }: { lens: TrackId | null }) {
  const ordered = lens ? [...skills].sort((a, b) => Number(b.tracks.includes(lens)) - Number(a.tracks.includes(lens))) : skills

  return (
    <section className="sec" id="skills">
      <Head num="04 — Skills" parts={['The ', 'toolkit', '.']} sub="What I reach for, grouped by the kind of problem it solves." />
      <div className="sk-grid">
        {ordered.map((g, i) => {
          const dim = lens !== null && !g.tracks.includes(lens)
          return (
            <Reveal key={g.id} delay={(i % 3) * 90} className={`sk ${dim ? 'dim' : ''}`}>
              <h3>{g.name}</h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

const steps = [
  ['Discovery call', '30 minutes to understand the business, the goal and the constraints. You leave with honest advice, even if it’s “you don’t need me”.'],
  ['Scope & quote', 'A written scope with deliverables, timeline and a fixed price. Nothing starts until you’ve signed off.'],
  ['Build in the open', 'Weekly demos on a staging link or lab. You see progress early, while changes are still cheap.'],
  ['Launch & handover', 'Go-live, recorded walkthroughs and written docs. Two weeks of support included.'],
]

export function Process() {
  return (
    <section className="sec" id="process">
      <Head num="05 — Process" parts={['How a project ', 'runs', '.']} sub="The same four steps whether it’s a storefront, an app or an AI assistant." />
      <ol className="steps">
        {steps.map(([t, d], i) => (
          <Reveal key={t} delay={i * 110}>
            <li>
              <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
