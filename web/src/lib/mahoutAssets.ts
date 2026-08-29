/** Transparent element art served from /public/images/elements */

export const MAHOUT_ELEMENT_IMAGES = {
  heroMahoutJourney: "/images/elements/hero-mahout-journey.png",
  mountain: "/images/elements/mountain.png",
  mountainScene: "/images/elements/mountain-scene.png",
  path: "/images/elements/path.png",
  pathScene: "/images/elements/path-scene.png",
  elephant: "/images/elements/elephant.png",
  elephantScene: "/images/elements/elephant-scene.png",
  mahoutReflection: "/images/elements/mahout-reflection.png",
  mahoutScene: "/images/elements/mahout-scene.png",
  mentorGuide: "/images/elements/mentor-guide.png",
  brain: "/images/elements/brain.png",
  letters: "/images/elements/letters.png",
  systemLoop: "/images/elements/system-loop.png",
  connectedSystemLoop: "/images/elements/connected-system-loop.png",
  modesOrbit: "/images/elements/modes-orbit.png",
  northStarOrigin: "/images/elements/north-star-origin.png",
  northStarFutureSelf: "/images/elements/north-star-future-self.png",
  northStarCarouselOrigin: "/images/elements/north-star-carousel-origin.png",
  northStarCarouselReceipts: "/images/elements/north-star-carousel-receipts.png",
  northStarCarouselLifeMap: "/images/elements/north-star-carousel-lifemap.png",
  northStarCarouselWindow: "/images/elements/north-star-carousel-window.png",
  northStarCarouselLetter: "/images/elements/north-star-carousel-letter.png",
  northStarCarouselModes: "/images/elements/north-star-carousel-modes.png",
  habit21: "/images/elements/habit-21.png",
  behavior66: "/images/elements/behavior-66.png",
  /** Combined 21 + 66 habit/behavior scene for Habits chapter hero */
  habitsSignals: "/images/elements/habits-signals.png",
} as const;

export type MahoutElementImageKey = keyof typeof MAHOUT_ELEMENT_IMAGES;

export const ELEMENT_DEEP_DIVE_ASSETS: Partial<
  Record<"mountain" | "path" | "elephant" | "mahout" | "north-star", string>
> = {
  mountain: MAHOUT_ELEMENT_IMAGES.mountainScene,
  path: MAHOUT_ELEMENT_IMAGES.pathScene,
  elephant: MAHOUT_ELEMENT_IMAGES.elephantScene,
  mahout: MAHOUT_ELEMENT_IMAGES.mahoutScene,
  "north-star": MAHOUT_ELEMENT_IMAGES.northStarOrigin,
};

/** Same scene art as element deep dives — keeps Core Story cards aligned with detail sections. */
export const CORE_STORY_ASSETS: typeof ELEMENT_DEEP_DIVE_ASSETS = {
  ...ELEMENT_DEEP_DIVE_ASSETS,
};

/** Path app screenshots — drop files in public/images/screenshots/path/ */
export const MAHOUT_PATH_SCREENSHOTS = {
  timeline: "/images/screenshots/path/path-timeline.png",
  today: "/images/screenshots/path/path-today.png",
  createTimeBased: "/images/screenshots/path/path-create-time-based.png",
  createCheckoffs: "/images/screenshots/path/path-create-checkoffs.png",
  linkedGoal: "/images/screenshots/path/path-linked-goal.png",
  timelineStill: "/images/screenshots/path/path-timeline-still.png",
  timeBasedStill: "/images/screenshots/path/path-time-based-still.png",
  checkoffsStill: "/images/screenshots/path/path-checkoffs-still.png",
} as const;

export const MAHOUT_SCREENSHOT_SLOTS = {
  futureVision: "/images/screenshots/future-vision-setup.png",
  pathProof: "/images/screenshots/path/path-linked-goal.png",
  morningLetter: "/images/screenshots/morning-letter.png",
  eveningLetter: "/images/screenshots/evening-letter.png",
  weeklyReview: "/images/screenshots/weekly-review.png",
  modeSelector: "/images/screenshots/mode-selector.png",
  notificationTodayLanes: "/images/screenshots/notification-today-lanes.png",
  notificationEveningClose: "/images/screenshots/notification-evening-close.png",
  notificationGoalDeadline: "/images/screenshots/notification-goal-deadline.png",
} as const;
