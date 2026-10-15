import { useEffect, useRef, useState } from 'react'
import { Art } from '../mock/kit'

type Msg =
  | { from: 'me' | 'bot'; text: string; homes?: boolean }
  | { from: 'tool' | 'sys'; text: string }

const replies: Record<string, Msg[]> = {
  'Any 2-bed homes under ₱9M?': [
    { from: 'tool', text: 'search_listings · beds ≥ 2 · max ₱9M' },
    { from: 'bot', text: 'Two match right now:', homes: true },
    { from: 'bot', text: 'Want me to book a viewing for either?' },
  ],
  'Can I view 14 Rosa St on Sunday?': [
    { from: 'tool', text: 'check_calendar · Marco · Sun' },
    { from: 'tool', text: 'book_viewing · Sun 10:30' },
    { from: 'bot', text: 'Done — Sunday 10:30 with Marco. I’ve sent you a calendar invite and the floor plan.' },
  ],
  'Would they take ₱8M?': [
    { from: 'tool', text: 'handoff · reason: price negotiation' },
    { from: 'bot', text: 'That one’s for a person. I’ve passed our chat to Marco — he usually replies within 15 minutes.' },
    { from: 'sys', text: 'Marco was notified on Slack' },
  ],
}

const greeting: Msg = { from: 'bot', text: 'Hi! I’m Vera, Casa Verde’s assistant. Ask me about a home, or book a viewing.' }

export function AssistantPreview() {
  const [msgs, setMsgs] = useState<Msg[]>([greeting])
  const [used, setUsed] = useState<string[]>([])
  const [typing, setTyping] = useState(false)
  const body = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => {
    const b = body.current
    if (b) b.scrollTo({ top: b.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing])

  const ask = (q: string) => {
    if (typing) return
    setUsed((u) => [...u, q])
    setMsgs((m) => [...m, { from: 'me', text: q }])
    setTyping(true)
    replies[q].forEach((r, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setMsgs((m) => [...m, r])
          if (i === replies[q].length - 1) setTyping(false)
        }, 700 + i * 850),
      )
    })
  }

  const reset = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setTyping(false)
    setUsed([])
    setMsgs([greeting])
  }

  const left = Object.keys(replies).filter((q) => !used.includes(q))

  return (
    <div className="pv pv-asst">
      <div className="as-head">
        <span className="cv-avatar">V</span>
        <div>
          <b>Vera · Casa Verde</b>
          <span>Virtual assistant · simulated demo</span>
        </div>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="as-body" ref={body} data-lenis-prevent="">
        {msgs.map((m, i) =>
          m.from === 'tool' ? (
            <span key={i} className="cv-tool">
              ⚙ {m.text}
            </span>
          ) : m.from === 'sys' ? (
            <span key={i} className="cv-sys">
              {m.text}
            </span>
          ) : (
            <div key={i} className={`cv-msg ${m.from === 'me' ? 'me' : ''}`}>
              {m.text}
              {'homes' in m && m.homes && (
                <>
                  <div className="cv-mini">
                    <Art tone="#C8643B" shape="house" h={56} w={64} radius={8} />
                    <div>
                      <b>₱8,500,000</b>
                      <span>14 Rosa St, Northcote</span>
                    </div>
                  </div>
                  <div className="cv-mini">
                    <Art tone="#8C9A6E" shape="house" h={56} w={64} radius={8} />
                    <div>
                      <b>₱8,900,000</b>
                      <span>3/22 Albert Rd, Kingsland</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ),
        )}
        {typing && (
          <div className="as-typing" aria-label="Assistant is typing">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      <div className="as-chips">
        {left.length ? (
          left.map((q) => (
            <button key={q} type="button" onClick={() => ask(q)} disabled={typing}>
              {q}
            </button>
          ))
        ) : (
          <span>That’s the demo — press Reset to replay.</span>
        )}
      </div>
    </div>
  )
}
