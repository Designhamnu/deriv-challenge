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
  home: (
    <>
      <path d="M4 10.4 12 4.3l8 6.1v9.1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.1Z" />
      <path d="M9.5 20.5v-6h5v6" />
    </>
  ),
  car: (
    <>
      <path d="M3 16v-3l2-4.6a2 2 0 0 1 1.8-1.2h10.4A2 2 0 0 1 19 8.4L21 13v3" />
      <path d="M3 13h18" />
      <circle cx="7.5" cy="16.4" r="1.8" />
      <circle cx="16.5" cy="16.4" r="1.8" />
    </>
  ),
  rings: (
    <>
      <circle cx="9" cy="14.8" r="4.7" />
      <circle cx="15" cy="14.8" r="4.7" />
    </>
  ),
  shield: (
    <path d="M12 3.4 5 6.1v5.5c0 4.3 2.9 7.4 7 8.9 4.1-1.5 7-4.6 7-8.9V6.1L12 3.4Z" />
  ),
}

const PX = { sm: 'size-5', md: 'size-6' }

export default function Icon({ name, size = 'sm', className = '' }) {
  const shape = SHAPES[name]
  if (!shape) return null

  const px = size === 'md' ? 24 : 20

  return (
    <svg
      viewBox="0 0 24 24"
      width={px}
      height={px}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`${PX[size] ?? PX.sm} ${className}`}
    >
      {shape}
    </svg>
  )
}
