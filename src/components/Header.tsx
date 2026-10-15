import { profile } from '../content/profile'
import { Link } from '../lib/router'

export function Header({ theme, onTheme, home }: { theme: 'light' | 'dark'; onTheme: () => void; home: boolean }) {
  const to = (hash: string) => (home ? hash : `/${hash}`)
  const A = ({ hash, children }: { hash: string; children: string }) =>
    home ? (
      <a href={hash}>{children}</a>
    ) : (
      <Link to={to(hash)} label={children}>
        {children}
      </Link>
    )

  return (
    <header className="hdr">
      <Link to="/" label={profile.name} className="hdr-mark" aria-label="Home">
        <span className="hdr-mono">{profile.initials}</span>
        <span className="hdr-name">{profile.name}</span>
      </Link>
      <nav className="hdr-nav" aria-label="Sections">
        <A hash="#work">Work</A>
        <A hash="#services">Services</A>
        <A hash="#experience">Experience</A>
        <A hash="#skills">Skills</A>
      </nav>
      <div className="hdr-right">
        <button type="button" className="hdr-theme" onClick={onTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        {home ? (
          <a href="#contact" className="btn btn-sm" data-magnetic>
            Start a project
          </a>
        ) : (
          <Link to="/#contact" label="Contact" className="btn btn-sm" data-magnetic>
            Start a project
          </Link>
        )}
      </div>
    </header>
  )
}
