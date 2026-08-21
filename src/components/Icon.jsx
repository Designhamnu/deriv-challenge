/*
 * Inline line icons. Geometric, no fills, stroke inherits via currentColor so
 * the colour comes from a token on the parent rather than a hardcoded hex.
 */
const SHAPES = {
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10.5h18" />
      <circle cx="16.5" cy="15" r="1.25" />
    </>
  ),
  flame: (
    <>
      <path d="M12 2.5c1.4 3.7 4.5 5.1 4.5 9.3a4.5 4.5 0 0 1-9 0c0-2 1.1-3.1 2.1-3.9-.2 1.5.4 2.4 1.3 2.7 1-1.4.7-4.5.1-8.1Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
}

export default function Icon({ name, className = '' }) {
  const shape = SHAPES[name]
  if (!shape) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`size-5 ${className}`}
    >
      {shape}
    </svg>
  )
}
