"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { Container } from "./Container";
import { ElementIconBadge, type ElementIconName } from "./ElementIcon";
type JourneyStep = {
  key: ElementIconName;
  label: string;
  question: string;
  role: string;
  line: string;
  body: string;
  support: string;
  chips: string[];
};

const JOURNEY_STEPS: JourneyStep[] = [
  {
    key: "mountain",
    label: "Mountain",
    question: "What life are you trying to reach?",
    role: "Mountain is your direction.",
    line: "Your ideal life gives the elephant somewhere to walk.",
    body: "Your ideal life, future goals, and daily goals live here — so your elephant does not wander and your rational mind knows where to steer.",
    support: "Without a mountain, effort becomes motion without direction.",
    chips: ["Ideal life", "Future goals", "Daily goals"],
  },
  {
    key: "path",
    label: "Path",
    question: "What can you do now to move toward it?",
    role: "Path is action.",
    line: "Every honest block of effort feeds the mountain you chose.",
    body: "Your goals become the next honest steps you can take today. Actions link back to goals, so every block of effort feeds the mountain you chose.",
    support: "Path is where direction becomes behavior.",
    chips: ["Actions", "Timers", "Receipts"],
  },
  {
    key: "elephant",
    label: "Elephant",
    question: "What emotion is pulling you right now?",
    role: "Elephant is your emotional mind.",
    line: "When you notice it, you can steer it with care.",
    body: "It is powerful, sensitive, and hard to control by force. But when you notice it, name it, and understand it, you can steer it with more care.",
    support: "Mood logging turns emotional weather into awareness.",
    chips: ["Mood", "Energy", "Awareness"],
  },
  {
    key: "mahout",
    label: "Mahout",
    question: "What are you learning about yourself?",
    role: "Mahout is your rational mind.",
    line: "Through reflection, the rider becomes steadier.",
    body: "Through journaling, reflection, stillness, and self-knowledge, the rider becomes steadier. You name the pattern, understand the emotion, and guide the elephant back to the path.",
    support: "The rider becomes stronger through honest self-knowledge.",
    chips: ["Journal", "Reflection", "Self-knowledge"],
  },
  {
    key: "north-star",
    label: "North Star",
    question: "Who are you becoming?",
    role: "North Star is your ideal future self.",
    line: "The version who reached the mountain guides your next step.",
    body: "The version of you who reached the mountain becomes your guide. It reads your goals, actions, emotions, and reflections — then points you to the next step.",
    support: "North Star is not a random chatbot. It is the guide formed from the whole journey.",
    chips: ["Ideal future self", "Guidance", "Next step"],
  },
];

const NODE_ANGLE_STEP = 72;
const ACTIVE_NODE_ANGLE = 90;
const AUTO_ADVANCE_MS = 7000;
const MANUAL_PAUSE_MS = 12000;
const STAGE_VISIBLE_RATIO = 0.28;

const PROGRESS_SHORT_LABELS: Record<ElementIconName, string> = {
  mountain: "Mountain",
  path: "Path",
  elephant: "Elephant",
  mahout: "Mahout",
  "north-star": "Star",
};

function getNodeVars(index: number, activeIndex: number): CSSProperties {
  const angleDeg = ACTIVE_NODE_ANGLE + (index - activeIndex) * NODE_ANGLE_STEP;
  const angleRad = (angleDeg * Math.PI) / 180;
  const isActive = index === activeIndex;
  const distance = Math.abs(index - activeIndex);
  const wrappedDistance = Math.min(distance, JOURNEY_STEPS.length - distance);

  const isNeighbor = !isActive && wrappedDistance === 1;
  const isFar = !isActive && wrappedDistance >= 2;

  return {
    "--node-cos": String(Math.cos(angleRad)),
    "--node-sin": String(Math.sin(angleRad)),
    "--node-scale": isActive ? "1.12" : isNeighbor ? "0.78" : "0.66",
    "--node-opacity": isActive ? "1" : isNeighbor ? "0.72" : "0.56",
    "--node-glow": isActive ? "1" : isNeighbor ? "0.52" : "0.3",
    "--node-depth": String(isActive ? 8 : isNeighbor ? 6 : 3),
    "--node-label-opacity": isActive ? "1" : isNeighbor ? "0.68" : isFar ? "0.46" : "0.52",
    "--node-icon-opacity": isActive ? "1" : isNeighbor ? "0.88" : "0.74",
  } as CSSProperties;
}

function JourneyOrbitRay() {
  return (
    <div className="journey-orbit-ray" aria-hidden="true">
      <svg
        className="journey-orbit-ray__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="50"
          cy="50"
          rx="46"
          ry="40"
          pathLength={100}
          className="journey-orbit-ray--primary"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="42.5"
          ry="36.5"
          pathLength={100}
          className="journey-orbit-glint journey-orbit-glint--a"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="46"
          ry="40"
          pathLength={100}
          className="journey-orbit-glint journey-orbit-glint--b"
        />
      </svg>
    </div>
  );
}

