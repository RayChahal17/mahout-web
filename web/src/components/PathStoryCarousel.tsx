"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";
import { MAHOUT_PATH_SCREENSHOTS } from "@/lib/mahoutAssets";

type StorySlide = {
  id: "timeline" | "today" | "time" | "checkoffs" | "linked";
  label: string;
  eyebrow: string;
  title: string;
  tone: "night" | "light";
};

const SLIDES: StorySlide[] = [
  {
    id: "timeline",
    label: "Timeline",
    eyebrow: "Timeline",
    title: "The day, colored in.",
    tone: "night",
  },
  {
    id: "today",
    label: "Today",
    eyebrow: "Today",
    title: "What is live, and what already closed.",
    tone: "light",
  },
  {
    id: "time",
    label: "Time-based",
    eyebrow: "Time-based",
    title: "The minutes you return to.",
    tone: "light",
  },
  {
    id: "checkoffs",
    label: "Check-offs",
    eyebrow: "Check-offs",
    title: "Yes or no. The day closes.",
    tone: "light",
  },
  {
    id: "linked",
    label: "Linked",
    eyebrow: "Path to Mountain",
    title: "Today’s step, answering the goal.",
    tone: "night",
  },
];

const TIME_PLATES = [
  { name: "Walk", measure: "Open air", tone: "walk", lead: false },
  { name: "Workout", measure: "30 min", tone: "workout", lead: false },
  { name: "Coding", measure: "3–5 hours", tone: "coding", lead: true },
  { name: "Read a few pages", measure: "20 min", tone: "read", lead: false },
] as const;

const CHECKS = [
  { name: "Wake up before 6am", when: "5:00 AM", done: true },
  { name: "Write daily goals", when: "6:00 AM", done: true },
  { name: "Sleep before 10:15pm", when: "Tonight", done: false },
  { name: "Review business goals", when: "Evening", done: false },
] as const;

function PathMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 17c3-1.2 4.2-4.5 7-6.2 2.6-1.6 5.2-.6 7 1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="5" cy="17" r="1.6" fill="currentColor" />
      <circle cx="12" cy="10.6" r="1.6" fill="currentColor" />
      <circle cx="19" cy="12.2" r="1.6" fill="currentColor" />
    </svg>
  );
}

function MountainMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.5 18.5 9 9.5l3.2 4.6 2.6-3.8 5.7 8.2H3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14.2 12.2 16.4 9l4.1 9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5.5 12.5 10 17l8.5-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SlideTimeline() {
  return (
    <article className="pt-still pt-still--night">
      <div className="pt-mist" aria-hidden="true" />
      <header className="pt-night-chrome">
        <p>Path</p>
        <span>Tue, Jun 2</span>
      </header>
      <div className="pt-day">
        <Image
          src={MAHOUT_PATH_SCREENSHOTS.timelineStill}
          alt="Path timeline with colored blocks for coding, workout, and walk"
          fill
          sizes="(max-width: 900px) 360px, 392px"
          unoptimized
          className="pt-day__img"
        />
      </div>
      <p className="pt-night-legend">Coding · Workout · Walk</p>
    </article>
  );
}

export function PathTodayStill() {
  return (
    <article className="pt-still pt-still--today">
      <header className="pt-still-chrome">
        <div>
          <p className="pt-still-chrome__title">Today</p>
          <p className="pt-still-chrome__sub">Tue, Jun 2</p>
        </div>
        <span className="pt-still-chrome__tab">Path</span>
      </header>

      <div className="pt-closed">
        <p>Closed</p>
        <ul>
          <li>
            <span className="pt-seal" aria-hidden="true">
              <CheckMark />
            </span>
            <strong>Wake up before 6am</strong>
            <em>5:00 AM</em>
          </li>
          <li>
            <span className="pt-seal" aria-hidden="true">
              <CheckMark />
            </span>
            <strong>Write daily goals</strong>
            <em>6:00 AM</em>
          </li>
        </ul>
      </div>

      <div className="pt-live">
        <span className="pt-live__pulse" aria-hidden="true" />
        <p className="pt-live__kicker">Live</p>
        <h3>Coding</h3>
        <p className="pt-live__stat">4h 10m</p>
        <span className="pt-live__bar" aria-hidden="true">
          <i />
        </span>
      </div>

      <div className="pt-next">
        <p>Next</p>
        <span>
          <strong>Workout</strong>
          <em>30 min</em>
        </span>
      </div>
    </article>
  );
}

function SlideTime() {
  return (
    <article className="pt-still pt-still--library">
      <header className="pt-still-chrome">
        <div>
          <p className="pt-still-chrome__title">Time-based</p>
          <p className="pt-still-chrome__sub">Minutes you can return to</p>
        </div>
      </header>
      <ul className="pt-plates">
        {TIME_PLATES.map((plate) => (
          <li
            key={plate.name}
            className={`pt-plate pt-plate--${plate.tone}${plate.lead ? " is-lead" : ""}`}
          >
            <span className="pt-plate__bar" aria-hidden="true" />
            <span className="pt-plate__copy">
              <strong>{plate.name}</strong>
              <em>{plate.measure}</em>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SlideCheckoffs() {
  return (
    <article className="pt-still pt-still--library">
      <header className="pt-still-chrome">
        <div>
          <p className="pt-still-chrome__title">Check-offs</p>
          <p className="pt-still-chrome__sub">Proof without a timer</p>
        </div>
      </header>
      <ul className="pt-ledger">
        {CHECKS.map((item) => (
          <li key={item.name} className={item.done ? "is-done" : ""}>
            <span className="pt-seal" aria-hidden="true">
              {item.done ? <CheckMark /> : null}
            </span>
            <span>
              <strong>{item.name}</strong>
              <em>{item.when}</em>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SlideLinked() {
  return (
    <article className="pt-still pt-still--night pt-still--ascent">
      <div className="pt-mist" aria-hidden="true" />
      <header className="pt-night-chrome">
        <p>Path</p>
        <span>rolls up</span>
      </header>

      <div className="pt-ascent">
        <div className="pt-ascent__card pt-ascent__card--path">
          <span>
            <PathMark />
            Path
          </span>
          <p>Read a few pages</p>
          <em>Today · 20 minutes</em>
        </div>

        <div className="pt-ascent__spine" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <div className="pt-ascent__card pt-ascent__card--peak">
          <span>
            <MountainMark />
            Mountain
          </span>
          <p>Read 2 business books</p>
          <em>Future goal · Jul 7</em>
        </div>
      </div>
    </article>
  );
}

function renderSlide(id: StorySlide["id"]) {
  switch (id) {
    case "timeline":
      return <SlideTimeline />;
    case "today":
      return <PathTodayStill />;
    case "time":
      return <SlideTime />;
    case "checkoffs":
      return <SlideCheckoffs />;
    case "linked":
      return <SlideLinked />;
    default:
      return null;
  }
}

export function PathStoryCarousel() {
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
      className="pt-story-carousel"
      aria-label="Path product story"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pt-story-carousel__stage" data-tone={active.tone} aria-live="polite">
        <div key={active.id} className="pt-story-carousel__pane">
          {renderSlide(active.id)}
        </div>
      </div>

      <div className="pt-story-carousel__caption">
        <p className="pt-story-carousel__eyebrow">{active.eyebrow}</p>
        <p className="pt-story-carousel__title">{active.title}</p>
      </div>

      <div
        className="element-screenshot-carousel__progress pt-story-carousel__progress"
        aria-label="Path story progress"
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
