import Button from './Button.jsx'

export default function EmptyState({
  heading,
  description,
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={['flex flex-col items-center px-6 py-12 text-center', className].join(' ')}
    >
      <h3 className="text-heading text-ink">{heading}</h3>
      <p className="mt-2 max-w-md text-small text-muted">{description}</p>
      {actionLabel ? (
        <div className="mt-6">
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
