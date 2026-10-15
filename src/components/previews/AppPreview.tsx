import { useState } from 'react'

const catalog: Record<string, { name: string; unit: string; price: number }[]> = {
  Produce: [
    { name: 'Heirloom tomatoes', unit: '500 g', price: 120 },
    { name: 'Baby spinach', unit: '200 g', price: 95 },
    { name: 'Lemons', unit: '4 pcs', price: 60 },
  ],
  Bakery: [
    { name: 'Sourdough loaf', unit: '800 g', price: 185 },
    { name: 'Butter croissant', unit: '2 pcs', price: 140 },
    { name: 'Rye crackers', unit: '150 g', price: 110 },
  ],
  Dairy: [
    { name: 'Greek yoghurt', unit: '500 g', price: 145 },
    { name: 'Aged cheddar', unit: '200 g', price: 210 },
    { name: 'Oat milk', unit: '1 L', price: 115 },
  ],
}

export function AppPreview() {
  const cats = Object.keys(catalog)
  const [cat, setCat] = useState(cats[0])
  const [qty, setQty] = useState<Record<string, number>>({ 'Sourdough loaf': 1 })

  const all = Object.values(catalog).flat()
  const items = Object.values(qty).reduce((a, b) => a + b, 0)
  const total = all.reduce((sum, p) => sum + (qty[p.name] ?? 0) * p.price, 0)
  const change = (name: string, d: number) =>
    setQty((q) => ({ ...q, [name]: Math.max(0, (q[name] ?? 0) + d) }))

  return (
    <div className="pv pv-app">
      <div className="ph">
        <div className="ph-notch" aria-hidden />
        <div className="ph-top">
          <span className="ph-time">9:41</span>
          <span className="ph-title">Mercato</span>
          <span className="ph-addr">Deliver to · Home</span>
        </div>
        <div className="ph-tabs" role="tablist">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={c === cat}
              className={c === cat ? 'on' : ''}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <ul className="ph-list">
          {catalog[cat].map((p) => (
            <li key={p.name}>
              <span className="ph-thumb" aria-hidden />
              <span className="ph-info">
                <b>{p.name}</b>
                <small>
                  {p.unit} · ₱{p.price}
                </small>
              </span>
              <span className="ph-step">
                <button type="button" aria-label={`Remove ${p.name}`} onClick={() => change(p.name, -1)}>
                  −
                </button>
                <span>{qty[p.name] ?? 0}</span>
                <button type="button" aria-label={`Add ${p.name}`} onClick={() => change(p.name, 1)}>
                  +
                </button>
              </span>
            </li>
          ))}
        </ul>
        <div className="ph-cta">
          <span>
            {items} item{items === 1 ? '' : 's'}
          </span>
          <b>Checkout · ₱{total.toLocaleString('en-PH')}</b>
        </div>
      </div>
    </div>
  )
}
