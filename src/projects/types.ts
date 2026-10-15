import type { CSSProperties } from 'react'

export interface Screen {
  title: string
  caption: string
  width?: number
  render: () => JSX.Element
}

export interface Design {
  hero: { bg: string; fg: string; accent: string }
  brand: CSSProperties
  role: string
  year: string
  screens: Screen[]
}
