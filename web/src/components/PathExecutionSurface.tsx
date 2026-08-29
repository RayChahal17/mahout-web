"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GlassCard } from "./GlassCard";
import { PhoneFrame } from "./PhoneFrame";
import { MAHOUT_PATH_SCREENSHOTS } from "@/lib/mahoutAssets";
import { PathTodayStill } from "./PathStoryCarousel";

type ActionType = "time-based" | "checkoff";
type PathView = "timeline" | "today" | "create";

const ACTION_TYPES = [
  {
    key: "time-based" as const,
    label: "Time-based",
    measure: "Minutes and hours",
    hint: "Tracked in minutes — like reading, coding, or working out.",
    examples: ["Read a few pages", "Workout", "Coding", "Client call block"],
    signal: "Play starts a focus timer at the current moment.",
  },
  {
    key: "checkoff" as const,
    label: "Check-offs",
    measure: "Done or not done",
    hint: "Yes/no actions, usually not timed — like sleeping early or emailing your boss.",
    examples: ["Wake up before 6am", "Write daily goals", "Sleep before 10:15pm", "Review business goals"],
    signal: "One tap closes the day with clear proof.",
  },
];

const PATH_VIEWS = [
  {
    key: "timeline" as const,
    label: "Timeline",
    verb: "Color the day",
    copy: "Each hour is divided into six 10-minute slots. Tap or drag empty time to log it fast — time-based blocks span the grid, check-offs appear as points on the day.",
  },
  {
    key: "today" as const,
    label: "Today on the Path",
    verb: "Track today",
    copy: "Pending and done in one list — tracked minutes, planned items, and what is due now. Press Play on a time-based action when it is time to focus.",
  },
  {
    key: "create" as const,
    label: "Create actions",
    verb: "Reuse tomorrow",
    copy: "Build your library once. The same time-based and check-off actions return every day so Path stays your operating surface, not a blank list.",
  },
];

const MOUNTAIN_PROOF = [
  { label: "Future goal", value: "Read 2 business books" },
  { label: "Path action", value: "Read a few pages · daily" },
  { label: "Live roll-up", value: "Minutes and check-offs toward the goal" },
];

const LOOP_STEPS = [
  { value: "Path", label: "daily proof" },
  { value: "21", label: "habit signal" },
  { value: "66", label: "behavior signal" },
  { value: "NS", label: "guided loop" },
];

