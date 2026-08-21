import { useId } from 'react'

export default function Field({
  label,
  helper,
  error,
  id,
  type = 'text',
  disabled = false,
  className = '',
  ...rest
}) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const message = error ?? helper

  return (
    <div className={['flex flex-col', className].join(' ')}>
      <label htmlFor={inputId} className="mb-2 text-label text-muted">
        {label}
      </label>

      <input
        id={inputId}
        type={type}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={[
          'h-11 w-full rounded-control border px-3 text-body',
          'transition-fill placeholder:text-muted',
          'focus:outline-2 focus:outline-offset-2 focus:outline-focus',
          error ? 'border-negative' : 'border-line',
          disabled
            ? 'cursor-not-allowed bg-surface text-muted'
            : 'bg-paper text-ink',
        ].join(' ')}
        {...rest}
      />

      {message ? (
        <p
          id={messageId}
          className={[
            'mt-2 text-small',
            error ? 'text-negative' : 'text-muted',
          ].join(' ')}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
