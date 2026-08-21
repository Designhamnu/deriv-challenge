import { useEffect, useRef, useState } from 'react'
import Avatar from './components/Avatar.jsx'
import Button from './components/Button.jsx'
import Card from './components/Card.jsx'
import Field from './components/Field.jsx'
import StatBlock from './components/StatBlock.jsx'
import {
  COMPOSER,
  replyFor,
  SCRIPT,
  THINKING_LABEL,
  TIMING,
  WELCOME,
} from './data/conversation.js'
import { formatAmount, formatMoney } from './lib/money.js'
import {
  isAffordable,
  monthsToTarget,
  planOptions,
  shareOfIncome,
} from './lib/plan.js'
import { matchGoal } from './data/goals.js'
import { ROUTES } from './data/navigation.js'
import { formatMonthYear, monthsFromNow } from './lib/date.js'
import { navigate } from './lib/router.js'
import { setSelectedGoalId } from './lib/store.js'

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

function AssistantRow({ spacing = '', children }) {
  return (
    <div className={`flex gap-4 ${spacing}`}>
      <Avatar framed />
      <div className="flex w-fit max-w-[75%] flex-col gap-4">{children}</div>
    </div>
  )
}

function UserRow({ text, spacing = '' }) {
  return (
    <div className={`flex justify-end ${spacing}`}>
      <Card tone="brand" className="w-fit max-w-[75%]">
        <p className="text-body">{text}</p>
      </Card>
    </div>
  )
}

