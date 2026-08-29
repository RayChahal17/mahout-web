"use client";

import { useEffect, useState } from "react";
import { Container } from "./Container";
import { FrostShield } from "./FrostShield";

const LOOP_STEPS = [
  {
    key: "vision",
    number: "01",
    phase: "Vision",
    label: "Future vision",
    title: "Name the life being built.",
    body: "Work, health, relationships, freedom, identity, peace, and impact become the source.",
    receipt: "Vision",
  },
  {
    key: "north-star",
    number: "02",
    phase: "Vision",
    label: "North Star forms",
    title: "Future self becomes the guide.",
    body: "North Star starts as the ideal future version of the user, not a generic chatbot.",
    receipt: "Guide",
  },
  {
    key: "mountain",
    number: "03",
    phase: "Direction + Action",
    label: "Mountain",
    title: "Direction becomes goals.",
    body: "Future Goals and Today Goals keep the day connected to the larger life being built.",
    receipt: "Goals",
  },
  {
    key: "path",
    number: "04",
    phase: "Direction + Action",
    label: "Path",
    title: "Goals become action.",
    body: "Actions, timers, checkoffs, sessions, and reminders turn intention into visible proof.",
    receipt: "Action",
  },
  {
    key: "habits",
    number: "05",
    phase: "Signal + Meaning",
    label: "Habits",
    title: "Repeated action becomes signal.",
    body: "After 21 consistent successes, repeated Path actions can become habit signals.",
    receipt: "21 days",
  },
  {
    key: "behaviors",
    number: "06",
    phase: "Signal + Meaning",
    label: "Behaviors",
    title: "Signal becomes rhythm.",
    body: "Longer consistency can reveal windows, friction, recovery, and durable behavior.",
    receipt: "66 days",
  },
  {
    key: "elephant",
    number: "07",
    phase: "Signal + Meaning",
    label: "Elephant",
    title: "Emotion adds weather.",
    body: "Mood and feeling state explain what was being carried behind actions, misses, and returns.",
    receipt: "Mood",
  },
  {
    key: "mahout",
    number: "08",
    phase: "Signal + Meaning",
    label: "Mahout",
    title: "Reflection adds meaning.",
    body: "Journaling helps the user say what happened plainly so the day becomes readable.",
    receipt: "Meaning",
  },
  {
    key: "brain",
    number: "09",
    phase: "Memory + Guidance",
    label: "Brain",
    title: "Memory keeps context.",
    body: "Vision, goals, actions, moods, reflection, habits, behaviors, trends, and patterns become usable context.",
    receipt: "Memory",
  },
  {
    key: "guidance",
    number: "10",
    phase: "Memory + Guidance",
    label: "Guidance",
    title: "North Star returns with receipts.",
    body: "Letters, reviews, chat, modes, and next steps become less generic because they are grounded in the loop.",
    receipt: "Next step",
  },
] as const;

const PHASES = ["Vision", "Direction + Action", "Signal + Meaning", "Memory + Guidance"] as const;
const RECEIPT_CHAIN = ["Vision", "Goals", "Action", "Receipt", "Mood", "Reflection", "Memory", "Guidance"] as const;

function ConnectedLoopIntro() {
  return (
    <div className="connected-loop-intro">
      <div>
        <div className="connected-loop-pill">
          <span aria-hidden="true" />
          Connected system loop
        </div>
        <h2>From future vision to today's next action.</h2>
        <p>
          Mahout turns scattered life data into one readable loop. North Star does not guide from a
          blank page; it reads direction, effort, emotion, reflection, memory, and receipts.
        </p>
      </div>

      <FrostShield className="connected-loop-context-card">
        <div className="connected-loop-eyebrow">The point</div>
        <p>
          Guidance becomes useful when the system can see what the user named, chose, did, felt,
          understood, repeated, and remembered.
        </p>
      </FrostShield>
    </div>
  );
}

