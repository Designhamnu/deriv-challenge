/*
 * Assistant screen copy, verbatim from the build brief.
 *
 * Two labels are not supplied by the brief and are sourced rather than
 * invented: the welcome Field label reuses PRD section 5's "What are you
 * saving for?", and the composer label reuses Hamood's own question from the
 * scripted reply. CLAUDE.md section 10 forbids a placeholder standing in for
 * a label, so both fields carry a real one.
 */

export const WELCOME = {
  greeting: "Assalamu alaikum, I'm Hamood",
  tagline: 'Your AI savings coach on Nawa.',
  chips: ['A home', 'A car', 'A wedding', 'Something else'],
  // Prefixes a chip choice so the first user message reads as a sentence.
  goalPrefix: 'I want to save money for: ',
  fieldLabel: 'What are you saving for?',
  fieldPlaceholder: 'Or tell me in your own words',
}

export const THINKING_LABEL = 'Hamood is thinking'

export const COMPOSER = {
  send: 'Send',
  label: 'What do you take home a month?',
  placeholder: 'Type your answer',
  error:
    "That doesn't look like a number — how much do you take home each month?",
}

export const SCRIPT = {
  currency: 'AED',

  // The home path keeps the copy from the brief, word for word. Every other
  // goal takes its cost estimate from src/data/goals.js and is followed by the
  // same income question.
  homeReply: [
    "A home in Dubai. Good — that's the one most people put off because the number scares them.",
    "A 2-bedroom in JVC runs about AED 1.2M. You'd need around AED 240,000 down, plus roughly AED 50,000 in fees people forget about. Call it AED 290,000. What do you take home a month?",
  ],

  incomeQuestion: 'What do you take home a month?',

  // The income is echoed back, so this reads from what was actually entered.
  planIntro: (income) => `At ${income} a month, here's the real picture:`,

  planLabels: {
    monthly: 'Monthly contribution',
    date: 'On track for',
  },

  // Copy as written in the brief, with the figures substituted from the
  // selected goal's target and the entered income.
  planNotes: ({ share, slower, slowerDate }) => [
    `That's ${share}% of your income. It's doable, but you'll feel it — no big holidays, and you'd want a separate emergency fund before you start.`,
    `If that's too tight, ${slower} gets you there by ${slowerDate}. Slower, but you'd still have a life.`,
  ],

  // Shown when the goal is out of reach on this income. [X] is the income,
  // so it takes the bare number — the sentence supplies the currency.
  tooLow: (income) =>
    `At ${income} AED a month, this goal would take longer than most plans make sense for. Either the target needs to come down, or this is one to come back to when your income changes.`,

  suggestedActions: ({ faster, slower }) => [
    { id: 'start-faster', label: `Start with ${faster}`, variant: 'secondary', starts: true },
    { id: 'start-slower', label: `Start with ${slower}`, variant: 'secondary', starts: true },
  ],

  customAction: {
    id: 'custom',
    label: 'Enter my own amount',
    variant: 'ghost',
    custom: true,
  },

  // The label is carried for screen readers only — the placeholder is the
  // visible prompt, per the brief.
  customField: {
    label: 'Monthly amount you can save',
    placeholder: 'Monthly amount you can save',
    // DERIVED, not supplied — mirrors the income error, asking the other question.
    error:
      "That doesn't look like a number — how much can you save each month?",
    // DERIVED, not supplied — follows the "Start with ..." naming of the suggestions.
    submit: 'Start with this amount',
  },

  // Split around the inline link to the goal screen.
  confirmation: {
    lead: "Done. First transfer goes out on the 1st, the day after payday. I'll check in each month and tell you if you're drifting. You can see your plan any time in ",
    link: 'My savings',
    tail: '.',
  },
}

export const TIMING = {
  firstReply: 1200,
  plan: 1800,
}

/** The assistant's opening reply for a matched goal, as one or two Cards. */
export function replyFor(goal) {
  if (goal.id === 'home') return SCRIPT.homeReply
  return [goal.response.turn2, SCRIPT.incomeQuestion]
}
