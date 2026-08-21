import { useEffect, useRef, useState } from 'react'
import Avatar from './components/Avatar.jsx'
import Button from './components/Button.jsx'
import Card from './components/Card.jsx'
import Field from './components/Field.jsx'
import StatBlock from './components/StatBlock.jsx'
import {
  COMPOSER,
  SCRIPT,
  THINKING_LABEL,
  TIMING,
  WELCOME,
} from './data/conversation.js'
import { formatMoney } from './lib/money.js'
import { navigate } from './lib/router.js'

const DOT_DELAYS = [0, 150, 300]

/** Three dots. The reduced-motion reset in index.css leaves them static. */
function ThinkingDots() {
  return (
    <span aria-hidden="true" className="flex items-center gap-1">
      {DOT_DELAYS.map((delay) => (
        <span
          key={delay}
          className="size-2 animate-pulse rounded-full bg-muted"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  )
}

function AssistantRow({ children }) {
  return (
    <div className="flex gap-4">
      <Avatar />
      <div className="flex w-fit flex-col gap-4">{children}</div>
    </div>
  )
}

function UserRow({ text }) {
  return (
    <div className="flex justify-end">
      <Card className="w-fit">
        <p className="text-body text-ink">{text}</p>
      </Card>
    </div>
  )
}

export default function AssistantScreen() {
  const [phase, setPhase] = useState('welcome')
  const [messages, setMessages] = useState([])
  const [step, setStep] = useState('idle')
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [thinking, setThinking] = useState(false)

  const timers = useRef([])
  const endRef = useRef(null)

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase !== 'chat') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    endRef.current?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'end',
    })
  }, [messages, thinking, phase])

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
  const say = (message) => setMessages((prev) => [...prev, message])

  const choose = (answer) => {
    const text = answer.trim()
    if (!text) return

    setPhase('chat')
    setMessages([{ id: 'user-goal', role: 'user', text }])
    setDraft('')
    setThinking(true)

    later(() => {
      setThinking(false)
      SCRIPT.firstReply.forEach((line, index) =>
        say({ id: `reply-${index}`, role: 'assistant', text: line }),
      )
      setStep('income')
    }, TIMING.firstReply)
  }

  const submitIncome = () => {
    const income = Number(draft.trim())

    if (!draft.trim() || !Number.isFinite(income) || income <= 0) {
      setError(COMPOSER.error)
      return
    }

    setError('')
    say({
      id: `user-income-${messages.length}`,
      role: 'user',
      text: formatMoney(income, { currency: SCRIPT.currency }),
    })
    setDraft('')
    setStep('waiting')
    setThinking(true)

    later(() => {
      setThinking(false)
      say({ id: 'plan', role: 'assistant', plan: true })
      setStep('plan')
    }, TIMING.plan)
  }

  const act = (action) => {
    if (!action.starts) {
      setStep('dismissed')
      return
    }
    say({ id: 'confirmation', role: 'assistant', text: SCRIPT.confirmation })
    setStep('done')
    later(() => navigate('/'), TIMING.navigate)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (phase === 'welcome') choose(draft)
    else if (step === 'income') submitIncome()
  }

  if (phase === 'welcome') {
    return (
      <div className="flex min-h-[calc(100dvh-4rem)] items-center">
        <div className="grid w-full gap-8 md:grid-cols-2 md:items-center">
          <div className="flex justify-center md:justify-start">
            <Avatar size="hero" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-title text-ink">{WELCOME.greeting}</h1>
            <p className="mt-2 text-body text-muted">{WELCOME.tagline}</p>

            <div className="mt-8 flex flex-col gap-4">
              {WELCOME.chips.map((chip) => (
                <Button
                  key={chip}
                  variant="secondary"
                  className="w-full"
                  onClick={() => choose(chip)}
                >
                  {chip}
                </Button>
              ))}
            </div>

            <form className="mt-8" onSubmit={handleSubmit}>
              <Field
                label={WELCOME.fieldLabel}
                placeholder={WELCOME.fieldPlaceholder}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    )
  }

  const composerOpen = step === 'income' || step === 'waiting'

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[640px] flex-col">
      <h1 className="sr-only">Hamood</h1>

      <div
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        className="flex flex-1 flex-col gap-6"
      >
        {messages.map((message) => {
          if (message.role === 'user') {
            return <UserRow key={message.id} text={message.text} />
          }

          if (!message.plan) {
            return (
              <AssistantRow key={message.id}>
                <Card tone="surface">
                  <p className="text-body text-ink">{message.text}</p>
                </Card>
              </AssistantRow>
            )
          }

          return (
            <AssistantRow key={message.id}>
              <Card tone="surface">
                <p className="text-body text-ink">{SCRIPT.planIntro}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {SCRIPT.planStats.map((stat) => (
                    <StatBlock
                      key={stat.id}
                      label={stat.label}
                      value={stat.value}
                      currency={SCRIPT.currency}
                      size="body"
                    />
                  ))}
                </div>

                {SCRIPT.planNotes.map((note) => (
                  <p key={note} className="mt-6 text-body text-ink">
                    {note}
                  </p>
                ))}
              </Card>

              {step === 'plan' ? (
                <div className="flex flex-wrap gap-4">
                  {SCRIPT.actions.map((action) => (
                    <Button
                      key={action.id}
                      variant={action.variant}
                      onClick={() => act(action)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              ) : null}
            </AssistantRow>
          )
        })}

        {thinking ? (
          <AssistantRow>
            <Card tone="surface">
              <p className="flex items-center gap-2 text-small text-muted">
                {THINKING_LABEL}
                <ThinkingDots />
              </p>
            </Card>
          </AssistantRow>
        ) : null}

        <div ref={endRef} />
      </div>

      {composerOpen ? (
        <div className="sticky bottom-0 mt-8 border-t border-line bg-paper py-4">
          <form onSubmit={handleSubmit} className="flex items-end gap-4">
            <Field
              className="flex-1"
              label={COMPOSER.label}
              type="number"
              placeholder={COMPOSER.placeholder}
              value={draft}
              error={error || undefined}
              disabled={thinking}
              onChange={(event) => {
                setDraft(event.target.value)
                if (error) setError('')
              }}
            />
            <Button type="submit" variant="primary" disabled={thinking}>
              {COMPOSER.send}
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  )
}