function FocusedSystemLoop() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeStep = LOOP_STEPS[activeIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (paused || reducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % LOOP_STEPS.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="focused-system-loop"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="focused-loop-orbit" aria-label="Mahout connected loop">
        <div aria-hidden="true" className="focused-loop-orbit__halo" />
        <div aria-hidden="true" className="focused-loop-orbit__ring focused-loop-orbit__ring--outer" />
        <div aria-hidden="true" className="focused-loop-orbit__ring focused-loop-orbit__ring--inner" />

        <div className="focused-loop-core">
          <div className="focused-loop-core__mark">NS</div>
          <h3>North Star</h3>
          <p>Guidance becomes useful because the loop has receipts.</p>
        </div>

        <div className="focused-loop-nodes">
          {LOOP_STEPS.map((step, index) => {
            const active = index === activeIndex;

            return (
              <button
                key={step.key}
                type="button"
                aria-pressed={active}
                className={`focused-loop-node ${active ? "is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <span>{step.number}</span>
                <strong>{step.label}</strong>
              </button>
            );
          })}
        </div>
      </div>

      <FrostShield className="focused-loop-detail">
        <div className="focused-loop-detail__topline">
          <span>{activeStep.phase}</span>
          <span>{activeStep.number} / {String(LOOP_STEPS.length).padStart(2, "0")}</span>
        </div>
        <div className="focused-loop-detail__label">{activeStep.label}</div>
        <h3>{activeStep.title}</h3>
        <p>{activeStep.body}</p>
        <div className="focused-loop-detail__receipt">
          <span>Receipt</span>
          <strong>{activeStep.receipt}</strong>
        </div>
      </FrostShield>
    </div>
  );
}

function PhaseStrip() {
  return (
    <div className="connected-loop-phase-strip" aria-label="Mahout loop phases">
      {PHASES.map((phase) => (
        <FrostShield key={phase} className="connected-loop-phase-card">
          <span>{phase}</span>
        </FrostShield>
      ))}
    </div>
  );
}

function ReceiptBeam() {
  return (
    <FrostShield className="connected-loop-receipt-panel">
      <div className="connected-loop-eyebrow">Receipts are the thread</div>
      <div className="connected-loop-receipt-chain" aria-label="Receipts connect the Mahout loop">
        {RECEIPT_CHAIN.map((item, index) => (
          <span key={item}>
            {index > 0 ? <i aria-hidden="true">-&gt;</i> : null}
            {item}
          </span>
        ))}
      </div>
    </FrostShield>
  );
}

export function ConnectedLoopSection() {
  return (
    <section id="connected-loop" data-section data-scene="connected-loop" className="connected-loop-section">
      <div aria-hidden="true" className="connected-loop-section__glow connected-loop-section__glow--left" />
      <div aria-hidden="true" className="connected-loop-section__glow connected-loop-section__glow--right" />

      <Container>
        <div className="connected-loop-stack">
          <ConnectedLoopIntro />
          <PhaseStrip />
          <FocusedSystemLoop />
          <ReceiptBeam />
        </div>
      </Container>

      <style>{`
        .connected-loop-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, transparent 0%, rgba(156,140,255,0.035) 42%, transparent 100%);
        }

        .connected-loop-section__glow {
          position: absolute;
          width: 34vw;
          height: 34vw;
          max-width: 440px;
          max-height: 440px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .connected-loop-section__glow--left {
          left: -10vw;
          top: 12%;
          background: rgba(156,140,255,0.14);
        }

        .connected-loop-section__glow--right {
          right: -8vw;
          bottom: 8%;
          background: rgba(255,211,138,0.10);
        }

        .connected-loop-stack {
          position: relative;
          z-index: 1;
          display: grid;
          gap: clamp(22px, 4vw, 46px);
        }

        .connected-loop-intro {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(18px, 4vw, 42px);
          align-items: end;
          padding: clamp(18px, 3vw, 30px);
          border-radius: clamp(26px, 4vw, 38px);
          border: 1px solid rgba(255,255,255,0.08);
          background:
            radial-gradient(ellipse 58% 68% at 8% 36%, rgba(156,140,255,0.11), transparent 64%),
            radial-gradient(ellipse 42% 54% at 94% 22%, rgba(255,211,138,0.07), transparent 58%),
            linear-gradient(180deg, rgba(255,255,255,0.042), rgba(255,255,255,0.014));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 26px 70px -52px rgba(0,0,0,0.72);
        }

        .connected-loop-pill {
          display: inline-flex;
          align-items: center;
          gap: var(--mahout_space_8);
          padding: 10px 14px;
          border-radius: var(--mahout_radius_pill);
          border: 1px solid var(--mahout_outline_soft);
          background: rgba(255,255,255,0.04);
          color: var(--mahout_text_secondary);
          font-size: var(--text_caption);
          line-height: 1.2;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: var(--mahout_space_16);
        }

        .connected-loop-pill span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--mahout_accent);
          box-shadow: 0 0 18px var(--mahout_accent);
        }

        .connected-loop-intro h2 {
          margin: 0;
          max-width: 13ch;
          color: var(--mahout_text_primary);
          font-family: var(--font_head);
          font-size: clamp(34px, 5vw, 60px);
          line-height: var(--leading_tight);
          letter-spacing: -0.035em;
        }

        .connected-loop-intro p,
        .connected-loop-context-card p {
          margin: var(--mahout_space_16) 0 0;
          max-width: 58ch;
          color: var(--mahout_text_secondary);
          font-size: clamp(17px, 1.45vw, 20px);
          line-height: var(--leading_body);
        }

        .connected-loop-context-card,
        .connected-loop-phase-card,
        .focused-loop-detail,
        .connected-loop-receipt-panel {
          border-color: rgba(255,255,255,0.13) !important;
          background: linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.022)), rgba(8,10,20,0.52) !important;
        }

        .connected-loop-context-card,
        .connected-loop-receipt-panel {
          padding: clamp(18px, 3vw, 28px) !important;
        }

        .connected-loop-eyebrow {
          color: var(--mahout_accent);
          font-size: var(--text_caption);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .connected-loop-phase-strip {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--mahout_space_10);
        }

        .connected-loop-phase-card {
          padding: 14px 16px !important;
          border-radius: 18px !important;
        }

        .connected-loop-phase-card span {
          color: var(--mahout_text_primary);
          font-size: var(--text_body_m);
          font-weight: 750;
        }

        .focused-system-loop {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--mahout_space_18);
          align-items: stretch;
          padding: clamp(18px, 3vw, 28px);
          border-radius: clamp(28px, 4vw, 44px);
          border: 1px solid rgba(255,255,255,0.10);
          background:
            radial-gradient(ellipse 54% 44% at 40% 42%, rgba(156,140,255,0.14), transparent 68%),
            radial-gradient(ellipse 38% 30% at 70% 10%, rgba(255,211,138,0.08), transparent 62%),
            linear-gradient(180deg, rgba(255,255,255,0.048), rgba(255,255,255,0.016));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 90px -58px rgba(0,0,0,0.74);
        }

        .focused-loop-orbit {
          position: relative;
          min-height: 100%;
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--mahout_space_16);
          align-content: start;
          padding: clamp(18px, 3vw, 26px);
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.09);
          background:
            radial-gradient(ellipse 78% 46% at 50% 22%, rgba(156,140,255,0.13), transparent 68%),
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.014));
          isolation: isolate;
        }

        .focused-loop-orbit__halo {
          position: absolute;
          inset: 10%;
          border-radius: 50%;
          background:
            radial-gradient(circle at 50% 28%, rgba(255,211,138,0.12), transparent 26%),
            radial-gradient(circle at 50% 50%, rgba(156,140,255,0.24), transparent 66%);
          filter: blur(24px);
          opacity: 0.9;
        }

        .focused-loop-orbit__ring {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
        }

        .focused-loop-orbit__ring--outer {
          width: min(360px, 72%);
          height: min(360px, 72%);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 0 70px rgba(156,140,255,0.10);
        }

        .focused-loop-orbit__ring--inner {
          width: min(220px, 44%);
          height: min(220px, 44%);
          border: 1px dashed rgba(255,211,138,0.14);
        }

        .focused-loop-core {
          position: relative;
          z-index: 3;
          width: 100%;
          min-height: 260px;
          display: grid;
          place-items: center;
          align-content: center;
          text-align: center;
          padding: 24px;
          border-radius: 34px;
          border: 1px solid rgba(255,211,138,0.24);
          background:
            radial-gradient(circle at 50% 16%, rgba(255,211,138,0.16), transparent 40%),
            linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.026)),
            rgba(8,10,20,0.62);
          box-shadow: 0 0 64px rgba(156,140,255,0.18), 0 0 42px rgba(255,211,138,0.08), inset 0 1px 0 rgba(255,255,255,0.12);
        }

        .focused-loop-core__mark {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          margin-bottom: 12px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(156,140,255,0.13);
          color: var(--mahout_accent);
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .focused-loop-core h3 {
          margin: 0 0 8px;
          color: var(--mahout_text_primary);
          font-family: var(--font_head);
          font-size: clamp(27px, 4vw, 40px);
          line-height: 1.02;
        }

        .focused-loop-core p {
          margin: 0;
          color: var(--mahout_text_secondary);
          font-size: var(--text_body_m);
          line-height: 1.45;
        }

        .focused-loop-nodes {
          position: relative;
          z-index: 4;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--mahout_space_8);
        }

        .focused-loop-node {
          position: relative;
          z-index: 4;
          width: 100%;
          min-height: 52px;
          display: grid;
          grid-template-columns: 30px 1fr;
          gap: 5px;
          align-items: center;
          text-align: left;
          padding: 8px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(8,10,20,0.58);
          color: var(--mahout_text_secondary);
          cursor: pointer;
          transition: transform 240ms ease, border-color 240ms ease, background 240ms ease, color 240ms ease;
        }

        .focused-loop-node span {
          width: 27px;
          height: 27px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid rgba(156,140,255,0.28);
          color: var(--mahout_accent);
          font-size: 10px;
          font-weight: 900;
        }

        .focused-loop-node strong {
          font-size: 10px;
          line-height: 1.1;
          text-align: left;
        }

        .focused-loop-node.is-active {
          border-color: rgba(255,211,138,0.30);
          background: rgba(156,140,255,0.15);
          color: var(--mahout_text_primary);
          box-shadow: 0 0 30px rgba(156,140,255,0.12);
        }

        .focused-loop-detail {
          padding: clamp(22px, 4vw, 34px) !important;
          border-radius: 30px !important;
          min-height: 100%;
        }

        .focused-loop-detail__topline {
          display: flex;
          justify-content: space-between;
          gap: var(--mahout_space_12);
          color: var(--mahout_text_tertiary);
          font-size: var(--text_caption);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: var(--mahout_space_20);
        }

        .focused-loop-detail__label {
          color: var(--mahout_accent);
          font-size: var(--text_caption);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: var(--mahout_space_10);
        }

        .focused-loop-detail h3 {
          margin: 0;
          max-width: 12ch;
          color: var(--mahout_text_primary);
          font-family: var(--font_head);
          font-size: clamp(34px, 4.2vw, 52px);
          line-height: 1.02;
        }

        .focused-loop-detail p {
          margin: var(--mahout_space_16) 0 0;
          color: var(--mahout_text_secondary);
          font-size: var(--text_body);
          line-height: var(--leading_body);
          max-width: 54ch;
        }

        .focused-loop-detail__receipt {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--mahout_space_12);
          margin-top: var(--mahout_space_24);
          padding: 14px 16px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.04);
        }

        .focused-loop-detail__receipt span {
          color: var(--mahout_text_tertiary);
          font-size: var(--text_caption);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .focused-loop-detail__receipt strong {
          color: var(--mahout_text_primary);
          font-size: var(--text_body_m);
        }

        .connected-loop-receipt-chain {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: var(--mahout_space_16);
        }

        .connected-loop-receipt-chain span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 32px;
          padding: 7px 10px;
          border-radius: var(--mahout_radius_pill);
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.04);
          color: var(--mahout_text_secondary);
          font-size: var(--text_body_m);
        }

        .connected-loop-receipt-chain i {
          color: var(--mahout_accent);
          font-style: normal;
        }

        @media (prefers-reduced-motion: no-preference) {
          .focused-loop-core {
            animation: focusedLoopBreathe 8s ease-in-out infinite;
          }
        }

        @keyframes focusedLoopBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.012); }
        }

        @media (min-width: 860px) {
          .connected-loop-intro {
            grid-template-columns: minmax(0, 0.95fr) minmax(340px, 0.72fr);
          }

          .connected-loop-phase-strip {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .focused-system-loop {
            grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.82fr);
          }
        }

        @media (max-width: 760px) {
          .focused-loop-orbit {
            gap: var(--mahout_space_12);
          }

          .focused-loop-orbit__halo,
          .focused-loop-orbit__ring {
            display: none;
          }

          .focused-loop-core,
          .focused-loop-node {
            transform: none;
          }

          .focused-loop-nodes {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .focused-loop-core {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
