import { useState } from 'react'
import { Art, v, type Shape } from '../mock/kit'
import { BrowserBar } from './Frame'

type Store = {
  name: string
  url: string
  logoClass: string
  note: string
  brand: ReturnType<typeof v>
  items: { name: string; price: number; tone: string; shape: Shape }[]
}

const stores: Record<'hearth' | 'saltline', Store> = {
  hearth: {
    name: 'Hearth & Hide',
    url: 'hearthandhide.store',
    logoClass: 'st-logo',
    note: 'Free shipping over ₱5,000',
    brand: v({ '--soft': '#EDE5D8' }),
    items: [
      { name: 'Field Tote', price: 4950, tone: '#8A5A3B', shape: 'tote' },
      { name: 'Card Wallet', price: 1850, tone: '#3A332C', shape: 'wallet' },
      { name: 'Weekender', price: 8900, tone: '#B4875A', shape: 'duffel' },
    ],
  },
  saltline: {
    name: 'SALTLINE',
    url: 'saltlinesurf.co',
    logoClass: 'st-logo sl-logo',
    note: 'Free shipping over ₱2,500',
    brand: v({ '--soft': '#E6EFEC' }),
    items: [
      { name: 'Coldwater 4/3', price: 12900, tone: '#16303A', shape: 'suit' },
      { name: 'Daybreak 7\'2"', price: 23900, tone: '#E9DCC4', shape: 'board' },
      { name: 'Tide Chart Tee', price: 1290, tone: '#F2775B', shape: 'tee' },
    ],
  },
}

export function StorePreview({ variant = 'hearth' }: { variant?: 'hearth' | 'saltline' }) {
  const s = stores[variant]
  const [bag, setBag] = useState<number[]>([])
  const total = bag.reduce((sum, i) => sum + s.items[i].price, 0)

  return (
    <div className="pv pv-store" style={s.brand}>
      <BrowserBar url={s.url} />
      <div className="st-head">
        <span className={s.logoClass}>{s.name}</span>
        <span className="st-nav">Shop · Journal · About</span>
        <span className="st-bag" aria-live="polite">
          {variant === 'saltline' ? 'Cart' : 'Bag'} {bag.length > 0 ? `(${bag.length}) · ₱${total.toLocaleString('en-PH')}` : '(0)'}
        </span>
      </div>
      <div className="st-grid">
        {s.items.map((p, i) => {
          const count = bag.filter((b) => b === i).length
          return (
            <div className="st-card" key={p.name}>
              <Art tone={p.tone} shape={p.shape} h="auto" className="st-img" />
              <div className="st-meta">
                <span>{p.name}</span>
                <span>₱{p.price.toLocaleString('en-PH')}</span>
              </div>
              <button type="button" className="st-add" onClick={() => setBag([...bag, i])}>
                {count > 0 ? `Added · ${count}` : variant === 'saltline' ? 'Add to cart' : 'Add to bag'}
              </button>
            </div>
          )
        })}
      </div>
      <div className="st-foot">
        <span>{s.note}</span>
        {bag.length > 0 && (
          <button type="button" className="st-clear" onClick={() => setBag([])}>
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
