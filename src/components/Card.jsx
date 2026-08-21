const FILL = {
  paper: 'border-line bg-paper',
  surface: 'border-line bg-surface',
  brand: 'border-brand bg-brand text-paper',
}

export default function Card({
  tone = 'paper',
  className = '',
  children,
  ...rest
}) {
  return (
    <div
      className={[
        'rounded-card border p-6 shadow-card',
        FILL[tone] ?? FILL.paper,
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