export default function AssistantScreen() {
  const [phase, setPhase] = useState('welcome')
  const [messages, setMessages] = useState([])
  const [step, setStep] = useState('idle')
  const [goal, setGoal] = useState(null)
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [thinking, setThinking] = useState(false)
  const [customOpen, setCustomOpen] = useState(false)
  const [customDraft, setCustomDraft] = useState('')
  const [customError, setCustomError] = useState('')

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
    // customOpen included so revealing the amount field scrolls it into view
  }, [messages, thinking, phase, customOpen])

  // 8px between assistant Cards inside one turn, 24px between turns.
  const spacingFor = (message, index) => {
    if (index === 0) return ''
    return message.grouped ? 'mt-2' : 'mt-6'
  }

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
  const say = (message) => setMessages((prev) => [...prev, message])

  const choose = (answer, { prefixed = false } = {}) => {
    const raw = answer.trim()
    if (!raw) return
    const text = prefixed ? `${WELCOME.goalPrefix}${raw}` : raw
    // Match on what they actually said, not the prefixed sentence.
    const matched = matchGoal(raw)

    setGoal(matched)
    setPhase('chat')
    setMessages([{ id: 'user-goal', role: 'user', text }])
    setDraft('')
    setThinking(true)

    later(() => {
      setThinking(false)
      replyFor(matched).forEach((line, index) =>
        say({
          id: `reply-${index}`,
          role: 'assistant',
          text: line,
          grouped: index > 0,
        }),
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
      const affordable = isAffordable(goal.monthly, income)
      const { faster, slower } = planOptions(income)

      say({
        id: 'plan',
        role: 'assistant',
        plan: affordable
          ? {
              income,
              affordable,
              faster,
              slower,
              share: shareOfIncome(faster, income),
              fasterDate: formatMonthYear(
                monthsFromNow(monthsToTarget(goal.target, faster)),
              ),
              slowerDate: formatMonthYear(
                monthsFromNow(monthsToTarget(goal.target, slower)),
              ),
            }
          : { income, affordable },
      })
      setStep('plan')
    }, TIMING.plan)
  }

  const adopt = () => {
    if (goal) setSelectedGoalId(goal.id)
    say({ id: 'confirmation', role: 'assistant', confirmation: true })
    setCustomOpen(false)
    setStep('done')
  }

  const act = (action) => {
    if (action.custom) {
      setCustomOpen(true)
      return
    }
    adopt()
  }

  const submitCustom = (event) => {
    event.preventDefault()
    const amount = Number(customDraft.trim())

    if (!customDraft.trim() || !Number.isFinite(amount) || amount <= 0) {
      setCustomError(SCRIPT.customField.error)
      return
    }

    setCustomError('')
    adopt()
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
                  onClick={() => choose(chip, { prefixed: true })}
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
        className="flex flex-1 flex-col"
      >
        {messages.map((message, index) => {
          const spacing = spacingFor(message, index)

          if (message.role === 'user') {
            return <UserRow key={message.id} text={message.text} spacing={spacing} />
          }

          if (message.confirmation) {
            return (
              <AssistantRow key={message.id} spacing={spacing}>
                <Card>
                  <p className="text-body text-ink">
                    {SCRIPT.confirmation.lead}
                    <a
                      href={ROUTES.goals}
                      onClick={(event) => {
                        event.preventDefault()
                        navigate(ROUTES.goals)
                      }}
                      className="text-brand underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    >
                      {SCRIPT.confirmation.link}
                    </a>
                    {SCRIPT.confirmation.tail}
                  </p>
                </Card>
              </AssistantRow>
            )
          }

          if (!message.plan) {
            return (
              <AssistantRow key={message.id} spacing={spacing}>
                <Card>
                  <p className="text-body text-ink">{message.text}</p>
                </Card>
              </AssistantRow>
            )
          }

          return (
            <AssistantRow key={message.id} spacing={spacing}>
              <Card>
                {message.plan.affordable ? (
                  <>
                    <p className="text-body text-ink">
                      {SCRIPT.planIntro(
                        formatMoney(message.plan.income, {
                          currency: SCRIPT.currency,
                          decimals: 0,
                        }),
                      )}
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <StatBlock
                        label={SCRIPT.planLabels.monthly}
                        value={message.plan.faster}
                        currency={SCRIPT.currency}
                        size="body"
                      />
                      <StatBlock
                        label={SCRIPT.planLabels.date}
                        value={message.plan.fasterDate}
                        size="body"
                      />
                    </div>

                    {SCRIPT.planNotes({
                      share: message.plan.share,
                      slower: formatMoney(message.plan.slower, {
                        currency: SCRIPT.currency,
                        decimals: 0,
                      }),
                      slowerDate: message.plan.slowerDate,
                    }).map((note) => (
                      <p key={note} className="mt-6 text-body text-ink">
                        {note}
                      </p>
                    ))}
                  </>
                ) : (
                  <p className="text-body text-ink">
                    {SCRIPT.tooLow(formatAmount(message.plan.income))}
                  </p>
                )}
              </Card>

              {step === 'plan' ? (
                <div className="flex flex-wrap gap-4">
                  {(message.plan.affordable
                    ? [
                        ...SCRIPT.suggestedActions({
                          faster: formatAmount(message.plan.faster),
                          slower: formatAmount(message.plan.slower),
                        }),
                        SCRIPT.customAction,
                      ]
                    : [SCRIPT.customAction]
                  ).map((action) => (
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

              {step === 'plan' && customOpen ? (
                <form onSubmit={submitCustom} className="flex items-end gap-4">
                  <Field
                    className="flex-1"
                    label={SCRIPT.customField.label}
                    labelHidden
                    type="text"
                    placeholder={SCRIPT.customField.placeholder}
                    value={customDraft}
                    error={customError || undefined}
                    onChange={(event) => {
                      setCustomDraft(event.target.value)
                      if (customError) setCustomError('')
                    }}
                  />
                  <Button type="submit" variant="primary">
                    {SCRIPT.customField.submit}
                  </Button>
                </form>
              ) : null}
            </AssistantRow>
          )
        })}

        {thinking ? (
          <AssistantRow spacing={messages.length ? 'mt-6' : ''}>
            <Card>
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
        <div className="sticky bottom-0 mt-8 border-t border-line bg-paper p-4">
          <form onSubmit={handleSubmit} className="flex items-end gap-4">
            <Field
              className="flex-1"
              label={COMPOSER.label}
              labelHidden
              type="text"
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
