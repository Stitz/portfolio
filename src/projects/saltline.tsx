import { Art, Browser, Nav, Phone, PhoneRow, Product, Stars, v } from '../components/mock/kit'
import type { Design } from './types'

const brand = v({
  '--bg': '#F7F5EF',
  '--fg': '#0F3B4C',
  '--mute': '#5D7480',
  '--line': '#D6DEDC',
  '--soft': '#E6EFEC',
  '--acc': '#F2775B',
  '--acc-fg': '#FFFFFF',
  '--disp': "'Bricolage Grotesque', sans-serif",
  '--r': '6px',
  '--r-img': '10px',
})

const logo = <span className="sl-logo">SALTLINE</span>
const links = ['Wetsuits', 'Boards', 'Apparel', 'Accessories']
const navR = <span className="mk-small">Search · Account · Cart (1)</span>

const products = [
  { tone: '#16303A', shape: 'suit', name: 'Coldwater 4/3 Chest-Zip', price: '₱12,900', note: '4 colours', badge: 'New' },
  { tone: '#1F2A2E', shape: 'suit', name: 'Coldwater 5/4 Hooded', price: '₱14,900', note: '2 colours' },
  { tone: '#E9DCC4', shape: 'board', name: 'Daybreak 7\'2" Mid', price: '₱23,900', note: 'Epoxy · 2 sizes', badge: 'Low stock' },
  { tone: '#F2775B', shape: 'tee', name: 'Tide Chart Tee', price: '₱1,290', note: 'Organic cotton' },
  { tone: '#2F5D50', shape: 'cap', name: 'Break Wall Cap', price: '₱990', note: '3 colours' },
  { tone: '#0F3B4C', shape: 'tee', name: 'Saltline Crew', price: '₱1,490', note: '5 colours' },
  { tone: '#C9B897', shape: 'board', name: 'Longfin 9\'1" Log', price: '₱29,500', note: 'PU · glassed in house' },
  { tone: '#2B2B2B', shape: 'bottle', name: 'Wax Remover', price: '₱450', note: 'Plant-based' },
] as const

const banner = (
  <div className="sl-hero">
    <div className="stack" style={{ gap: 18, maxWidth: 520, zIndex: 1 }}>
      <span className="mk-eyebrow" style={{ color: '#9FD3CF' }}>
        Winter range · water 11°C and dropping
      </span>
      <h1 className="mk-h1 sl-h1">Built for cold water.</h1>
      <p style={{ color: '#C6DCDD', fontSize: 16, maxWidth: 400 }}>
        Wetsuits sealed for southern winters, tested by the crew every morning before work.
      </p>
      <div className="row">
        <span className="mk-btn acc">Shop wetsuits</span>
        <span className="mk-btn ghost" style={{ color: '#fff', borderColor: '#ffffff66' }}>
          Find your size
        </span>
      </div>
    </div>
    <div className="sl-hero-art">
      <Art tone="#E9DCC4" shape="board" h={420} bg="transparent" />
    </div>
  </div>
)

