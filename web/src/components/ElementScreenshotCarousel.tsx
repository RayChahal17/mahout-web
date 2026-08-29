"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";

export type ScreenshotCarouselSlide = {
  eyebrow: string;
  title: string;
  body: string;
  chips: readonly string[];
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
};

export const ELEMENT_SCREENSHOT_SLIDES = {
  northStar: [
    {
      eyebrow: "Origin",
      title: "Your ideal future self takes form.",
      body: "The life you named becomes a guide — not a generic chatbot.",
      chips: ["Future You", "Vision", "Guide"],
      imageSrc: "/images/elements/north-star-carousel-origin.png",
      imageAlt: "Present you reaches toward a star-formed future self as North Star takes shape between them.",
      imagePosition: "center",
    },
    {
      eyebrow: "Memory",
      title: "What happened becomes light.",
      body: "Days, moods, and finished steps feed North Star so guidance stays grounded.",
      chips: ["Receipts", "Memory", "Grounding"],
      imageSrc: "/images/elements/north-star-carousel-receipts.png",
      imageAlt: "Glowing fragments of days, moods, and finished steps rise from the path into the North Star.",
      imagePosition: "center",
    },
    {
      eyebrow: "Life Lab",
      title: "Life Map makes the week visible.",
      body: "See what keeps returning, what helps, and where North Star is supporting you.",
      chips: ["Life Map", "Windows", "Care"],
      imageSrc: "/images/elements/north-star-carousel-lifemap.png",
      imageAlt: "A week shown as bands of morning, day, dusk, and night under the North Star, with one gold thread of a better pattern.",
      imagePosition: "center",
    },
    {
      eyebrow: "Care",
      title: "Catch the hour before it gets loud.",
      body: "North Star can show up early — no shame, one small interruption.",
      chips: ["Early", "Window", "Next step"],
      imageSrc: "/images/elements/north-star-carousel-window.png",
      imageAlt: "A quiet hour on the path is lit before night fully falls, with the North Star nearby.",
      imagePosition: "center",
    },
    {
      eyebrow: "Letter",
      title: "The day opens from the map.",
      body: "A morning letter and a small plan — from Aim, yesterday, and what the week is showing.",
      chips: ["Letter", "Plan", "Direction"],
      imageSrc: "/images/elements/north-star-carousel-letter.png",
      imageAlt: "A figure holds a letter of light while three quiet marks wait on the path ahead.",
      imagePosition: "center",
    },
    {
      eyebrow: "Modes",
      title: "One North Star. The stance the moment needs.",
      body: "Focus, reflection, motivation, mentoring — lenses, not different bots.",
      chips: ["Auto", "Guidance", "Modes"],
      imageSrc: "/images/elements/north-star-carousel-modes.png",
      imageAlt: "One star-formed guide with five soft orbital lenses, like stances around a single North Star.",
      imagePosition: "center",
    },
  ],
  mountain: [
    {
      eyebrow: "Future Goals",
      title: "Hold long-range direction",
      body: "The life you named becomes goals with deadlines and reviews.",
      chips: ["Future", "Deadline", "Review"],
    },
    {
      eyebrow: "Today Goals",
      title: "Choose the few lanes",
      body: "The day stays connected to direction instead of becoming a scattered list.",
      chips: ["Today", "Priority", "Lane"],
    },
    {
      eyebrow: "Priority lanes",
      title: "A-E focus without clutter",
      body: "Important lanes stay visible while overflow stays contained.",
      chips: ["A-E", "Focus", "Overflow"],
    },
    {
      eyebrow: "Linked action",
      title: "Send goals to Path",
      body: "Direction becomes concrete action instead of abstract intention.",
      chips: ["Linked", "Action", "Receipt"],
    },
  ],
  path: [
    {
      eyebrow: "Timeline",
      title: "Color the day in ten-minute proof",
      body: "Tap or drag empty slots — timed blocks and check-offs share one honest grid.",
      chips: ["10-min slots", "Drag to log", "One view"],
    },
    {
      eyebrow: "Today on the Path",
      title: "Pending, playing, and done",
      body: "One list for what's due now, live minutes, and what already closed.",
      chips: ["Play", "Pending", "Done"],
    },
    {
      eyebrow: "Time-based",
      title: "Minutes that compound",
      body: "Build your library once — press Play when it's time to focus.",
      chips: ["Timer", "Reuse daily", "Tracked"],
    },
    {
      eyebrow: "Check-offs",
      title: "Clear yes/no proof",
      body: "Sleep, goals, boundaries — one tap closes the day, no timer required.",
      chips: ["Daily", "Checked", "Proof"],
    },
    {
      eyebrow: "Linked to Mountain",
      title: "Create action, link goal",
      body: "Action setup can repeat daily, carry reminders, and connect directly back to a Mountain goal.",
      chips: ["Create action", "Repeats", "Goal link"],
      imageSrc: "/images/screenshots/path-action-linked-goal.png",
      imageAlt: "Path edit action screen showing a repeat action linked to the Mountain goal Read 2 business books.",
      imagePosition: "center 42%",
    },
  ],
  elephant: [
    {
      eyebrow: "Mood check-in",
      title: "Notice what you carry",
      body: "Emotional weather becomes part of the map instead of background noise.",
      chips: ["Mood", "Weather", "Signal"],
    },
    {
      eyebrow: "Feeling state",
      title: "Name the tone beneath action",
      body: "Guidance can soften, steady, or challenge based on real context.",
      chips: ["Tone", "Context", "Care"],
    },
    {
      eyebrow: "Mood trend",
      title: "See the rhythm",
      body: "Patterns reveal where energy, stress, and clarity tend to shift.",
      chips: ["Trend", "Rhythm", "Pattern"],
    },
    {
      eyebrow: "Guidance context",
      title: "North Star reads the weather",
      body: "Advice becomes more human when emotion is visible.",
      chips: ["Guidance", "Signal", "Memory"],
    },
  ],
  mahout: [
    {
      eyebrow: "Journal entry",
      title: "Tell the truth slowly",
      body: "A reflective space for what the day actually felt like.",
      chips: ["Journal", "Truth", "Quiet"],
    },
    {
      eyebrow: "Reflection prompt",
      title: "Understand before pressure",
      body: "Some days need meaning before they need another push.",
      chips: ["Prompt", "Meaning", "Pause"],
    },
    {
      eyebrow: "Saved insight",
      title: "Carry what mattered",
      body: "Useful reflections become memory for future guidance.",
      chips: ["Insight", "Memory", "Identity"],
    },
    {
      eyebrow: "Pattern",
      title: "The day becomes readable",
      body: "Reflection turns experience into self-understanding.",
      chips: ["Pattern", "Self", "Meaning"],
    },
  ],
} as const;

