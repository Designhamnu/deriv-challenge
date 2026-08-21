import { useState } from 'react'

/*
 * Hamood's avatar, from /hamood.png. Falls back to a brand-soft circle if the
 * image is missing.
 *
 * mark    — 32px, sidebar
 * message — 40px, conversation rows and the thinking indicator
 * hero    — 280px, welcome state
 */
const SIZES = {
  mark: { className: 'size-8', px: 32 },
  message: { className: 'size-10', px: 40 },
  hero: { className: 'size-70', px: 280 },
}

export default function Avatar({ size = 'message', framed = false }) {
  const [failed, setFailed] = useState(false)
  const { className, px } = SIZES[size] ?? SIZES.message
  const frame = framed ? 'border border-line bg-brand-soft object-top' : ''

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={`${className} ${framed ? 'border border-line' : ''} shrink-0 rounded-full bg-brand-soft`}
      />
    )
  }

  return (
    <img
      src="/hamood.png"
      alt=""
      aria-hidden="true"
      width={px}
      height={px}
      onError={() => setFailed(true)}
      className={`${className} ${frame} shrink-0 rounded-full object-cover`}
    />
  )
}
