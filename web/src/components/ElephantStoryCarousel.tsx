"use client";

import { type CSSProperties, useEffect, useState } from "react";

type StorySlide = {
  id: "bright" | "heavy" | "handoff";
  label: string;
  eyebrow: string;
  title: string;
  tone: "light" | "night";
};

const SLIDES: StorySlide[] = [
  {
    id: "bright",
    label: "Bright",
    eyebrow: "Bright weather",
    title: "Joy belongs on the map too.",
    tone: "light",
  },
  {
    id: "heavy",
    label: "Heavy",
    eyebrow: "Heavy weather",
    title: "Sad, named. Or not now.",
    tone: "night",
  },
  {
    id: "handoff",
    label: "Handoff",
    eyebrow: "To North Star",
    title: "The feeling can be answered.",
    tone: "night",
  },
];

function SlideBright() {
  return (
    <article className="el-still el-still--open">
      <p className="el-kicker">Elephant</p>
      <div className="el-sky">
        <i className="el-sky__disc" aria-hidden="true" />
        <i className="el-sky__horizon" aria-hidden="true" />
        <h3>Very happy</h3>
        <p>Something opened up fully.</p>
      </div>
    </article>
  );
}

function SlideHeavy() {
  return (
    <article className="el-still el-still--night el-still--named">
      <i className="el-moon" aria-hidden="true" />
      <p className="el-kicker el-kicker--night">Elephant</p>
      <div className="el-name">
        <h3>Sad</h3>
        <p>Something feels heavy here.</p>
      </div>
      <p className="el-defer">Not now is also true.</p>
    </article>
  );
}

const LETTER_INK = { color: "#1c1914", WebkitTextFillColor: "#1c1914" } as const;

function SlideHandoff() {
  return (
    <article className="el-still el-still--night el-still--reply">
      <p className="el-kicker el-kicker--night">Elephant</p>
      <div className="el-reply">
        <p className="el-reply__stamp">Sad</p>
        <p className="el-reply__from">From Future You</p>
        <div className="el-reply__body" style={LETTER_INK}>
          I&apos;m here with you. Sad can feel heavy and quiet — like everything takes more effort, even if nothing happened.
        </div>
        <div className="el-reply__body" style={LETTER_INK}>
          The feeling is often real before the story is clear. You don&apos;t have to explain it tonight.
        </div>
        <div className="el-reply__body" style={LETTER_INK}>
          If it is tiredness underneath, that is not laziness. It is a signal to recover.
        </div>
        <p className="el-reply__close">We can sit with it.</p>
      </div>
    </article>
  );
}

function renderSlide(id: StorySlide["id"]) {
  switch (id) {
    case "bright":
      return <SlideBright />;
    case "heavy":
      return <SlideHeavy />;
    case "handoff":
      return <SlideHandoff />;
    default:
      return null;
  }
}

export function ElephantStoryCarousel() {
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
      className="el-story-carousel"
      aria-label="Elephant product story"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="el-story-carousel__stage" data-tone={active.tone} aria-live="polite">
        <div key={active.id} className="el-story-carousel__pane">
          {renderSlide(active.id)}
        </div>
      </div>

      <div className="el-story-carousel__caption">
        <p className="el-story-carousel__eyebrow">{active.eyebrow}</p>
        <p className="el-story-carousel__title">{active.title}</p>
      </div>

      <div
        className="element-screenshot-carousel__progress el-story-carousel__progress"
        aria-label="Elephant story progress"
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