export const CHAPTER_SCREENSHOT_SLIDES = {
  habits: [
    {
      eyebrow: "21-day habit",
      title: "Repeated proof becomes a habit signal.",
      body: "Path-backed consistency around 21 successes starts to read as a habit — visible, not performative.",
      chips: ["21", "Habit", "Proof"],
    },
    {
      eyebrow: "66-day behavior",
      title: "Longer consistency becomes behavior.",
      body: "Around 66 successes, deeper patterns emerge: windows, friction, rhythm, and recovery.",
      chips: ["66", "Behavior", "Pattern"],
    },
    {
      eyebrow: "Comeback logic",
      title: "Misses do not become lost weeks.",
      body: "Recovery speed becomes part of the system so the user can return without drama.",
      chips: ["Recovery", "Momentum", "Trust"],
    },
    {
      eyebrow: "Pattern signal",
      title: "The strongest windows start to show.",
      body: "Repeated proof reveals when follow-through is easiest and where the day tends to break.",
      chips: ["Best block", "Pattern", "Rhythm"],
    },
  ],
  brain: [
    {
      eyebrow: "Brain overview",
      title: "The system shows what it remembers.",
      body: "Core identity, voice, memories, learned signals, and patterns stay visible instead of hidden.",
      chips: ["Core", "Memory", "Patterns"],
    },
    {
      eyebrow: "Voice and boundaries",
      title: "Guidance keeps the user's shape.",
      body: "North Star should know how to speak, what to avoid, and where the line is.",
      chips: ["Voice", "Boundaries", "Trust"],
    },
    {
      eyebrow: "Learned signal",
      title: "Candidate insight before durable truth.",
      body: "New reads can remain provisional until evidence or user confirmation makes them trustworthy.",
      chips: ["Learned", "Evidence", "Confirm"],
    },
    {
      eyebrow: "Trends",
      title: "Movement becomes guidance context.",
      body: "Mood, timing, action, and repetition signals help North Star guide with continuity.",
      chips: ["Signals", "Trends", "Continuity"],
    },
  ],
  letters: [
    {
      eyebrow: "Morning letter",
      title: "Begin from today's strongest signal.",
      body: "North Star can open the day with direction grounded in goals, actions, mood, and memory.",
      chips: ["Morning", "Direction", "Focus"],
    },
    {
      eyebrow: "Evening letter",
      title: "Close the loop honestly.",
      body: "The day is read through receipts so the user can understand what happened without noise.",
      chips: ["Evening", "Receipts", "Meaning"],
    },
    {
      eyebrow: "Weekly review",
      title: "Connect the week into a story.",
      body: "Goals, Path actions, emotions, reflections, habits, and patterns become a usable review.",
      chips: ["Week", "Review", "Pattern"],
    },
    {
      eyebrow: "Receipt grounding",
      title: "Guidance writes from what happened.",
      body: "Letters should feel personal because they are based on evidence, not generic motivation.",
      chips: ["Evidence", "Memory", "North Star"],
    },
  ],
  modes: [
    {
      eyebrow: "Auto mode",
      title: "The system chooses a visible stance.",
      body: "Auto can read whether the moment needs clarity, action, reflection, or steadiness.",
      chips: ["Auto", "Visible", "Adaptive"],
    },
    {
      eyebrow: "Work Focus",
      title: "Direction becomes one grounded move.",
      body: "Practical guidance stays small enough to start and connected to the user's lanes.",
      chips: ["Focus", "Plan", "Action"],
    },
    {
      eyebrow: "Reflective",
      title: "Some moments need meaning first.",
      body: "Reflective mode slows the tone down without turning the app into therapy or vague comfort.",
      chips: ["Meaning", "Tone", "Care"],
    },
    {
      eyebrow: "Mentor",
      title: "Chosen standards shape the question.",
      body: "Mentor mode can use lenses and standards without impersonating anyone.",
      chips: ["Mentor", "Lens", "Boundaries"],
    },
  ],
} as const satisfies Record<string, readonly ScreenshotCarouselSlide[]>;

