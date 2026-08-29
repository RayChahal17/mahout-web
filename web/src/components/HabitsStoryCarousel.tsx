"use client";

import { type CSSProperties, useEffect, useState } from "react";

type StorySlide = {
  id: "habit" | "behavior" | "comeback" | "window";
  label: string;
  eyebrow: string;
  title: string;
  tone: "night" | "dawn";
};

const SLIDES: StorySlide[] = [
  {
    id: "habit",
    label: "21",
    eyebrow: "21-day habit",
    title: "Repeated proof becomes a habit signal.",
    tone: "night",
  },
  {
    id: "behavior",
    label: "66",
    eyebrow: "66-day behavior",
    title: "Longer consistency becomes behavior.",
    tone: "night",
  },
  {
    id: "comeback",
    label: "Comeback",
    eyebrow: "Comeback logic",
    title: "Misses do not become lost weeks.",
    tone: "night",
  },
  {
    id: "window",
    label: "Window",
    eyebrow: "Pattern signal",
    title: "The strongest windows start to show.",
    tone: "dawn",
  },
];

const INK = { color: "#1c1914", WebkitTextFillColor: "#1c1914" } as const;

const STONES = [
  [18, 28],
  [58, 22],
  [100, 16],
  [142, 12],
  [182, 8],
] as const;

function SlideHabit() {
  return (
    <article className="hb-still hb-still--night hb-still--signal">
      <i className="hb-veil" aria-hidden="true" />
      <i className="hb-moon" aria-hidden="true" />
      <p className="hb-kicker hb-kicker--night">Habits</p>
      <div className="hb-monument">
        <p className="hb-monument__mark">21</p>
        <p className="hb-monument__name">The reps held.</p>
        <svg className="hb-path" viewBox="0 0 200 36" aria-hidden="true">
          <path
            d="M12 33 H188"
            fill="none"
            stroke="rgba(196,184,255,0.22)"
            strokeWidth="1"
          />
          {STONES.map(([x, y], index) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={index === STONES.length - 1 ? 3.6 : 2.1}
              fill={index === STONES.length - 1 ? "#c4b8ff" : "rgba(196,184,255,0.68)"}
            />
          ))}
        </svg>
        <div className="hb-path-meta" aria-hidden="true">
          <span>Day 1</span>
          <span>Day 21</span>
        </div>
      </div>
      <p className="hb-close">Visible, not performed.</p>
    </article>
  );
}

function SlideBehavior() {
  return (
    <article className="hb-still hb-still--night hb-still--folio">
      <p className="hb-kicker hb-kicker--night">Habits</p>
      <div className="hb-folio">
        <span className="hb-folio__watermark" aria-hidden="true">
          66
        </span>
        <p className="hb-folio__from">Behavior</p>
        <div className="hb-folio__reads">
          <div className="hb-folio__body" style={INK}>
            Morning is the window.
          </div>
          <div className="hb-folio__body" style={INK}>
            Afternoon is the friction.
          </div>
          <div className="hb-folio__body" style={INK}>
            One day is enough to return.
          </div>
        </div>
        <p className="hb-folio__close">The longer arc is readable.</p>
      </div>
    </article>
  );
}

function SlideComeback() {
  return (
    <article className="hb-still hb-still--night hb-still--return">
      <p className="hb-kicker hb-kicker--night">Habits</p>
      <div className="hb-return">
        <article className="hb-slip hb-slip--miss">
          <p className="hb-slip__stamp">Missed</p>
          <div className="hb-slip__body" style={INK}>
            A day went quiet.
          </div>
        </article>
        <div className="hb-thread" aria-hidden="true">
          <i />
          <b className="hb-seal">then</b>
          <i />
        </div>
        <article className="hb-slip hb-slip--back">
          <p className="hb-slip__stamp">Returned</p>
          <div className="hb-slip__body" style={INK}>
            The next step was small enough.
          </div>
        </article>
      </div>
      <p className="hb-close">The week is not lost.</p>
    </article>
  );
}

function SlideWindow() {
  return (
    <article className="hb-still hb-still--dawn hb-still--hour">
      <i className="hb-dawn" aria-hidden="true" />
      <i className="hb-hourglow" aria-hidden="true" />
      <p className="hb-kicker">Habits</p>
      <div className="hb-hour">
        <p className="hb-hour__label">Best block</p>
        <h3>07:00–09:00</h3>
        <svg className="hb-arc" viewBox="0 0 200 40" aria-hidden="true">
          <path
            d="M20 34 C 64 2, 136 2, 180 34"
            fill="none"
            stroke="rgba(91,78,196,0.38)"
            strokeWidth="1"
          />
          <circle cx="20" cy="34" r="2.6" fill="#6d5fd6" />
          <circle cx="180" cy="34" r="2.6" fill="#6d5fd6" />
        </svg>
        <div className="hb-hour__ends" aria-hidden="true">
          <span>07</span>
          <span>09</span>
        </div>
        <p className="hb-hour__note">Follow-through is easiest here.</p>
      </div>
    </article>
  );
}

function renderSlide(id: StorySlide["id"]) {
  switch (id) {
    case "habit":
      return <SlideHabit />;
    case "behavior":
      return <SlideBehavior />;
    case "comeback":
      return <SlideComeback />;
    case "window":
      return <SlideWindow />;
    default:
      return null;
  }
}

export function HabitsStoryCarousel() {
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
      className="hb-story-carousel"
      aria-label="Habits product story"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hb-story-carousel__stage" data-tone={active.tone} aria-live="polite">
        <div key={active.id} className="hb-story-carousel__pane">
          {renderSlide(active.id)}
        </div>
      </div>

      <div className="hb-story-carousel__caption">
        <p className="hb-story-carousel__eyebrow">{active.eyebrow}</p>
        <p className="hb-story-carousel__title">{active.title}</p>
      </div>

      <div
        className="element-screenshot-carousel__progress hb-story-carousel__progress"
        aria-label="Habits story progress"
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
