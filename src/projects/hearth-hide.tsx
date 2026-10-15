import { Art, Browser, Input, Nav, Phone, PhoneRow, Product, Stars, v } from '../components/mock/kit'
import type { Design } from './types'

const brand = v({
  '--bg': '#F4EEE4',
  '--fg': '#221D18',
  '--mute': '#7A6F62',
  '--line': '#DCD2C3',
  '--soft': '#E9E0D2',
  '--acc': '#8A5A3B',
  '--acc-fg': '#FFFFFF',
  '--disp': "'Instrument Serif', serif",
  '--r': '999px',
})

const logo = <span style={{ fontStyle: 'italic' }}>Hearth &amp; Hide</span>
const links = ['Bags', 'Wallets', 'Travel', 'Journal', 'Workshop']
const navR = <span className="mk-small">Search · Account · Bag (2)</span>

const items = [
  { tone: '#8A5A3B', shape: 'tote', name: 'Field Tote', price: '₱4,950', note: 'Saddle · 3 colours' },
  { tone: '#3A332C', shape: 'wallet', name: 'Card Wallet', price: '₱1,850', note: 'Espresso · 4 colours' },
  { tone: '#B4875A', shape: 'duffel', name: 'Weekender', price: '₱8,900', note: 'Tan · 2 colours' },
  { tone: '#5C6B4E', shape: 'tote', name: 'Market Tote', price: '₱4,450', note: 'Moss · new colour' },
  { tone: '#6B4632', shape: 'duffel', name: 'Overnighter', price: '₱7,650', note: 'Chestnut' },
  { tone: '#2B2621', shape: 'wallet', name: 'Long Wallet', price: '₱2,750', note: 'Black · 2 colours' },
] as const

