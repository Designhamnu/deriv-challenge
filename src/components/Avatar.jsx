import { useState } from 'react'

/*
 * Hamood's avatar. Falls back to a brand-soft circle when the image is
 * missing, which is currently the case — /hamood.png is not in public/.
 */
const SIZES = {
  sm: { className: 'size-10', px: 40 },
  lg: { className: 'size-70', px: 280 },
}

export default function Avatar({ size = 'sm' }) {
  const [failed, setFailed] = useState(false)
  const { className, px } = SIZES[size] ?? SIZES.sm

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={`${className} shrink-0 rounded-full bg-brand-soft`}
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
      className={`${className} shrink-0 rounded-full object-cover`}
    />
  )
}
