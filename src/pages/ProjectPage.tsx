import { useRef, type CSSProperties } from 'react'
import { projects } from '../content/projects'
import { tracks } from '../content/tracks'
import { Preview } from '../components/previews'
import { designs } from '../projects'
import { Link } from '../lib/router'
import { clamp01, Reveal, Scale, Title, useScrollFrame, Words } from '../lib/motion'

export function ProjectPage({ id }: { id: string }) {
  const index = projects.findIndex((p) => p.id === id)
  const p = projects[index]
  const hero = useRef<HTMLElement>(null)

  useScrollFrame(hero, (r) => {
    hero.current?.style.setProperty('--p', clamp01(-r.top / (r.height * 0.6)).toFixed(3))
  })

  if (!p) {
    return (
      <section className="nf">
        <h1>
          <Words parts={['Nothing ', 'here', '.']} />
        </h1>
        <Link to="/" className="btn">
          Back to the portfolio
        </Link>
      </section>
    )
  }

  const d = designs[p.id]
  const next = projects[(index + 1) % projects.length]
  const nd = designs[next.id]
  const vars = { '--hbg': d.hero.bg, '--hfg': d.hero.fg, '--hac': d.hero.accent } as CSSProperties
  const cover = d.screens[0]

  return (
    <article className="pp" style={vars}>
      <section className="pp-hero in" ref={hero}>
        <div className="pp-top">
          <Link to="/#work" label="All work" className="pp-back" data-magnetic>
            ← All work
          </Link>
          <span>
            Case study {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>
        <p className="pp-kicker">
          <span className="tag-concept-l">Concept build</span> {p.sector}
        </p>
        <h1 className="pp-title">
          <Words parts={[p.category]} delay={350} stagger={45} />
        </h1>
        <dl className="pp-meta">
          <div>
            <dt>Role</dt>
            <dd>{d.role}</dd>
          </div>
          <div>
            <dt>Services</dt>
            <dd>{p.tracks.map((t) => tracks.find((x) => x.id === t)?.label).join(', ')}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{p.stack.join(', ')}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{d.year}</dd>
          </div>
        </dl>
        <div className="pp-cover">
          <Scale width={cover.width ?? 1280}>{cover.render()}</Scale>
        </div>
      </section>

      <section className="pp-sec pp-brief">
        <div>
          <span className="sec-num">01 — The brief</span>
          <Title parts={[p.summary]} className="pp-lede" />
        </div>
        <div className="pp-cols">
          <Reveal>
            <p className="pp-body">{p.brief}</p>
          </Reveal>
          <Reveal delay={120}>
            <ol className="pp-approach">
              {p.approach.map((a, i) => (
                <li key={a}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {a}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="pp-sec pp-screens">
        <div className="pp-screens-head">
          <span className="sec-num">02 — The designs</span>
          <Title parts={[`${d.screens.length} screens, `, 'start to finish', '.']} className="pp-h2" />
        </div>
        {d.screens.map((s, i) => (
          <figure className="pp-shot" key={s.title}>
            <Reveal className="pp-shot-cap">
              <span className="pp-shot-n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.caption}</p>
              </div>
            </Reveal>
            <Reveal variant="scale" className="pp-shot-frame">
              <Scale width={s.width ?? 1280}>{s.render()}</Scale>
            </Reveal>
          </figure>
        ))}
      </section>

      <section className="pp-sec pp-live">
        <div>
          <span className="sec-num">03 — Live prototype</span>
          <Title parts={['Don’t just look — ', 'try it', '.']} className="pp-h2" />
          <p className="pp-body">This piece is interactive. Click, tap and change things — it behaves like the real build.</p>
          <div className="pp-shows">
            {p.shows.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
        <Reveal variant="scale" className="pp-live-stage">
          <Preview kind={p.preview} />
        </Reveal>
      </section>

      <Link
        to={`/work/${next.id}`}
        label={next.category}
        className="pp-next"
        data-cursor="Next"
        style={{ '--nbg': nd.hero.bg, '--nfg': nd.hero.fg, '--nac': nd.hero.accent } as CSSProperties}
      >
        <span className="sec-num">Next project</span>
        <b>{next.category}</b>
        <span className="pp-next-title">{next.sector}</span>
        <span className="pp-next-arrow" aria-hidden>
          →
        </span>
      </Link>
    </article>
  )
}
