"use client";

import { type CSSProperties, useEffect, useState } from "react";

type StorySlide = {
  id: "origin" | "memory" | "lifemap" | "signal" | "letter" | "modes";
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  tone: "light" | "night";
};

const SLIDES: StorySlide[] = [
  {
    id: "origin",
    label: "Future You",
    eyebrow: "Origin",
    title: "Your ideal future self takes form.",
    body: "The life you named becomes a guide — not a generic chatbot.",
    tone: "light",
  },
  {
    id: "memory",
    label: "Receipts",
    eyebrow: "Memory",
    title: "What happened becomes light.",
    body: "Days, moods, and finished steps feed North Star so guidance stays grounded.",
    tone: "light",
  },
  {
    id: "lifemap",
    label: "Life Map",
    eyebrow: "Life Lab",
    title: "Life Map makes the week visible.",
    body: "See what keeps returning, what helps, and where North Star is supporting you.",
    tone: "night",
  },
  {
    id: "signal",
    label: "Window",
    eyebrow: "Care",
    title: "Catch the hour before it gets loud.",
    body: "North Star can show up early — no shame, one small interruption.",
    tone: "light",
  },
  {
    id: "letter",
    label: "Letter",
    eyebrow: "Letter",
    title: "The day opens from the map.",
    body: "A morning letter and a small plan — from Aim, yesterday, and what the week is showing.",
    tone: "night",
  },
  {
    id: "modes",
    label: "Modes",
    eyebrow: "Modes",
    title: "One North Star. The stance the moment needs.",
    body: "Focus, reflection, motivation, mentoring — lenses, not different bots.",
    tone: "night",
  },
];

const WEEK = ["M", "T", "W", "T", "F", "S", "S"] as const;
const WEEK_FULL = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const CHECKPOINTS = [
  {
    band: "Morning",
    time: "5:41 AM",
    icon: "sunrise" as const,
    line: "Work at least 3–5 hours on Mahout coding",
  },
  {
    band: "Afternoon",
    time: "3:18 PM",
    icon: "sun" as const,
    line: null,
  },
  {
    band: "Evening",
    time: "6:47 PM",
    icon: "moon" as const,
    line: "Work at least 3–5 hours on Mahout coding",
  },
] as const;

const MAP_BANDS = [
  { name: "Morning", cells: ["quiet", "quiet", "soft", "quiet", "quiet", "quiet", "quiet"] },
  { name: "Afternoon", cells: ["quiet", "soft", "quiet", "quiet", "soft", "quiet", "quiet"] },
  { name: "Evening", cells: ["quiet", "window", "quiet", "window", "held", "quiet", "quiet"] },
  { name: "Night", cells: ["quiet", "quiet", "soft", "quiet", "quiet", "quiet", "quiet"] },
] as const;

const WEEK_DOTS = ["soft", "held", "soft", "held", "held", "held", "now"] as const;

const MODES = [
  { name: "Work Focus", line: "Turn your Aim into a Path—now.", icon: "focus" },
  { name: "Analytic", line: "Pattern-aware clarity.", icon: "analytic" },
  { name: "Reflective", line: "Calm clarity for the moment.", icon: "reflect" },
  { name: "Motivator", line: "Mentor energy — little logistics.", icon: "spark" },
  { name: "Mentor", line: "Advice in the voice of your mentors.", icon: "mentor" },
  { name: "Auto", line: "North Star chooses per moment.", icon: "auto", selected: true },
] as const;