export const design: Design = {
  hero: { bg: '#0F3B4C', fg: '#EAF2F0', accent: '#F2775B' },
  brand,
  role: 'Custom Shopify theme, UX, merchandising setup',
  year: '2026',
  screens: [
    {
      title: 'Home — custom sections',
      caption: 'Every block is an Online Store 2.0 section the team can reorder, swap and schedule without touching code.',
      render: () => (
        <Browser url="saltlinesurf.co">
          <div className="mk" style={brand}>
            <div className="mk-announce" style={{ background: '#0F3B4C', color: '#EAF2F0' }}>
              Free shipping over ₱2,500 · 30-day wave-tested returns
            </div>
            <Nav logo={logo} links={links} right={navR} center />
            {banner}
            <div className="pad">
              <div className="between" style={{ marginBottom: 20 }}>
                <h3 className="mk-h2 sl-up">Shop by water</h3>
                <span className="mk-link">All collections →</span>
              </div>
              <div className="g3">
                {[
                  ['Wetsuits', '#16303A', 'suit'],
                  ['Boards', '#E9DCC4', 'board'],
                  ['Apparel', '#F2775B', 'tee'],
                ].map(([n, t, s]) => (
                  <div key={n} style={{ position: 'relative' }}>
                    <Art tone={t} shape={s as 'suit'} h={260} />
                    <span className="sl-tile">{n} →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'Collection + filters',
      caption: 'Search & Discovery filters on metafields — thickness, zip style, size — so customers narrow 48 suits to 3.',
      render: () => (
        <Browser url="saltlinesurf.co/collections/wetsuits">
          <div className="mk" style={brand}>
            <Nav logo={logo} links={links} right={navR} center />
            <div className="pad" style={{ paddingBottom: 16 }}>
              <h1 className="mk-h1 sl-h1" style={{ color: 'var(--fg)', fontSize: 64 }}>
                Wetsuits
              </h1>
              <div className="between" style={{ marginTop: 18 }}>
                <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                  {['Thickness: 4/3', 'Chest zip', 'Size M', 'In stock'].map((f) => (
                    <span key={f} className="mk-chip on">
                      {f} ✕
                    </span>
                  ))}
                  {['Hooded', 'Women’s', 'Price'].map((f) => (
                    <span key={f} className="mk-chip">
                      {f} ▾
                    </span>
                  ))}
                </div>
                <span className="mk-small">12 of 48 products · Sort: Best selling ▾</span>
              </div>
            </div>
            <div className="g4" style={{ padding: '8px 40px 48px', gap: 24 }}>
              {products.map((p) => (
                <Product key={p.name} {...p} h={230} />
              ))}
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'Product page',
      caption: 'Variant picker with sold-out sizes shown honestly, a fit guide inline, and the upsell placed after the decision.',
      render: () => (
        <Browser url="saltlinesurf.co/products/coldwater-4-3-chest-zip">
          <div className="mk" style={brand}>
            <Nav logo={logo} links={links} right={navR} center />
            <div className="g2" style={{ gridTemplateColumns: '1.15fr 1fr', gap: 48, padding: '28px 40px 48px' }}>
              <div className="g2" style={{ gap: 12 }}>
                <Art tone="#16303A" shape="suit" h={380} />
                <Art tone="#16303A" shape="suit" h={380} bg="#DDE7E3" />
                <Art tone="#1F2A2E" shape="suit" h={220} bg="#E9DCC4" />
                <Art tone="#16303A" shape="suit" h={220} bg="#F0E6D6" />
              </div>
              <div className="stack" style={{ gap: 16 }}>
                <div className="row" style={{ gap: 8 }}>
                  <span className="mk-badge">New</span>
                  <Stars />
                  <span className="mk-small">212 reviews</span>
                </div>
                <h1 className="mk-h1 sl-h1" style={{ color: 'var(--fg)', fontSize: 46 }}>
                  Coldwater 4/3 Chest-Zip
                </h1>
                <span style={{ fontSize: 22 }}>₱12,900.00</span>
                <span className="mk-small">or 4 payments of ₱3,225</span>
                <div className="stack" style={{ gap: 8 }}>
                  <div className="between">
                    <b className="mk-label">Size — M</b>
                    <span className="mk-link mk-small">Size guide</span>
                  </div>
                  <div className="row" style={{ gap: 8 }}>
                    {['XS', 'S', 'M', 'MT', 'L', 'XL'].map((s) => (
                      <span key={s} className={`mk-size ${s === 'M' ? 'on' : ''} ${s === 'XS' ? 'out' : ''}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="stack" style={{ gap: 8 }}>
                  <b className="mk-label">Colour — Black / Kelp</b>
                  <div className="row" style={{ gap: 8 }}>
                    {['#16303A', '#2F5D50', '#1F2A2E', '#0F3B4C'].map((c, i) => (
                      <span key={c} className={`mk-swatch lg ${i === 0 ? 'on' : ''}`} style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <span className="mk-btn block acc">Add to cart</span>
                <span className="mk-btn block" style={{ background: '#0F3B4C' }}>
                  Buy it now
                </span>
                <div className="mk-note">✓ Pickup available at Saltline Torquay · usually ready in 2 hours</div>
                <div className="mk-acc">
                  {['Fit & warmth', 'Seams & materials', 'Care', 'Shipping & returns'].map((a) => (
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
      title: 'Cart drawer',
      caption: 'Free-shipping progress, a single relevant add-on, and express checkout — without leaving the page.',
      render: () => (
        <Browser url="saltlinesurf.co/products/coldwater-4-3-chest-zip">
          <div className="mk" style={{ ...brand, position: 'relative', height: 760, overflow: 'hidden' }}>
            <div style={{ filter: 'brightness(.55)' }}>
              <Nav logo={logo} links={links} right={navR} center />
              <div className="g2" style={{ gridTemplateColumns: '1.15fr 1fr', gap: 48, padding: '28px 40px' }}>
                <Art tone="#16303A" shape="suit" h={640} />
                <div />
              </div>
            </div>
            <div className="sl-drawer">
              <div className="between">
                <b className="mk-h3">Cart · 2</b>
                <span>✕</span>
              </div>
              <div className="mk-progress">
                <span>
                  You’ve unlocked <b>free shipping</b>
                </span>
                <i style={{ width: '100%' }} />
              </div>
              {[products[0], products[4]].map((p) => (
                <div key={p.name} className="row" style={{ gap: 14 }}>
                  <div style={{ width: 84 }}>
                    <Art tone={p.tone} shape={p.shape} h={96} />
                  </div>
                  <div className="stack" style={{ flex: 1, gap: 4 }}>
                    <b>{p.name}</b>
                    <span className="mk-small">M · Black / Kelp</span>
                    <span className="mk-stepper">− 1 +</span>
                  </div>
                  <span>{p.price}</span>
                </div>
              ))}
              <div className="sl-upsell">
                <div style={{ width: 56 }}>
                  <Art tone="#2B2B2B" shape="bottle" h={56} />
                </div>
                <div className="stack" style={{ flex: 1 }}>
                  <b>Add Wetsuit Shampoo</b>
                  <span className="mk-small">Doubles suit life · ₱550</span>
                </div>
                <span className="mk-btn ghost" style={{ padding: '8px 14px' }}>
                  Add
                </span>
              </div>
              <div className="stack" style={{ marginTop: 'auto', gap: 10 }}>
                <div className="between">
                  <b>Subtotal</b>
                  <b>₱13,890.00</b>
                </div>
                <span className="mk-small">Taxes and shipping calculated at checkout</span>
                <span className="mk-btn block acc">Check out</span>
                <div className="g2" style={{ gap: 8 }}>
                  <span className="mk-express-btn" />
                  <span className="mk-express-btn alt" />
                </div>
              </div>
            </div>
          </div>
        </Browser>
      ),
    },
    {
      title: 'Theme editor',
      caption: 'Custom sections with sensible settings — the marketing team launches a campaign page in an afternoon.',
      render: () => (
        <div className="mk sl-editor" style={brand}>
          <div className="sl-ed-top">
            <span>← Exit</span>
            <b>Saltline 2.0 · Live theme</b>
            <span className="mk-small">Home page ▾</span>
            <span style={{ marginLeft: 'auto' }} className="row">
              <span className="sl-ed-dev">▭ ▯</span>
              <span className="mk-btn" style={{ background: '#1a1a1a', padding: '8px 16px' }}>
                Save
              </span>
            </span>
          </div>
          <div className="sl-ed-body">
            <aside className="sl-ed-side">
              <span className="mk-label">Header</span>
              <span className="sl-sec">⋮⋮ Announcement bar</span>
              <span className="sl-sec">⋮⋮ Header</span>
              <span className="mk-label" style={{ marginTop: 10 }}>
                Template
              </span>
              <span className="sl-sec on">⋮⋮ Cold-water banner</span>
              <span className="sl-sec sub">↳ Heading</span>
              <span className="sl-sec sub">↳ Button</span>
              <span className="sl-sec">⋮⋮ Shop by water</span>
              <span className="sl-sec">⋮⋮ Featured collection</span>
              <span className="sl-sec">⋮⋮ Surf report strip</span>
              <span className="sl-sec">⋮⋮ Newsletter</span>
              <span className="sl-add">⊕ Add section</span>
              <span className="mk-label" style={{ marginTop: 10 }}>
                Footer
              </span>
              <span className="sl-sec">⋮⋮ Footer</span>
            </aside>
            <div className="sl-ed-canvas">
              <div style={{ transform: 'scale(.62)', transformOrigin: 'top center', width: 1100, margin: '0 auto' }}>
                <div className="mk-announce" style={{ background: '#0F3B4C', color: '#EAF2F0' }}>
                  Free shipping over ₱2,500
                </div>
                <Nav logo={logo} links={links} right={navR} center />
                <div className="sl-selected">{banner}</div>
              </div>
            </div>
            <aside className="sl-ed-side right">
              <b>Cold-water banner</b>
              <div className="stack" style={{ gap: 6 }}>
                <span className="mk-label">Heading</span>
                <div className="mk-input">Built for cold water.</div>
              </div>
              <div className="stack" style={{ gap: 6 }}>
                <span className="mk-label">Colour scheme</span>
                <div className="row" style={{ gap: 6 }}>
                  {['#0F3B4C', '#F7F5EF', '#F2775B', '#2F5D50'].map((c, i) => (
                    <span key={c} className={`sl-scheme ${i === 0 ? 'on' : ''}`} style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div className="stack" style={{ gap: 6 }}>
                <span className="mk-label">Overlay opacity · 35%</span>
                <span className="sl-range">
                  <i style={{ width: '35%' }} />
                </span>
              </div>
              <div className="stack" style={{ gap: 6 }}>
                <span className="mk-label">Show from</span>
                <div className="mk-input">01 Jun 2026 → 31 Aug 2026</div>
              </div>
              <span className="mk-check">
                <i className="on" />
                Show water temperature
              </span>
            </aside>
          </div>
        </div>
      ),
    },
    {
      title: 'Mobile',
      caption: 'Over 70% of surf traffic is mobile: sticky buy button, swipe gallery, thumb-reach filters.',
      width: 1200,
      render: () => (
        <PhoneRow bg="#0F3B4C">
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="mk-announce" style={{ background: '#0F3B4C', color: '#EAF2F0', fontSize: 10 }}>
                Free shipping over ₱2,500
              </div>
              <div className="mk-mnav">
                <span>☰</span>
                {logo}
                <span>Cart</span>
              </div>
              <div className="sl-hero m">
                <h1 className="mk-h1 sl-h1" style={{ fontSize: 40 }}>
                  Built for cold water.
                </h1>
                <span className="mk-btn acc">Shop wetsuits</span>
                <div style={{ position: 'absolute', right: -20, bottom: -30, width: 150 }}>
                  <Art tone="#E9DCC4" shape="board" h={260} bg="transparent" />
                </div>
              </div>
            </div>
          </Phone>
          <Phone>
            <div className="mk mk-m" style={brand}>
              <Art tone="#16303A" shape="suit" h={300} radius={0} />
              <div className="stack" style={{ padding: 16, gap: 10 }}>
                <b className="mk-h3 sl-up">Coldwater 4/3</b>
                <div className="between">
                  <span>₱12,900</span>
                  <Stars />
                </div>
                <div className="row" style={{ gap: 6 }}>
                  {['S', 'M', 'MT', 'L'].map((s) => (
                    <span key={s} className={`mk-size sm ${s === 'M' ? 'on' : ''}`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mk-sticky">
                <span className="mk-btn block acc">Add to cart · ₱12,900</span>
              </div>
            </div>
          </Phone>
          <Phone>
            <div className="mk mk-m" style={brand}>
              <div className="mk-mnav">
                <span>←</span>
                <b>Filter</b>
                <span className="mk-small">Clear</span>
              </div>
              <div className="stack" style={{ padding: 16, gap: 18 }}>
                {[
                  ['Thickness', ['3/2', '4/3', '5/4']],
                  ['Zip', ['Chest', 'Back', 'Zipless']],
                  ['Size', ['S', 'M', 'MT', 'L', 'XL']],
                ].map(([h, o]) => (
                  <div key={h as string} className="stack" style={{ gap: 8 }}>
                    <b className="mk-label">{h as string}</b>
                    <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
                      {(o as string[]).map((x, i) => (
                        <span key={x} className={`mk-chip ${i === 1 ? 'on' : ''}`}>
                          {x}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mk-sticky">
                <span className="mk-btn block">Show 12 results</span>
              </div>
            </div>
          </Phone>
        </PhoneRow>
      ),
    },
  ],
}
