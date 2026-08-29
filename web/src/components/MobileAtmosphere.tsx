"use client";

import { useEffect, useRef } from "react";

type SceneKey = "hero" | "story" | "path" | "habits" | "north-star" | "privacy";

const SCENES: Record<SceneKey, { h1: number; h2: number; glow: number }> = {
  hero: { h1: 270, h2: 38, glow: 0.22 },
  story: { h1: 260, h2: 210, glow: 0.20 },
  path: { h1: 235, h2: 265, glow: 0.20 },
  habits: { h1: 290, h2: 165, glow: 0.18 },
  "north-star": { h1: 270, h2: 45, glow: 0.26 },
  privacy: { h1: 250, h2: 32, glow: 0.16 },
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function MobileAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (!isCoarse) return;

    const root = document.documentElement;
    root.classList.add("atmo-on");

    // Defaults (center-ish)
    let x = window.innerWidth * 0.5;
    let y = window.innerHeight * 0.30;
    let tx = x;
    let ty = y;

    let touching = false;

    let boostTimer: number | null = null;
    const boost = () => {
      root.classList.add("atmo-boost");
      if (boostTimer) window.clearTimeout(boostTimer);
      boostTimer = window.setTimeout(() => {
        root.classList.remove("atmo-boost");
        boostTimer = null;
      }, 900);
    };

    const apply = () => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };

    const setScene = (scene: SceneKey) => {
      const s = SCENES[scene];
      root.style.setProperty("--atmo_h1", `${s.h1}`);
      root.style.setProperty("--atmo_h2", `${s.h2}`);
      root.style.setProperty("--atmo_glow", `${s.glow}`);
    };

    // Start in hero mood
    setScene("hero");
    apply();

    // Scene observer: looks for elements with [data-scene]
    const sceneEls = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    let activeScene: SceneKey = "hero";

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most visible scene
        let best: { key: SceneKey; ratio: number } | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const key = (e.target as HTMLElement).dataset.scene as SceneKey | undefined;
          if (!key || !(key in SCENES)) continue;
          const ratio = e.intersectionRatio;
          if (!best || ratio > best.ratio) best = { key, ratio };
        }
        if (best && best.key !== activeScene) {
          activeScene = best.key;
          setScene(activeScene);
          boost(); // tiny "scene ignition"
        }
      },
      { threshold: [0.25, 0.35, 0.5, 0.65] }
    );

    sceneEls.forEach((n) => io.observe(n));

    const onScroll = () => {
      // Scroll-driven vertical movement (alive even without touch)
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = clamp01(window.scrollY / max);

      if (!touching) {
        ty = window.innerHeight * (0.22 + 0.56 * p);
        tx = window.innerWidth * 0.5;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touching = true;
      const t = e.touches[0];
      if (!t) return;
      tx = t.clientX;
      ty = t.clientY;
      boost();
    };

    const onTouchMove = (e: TouchEvent) => {
      touching = true;
      const t = e.touches[0];
      if (!t) return;
      tx = t.clientX;
      ty = t.clientY;
    };

    const onTouchEnd = () => {
      touching = false;
      onScroll(); // return to scroll-driven
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    onScroll();

    let rafId = 0;
    const loop = (time: number) => {
      // Ambient drift when idle (subtle)
      if (!touching) {
        const driftX = Math.sin(time * 0.00035) * (window.innerWidth * 0.08);
        tx = window.innerWidth * 0.5 + driftX;
      }

      x += (tx - x) * 0.10;
      y += (ty - y) * 0.10;

      apply();
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);

      if (boostTimer) window.clearTimeout(boostTimer);
      root.classList.remove("atmo-on", "atmo-boost");
    };
  }, []);

  return <div ref={ref} className="mobile-atmosphere" aria-hidden="true" />;
}
