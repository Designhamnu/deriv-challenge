const TONE = {
  primary: 'bg-brand text-paper',
  secondary: 'border border-line bg-surface text-ink',
  ghost: 'bg-transparent text-ink',
}

const INTERACTION = {
  primary: 'hover:bg-brand-hover active:bg-brand-hover active:opacity-90',
  secondary: 'hover:bg-line active:bg-line active:opacity-90',
  ghost: 'hover:bg-surface active:bg-line',
}

export default function Button({
  variant = 'primary',
  type = 'button',
  loading = false,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const inert = disabled || loading

  return (
    <button
      type={type}
      disabled={inert}
      aria-busy={loading || undefined}
      className={[
        'inline-flex h-11 items-center justify-center gap-2 rounded-full px-6',
        'text-small font-medium transition-fill',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        TONE[variant] ?? TONE.primary,
        inert
          ? 'cursor-not-allowed opacity-50'
          : `cursor-pointer ${INTERACTION[variant] ?? INTERACTION.primary}`,
        className,
      ].join(' ')}
      {...rest}
    >
      {loading ? (
        <span
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </button>
  )
}
