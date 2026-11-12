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
      "AI is overwhelming mainly because nobody handed you a frame for it, so we start with how models behave, in plain terms and mapped to the role you hold. What you come away with is a model good enough to judge any new tool on your own, which is the point where you stop asking me first.",
  },
  {
    icon: "FlaskConical",
    title: "Test it live",
    description:
      "After that, the model gets tested against live work: the bottleneck you arrived with, and the workflow that has been eating your week. You watch it hold up or fall apart in front of you, and the next move comes from what just happened rather than from theory.",
  },
  {
    icon: "TrendingUp",
    title: "Own the judgment",
    description:
      "By the end of a pack you are making the calls about where AI fits in your work, and you build from that judgment rather than from my notes.",
  },
];
