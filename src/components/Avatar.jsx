import { useState } from 'react'

/*
 * Hamood's avatar, from /hamood.png. Falls back to a brand-soft circle if the
 * image is missing.
 *
 * mark    — 32px, sidebar
 * message — 40px, conversation rows and the thinking indicator
 * hero    — 360px, welcome state
 *
 * The source is a full-body figure on a square canvas, so object-cover alone
 * crops nothing. `zoom` scales the image inside the clipping circle to bring
 * the figure up.
 */
const SIZES = {
  mark: { className: 'size-8', px: 32, zoom: '' },
  message: { className: 'size-10', px: 40, zoom: 'origin-top scale-200' },
  hero: { className: 'size-90', px: 360, zoom: 'scale-150' },
}

export default function Avatar({ size = 'message', framed = false }) {
  const [failed, setFailed] = useState(false)
  const { className, px, zoom } = SIZES[size] ?? SIZES.message
  const frame = framed ? 'border border-line bg-brand-soft' : ''

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={`${className} ${frame} block shrink-0 rounded-full bg-brand-soft`}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`${className} ${frame} block shrink-0 overflow-hidden rounded-full`}
    >
      <img
        src="/hamood.png"
        alt=""
        width={px}
        height={px}
        onError={() => setFailed(true)}
        className={`size-full object-cover object-top ${zoom}`}
      />
    </span>
  )
}
