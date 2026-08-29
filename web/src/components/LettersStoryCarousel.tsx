"use client";

import { type CSSProperties, useEffect, useState } from "react";

type StorySlide = {
  id: "morning" | "evening" | "week" | "receipts";
  label: string;
  eyebrow: string;
  title: string;
  tone: "night" | "dawn";
};

const SLIDES: StorySlide[] = [
  {
    id: "morning",
    label: "Morning",
    eyebrow: "Morning letter",
    title: "Begin from today's strongest signal.",
    tone: "dawn",
  },
  {
    id: "evening",
    label: "Evening",
    eyebrow: "Evening letter",
    title: "Close the loop honestly.",
    tone: "night",
  },
  {
    id: "week",
    label: "Week",
    eyebrow: "Weekly review",
    title: "Connect the week into a story.",
    tone: "night",
  },
  {
    id: "receipts",
    label: "Receipts",
    eyebrow: "Receipt grounding",
    title: "Guidance writes from what happened.",
    tone: "night",
  },
];

const INK = { color: "#1c1914", WebkitTextFillColor: "#1c1914" } as const;

const WEEK_TICKS = [18, 26, 22, 30, 16, 24, 36] as const;

function SlideMorning() {
  return (
    <article className="lt-still lt-still--dawn lt-still--open">
      <i className="lt-dawn" aria-hidden="true" />
      <p className="lt-kicker">Letters</p>
      <div className="lt-open">
        <p className="lt-open__from">From Future You</p>
        <p className="lt-open__label">Strongest signal</p>
        <h3>One lane</h3>
        <svg className="lt-arc" viewBox="0 0 200 36" aria-hidden="true">
          <path
            d="M22 32 C 70 4, 130 4, 178 32"
            fill="none"
            stroke="rgba(91,78,196,0.36)"
            strokeWidth="1"
          />
          <circle cx="22" cy="32" r="2.4" fill="#6d5fd6" />
          <circle cx="178" cy="32" r="2.4" fill="#6d5fd6" />
        </svg>
        <p className="lt-open__move">Coding held yesterday. Start there.</p>
      </div>
    </article>
  );
}

function SlideEvening() {
  return (
    <article className="lt-still lt-still--night lt-still--close">
      <i className="lt-moon" aria-hidden="true" />
      <p className="lt-kicker lt-kicker--night">Letters</p>
      <div className="lt-folio">
        <b className="lt-folio__seal" aria-hidden="true">
          Closed
        </b>
        <p className="lt-folio__stamp">Evening</p>
        <p className="lt-folio__from">The day, kept</p>
        <div className="lt-folio__body" style={INK}>
          You showed up.
        </div>
        <div className="lt-folio__body" style={INK}>
          You also drifted after lunch.
        </div>
        <p className="lt-folio__close">Do not rewrite the day.</p>
      </div>
    </article>
  );
}

function SlideWeek() {
  return (
    <article className="lt-still lt-still--night lt-still--week">
      <i className="lt-veil" aria-hidden="true" />
      <p className="lt-kicker lt-kicker--night">Letters</p>
      <div className="lt-week">
        <p className="lt-week__lead">The week</p>
        <p className="lt-week__name">Held together.</p>
        <div className="lt-ticks" aria-hidden="true">
          {WEEK_TICKS.map((height, index) => (
            <i
              key={index}
              className={index === WEEK_TICKS.length - 1 ? "is-last" : undefined}
              style={{ height }}
            />
          ))}
        </div>
        <div className="lt-week__meta" aria-hidden="true">
          <span>Mon</span>
          <span>Sun</span>
        </div>
      </div>
      <p className="lt-close">A story, not a pile.</p>
    </article>
  );
}

function SlideReceipts() {
  return (
    <article className="lt-still lt-still--night lt-still--feed">
      <p className="lt-kicker lt-kicker--night">Letters</p>
      <ol className="lt-nodes">
        <li>
          <i aria-hidden="true" />
          <span>Path</span>
          Four hours in the lane.
        </li>
        <li>
          <i aria-hidden="true" />
          <span>Weather</span>
          Afternoon went thin.
        </li>
        <li>
          <i aria-hidden="true" />
          <span>Mood</span>
          Steady enough to write from.
        </li>
      </ol>
      <div className="lt-line">
        <p className="lt-line__stamp">Letter</p>
        <div className="lt-line__body" style={INK}>
          The letter can use this.
        </div>
      </div>
    </article>
  );
}

function renderSlide(id: StorySlide["id"]) {
  switch (id) {
    case "morning":
      return <SlideMorning />;
    case "evening":
      return <SlideEvening />;
    case "week":
      return <SlideWeek />;
    case "receipts":
      return <SlideReceipts />;
    default:
      return null;
  }
}

export function LettersStoryCarousel() {
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
      className="lt-story-carousel"
      aria-label="Letters and reviews product story"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="lt-story-carousel__stage" data-tone={active.tone} aria-live="polite">
        <div key={active.id} className="lt-story-carousel__pane">
          {renderSlide(active.id)}
        </div>
      </div>

      <div className="lt-story-carousel__caption">
        <p className="lt-story-carousel__eyebrow">{active.eyebrow}</p>
        <p className="lt-story-carousel__title">{active.title}</p>
      </div>

      <div
        className="element-screenshot-carousel__progress lt-story-carousel__progress"
        aria-label="Letters and reviews story progress"
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
