import type { AnchorHTMLAttributes } from 'react'

type Handler = (to: string, label?: string) => void
let handler: Handler | null = null

export function setNavigator(h: Handler | null) {
  handler = h
}

export function navigate(to: string, label?: string) {
  if (handler) handler(to, label)
  else window.location.href = to
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; label?: string }

export function Link({ to, label, onClick, children, ...rest }: LinkProps) {
  return (
    <a
      href={to}
      {...rest}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        navigate(to, label)
      }}
    >
      {children}
    </a>
  )
}
