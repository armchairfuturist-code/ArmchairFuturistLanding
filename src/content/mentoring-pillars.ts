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
      "AI feels overwhelming until you have a frame for it. We start with how it actually works, in plain terms, mapped to your role. The mental model that lets you evaluate any new tool yourself.",
  },
  {
    icon: "FlaskConical",
    title: "Test it live",
    description:
      "Then we run that model against your real work. The bottleneck you walked in with, the workflow eating your week. You watch it hold up or break, and adjust.",
  },
  {
    icon: "TrendingUp",
    title: "Own the judgment",
    description:
      "By the end you're making the calls about where AI fits in your work and building from there.",
  },
];