function TabButton({
  active,
  onClick,
  children,
  className = "",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`path-product-tab${active ? " is-active" : ""} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function PathScreenshot({
  src,
  alt,
  className = "",
  onReadyChange,
}: {
  src: string;
  alt: string;
  className?: string;
  onReadyChange: (useMock: boolean) => void;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={390}
      height={844}
      className={`path-product-shot${className ? ` ${className}` : ""}`}
      sizes="(max-width: 720px) 72vw, 280px"
      onLoad={() => onReadyChange(false)}
      onError={() => onReadyChange(true)}
      unoptimized
    />
  );
}

function TimelineGridMock() {
  const hours = ["4a", "5a", "6a", "7a"];
  return (
    <div className="path-mock path-mock--timeline" aria-hidden="true">
      <div className="path-mock-timeline__hint">Tap or drag empty time to log it</div>
      <div className="path-mock-timeline__toolbar">
        <span>Tue, Jun 2</span>
        <span className="path-mock-pill path-mock-pill--accent">Now</span>
      </div>
      <div className="path-mock-timeline__grid">
        {hours.map((hour, rowIndex) => (
          <div key={hour} className="path-mock-timeline__row">
            <span className="path-mock-timeline__hour">{hour}</span>
            <div className="path-mock-timeline__slots">
              {Array.from({ length: 6 }).map((_, slotIndex) => {
                const filled =
                  (rowIndex === 1 && slotIndex >= 2 && slotIndex <= 4) ||
                  (rowIndex === 2 && slotIndex >= 1 && slotIndex <= 3);
                const label =
                  rowIndex === 1 && slotIndex === 2
                    ? "Coding"
                    : rowIndex === 2 && slotIndex === 2
                      ? "Workout"
                      : null;
                const isNow = rowIndex === 2 && slotIndex === 4;
                return (
                  <div
                    key={`${hour}-${slotIndex}`}
                    className={`path-mock-slot${filled ? " is-filled" : ""}${isNow ? " is-now" : ""}`}
                  >
                    {label ? <span>{label}</span> : null}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="path-mock-timeline__checkoff">
        <span className="path-mock-dot" />
        Write daily goals
      </div>
    </div>
  );
}

function CreateListMock({ actionType }: { actionType: ActionType }) {
  const timeBased = [
    { label: "Coding", tone: "mint" },
    { label: "Workout", tone: "sky" },
    { label: "Read a few pages", tone: "rose" },
    { label: "Walk", tone: "gold" },
  ];
  const checkoffs = [
    { label: "Write daily goals", tone: "violet", done: true },
    { label: "Wake up before 6am", tone: "navy", done: true },
    { label: "Sleep before 10:15pm", tone: "teal", done: false },
    { label: "Review business goals", tone: "slate", done: false },
  ];
  const items = actionType === "time-based" ? timeBased : checkoffs;

  return (
    <div className="path-mock path-mock--create" aria-hidden="true">
      <p className="path-mock-create__hint">
        Create actions here to track daily on the Path above.
      </p>
      <div className="path-mock-create__toggle">
        <span className={actionType === "time-based" ? "is-active" : ""}>Time-based</span>
        <span className={actionType === "checkoff" ? "is-active" : ""}>Check-offs</span>
      </div>
      <p className="path-mock-create__caption">
        {actionType === "time-based"
          ? "Time-based actions are tracked in minutes."
          : "Check-offs are yes/no actions, usually not timed."}
      </p>
      <div className="path-mock-create__cta">
        {actionType === "time-based" ? "Add action" : "Add check-off"}
      </div>
      <div className="path-mock-create__list">
        {items.map((item) => (
          <div key={item.label} className={`path-mock-create__row path-mock-create__row--${item.tone}`}>
            <span>{item.label}</span>
            {actionType === "time-based" ? (
              <span className="path-mock-create__start">Start ▶</span>
            ) : (
              <span className={`path-mock-create__check${"done" in item && item.done ? " is-done" : ""}`}>
                {"done" in item && item.done ? "Checked" : "Check"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PathPhonePreview({
  view,
  actionType,
}: {
  view: PathView;
  actionType: ActionType;
}) {
  const [showMock, setShowMock] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    setImageReady(false);
    setShowMock(false);
  }, [view, actionType]);

  const screenshot =
    view === "timeline"
      ? MAHOUT_PATH_SCREENSHOTS.timeline
      : actionType === "time-based"
        ? MAHOUT_PATH_SCREENSHOTS.createTimeBased
        : MAHOUT_PATH_SCREENSHOTS.createCheckoffs;

  const mock = view === "timeline" ? <TimelineGridMock /> : <CreateListMock actionType={actionType} />;

  return (
    <div className="path-product-phone-wrap">
      <PhoneFrame
        className="path-product-phone"
        eyebrow="Path"
        title={
          view === "timeline" ? "Timeline" : view === "today" ? "Today on the Path" : "Create actions"
        }
        variant="screenshot"
      >
        {view === "today" ? (
          <div className="path-product-phone__screen path-product-phone__screen--fill path-product-phone__screen--composed">
            <PathTodayStill />
          </div>
        ) : (
          <div className="path-product-phone__screen path-product-phone__screen--fill">
            <PathScreenshot
              src={screenshot}
              alt={
                view === "timeline"
                  ? "Path timeline view"
                  : actionType === "time-based"
                    ? "Path time-based actions"
                    : "Path check-off actions"
              }
              className={`path-product-phone__image${imageReady ? " is-ready" : ""}`}
              onReadyChange={(failed) => {
                setShowMock(failed);
                setImageReady(!failed);
              }}
            />
            {showMock ? <div className="path-product-phone__fallback">{mock}</div> : null}
          </div>
        )}
      </PhoneFrame>
    </div>
  );
}

export function PathExecutionSurface() {
  const [actionType, setActionType] = useState<ActionType>("time-based");
  const [view, setView] = useState<PathView>("timeline");
  const activeView = PATH_VIEWS.find((item) => item.key === view)!;
  const activeType = ACTION_TYPES.find((item) => item.key === actionType)!;

  return (
    <div className="path-product-story" aria-label="Path product story">
      <div className="path-product-intro">
        <span className="path-product-intro__eyebrow">The operating surface</span>
        <h3 className="path-product-intro__title">Two ways to move the day forward.</h3>
        <p className="path-product-intro__lead">
          Path is where Mountain becomes motion. Create time-based actions and check-offs once,
          reuse them every day, and let North Star notice the proof behind habits and behaviors.
        </p>
      </div>

      <div className="path-product-types">
        {ACTION_TYPES.map((type) => (
          <button
            key={type.key}
            type="button"
            className={`path-product-type${actionType === type.key ? " is-active" : ""}`}
            onClick={() => setActionType(type.key)}
          >
            <GlassCard active={actionType === type.key} className="path-product-type__card">
              <span className="path-product-type__label">{type.label}</span>
              <span className="path-product-type__measure">{type.measure}</span>
              <p className="path-product-type__hint">{type.hint}</p>
              <ul className="path-product-type__examples">
                {type.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
              <p className="path-product-type__signal">{type.signal}</p>
            </GlassCard>
          </button>
        ))}
      </div>

      <div className="path-product-views">
        <div className="path-product-views__head">
          <div>
            <span className="path-product-views__eyebrow">Three views</span>
            <h4 className="path-product-views__title">{activeView.verb}</h4>
            <p className="path-product-views__copy">{activeView.copy}</p>
          </div>
          <div className="path-product-views__metrics" aria-hidden="true">
            <span>
              <strong>2</strong> action types
            </span>
            <span>
              <strong>3</strong> views
            </span>
            <span>
              <strong>1</strong> Path
            </span>
          </div>
        </div>

        <div className="path-product-views__tabs" role="tablist" aria-label="Path views">
          {PATH_VIEWS.map((item) => (
            <TabButton
              key={item.key}
              active={view === item.key}
              onClick={() => setView(item.key)}
            >
              {item.label}
            </TabButton>
          ))}
        </div>

        <div className="path-product-views__body">
          <PathPhonePreview view={view} actionType={actionType} />

          <GlassCard active className="path-product-context-card">
            <span className="path-product-context-card__eyebrow">{activeType.label}</span>
            <h4 className="path-product-context-card__title">
              {view === "timeline" && "Paint the day in ten-minute proof."}
              {view === "today" && "See pending, done, and the timer-ready now."}
              {view === "create" && "Build the library your future self reuses."}
            </h4>
            <p className="path-product-context-card__copy">{activeView.copy}</p>
            {view === "today" ? (
              <p className="path-product-context-card__timer">
                <span aria-hidden="true" className="path-pulse-dot" />
                Press <strong>Play</strong> on a time-based action to start focus at the current
                moment — tracked minutes roll into today&apos;s totals.
              </p>
            ) : null}
            {view === "create" ? (
              <div className="path-product-context-card__subtabs">
                <TabButton
                  active={actionType === "time-based"}
                  onClick={() => setActionType("time-based")}
                  className="path-product-tab--compact"
                >
                  Time-based
                </TabButton>
                <TabButton
                  active={actionType === "checkoff"}
                  onClick={() => setActionType("checkoff")}
                  className="path-product-tab--compact"
                >
                  Check-offs
                </TabButton>
              </div>
            ) : null}
          </GlassCard>
        </div>
      </div>

      <GlassCard className="path-product-mountain">
        <div className="path-product-mountain__grid">
          <div>
            <span className="path-product-mountain__eyebrow">Linked proof</span>
            <h4 className="path-product-mountain__title">Effort that rolls up to goals in real time.</h4>
            <p className="path-product-mountain__copy">
              Link Path actions to Mountain goals — today and future — so tracked minutes and
              completions answer whether you are actually working toward direction, not just staying
              busy.
            </p>
          </div>
          <div className="path-product-mountain__proof">
            {MOUNTAIN_PROOF.map((item) => (
              <div key={item.label} className="path-product-mountain__receipt">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="path-product-loop">
        <div className="path-product-loop__copy">
          <span className="path-product-loop__eyebrow">North Star notices</span>
          <p>
            Repeated Path proof can read as a <strong>habit</strong> around{" "}
            <strong>21</strong> consistent days and deeper <strong>behavior</strong> around{" "}
            <strong>66</strong> — grounded in receipts, not vague motivation.
          </p>
        </div>
        <div className="path-product-loop__steps" aria-hidden="true">
          {LOOP_STEPS.map((step) => (
            <div key={step.value} className="path-product-loop__step">
              <span className="path-product-loop__step-value">{step.value}</span>
              <span className="path-product-loop__step-label">{step.label}</span>
            </div>
          ))}
        </div>
        <Link href="/#habits" className="path-product-loop__cta">
          See habits &amp; behaviors
        </Link>
      </div>
    </div>
  );
}
