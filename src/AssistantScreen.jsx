import { useEffect, useRef, useState } from 'react'
import Button from './components/Button.jsx'
import Card from './components/Card.jsx'
import Field from './components/Field.jsx'
import StatBlock from './components/StatBlock.jsx'
import { CONVERSATION } from './data/conversation.js'
import { matchGoal } from './data/goals.js'
import { formatMonthYear, monthsFromNow } from './lib/date.js'
import { formatMoney } from './lib/money.js'
import { navigate } from './lib/router.js'

const THINKING_MS = 800
const CONFIRM_MS = 900

/** 40px avatar, falling back to a brand-soft circle if the image is missing. */
function Avatar() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className="size-10 shrink-0 rounded-full bg-brand-soft"
      />
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

function AssistantMessage({ children }) {
  return (
    <div className="flex gap-4">
      <Avatar />
      <Card tone="surface" className="w-fit">
        {children}
      </Card>
    </div>
  )
}

function UserMessage({ text }) {
  return (
    <div className="flex justify-end">
      <Card className="w-fit">
        <p className="text-body text-ink">{text}</p>
      </Card>
    </div>
  )
}

export default function AssistantScreen() {
  const [messages, setMessages] = useState([
    { id: 'open', role: 'assistant', text: CONVERSATION.opening },
  ])
  const [step, setStep] = useState('goal')
  const [goal, setGoal] = useState(null)
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [thinking, setThinking] = useState(false)

  const timers = useRef([])
  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms))
  }

  const say = (message) => setMessages((prev) => [...prev, message])

  const askIncome = (matched) => {
    setGoal(matched)
    say({
      id: `turn2-${matched.id}-${Date.now()}`,
      role: 'assistant',
      text: matched.response.turn2,
      followUp: CONVERSATION.incomeQuestion,
    })
    setStep('income')
  }

  const submitGoal = (answer) => {
    const text = answer.trim()
    if (!text) return

    say({ id: `user-goal-${Date.now()}`, role: 'user', text })
    setDraft('')
    setThinking(true)

    later(() => {
      setThinking(false)
      askIncome(matchGoal(text))
    }, THINKING_MS)
  }

  const submitIncome = () => {
    const income = Number(draft.trim())

    if (!draft.trim() || !Number.isFinite(income) || income <= 0) {
      setError(CONVERSATION.incomeError)
      return
    }

    setError('')
    say({
      id: `user-income-${Date.now()}`,
      role: 'user',
      text: formatMoney(income, { currency: goal.currency }),
    })
    setDraft('')
    setThinking(true)

    later(() => {
      setThinking(false)
      say({
        id: `turn3-${goal.id}-${Date.now()}`,
        role: 'assistant',
        text: goal.response.turn3,
        plan: {
          monthly: goal.monthly,
          currency: goal.currency,
          date: formatMonthYear(monthsFromNow(goal.months)),
        },
      })
      setStep('plan')
    }, THINKING_MS)
  }

  const confirmPlan = () => {
    say({ id: `success-${Date.now()}`, role: 'assistant', text: CONVERSATION.success })
    setStep('done')
    later(() => navigate('/'), CONFIRM_MS)
  }

  const adjustPlan = () => {
    setDraft('')
    setError('')
    setStep('income')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (step === 'goal') submitGoal(draft)
    else if (step === 'income') submitIncome()
  }

  const composerOpen = step === 'goal' || step === 'income'
  const onGoalStep = step === 'goal'

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[640px] flex-col">
      <h1 className="text-title text-ink">Assistant</h1>

      <div
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        className="mt-8 flex flex-1 flex-col gap-6"
      >
        {messages.map((message) =>
          message.role === 'user' ? (
            <UserMessage key={message.id} text={message.text} />
          ) : (
            <AssistantMessage key={message.id}>
              <p className="text-body text-ink">{message.text}</p>

              {message.followUp ? (
                <p className="mt-4 text-body text-ink">{message.followUp}</p>
              ) : null}

              {message.plan ? (
                <>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <StatBlock
                      label={CONVERSATION.planLabels.monthly}
                      value={message.plan.monthly}
                      currency={message.plan.currency}
                      size="body"
                    />
                    <StatBlock
                      label={CONVERSATION.planLabels.date}
                      value={message.plan.date}
                      size="body"
                    />
                  </div>

                  {step === 'plan' ? (
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Button variant="primary" onClick={confirmPlan}>
                        {CONVERSATION.confirm}
                      </Button>
                      <Button variant="secondary" onClick={adjustPlan}>
                        {CONVERSATION.adjust}
                      </Button>
                    </div>
                  ) : null}
                </>
              ) : null}
            </AssistantMessage>
          ),
        )}

        {thinking ? (
          <AssistantMessage>
            <p className="flex items-center gap-2 text-small text-muted">
              <span
                aria-hidden="true"
                className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
              />
              {CONVERSATION.loading}
            </p>
          </AssistantMessage>
        ) : null}
      </div>

      {composerOpen ? (
        <div className="sticky bottom-0 mt-8 border-t border-line bg-paper py-4">
          <form onSubmit={handleSubmit} className="flex items-end gap-4">
            <Field
              className="flex-1"
              label={onGoalStep ? CONVERSATION.opening : CONVERSATION.incomeQuestion}
              type={onGoalStep ? 'text' : 'number'}
              placeholder={onGoalStep ? CONVERSATION.goalPlaceholder : undefined}
              value={draft}
              error={onGoalStep ? undefined : error || undefined}
              onChange={(event) => {
                setDraft(event.target.value)
                if (error) setError('')
              }}
            />
            <Button type="submit" variant="primary" disabled={thinking}>
              {CONVERSATION.send}
            </Button>
          </form>

          {onGoalStep ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {CONVERSATION.suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="secondary"
                  disabled={thinking}
                  onClick={() => submitGoal(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
