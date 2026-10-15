export function BrowserBar({ url }: { url: string }) {
  return (
    <div className="bb">
      <span className="bb-dots" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      <span className="bb-url">{url}</span>
    </div>
  )
}
