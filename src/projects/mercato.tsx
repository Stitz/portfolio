import { Art, Browser, Nav, Phone, PhoneRow, v, type Shape } from '../components/mock/kit'
import type { Design } from './types'

const brand = v({
  '--bg': '#FFFDF8',
  '--fg': '#1D1B18',
  '--mute': '#7D776C',
  '--line': '#ECE6DA',
  '--soft': '#F4EFE4',
  '--acc': '#2F6B3D',
  '--acc-fg': '#FFFFFF',
  '--disp': "'Fraunces', serif",
  '--r': '12px',
  '--r-img': '14px',
})

const logo = <span style={{ color: 'var(--acc)', fontStyle: 'italic' }}>Mercato</span>

const cats: [string, string, Shape][] = [
  ['Produce', '#6FA35A', 'leaf'],
  ['Bakery', '#C98B4A', 'loaf'],
  ['Dairy', '#EDE6D2', 'jar'],
  ['Pantry', '#B5533C', 'jar'],
  ['Fruit', '#E2553A', 'orb'],
  ['Drinks', '#3E7C8C', 'bottle'],
]

const goods: { n: string; u: string; p: string; t: string; s: Shape }[] = [
  { n: 'Heirloom tomatoes', u: '500 g', p: '₱120', t: '#E2553A', s: 'orb' },
  { n: 'Sourdough loaf', u: '800 g', p: '₱185', t: '#C98B4A', s: 'loaf' },
  { n: 'Greek yoghurt', u: '500 g', p: '₱145', t: '#EDE6D2', s: 'jar' },
  { n: 'Baby spinach', u: '200 g', p: '₱95', t: '#4F8A45', s: 'leaf' },
  { n: 'Cold-pressed OJ', u: '1 L', p: '₱165', t: '#F0A93B', s: 'bottle' },
  { n: 'Lemons', u: '4 pcs', p: '₱60', t: '#ECCB3D', s: 'orb' },
  { n: 'Olive oil', u: '500 ml', p: '₱395', t: '#7C8A3A', s: 'bottle' },
  { n: 'Aged cheddar', u: '200 g', p: '₱210', t: '#E9B44C', s: 'jar' },
]

function Item({ g, qty }: { g: (typeof goods)[number]; qty?: number }) {
  return (
    <div className="mc-item">
      <Art tone={g.t} shape={g.s} h={150} />
      <b>{g.n}</b>
      <span className="mk-small">{g.u}</span>
      <div className="between">
        <b>{g.p}</b>
        {qty ? <span className="mc-step">− {qty} +</span> : <span className="mc-add">+</span>}
      </div>
    </div>
  )
}

