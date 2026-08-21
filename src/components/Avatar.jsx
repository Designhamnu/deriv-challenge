import { useState } from 'react'

/** 40px assistant avatar, falling back to a brand-soft circle if the image is missing. */
export default function Avatar() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span aria-hidden="true" className="size-10 shrink-0 rounded-full bg-brand-soft" />
    )
  }

  return (
    <img
      src="/assistant.png"
      alt=""
      aria-hidden="true"
      width="40"
      height="40"
      onError={() => setFailed(true)}
      className="size-10 shrink-0 rounded-full object-cover"
    />
  )
}
