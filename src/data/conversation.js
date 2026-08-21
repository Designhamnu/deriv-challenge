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
  placeholder: 'Monthly take-home',
  error:
    "That doesn't look like a number — how much do you take home each month?",
}

export const SCRIPT = {
  currency: 'AED',

  firstReply: [
    "A home in Dubai. Good — that's the one most people put off because the number scares them.",
    "A 2-bedroom in JVC runs about AED 1.2M. You'd need around AED 240,000 down, plus roughly AED 50,000 in fees people forget about. Call it AED 290,000. What do you take home a month?",
  ],

  // The income is echoed back, so this reads from what was actually entered.
  planIntro: (income) => `At ${income} a month, here's the real picture:`,

  planLabels: {
    monthly: 'Monthly contribution',
    date: 'On track for',
  },

  planDate: 'March 2030',

  planNotes: [
    "That's 28% of your income. It's doable, but you'll feel it — no big holidays, and you'd want a separate emergency fund before you start.",
    "If that's too tight, AED 3,500 gets you there by late 2031. Slower, but you'd still have a life.",
  ],

  actions: [
    { id: 'start-5000', label: 'Start with 5,000', variant: 'secondary', starts: true },
    { id: 'start-3500', label: 'Start with 3,500', variant: 'secondary', starts: true },
    { id: 'think', label: 'Let me think', variant: 'ghost', starts: false },
  ],

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