export const design: Design = {
  hero: { bg: '#2F6B3D', fg: '#FFFDF8', accent: '#ECDCA0' },
  brand,
  role: 'Product design, web + React Native app',
  year: '2026',
  screens: [
    {
      title: 'Web — home',
      caption: 'Delivery slot and postcode up front, because availability is the first question for groceries.',
      render: () => (
        <Browser url="mercato.market">
          <div className="mk" style={brand}>
            <Nav
              logo={logo}
              links={['Shop', 'Recipes', 'Deals', 'Our growers']}
              right={<span className="mc-slot">◷ Delivering to 2041 · Today 4–6pm</span>}
            />
            <div className="mc-hero">
              <div className="stack" style={{ gap: 20, maxWidth: 560 }}>
                <h1 className="mk-h1" style={{ fontSize: 72 }}>
                  Market-fresh, at your door <em style={{ color: 'var(--acc)' }}>by dinner.</em>
                </h1>
                <div className="mc-search">⌕ Search 1,200 products from local growers…</div>
              </div>
              <div className="mc-heroart">
                <Art tone="#E2553A" shape="orb" h={180} bg="#F6E3D3" radius={999} />
                <Art tone="#C98B4A" shape="loaf" h={180} bg="#F1E5CF" radius={999} />
                <Art tone="#4F8A45" shape="leaf" h={180} bg="#E3EEDC" radius={999} />
              </div>
            </div>
            <div className="pad" style={{ paddingTop: 8 }}>
              <div className="row" style={{ gap: 18, justifyContent: 'space-between' }}>
                {cats.map(([n, t, s]) => (
                  <div key={n} className="stack" style={{ alignItems: 'center', gap: 8, width: 150 }}>
                    <Art tone={t} shape={s} h={110} w={110} radius={999} />
                    <b>{n}</b>
                  </div>
                ))}
              </div>
              <div className="between" style={{ margin: '36px 0 16px' }}>
                <h3 className="mk-h2">This week’s picks</h3>
                <span className="mk-link">See all →</span>
              </div>
              <div className="g4">{goods.slice(0, 4).map((g) => <Item key={g.n} g={g} />)}</div>
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'Web — shop + basket',
      caption: 'Basket stays visible while you shop; quantities change in place, totals update instantly.',
      render: () => (
        <Browser url="mercato.market/shop/produce">
          <div className="mk" style={brand}>
            <Nav logo={logo} links={['Shop', 'Recipes', 'Deals', 'Our growers']} right={<span className="mc-slot">◷ Today 4–6pm</span>} />
            <div className="g3" style={{ gridTemplateColumns: '200px 1fr 320px', gap: 32, padding: '28px 40px 40px' }}>
              <aside className="stack" style={{ gap: 4 }}>
                {cats.map(([n], i) => (
                  <span key={n} className={`mc-cat ${i === 0 ? 'on' : ''}`}>
                    {n}
                  </span>
                ))}
              </aside>
              <div>
                <h1 className="mk-h1" style={{ fontSize: 48, marginBottom: 20 }}>
                  Produce
                </h1>
                <div className="g3" style={{ gap: 20 }}>
                  {goods.slice(0, 6).map((g, i) => (
                    <Item key={g.n} g={g} qty={i === 0 ? 2 : i === 3 ? 1 : undefined} />
                  ))}
                </div>
              </div>
              <aside className="mc-basket">
                <b className="mk-h3">Basket</b>
                <span className="mk-small">Delivery Today, 4–6pm · change</span>
                {[goods[0], goods[3], goods[1]].map((g, i) => (
                  <div key={g.n} className="row" style={{ gap: 10 }}>
                    <div style={{ width: 48 }}>
                      <Art tone={g.t} shape={g.s} h={48} radius={10} />
                    </div>
                    <div className="stack" style={{ flex: 1 }}>
                      <b style={{ fontSize: 13 }}>{g.n}</b>
                      <span className="mk-small">× {i === 0 ? 2 : 1}</span>
                    </div>
                    <span>{g.p}</span>
                  </div>
                ))}
                <div className="mk-progress">
                  <span>₱230 to free delivery</span>
                  <i style={{ width: '78%' }} />
                </div>
                <div className="between">
                  <b>Total</b>
                  <b>₱520.00</b>
                </div>
                <span className="mk-btn block acc">Checkout</span>
              </aside>
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'App — browse',
      caption: 'Same catalog, same basket, native feel. Reorder favourites in two taps.',
      width: 1200,
      render: () => (
        <PhoneRow bg="#E3EEDC">
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="stack" style={{ padding: '8px 18px', gap: 4 }}>
                <span className="mk-small">Good afternoon, Sam</span>
                <h2 className="mk-h1" style={{ fontSize: 30 }}>
                  What’s for dinner?
                </h2>
                <div className="mc-search sm">⌕ Search</div>
              </div>
              <div className="row" style={{ gap: 10, padding: '6px 18px', overflow: 'hidden' }}>
                {cats.slice(0, 4).map(([n, t, s]) => (
                  <div key={n} className="stack" style={{ alignItems: 'center', gap: 4, minWidth: 62 }}>
                    <Art tone={t} shape={s} h={58} w={58} radius={999} />
                    <span className="mk-small">{n}</span>
                  </div>
                ))}
              </div>
              <div className="mc-deal">
                <b>Buy again</b>
                <span className="mk-small">Your usual Friday basket · 9 items</span>
                <span className="mk-btn acc" style={{ padding: '8px 14px', alignSelf: 'start' }}>
                  Add all · ₱1,180
                </span>
              </div>
            </div>
          </Phone>
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="mk-mnav">
                <span>←</span>
                <b>Produce</b>
                <span>⌕</span>
              </div>
              <div className="g2" style={{ gap: 10, padding: '4px 14px' }}>
                {goods.slice(0, 4).map((g, i) => (
                  <div key={g.n} className="mc-item sm">
                    <Art tone={g.t} shape={g.s} h={90} />
                    <b>{g.n}</b>
                    <div className="between">
                      <span>{g.p}</span>
                      {i === 0 ? <span className="mc-step">− 2 +</span> : <span className="mc-add">+</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mk-sticky">
                <span className="mk-btn block acc">View basket · ₱520</span>
              </div>
            </div>
          </Phone>
          <Phone>
            <div className="mk mk-m" style={brand}>
              <Art tone="#C98B4A" shape="loaf" h={260} radius={0} bg="#F1E5CF" />
              <div className="stack" style={{ padding: 18, gap: 8 }}>
                <span className="mk-small">Bakery · Brick Lane Bakers</span>
                <h2 className="mk-h1" style={{ fontSize: 30 }}>
                  Sourdough loaf
                </h2>
                <p className="mk-p mk-small">48-hour ferment, baked this morning, 6km from you.</p>
                <div className="between">
                  <b style={{ fontSize: 20 }}>₱185</b>
                  <span className="mc-step lg">− 1 +</span>
                </div>
              </div>
              <div className="mk-sticky">
                <span className="mk-btn block acc">Add to basket</span>
              </div>
            </div>
          </Phone>
        </PhoneRow>
      ),
    },
    {
      title: 'App — checkout & tracking',
      caption: 'Choose a slot, pay with a saved card, then watch the order come to you.',
      width: 1200,
      render: () => (
        <PhoneRow bg="#F4EFE4">
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="mk-mnav">
                <span>←</span>
                <b>Delivery time</b>
                <span />
              </div>
              <div className="row" style={{ gap: 6, padding: '0 14px' }}>
                {['Today', 'Sat', 'Sun', 'Mon'].map((d, i) => (
                  <span key={d} className={`mk-chip ${i === 0 ? 'on' : ''}`}>
                    {d}
                  </span>
                ))}
              </div>
              <div className="stack" style={{ padding: 14, gap: 8 }}>
                {['2–4pm · Full', '4–6pm · ₱49', '6–8pm · ₱49', '8–10pm · Free'].map((s, i) => (
                  <div key={s} className={`mk-radio ${i === 1 ? 'on' : ''} ${i === 0 ? 'off' : ''}`}>
                    <i />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="mk-sticky">
                <span className="mk-btn block acc">Continue</span>
              </div>
            </div>
          </Phone>
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="mk-mnav">
                <span>←</span>
                <b>Pay</b>
                <span />
              </div>
              <div className="stack" style={{ padding: 16, gap: 12 }}>
                <div className="mc-card">
                  <span>Visa ···· 4421</span>
                  <span className="mk-small">Default</span>
                </div>
                <div className="mk-sum">
                  {[
                    ['Basket (9)', '₱1,180.00'],
                    ['Delivery 4–6pm', '₱49.00'],
                    ['Bag-free', '₱0.00'],
                  ].map(([a, b]) => (
                    <div className="between" key={a}>
                      <span>{a}</span>
                      <span>{b}</span>
                    </div>
                  ))}
                  <div className="between total">
                    <b>Total</b>
                    <b>₱1,229.00</b>
                  </div>
                </div>
              </div>
              <div className="mk-sticky">
                <span className="mk-btn block" style={{ background: '#1D1B18' }}>
                  Pay ₱1,229.00
                </span>
              </div>
            </div>
          </Phone>
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="mc-map">
                <svg viewBox="0 0 300 260" width="100%" height="260" aria-hidden>
                  <path d="M0 60 H300 M0 150 H300 M0 220 H300 M70 0 V260 M180 0 V260 M250 0 V260" stroke="#E6DFD0" strokeWidth="10" />
                  <path d="M70 230 V150 H180 V60 H250" stroke="#2F6B3D" strokeWidth="5" fill="none" strokeDasharray="2 9" strokeLinecap="round" />
                  <circle cx="180" cy="110" r="9" fill="#2F6B3D" />
                  <circle cx="250" cy="60" r="7" fill="#E2553A" />
                </svg>
              </div>
              <div className="stack" style={{ padding: 18, gap: 10 }}>
                <b className="mk-h3">Arriving in 6 minutes</b>
                <span className="mk-small">Jo is 2 stops away in a white van</span>
                <div className="mc-steps">
                  {['Packed', 'On the way', 'Arrived'].map((s, i) => (
                    <span key={s} className={i < 2 ? 'on' : ''}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Phone>
        </PhoneRow>
      ),
    },
    {
      title: 'Notifications',
      caption: 'Only the messages people want: slot reminders, substitutions to approve, and the driver arriving.',
      width: 1200,
      render: () => (
        <PhoneRow
          bg="#1D1B18"
          note={
            <div className="stack" style={{ gap: 14, color: '#FFFDF8', maxWidth: 360 }}>
              <span className="mk-eyebrow" style={{ color: '#ECDCA0' }}>
                Notification rules
              </span>
              {[
                ['Transactional', 'Order placed, substitutions, driver nearby — always on.'],
                ['Reminders', 'Slot closing soon, basket left overnight — opt-in.'],
                ['Offers', 'Max one a week, based on what you actually buy.'],
              ].map(([a, b]) => (
                <div key={a} className="stack" style={{ gap: 2 }}>
                  <b>{a}</b>
                  <span style={{ opacity: 0.7 }}>{b}</span>
                </div>
              ))}
            </div>
          }
        >
          <Phone dark time="16:42">
            <div className="mc-lock">
              <span className="mc-locktime">16:42</span>
              <span className="mk-small" style={{ color: '#ddd' }}>
                Friday 16 October
              </span>
              {[
                ['Your driver is 5 minutes away', 'Jo is bringing 9 items. Leave at door is on.'],
                ['Substitution to approve', 'Oat milk 1L is out — swap for Barista oat milk?'],
                ['Slot closing soon', 'Order by 2pm for today 4–6pm.'],
              ].map(([t, b]) => (
                <div className="mc-notif" key={t}>
                  <span className="mc-appicon">M</span>
                  <div className="stack">
                    <b>{t}</b>
                    <span>{b}</span>
                  </div>
                </div>
              ))}
            </div>
          </Phone>
        </PhoneRow>
      ),
    },
  ],
}