export function ElementScreenshotCarousel({
  slides,
  ariaLabel,
  intervalMs = 5200,
}: {
  slides: readonly ScreenshotCarouselSlide[];
  ariaLabel: string;
  intervalMs?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || paused || slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, paused, slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <div
      className="element-screenshot-carousel"
      aria-label={ariaLabel}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`element-screenshot-carousel__screen ${
          activeSlide.imageSrc ? "element-screenshot-carousel__screen--image" : ""
        }`}
        aria-live="polite"
      >
        <div
          key={activeIndex}
          className={`element-screenshot-carousel__slide ${
            activeSlide.imageSrc ? "element-screenshot-carousel__slide--image" : ""
          }`}
        >
          {activeSlide.imageSrc ? (
            <div className="element-screenshot-carousel__image-frame">
              <Image
                src={activeSlide.imageSrc}
                alt={activeSlide.imageAlt ?? activeSlide.title}
                fill
                sizes="220px"
                style={{
                  objectFit: "cover",
                  objectPosition: activeSlide.imagePosition ?? "center top",
                }}
              />
            </div>
          ) : null}

          <div className="element-screenshot-carousel__eyebrow">{activeSlide.eyebrow}</div>
          <h3>{activeSlide.title}</h3>
          <p>{activeSlide.body}</p>

          <div className="element-screenshot-carousel__chips">
            {activeSlide.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>
      </div>

      {!activeSlide.imageSrc ? (
        <div className="element-screenshot-carousel__cards" aria-hidden="true">
          {[0, 1, 2].map((item) => (
            <div key={item} className={item === 0 ? "is-active" : ""}>
              <span />
              <span />
            </div>
          ))}
        </div>
      ) : null}

      <div
        className="element-screenshot-carousel__progress"
        aria-label="Screenshot carousel progress"
        style={{ "--carousel-count": slides.length } as CSSProperties}
      >
        {slides.map((slide, index) => (
          <button
            key={`${slide.eyebrow}-${slide.title}`}
            type="button"
            aria-label={`Show ${slide.title}`}
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