function Glyph({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "sunrise":
      return (
        <svg {...common}>
          <path d="M4 18h16M7 16a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 6v3M5.6 10.6l1.6 1.6M18.4 10.6l-1.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M15 4.4A7.5 7.5 0 1 0 19.6 15 6.2 6.2 0 0 1 15 4.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "brain":
      return (
        <svg {...common}>
          <path d="M9.2 6.2a3.1 3.1 0 0 1 5.6 0 3 3 0 0 1 3.4 4.4A3.2 3.2 0 0 1 16 16.8v1.4H8v-1.4A3.2 3.2 0 0 1 5.8 10.6 3 3 0 0 1 9.2 6.2Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7.2v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "focus":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        </svg>
      );
    case "analytic":
      return (
        <svg {...common}>
          <path d="M5 16V9M10 16V6M15 16v-4M20 16V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "reflect":
      return (
        <svg {...common}>
          <circle cx="9" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="15.5" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M13 3 6.5 13h5L11 21l6.5-10h-5L13 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "mentor":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.5 18.5c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "auto":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="13" y="5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="5" y="13" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="13" y="13" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5.5 12.5 10 17l8.5-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "send":
      return (
        <svg {...common}>
          <path d="M4 12 20 5l-6.5 14-2.2-6.2L4 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function SlideOrigin() {
  return (
    <article className="ns-still ns-still--light">
      <div className="ns-still-identity">
        <span className="ns-still-identity__mark">
          <Glyph name="brain" />
        </span>
        <p>Future Self</p>
      </div>
      <h3 className="ns-still__heading">Today’s Evolution</h3>
      <ul className="ns-still-checkpoints">
        {CHECKPOINTS.map((item) => (
          <li
            key={item.band}
            className={`ns-still-checkpoint${item.line ? "" : " ns-still-checkpoint--solo"}`}
          >
            <span className="ns-still-checkpoint__icon">
              <Glyph name={item.icon} />
            </span>
            <span className="ns-still-checkpoint__pill">{item.band}</span>
            <span className="ns-still-checkpoint__time">{item.time}</span>
            {item.line ? <span className="ns-still-checkpoint__line">{item.line}</span> : null}
          </li>
        ))}
      </ul>
    </article>
  );
}

function SlideMemory() {
  return (
    <article className="ns-still ns-still--light">
      <p className="ns-still__kicker">At a glance</p>
      <p className="ns-still__date">Daily · Jun 3</p>
      <p className="ns-still__lead">
        Yesterday you put in about 4 hours — most of it in Coding.
      </p>
      <div className="ns-still-remember">
        <span>What Future You should remember</span>
        <p>You’ve been showing up.</p>
      </div>
    </article>
  );
}

function SlideLifeMap() {
  return (
    <article className="ns-still ns-still--night ns-still--map">
      <p className="ns-still__kicker">Life Lab</p>
      <h3 className="ns-still__heading">Life Map</h3>
      <p className="ns-still__lead ns-still__lead--tight">This week</p>
      <div className="ns-still-map" role="img" aria-label="Week map, morning through night">
        <div className="ns-still-map__days">
          <span />
          {WEEK.map((day, index) => (
            <span key={`day-${index}`}>{day}</span>
          ))}
        </div>
        {MAP_BANDS.map((band) => (
          <div key={band.name} className="ns-still-map__row">
            <span className="ns-still-map__band">{band.name}</span>
            {band.cells.map((cell, index) => (
              <span
                key={`${band.name}-${index}`}
                className={`ns-still-map__cell ns-still-map__cell--${cell}`}
              />
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}

function SlideSignal() {
  return (
    <article className="ns-still ns-still--light">
      <p className="ns-still-badge">Discipline</p>
      <h3 className="ns-still__heading">Strong today</h3>
      <p className="ns-still__lead">2 of 2 signals counted today</p>
      <p className="ns-still-metric">Sessions · 6 completed</p>
      <div className="ns-still-week-block">
        <span>This week</span>
        <div className="ns-still-week" aria-hidden="true">
          {WEEK_FULL.map((day, index) => (
            <span key={day} className={`ns-still-week__col${WEEK_DOTS[index] === "now" ? " is-now" : ""}`}>
              <span>{day}</span>
              <i className={`ns-still-week__dot ns-still-week__dot--${WEEK_DOTS[index]}`} />
            </span>
          ))}
        </div>
      </div>
      <div className="ns-still-move">
        <span>Best next move</span>
        <p>Add one more small rep while it still feels doable.</p>
      </div>
    </article>
  );
}

function SlideLetter() {
  return (
    <article className="ns-still ns-still--night ns-still--letter ns-still--morning">
      <header className="ns-still-chrome ns-still-chrome--compact">
        <div>
          <p className="ns-still-chrome__title">North Star</p>
          <p className="ns-still-chrome__sub">Your future self, guiding you</p>
        </div>
        <span className="ns-still-chrome__date">Today · Jun 7</span>
      </header>
      <div className="ns-still-letter">
        <p className="ns-still-letter__from">From Future You</p>
        <p className="ns-still-letter__title">Morning Letter — Jun 7</p>
        <p className="ns-still-letter__body">
          This morning feels like <strong>calm with teeth</strong> — not soft, not sleepy. More like: you’re steady, and you’re carrying real weight.
        </p>
        <p className="ns-still-letter__body">
          The strongest signal is simple: you’ve been showing up. Yesterday you put in about 4 hours, and this week you’ve already stacked serious time — most of it in Coding. That’s not “motivation.” That’s identity: the version of you who builds even when the day isn’t perfectly arranged.
        </p>
        <p className="ns-still-letter__body">
          Second: your day is already pointed somewhere. Your top lane is 3–5 hours of Mahout coding. That mix matters — because you’re not trying to be a one-track person. You’re trying to become the kind of operator who can build the product and still move money in the real world.
        </p>
        <p className="ns-still-letter__body">
          Start the day by earning your calm — one clean block of Mahout coding that’s already waiting.
        </p>
      </div>
      <div className="ns-still-compose">
        <span>Talk your heart out . . .</span>
        <span className="ns-still-compose__send" aria-hidden="true">
          <Glyph name="send" />
        </span>
      </div>
    </article>
  );
}

function SlideModes() {
  return (
    <article className="ns-still ns-still--night ns-still--letter">
      <header className="ns-still-chrome">
        <div>
          <p className="ns-still-chrome__title">North Star</p>
          <p className="ns-still-chrome__sub">Your future self, guiding you</p>
        </div>
        <span className="ns-still-chrome__date">Auto</span>
      </header>
      <ul className="ns-still-modes">
        {MODES.map((mode) => (
          <li
            key={mode.name}
            className={`ns-still-mode${"selected" in mode && mode.selected ? " is-selected" : ""}`}
          >
            <span className="ns-still-mode__icon">
              <Glyph name={mode.icon} />
            </span>
            <span className="ns-still-mode__copy">
              <span className="ns-still-mode__name">{mode.name}</span>
              <span className="ns-still-mode__line">{mode.line}</span>
            </span>
            {"selected" in mode && mode.selected ? (
              <span className="ns-still-mode__check">
                <Glyph name="check" />
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </article>
  );
}

function renderSlide(id: StorySlide["id"]) {
  switch (id) {
    case "origin":
      return <SlideOrigin />;
    case "memory":
      return <SlideMemory />;
    case "lifemap":
      return <SlideLifeMap />;
    case "signal":
      return <SlideSignal />;
    case "letter":
      return <SlideLetter />;
    case "modes":
      return <SlideModes />;
    default:
      return null;
  }
}

export function NorthStarStoryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = SLIDES[activeIndex] ?? SLIDES[0];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="ns-story-carousel"
      aria-label="North Star product story"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="ns-story-carousel__stage"
        data-tone={active.tone}
        aria-live="polite"
      >
        <div key={active.id} className="ns-story-carousel__pane">
          {renderSlide(active.id)}
        </div>
      </div>

      <div className="ns-story-carousel__caption">
        <p className="ns-story-carousel__eyebrow">{active.eyebrow}</p>
        <p className="ns-story-carousel__title">{active.title}</p>
      </div>

      <p className="path-element-screenshot-carousel__sr-only">
        {active.eyebrow}: {active.title}. {active.body}
      </p>

      <div
        className="element-screenshot-carousel__progress ns-story-carousel__progress"
        aria-label="North Star story progress"
        style={{ "--carousel-count": SLIDES.length } as CSSProperties}
      >
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.label}: ${slide.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
          >
            <span className={index === activeIndex && !paused ? "is-running" : ""} />
          </button>
        ))}
      </div>
    </div>
  );
}
