export default function Card({
  tone = 'paper',
  className = '',
  children,
  ...rest
}) {
  return (
    <div
      className={[
        'rounded-card border border-line p-6',
        tone === 'surface' ? 'bg-surface' : 'bg-paper',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
