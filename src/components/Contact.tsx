import { useEffect, useState, type ReactNode } from 'react'
import { profile } from '../content/profile'
import { tracks, trackById, type TrackId } from '../content/tracks'
import { Title } from '../lib/motion'

const budgets = ['Under ₱50k', '₱50k – 150k', '₱150k – 400k', '₱400k +', 'Monthly retainer']
const timings = ['As soon as possible', 'Within a month', 'Next quarter', 'Just exploring']

export function Contact({ lens }: { lens: TrackId | null }) {
  const [service, setService] = useState<string>(trackById(lens)?.label ?? '')
  const [budget, setBudget] = useState('')
  const [timing, setTiming] = useState('')
  const [note, setNote] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const t = trackById(lens)
    if (t) setService(t.label)
  }, [lens])

  const subject = `Project enquiry${service ? ` — ${service}` : ''}`
  const body = [
    `Service: ${service || '—'}`,
    `Budget: ${budget || '—'}`,
    `Timing: ${timing || '—'}`,
    '',
    note || 'A bit about the project:',
  ].join('\n')
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
    }
  }

  return (
    <section className="sec contact" id="contact">
      <div className="sec-head">
        <span className="sec-num">06 — Contact</span>
        <Title parts={["Let’s build something ", "worth showing", "."]} />
        <p>Answer three quick questions and your email app opens with a ready-to-send brief.</p>
      </div>

      <div className="ct-grid">
        <div className="ct-pitch">
          <p>I reply to every enquiry within one working day, with either next steps or an honest “not a fit”.</p>
          <div className="ct-direct">
            <a href={`mailto:${profile.email}`} className="ct-email">
              {profile.email}
            </a>
            <button type="button" className="link" onClick={copy}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <ul className="ct-links">
            {profile.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="ct-form" onSubmit={(e) => e.preventDefault()}>
          <Field label="What do you need?">
            {tracks.map((t) => (
              <Pill key={t.id} on={service === t.label} onClick={() => setService(t.label)}>
                {t.label}
              </Pill>
            ))}
          </Field>
          <Field label="Budget">
            {budgets.map((b) => (
              <Pill key={b} on={budget === b} onClick={() => setBudget(b)}>
                {b}
              </Pill>
            ))}
          </Field>
          <Field label="Timing">
            {timings.map((t) => (
              <Pill key={t} on={timing === t} onClick={() => setTiming(t)}>
                {t}
              </Pill>
            ))}
          </Field>
          <label className="ct-note">
            <span>Anything else? (optional)</span>
            <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Current setup, links, deadlines…" />
          </label>
          <a className="btn btn-lg" href={mailto} data-magnetic>
            Open email with this brief →
          </a>
        </form>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className="ct-field">
      <legend>{label}</legend>
      <div className="pills">{children}</div>
    </fieldset>
  )
}

function Pill({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className={`pill ${on ? 'on' : ''}`} aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  )
}