function JourneyOrbitRings({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="journey-orbit-rings journey-orbit-oval__rings" aria-hidden="true">
      <svg
        className="journey-orbit-rings__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <ellipse cx="50" cy="50" rx="47.5" ry="41.5" className="journey-orbit-rings__outer" />
        <ellipse cx="50" cy="50" rx="43.5" ry="37.5" className="journey-orbit-rings__inner" />
        <ellipse
          key={activeIndex}
          cx="50"
          cy="50"
          rx="47.5"
          ry="41.5"
          className="journey-orbit-rings__glow"
          pathLength={100}
        />
      </svg>
      <div className="journey-orbit-rings__dock-glow" />
    </div>
  );
}

function JourneyOrbitScene() {
  return (
    <div className="journey-orbit-scene" aria-hidden="true">
      <div className="journey-orbit-scene__shimmer" />
      <div className="journey-orbit-scene__dust" />
      <div className="journey-orbit-scene__ambient" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="journey-orbit-scene__halo" />

      <svg
        className="journey-orbit-scene__oval"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="50"
          cy="50"
          rx="46"
          ry="40"
          className="journey-orbit-scene__oval-stroke"
        />
      </svg>

      <div className="journey-orbit-scene__dock" />
    </div>
  );
}

function JourneyOrbitActiveCopy({ step, index }: { step: JourneyStep; index: number }) {
  return (
    <article
      id="journey-orbit-panel"
      className="journey-orbit-active-copy"
      role="tabpanel"
      aria-labelledby={`journey-orbit-tab-${step.key}`}
    >
      <div key={step.key} className="journey-orbit-active-copy__inner">
        <p className="journey-orbit-active-copy__kicker">
          {String(index + 1).padStart(2, "0")} · {step.label}
        </p>
        <h3 className="journey-orbit-active-copy__question">{step.question}</h3>
        <p className="journey-orbit-active-copy__line">{step.line}</p>
      </div>
    </article>
  );
}

