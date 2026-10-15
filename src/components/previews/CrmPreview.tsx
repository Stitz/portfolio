import { useState } from 'react'
import { BrowserBar } from './Frame'

const stages = ['Enquiry', 'Qualified', 'Site survey', 'Signed']

const initial = [
  { id: 1, name: 'Okafor residence', kw: 6.6, value: 390000, stage: 0 },
  { id: 2, name: 'Greenway Café', kw: 15, value: 850000, stage: 0 },
  { id: 3, name: 'Tan family', kw: 8.2, value: 470000, stage: 1 },
  { id: 4, name: 'Northside Storage', kw: 40, value: 2080000, stage: 2 },
  { id: 5, name: 'Reyes duplex', kw: 10, value: 570000, stage: 3 },
]

const fmt = (n: number) =>
  n >= 1e6 ? `₱${(n / 1e6).toFixed(1)}M` : n >= 1000 ? `₱${Math.round(n / 1000)}k` : `₱${n}`

export function CrmPreview() {
  const [deals, setDeals] = useState(initial)
  const advance = (id: number) =>
    setDeals((ds) => ds.map((d) => (d.id === id ? { ...d, stage: Math.min(d.stage + 1, stages.length - 1) } : d)))

  return (
    <div className="pv pv-crm">
      <BrowserBar url="app.fieldworksolar.co/pipeline" />
      <div className="cr-head">
        <b>Residential &amp; commercial</b>
        <span>{deals.length} open jobs</span>
        <button type="button" onClick={() => setDeals(initial)}>
          Reset
        </button>
      </div>
      <div className="cr-board">
        {stages.map((s, si) => {
          const col = deals.filter((d) => d.stage === si)
          return (
            <div className="cr-col" key={s}>
              <div className="cr-colhead">
                <span>{s}</span>
                <span>{fmt(col.reduce((a, d) => a + d.value, 0))}</span>
              </div>
              {col.map((d) => (
                <div className="cr-card" key={d.id}>
                  <b>{d.name}</b>
                  <span>
                    {d.kw} kW · {fmt(d.value)}
                  </span>
                  {si < stages.length - 1 && (
                    <button type="button" onClick={() => advance(d.id)} aria-label={`Move ${d.name} to ${stages[si + 1]}`}>
                      Move to {stages[si + 1]} →
                    </button>
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
