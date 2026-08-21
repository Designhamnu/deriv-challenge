import { useState } from 'react'

/*
 * Hamood's avatar, from /hamood.png. Falls back to a brand-soft circle if the
 * image is missing.
 *
 * mark    — 32px, sidebar
 * message — 40px, conversation rows and the thinking indicator
 * hero    — 320px, welcome state
 *
 * The source is a full-body figure on a square canvas with only ~6% clearance
 * above the head, so a scaled crop cuts the headdress. The hero therefore
 * fits the whole figure with `contain` and padding and does not clip; the
 * small sizes scale in on the head, which needs clipping.
 */
const SIZES = {
  mark: {
    className: 'size-8',
    px: 32,
    fit: 'object-cover object-top',
    clip: true,
    pad: '',
  },
  message: {
    className: 'size-10',
    px: 40,
    fit: 'object-cover object-top origin-top scale-200',
    clip: true,
    pad: '',
  },
  hero: {
    className: 'size-80',
    px: 320,
    fit: 'object-contain object-center',
    clip: false,
    pad: 'p-6',
  },
}

export default function Avatar({ size = 'message', framed = false }) {
  const [failed, setFailed] = useState(false)
  const { className, px, fit, clip, pad } = SIZES[size] ?? SIZES.message
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
      className={`${className} ${pad} ${frame} block shrink-0 rounded-full ${
        clip ? 'overflow-hidden' : ''
      }`}
    >
      <img
        src="/hamood.png"
        alt=""
        width={px}
        height={px}
        onError={() => setFailed(true)}
        className={`size-full ${fit}`}
      />
    </span>
  )
}
