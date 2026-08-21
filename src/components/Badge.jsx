const TONE = {
  neutral: 'bg-surface text-muted',
  positive: 'bg-positive/10 text-positive',
  negative: 'bg-negative/10 text-negative',
}

export default function Badge({ tone = 'neutral', className = '', children }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-label',
        TONE[tone] ?? TONE.neutral,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