export function JourneyOrbitSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pauseUntilRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isFocusedWithinRef = useRef(false);
  const isStageVisibleRef = useRef(false);
  const isDocumentVisibleRef = useRef(true);
  const canHoverRef = useRef(false);

  const activeStep = JOURNEY_STEPS[activeIndex];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const extendManualPause = useCallback(() => {
    pauseUntilRef.current = Date.now() + MANUAL_PAUSE_MS;
  }, []);

  useEffect(() => {
    const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHover = () => {
      canHoverRef.current = hoverMedia.matches;
      if (!hoverMedia.matches) {
        isHoveredRef.current = false;
      }
    };
    updateHover();
    hoverMedia.addEventListener("change", updateHover);
    return () => hoverMedia.removeEventListener("change", updateHover);
  }, []);

  useEffect(() => {
    isDocumentVisibleRef.current = document.visibilityState === "visible";

    const onVisibilityChange = () => {
      isDocumentVisibleRef.current = document.visibilityState === "visible";
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const thresholds = [0, 0.1, 0.2, STAGE_VISIBLE_RATIO, 0.35, 0.5, 0.75, 1];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === stage) {
            isStageVisibleRef.current =
              entry.isIntersecting && entry.intersectionRatio >= STAGE_VISIBLE_RATIO;
          }
        });
      },
      {
        threshold: thresholds,
        rootMargin: "0px 0px 12% 0px",
      }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mobileMedia = window.matchMedia("(max-width: 979px)");
    const root = document.documentElement;

    const clearStickyCtaState = () => {
      root.classList.remove("journey-orbit-in-view");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!mobileMedia.matches) {
          clearStickyCtaState();
          return;
        }

        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.1;
        root.classList.toggle("journey-orbit-in-view", inView);
      },
      {
        threshold: [0, 0.05, 0.1, 0.15, 0.25, 0.4, 0.55],
      }
    );

    observer.observe(section);

    const onMobileChange = () => {
      if (!mobileMedia.matches) {
        clearStickyCtaState();
      }
    };

    mobileMedia.addEventListener("change", onMobileChange);

    return () => {
      observer.disconnect();
      mobileMedia.removeEventListener("change", onMobileChange);
      clearStickyCtaState();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const advance = () => {
      if (!isStageVisibleRef.current) return;
      if (!isDocumentVisibleRef.current) return;
      if (isHoveredRef.current) return;
      if (isFocusedWithinRef.current) return;
      if (Date.now() < pauseUntilRef.current) return;

      setActiveIndex((current) => (current + 1) % JOURNEY_STEPS.length);
    };

    const intervalId = window.setInterval(advance, AUTO_ADVANCE_MS);
    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const handleStepSelect = useCallback(
    (index: number) => {
      setActiveIndex(index);
      extendManualPause();
    },
    [extendManualPause]
  );

  const handleStagePointerEnter = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (canHoverRef.current && event.pointerType === "mouse") {
      isHoveredRef.current = true;
    }
  }, []);

  const handleStagePointerLeave = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      isHoveredRef.current = false;
    }
  }, []);

  const handleStageFocusCapture = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      isFocusedWithinRef.current = true;
      const target = event.target as HTMLElement;
      if (target.closest(".journey-orbit-node, .journey-orbit-progress__button")) {
        extendManualPause();
      }
    },
    [extendManualPause]
  );

  const handleStageBlurCapture = useCallback((event: FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(relatedTarget)) {
      isFocusedWithinRef.current = false;
    }
  }, []);

  const handleOrbitKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const { key } = event;
      if (key !== "ArrowRight" && key !== "ArrowDown" && key !== "ArrowLeft" && key !== "ArrowUp") {
        return;
      }

      event.preventDefault();
      const delta = key === "ArrowRight" || key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (activeIndex + delta + JOURNEY_STEPS.length) % JOURNEY_STEPS.length;

      handleStepSelect(nextIndex);
      document.getElementById(`journey-orbit-tab-${JOURNEY_STEPS[nextIndex].key}`)?.focus();
    },
    [activeIndex, handleStepSelect]
  );

  return (
    <section
      ref={sectionRef}
      id="story"
      className="journey-orbit-section"
      aria-label="Mahout journey system — ride the elephant, walk the path, reach the mountain"
      data-section
      data-home-anchor="story"
      data-active-element={activeStep.key}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
    >
      <Container className="journey-orbit-container">
        <div className="journey-orbit-stack">
          <header className="journey-orbit-intro">
            <div className="journey-orbit-eyebrow">
              <span className="journey-orbit-eyebrow__dot" aria-hidden="true" />
              Five elements · One system
            </div>
            <h2 className="journey-orbit-headline">
              Five elements.
              <br />
              One North Star.
            </h2>
            <p className="journey-orbit-lead">
              One calm system for direction, action, emotion, reflection, and guidance.
            </p>
          </header>

          <div
            ref={stageRef}
            className="journey-orbit-stage"
            onPointerEnter={handleStagePointerEnter}
            onPointerLeave={handleStagePointerLeave}
            onFocusCapture={handleStageFocusCapture}
            onBlurCapture={handleStageBlurCapture}
          >
            <div className="journey-orbit-stage__shell">
              <div className="journey-orbit-oval">
                <JourneyOrbitScene />
                <JourneyOrbitRings activeIndex={activeIndex} />
                <JourneyOrbitRay />
                <JourneyOrbitActiveCopy step={activeStep} index={activeIndex} />

                <div
                  className="journey-orbit-nodes"
                  role="tablist"
                  aria-label="Mountain, path, elephant, mahout, and north star — parts of one journey"
                  onKeyDown={handleOrbitKeyDown}
                >
                  {JOURNEY_STEPS.map((step, index) => {
                    const isActive = index === activeIndex;
                    const distance = Math.abs(index - activeIndex);
                    const wrappedDistance = Math.min(
                      distance,
                      JOURNEY_STEPS.length - distance
                    );
                    const orbitTier = isActive
                      ? "active"
                      : wrappedDistance === 1
                        ? "near"
                        : "far";
                    return (
                      <button
                        key={step.key}
                        type="button"
                        role="tab"
                        id={`journey-orbit-tab-${step.key}`}
                        aria-selected={isActive}
                        aria-pressed={isActive}
                        aria-controls="journey-orbit-panel"
                        aria-label={`Show ${step.label}: ${step.question}`}
                        data-orbit-tier={orbitTier}
                        className={`journey-orbit-node${isActive ? " is-active" : ""}`}
                        style={getNodeVars(index, activeIndex)}
                        onClick={() => handleStepSelect(index)}
                      >
                        <ElementIconBadge
                          name={step.key}
                          size={isActive ? 52 : 34}
                          iconSize={isActive ? 26 : 16}
                        />
                        <span className="journey-orbit-node__label">{step.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className="journey-orbit-progress"
              role="group"
              aria-label="Journey step progress"
            >
              {JOURNEY_STEPS.map((step, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={step.key}
                    type="button"
                    data-step-index={index}
                    data-step={step.key}
                    aria-pressed={isActive}
                    aria-controls="journey-orbit-panel"
                    aria-label={`${step.label}: ${step.question}`}
                    className={`journey-orbit-progress__button${isActive ? " is-active" : ""}`}
                    onClick={() => handleStepSelect(index)}
                  >
                    <ElementIconBadge name={step.key} size={22} iconSize={11} />
                    <span className="journey-orbit-progress__label journey-orbit-progress__label--full">
                      {step.label}
                    </span>
                    <span className="journey-orbit-progress__label journey-orbit-progress__label--short">
                      {PROGRESS_SHORT_LABELS[step.key]}
                    </span>
                    <span
                      key={isActive ? `orbit-progress-fill-${activeIndex}` : undefined}
                      className="journey-orbit-progress__fill"
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="journey-orbit-closure__connector" aria-hidden="true" />

          <div className="journey-orbit-closure">
            <p className="journey-orbit-closure__body">
              Mahout connects direction, action, emotion, reflection, and guidance.
            </p>
            <p className="journey-orbit-closure__summary">
              Direction · Action · Emotion · Reflection · Guidance
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
