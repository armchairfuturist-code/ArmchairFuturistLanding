export interface AnswerOption {
  text: string;
  scores: {
    clarity: number;
    readiness: number;
    urgency: number;
  };
  individual?: boolean;
}

export interface Question {
  id: number;
  text: string;
  answers: AnswerOption[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "When someone says \"AI strategy\" in a meeting, what's the honest reaction in the room?",
    answers: [
      {
        text: "People nod politely and change the subject within five minutes.",
        scores: { clarity: 0, readiness: 0, urgency: 2 },
      },
      {
        text: "Two or three people get energized. Everyone else waits it out.",
        scores: { clarity: 1, readiness: 1, urgency: 1 },
      },
      {
        text: "We've got pilots running, but nobody can explain what they're actually for.",
        scores: { clarity: 0, readiness: 2, urgency: 3 },
      },
      {
        text: "I'm not in a \"meeting\" context. I'm figuring this out on my own.",
        scores: { clarity: 1, readiness: 1, urgency: 1 },
        individual: true,
      },
    ],
  },
  {
    id: 2,
    text: "How do you actually decide which AI tools to use?",
    answers: [
      {
        text: "Whoever saw the latest demo gets 20 minutes to make their case.",
        scores: { clarity: 0, readiness: 0, urgency: 1 },
      },
      {
        text: "We have a process on paper. In practice, nobody follows it.",
        scores: { clarity: 1, readiness: 0, urgency: 1 },
      },
      {
        text: "I try things myself and keep what works.",
        scores: { clarity: 1, readiness: 1, urgency: 1 },
        individual: true,
      },
      {
        text: "We evaluate against business outcomes. It's slow but deliberate.",
        scores: { clarity: 3, readiness: 3, urgency: 1 },
      },
    ],
  },
  {
    id: 3,
    text: "What keeps you up at night about AI?",
    answers: [
      {
        text: "I genuinely can't tell what's real from what's hype anymore.",
        scores: { clarity: 0, readiness: 1, urgency: 1 },
      },
      {
        text: "I know exactly what we should do, but I can't get anyone to commit.",
        scores: { clarity: 3, readiness: 0, urgency: 3 },
      },
      {
        text: "We're spending money and I have no way to tell if it's working.",
        scores: { clarity: 1, readiness: 1, urgency: 3 },
      },
      {
        text: "I feel personally behind and I'm not sure how to close the gap.",
        scores: { clarity: 0, readiness: 1, urgency: 2 },
        individual: true,
      },
    ],
  },
  {
    id: 4,
    text: "How much time per week do you spend trying to keep up with AI?",
    answers: [
      {
        text: "Almost none. I stopped trying to track it.",
        scores: { clarity: 0, readiness: 0, urgency: 0 },
      },
      {
        text: "An hour or two. Enough to feel informed, not enough to feel confident.",
        scores: { clarity: 1, readiness: 1, urgency: 2 },
      },
      {
        text: "Multiple hours. It's basically a part-time job at this point.",
        scores: { clarity: 1, readiness: 1, urgency: 3 },
      },
      {
        text: "It comes in waves. Some weeks I'm obsessive, other weeks I pretend it doesn't exist.",
        scores: { clarity: 0, readiness: 0, urgency: 2 },
      },
    ],
  },
  {
    id: 5,
    text: "What have you already tried?",
    answers: [
      {
        text: "Bought a few tool subscriptions. Used them for a week. Forgot about them.",
        scores: { clarity: 0, readiness: 0, urgency: 1 },
      },
      {
        text: "Hired a consultant or took a course. Helped in the moment, but the momentum died.",
        scores: { clarity: 1, readiness: 1, urgency: 2 },
      },
      {
        text: "Built some internal processes around AI. They work, but they're fragile.",
        scores: { clarity: 2, readiness: 2, urgency: 2 },
      },
      {
        text: "Not much yet. I've been watching and waiting for the right moment.",
        scores: { clarity: 0, readiness: 0, urgency: 0 },
      },
    ],
  },
  {
    id: 6,
    text: "If you could fix one thing about how AI gets handled in your world, what would it be?",
    answers: [
      {
        text: "People would stop treating it as the IT department's problem.",
        scores: { clarity: 1, readiness: 0, urgency: 3 },
      },
      {
        text: "Leadership would commit real resources instead of running yet another pilot.",
        scores: { clarity: 2, readiness: 0, urgency: 3 },
      },
      {
        text: "We'd have a framework for evaluating opportunities instead of chasing every shiny thing that drops.",
        scores: { clarity: 0, readiness: 1, urgency: 2 },
      },
      {
        text: "I'd have a clear path for my own professional development with AI.",
        scores: { clarity: 1, readiness: 1, urgency: 1 },
        individual: true,
      },
    ],
  },
  {
    id: 7,
    text: "When it comes to getting outside help with AI, what's your honest take?",
    answers: [
      {
        text: "I'd invest real money if I trusted the person and the outcome was specific.",
        scores: { clarity: 2, readiness: 3, urgency: 3 },
      },
      {
        text: "I've been burned by consultants who sold slide decks and disappeared.",
        scores: { clarity: 1, readiness: 1, urgency: 2 },
      },
      {
        text: "I'm open to it, but I need to see proof before I write a check.",
        scores: { clarity: 1, readiness: 2, urgency: 2 },
      },
      {
        text: "I mostly figure things out myself. I don't love paying for advice.",
        scores: { clarity: 1, readiness: 0, urgency: 0 },
        individual: true,
      },
    ],
  },
  {
    id: 8,
    text: "Forget the org chart for a second. How do you personally feel about AI?",
    answers: [
      {
        text: "Fascinated but overwhelmed. There's too much coming too fast.",
        scores: { clarity: 0, readiness: 1, urgency: 2 },
      },
      {
        text: "Cautiously optimistic. I see the potential, but I've been around long enough to know better than to believe the hype.",
        scores: { clarity: 3, readiness: 1, urgency: 0 },
      },
      {
        text: "Frustrated. The gap between knowing it matters and actually doing something about it is wearing me out.",
        scores: { clarity: 2, readiness: 0, urgency: 3 },
      },
      {
        text: "Honestly? A little threatened. I'm not sure where I fit in five years.",
        scores: { clarity: 0, readiness: 0, urgency: 3 },
        individual: true,
      },
    ],
  },
  {
    id: 9,
    text: "What would make the next 90 days feel like a win?",
    answers: [
      {
        text: "A clear AI strategy my team actually follows through on.",
        scores: { clarity: 2, readiness: 2, urgency: 3 },
      },
      {
        text: "One AI initiative delivering results I can point to and measure.",
        scores: { clarity: 2, readiness: 3, urgency: 3 },
      },
      {
        text: "I'd stop feeling like I'm falling behind everyone else.",
        scores: { clarity: 0, readiness: 0, urgency: 2 },
        individual: true,
      },
      {
        text: "A professional identity that reflects where the world is heading, not where it was.",
        scores: { clarity: 1, readiness: 1, urgency: 1 },
        individual: true,
      },
    ],
  },
];
