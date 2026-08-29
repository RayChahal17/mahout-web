/** Copy for Path app screenshot overlays (hero carousel + product story). */

export type PathScreenshotStory = {
  eyebrow: string;
  title: string;
  body: string;
  chips: readonly string[];
};

export const PATH_SCREENSHOT_STORIES = {
  timeline: {
    eyebrow: "Timeline",
    title: "Color the day in ten-minute proof",
    body: "Tap or drag empty slots — timed blocks and check-offs share one honest grid.",
    chips: ["10-min slots", "Drag to log", "One view"],
  },
  today: {
    eyebrow: "Today on the Path",
    title: "Pending, playing, and done",
    body: "One list for what's due now, live minutes, and what already closed.",
    chips: ["Play", "Pending", "Done"],
  },
  createTimeBased: {
    eyebrow: "Time-based",
    title: "Minutes that compound",
    body: "Build your library once — press Play when it's time to focus.",
    chips: ["Timer", "Reuse daily", "Tracked"],
  },
  createCheckoffs: {
    eyebrow: "Check-offs",
    title: "Clear yes/no proof",
    body: "Sleep, goals, boundaries — one tap closes the day, no timer required.",
    chips: ["Daily", "Checked", "Proof"],
  },
  linkedGoal: {
    eyebrow: "Linked to Mountain",
    title: "Effort rolls up to goals",
    body: "Tracked time and completions show whether direction is actually moving.",
    chips: ["Goal link", "Hours", "Attainment"],
  },
} as const satisfies Record<string, PathScreenshotStory>;

export type PathScreenshotStoryKey = keyof typeof PATH_SCREENSHOT_STORIES;
