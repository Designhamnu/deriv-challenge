import { useState } from 'react'

/*
 * Hamood's avatar, from /hamood.png.
 *
 * mark    — 32px circle, sidebar
 * message — 40px circle, conversation rows and the thinking indicator
 * hero    — 400x480 block, welcome state, no circle
 *
 * The source is a square canvas whose figure is 33.7% wide and 85.6% tall,
 * so most of the file is blank margin. The small sizes scale in on the head;
 * the hero covers its taller box, which trims only that blank margin
 * horizontally and lets the figure run close to full height.
 */
const SIZES = {
  mark: {
    box: 'size-8',
    w: 32,
    h: 32,
    fit: 'object-cover object-top',
    shape: 'rounded-full',
  },
  message: {
    box: 'size-10',
    w: 40,
    h: 40,
    fit: 'object-cover object-top origin-top scale-200',
    shape: 'rounded-full',
  },
  hero: {
    box: 'h-120 w-100',
    w: 400,
    h: 480,
    fit: 'object-cover object-center',
    shape: '',
  },
}

export default function Avatar({ size = 'message', framed = false }) {
  const [failed, setFailed] = useState(false)
  const { box, w, h, fit, shape } = SIZES[size] ?? SIZES.message
  const frame = framed ? 'border border-line bg-brand-soft' : ''

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={`${box} ${shape} ${frame} block shrink-0 bg-brand-soft`}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`${box} ${shape} ${frame} block shrink-0 overflow-hidden`}
    >
      <img
        src="/hamood.png"
        alt=""
        width={w}
        height={h}
        onError={() => setFailed(true)}
        className={`size-full ${fit}`}
      />
    </span>
  )
}
