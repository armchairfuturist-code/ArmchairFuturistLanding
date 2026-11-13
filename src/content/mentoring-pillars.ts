/** Mentoring pillar content — icon keys mapped in section adapter. */
export interface MentoringPillar {
  icon: string;
  title: string;
  description: string;
}

export const MENTORING_PILLARS: MentoringPillar[] = [
  {
    icon: "Lightbulb",
    title: "Build the mental model",
    description:
      "Nobody hands you a frame for AI, so we start with how models behave, in plain terms and mapped to your role. You leave able to judge any new tool yourself.",
  },
  {
    icon: "FlaskConical",
    title: "Test it live",
    description:
      "Then we run it against live work: the bottleneck you arrived with, the workflow eating your week. You watch it hold or break. The next move comes from what just happened.",
  },
  {
    icon: "TrendingUp",
    title: "Own the judgment",
    description:
      "By the end of a pack you decide where AI fits, and you build from your judgment, not my notes.",
  },
];