export const design: Design = {
  hero: { bg: '#1E1A16', fg: '#F4EEE4', accent: '#C99A5B' },
  brand,
  role: 'Brand direction, UX, front-end build',
  year: '2026',
  screens: [
    {
      title: 'Home',
      caption: 'A quiet, editorial landing: one hero product, the promise in a single line, best sellers one scroll away.',
      render: () => (
        <Browser url="hearthandhide.store">
          <div className="mk" style={brand}>
            <div className="mk-announce">Free repairs for life on every piece · Shipping worldwide</div>
            <Nav logo={logo} links={links} right={navR} />
            <div className="g2" style={{ gridTemplateColumns: '1fr 1.15fr' }}>
              <div className="stack" style={{ padding: '80px 56px', justifyContent: 'center', gap: 22 }}>
                <span className="mk-eyebrow">Autumn collection · 2026</span>
                <h1 className="mk-h1" style={{ fontSize: 84 }}>
                  Made slowly.
                  <br />
                  <em style={{ color: 'var(--acc)' }}>Carried for years.</em>
                </h1>
                <p className="mk-p" style={{ maxWidth: 380, fontSize: 16 }}>
                  Vegetable-tanned leather, cut and stitched by hand in a two-person workshop.
                </p>
                <div className="row">
                  <span className="mk-btn">Shop the collection</span>
                  <span className="mk-btn ghost">Visit the workshop</span>
                </div>
              </div>
              <Art tone="#8A5A3B" shape="tote" h={560} bg="#E3D7C5" label="Field Tote — Saddle" radius={0} />
            </div>
            <div className="pad">
              <div className="between" style={{ marginBottom: 20 }}>
                <h3 className="mk-h2">Best sellers</h3>
                <span className="mk-link">View all →</span>
              </div>
              <div className="g4">
                {items.slice(0, 4).map((p) => (
                  <Product key={p.name} {...p} h={240} />
                ))}
              </div>
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'Collection',
      caption: 'Filters that match how people shop leather — by use, colour and size — with price always visible.',
      render: () => (
        <Browser url="hearthandhide.store/collections/bags">
          <div className="mk" style={brand}>
            <Nav logo={logo} links={links} right={navR} />
            <div className="pad" style={{ paddingBottom: 12 }}>
              <span className="mk-small">Home / Bags</span>
              <div className="between" style={{ alignItems: 'end', marginTop: 8 }}>
                <h1 className="mk-h1" style={{ fontSize: 64 }}>Bags</h1>
                <span className="mk-select">Sort: Featured ▾</span>
              </div>
            </div>
            <div className="g2" style={{ gridTemplateColumns: '220px 1fr', padding: '12px 40px 48px', gap: 40 }}>
              <aside className="stack" style={{ gap: 24 }}>
                {[
                  ['Use', ['Everyday', 'Work', 'Travel', 'Market']],
                  ['Size', ['Small', 'Medium', 'Large']],
                ].map(([h, opts]) => (
                  <div key={h as string} className="stack" style={{ gap: 8 }}>
                    <b className="mk-label">{h as string}</b>
                    {(opts as string[]).map((o, i) => (
                      <span key={o} className="mk-check">
                        <i className={i === 0 ? 'on' : ''} />
                        {o}
                      </span>
                    ))}
                  </div>
                ))}
                <div className="stack" style={{ gap: 10 }}>
                  <b className="mk-label">Colour</b>
                  <div className="row" style={{ gap: 8 }}>
                    {['#8A5A3B', '#3A332C', '#B4875A', '#5C6B4E', '#6B4632'].map((c, i) => (
                      <span key={c} className={`mk-swatch ${i === 0 ? 'on' : ''}`} style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </aside>
              <div className="g3" style={{ gap: 28 }}>
                {items.map((p) => (
                  <Product key={p.name} {...p} h={250} />
                ))}
              </div>
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'Product page',
      caption: 'Large imagery, honest detail, and the delivery date before the button — the question everyone asks.',
      render: () => (
        <Browser url="hearthandhide.store/products/weekender">
          <div className="mk" style={brand}>
            <Nav logo={logo} links={links} right={navR} />
            <div className="g2" style={{ gridTemplateColumns: '1.2fr 1fr', gap: 56, padding: '32px 40px 56px' }}>
              <div className="stack" style={{ gap: 12 }}>
                <Art tone="#B4875A" shape="duffel" h={500} bg="#E3D7C5" />
                <div className="g4" style={{ gap: 12 }}>
                  {['#B4875A', '#9C7149', '#B4875A', '#C9A27A'].map((t, i) => (
                    <Art key={i} tone={t} shape="duffel" h={96} bg={i === 0 ? '#D9CBB5' : '#E3D7C5'} />
                  ))}
                </div>
              </div>
              <div className="stack" style={{ gap: 18, paddingTop: 12 }}>
                <span className="mk-small">Travel / Weekender</span>
                <h1 className="mk-h1" style={{ fontSize: 60 }}>Weekender</h1>
                <div className="row" style={{ gap: 10 }}>
                  <Stars />
                  <span className="mk-small">4.9 · 128 reviews</span>
                </div>
                <span style={{ fontSize: 24 }}>₱8,900</span>
                <p className="mk-p">
                  A two-night bag in full-grain vegetable-tanned leather. Brass hardware, cotton canvas lining, and a
                  shoulder strap that softens with use.
                </p>
                <div className="stack" style={{ gap: 8 }}>
                  <b className="mk-label">Colour — Tan</b>
                  <div className="row" style={{ gap: 8 }}>
                    {['#B4875A', '#6B4632', '#2B2621'].map((c, i) => (
                      <span key={c} className={`mk-swatch lg ${i === 0 ? 'on' : ''}`} style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <span className="mk-btn block">Add to bag — ₱8,900</span>
                <div className="mk-note">Order today, arrives Tue 21 Oct · Free returns for 30 days</div>
                <div className="mk-acc">
                  {['Materials & dimensions', 'Care', 'Shipping & returns', 'Made in our workshop — 14 hours'].map((a) => (
                    <div key={a} className="between">
                      <span>{a}</span>
                      <span>+</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'Checkout',
      caption: 'One page, no account wall. Shipping cost shown before payment, with the order summary always in view.',
      render: () => (
        <Browser url="hearthandhide.store/checkout">
          <div className="mk" style={brand}>
            <div className="g2" style={{ gridTemplateColumns: '1.25fr 1fr', minHeight: 760 }}>
              <div className="stack" style={{ padding: '40px 56px', gap: 22 }}>
                <div className="mk-logo" style={{ fontSize: 28 }}>
                  {logo}
                </div>
                <div className="row mk-small" style={{ gap: 10 }}>
                  <b style={{ color: 'var(--fg)' }}>Information</b> › Shipping › Payment
                </div>
                <div className="mk-express">
                  <span>Express checkout</span>
                  <div className="g3" style={{ gap: 10 }}>
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <b className="mk-h3">Contact</b>
                <Input value="amelia.r@email.com" />
                <b className="mk-h3">Delivery</b>
                <div className="g2" style={{ gap: 12 }}>
                  <Input label="First name" value="Amelia" />
                  <Input label="Last name" value="Rowe" />
                </div>
                <Input label="Address" value="14 Wharf Street" />
                <div className="g3" style={{ gap: 12 }}>
                  <Input label="City" value="Wellington" />
                  <Input label="Region" value="WGN" />
                  <Input label="Postcode" value="6011" />
                </div>
                <div className="mk-radio-group">
                  <div className="mk-radio on">
                    <i />
                    <span>Standard · 3–5 days</span>
                    <b>Free</b>
                  </div>
                  <div className="mk-radio">
                    <i />
                    <span>Express · next day</span>
                    <b>₱250</b>
                  </div>
                </div>
                <span className="mk-btn block" style={{ background: 'var(--acc)', color: '#fff' }}>
                  Continue to payment
                </span>
              </div>
              <div className="stack" style={{ background: 'var(--soft)', padding: '72px 48px', gap: 18, borderLeft: '1px solid var(--line)' }}>
                {[items[2], items[1]].map((p) => (
                  <div key={p.name} className="row" style={{ gap: 14 }}>
                    <div style={{ width: 72, position: 'relative' }}>
                      <Art tone={p.tone} shape={p.shape} h={72} bg="#DCCFBC" radius={8} />
                      <span className="mk-qty">1</span>
                    </div>
                    <div className="stack" style={{ flex: 1 }}>
                      <b>{p.name}</b>
                      <span className="mk-small">{p.note}</span>
                    </div>
                    <span>{p.price}</span>
                  </div>
                ))}
                <div className="row" style={{ gap: 10 }}>
                  <Input ph="Gift card or discount code" w="100%" />
                  <span className="mk-btn ghost">Apply</span>
                </div>
                <div className="mk-sum">
                  <div className="between">
                    <span>Subtotal</span>
                    <span>₱10,750.00</span>
                  </div>
                  <div className="between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="between total">
                    <b>Total</b>
                    <b>₱10,750.00</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'Mobile',
      caption: 'Designed thumb-first: sticky add-to-bag, swipeable gallery, and a bag drawer that never leaves the page.',
      width: 1200,
      render: () => (
        <PhoneRow bg="#E3D7C5">
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="mk-mnav">
                <span>☰</span>
                <b className="mk-logo" style={{ fontSize: 20 }}>
                  {logo}
                </b>
                <span>Bag</span>
              </div>
              <Art tone="#8A5A3B" shape="tote" h={300} bg="#E3D7C5" radius={0} />
              <div className="stack" style={{ padding: 18, gap: 10 }}>
                <h2 className="mk-h1" style={{ fontSize: 36 }}>
                  Made slowly.
                </h2>
                <span className="mk-btn block">Shop the collection</span>
              </div>
            </div>
          </Phone>
          <Phone>
            <div className="mk mk-m" style={brand}>
              <Art tone="#B4875A" shape="duffel" h={290} bg="#E3D7C5" radius={0} />
              <div className="mk-dotsnav">
                <i className="on" />
                <i />
                <i />
                <i />
              </div>
              <div className="stack" style={{ padding: '6px 18px', gap: 8 }}>
                <h2 className="mk-h1" style={{ fontSize: 32 }}>
                  Weekender
                </h2>
                <div className="between">
                  <span>₱8,900</span>
                  <Stars />
                </div>
                <p className="mk-p mk-small">Full-grain vegetable-tanned leather, brass hardware.</p>
              </div>
              <div className="mk-sticky">
                <span className="mk-btn block">Add to bag</span>
              </div>
            </div>
          </Phone>
          <Phone>
            <div className="mk mk-m" style={{ ...brand, background: '#9b8f80' }}>
              <div className="mk-drawer">
                <div className="between">
                  <b className="mk-h3">Your bag</b>
                  <span>✕</span>
                </div>
                <div className="mk-progress">
                  <span>You've unlocked free shipping</span>
                  <i style={{ width: '100%' }} />
                </div>
                {[items[2], items[1]].map((p) => (
                  <div key={p.name} className="row" style={{ gap: 12 }}>
                    <div style={{ width: 64 }}>
                      <Art tone={p.tone} shape={p.shape} h={64} radius={8} />
                    </div>
                    <div className="stack" style={{ flex: 1 }}>
                      <b>{p.name}</b>
                      <span className="mk-stepper">− 1 +</span>
                    </div>
                    <span>{p.price}</span>
                  </div>
                ))}
                <div style={{ marginTop: 'auto' }} className="stack">
                  <div className="between" style={{ margin: '12px 0' }}>
                    <b>Subtotal</b>
                    <b>₱10,750</b>
                  </div>
                  <span className="mk-btn block" style={{ background: 'var(--acc)', color: '#fff' }}>
                    Checkout
                  </span>
                </div>
              </div>
            </div>
          </Phone>
        </PhoneRow>
      ),
    },
  ],
}
