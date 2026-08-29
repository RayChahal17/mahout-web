"use client";

import { useEffect, useRef } from "react";

export function CursorAura() {
  const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const el = ref.current;
  if (!el) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;

  document.documentElement.classList.add("cursor-on");
  if (isCoarse) document.documentElement.classList.add("cursor-coarse");

  let x = window.innerWidth * 0.5;
  let y = window.innerHeight * 0.32;
  let tx = x;
  let ty = y;

  const applyVars = () => {
    el.style.setProperty("--cx", `${x}px`);
    el.style.setProperty("--cy", `${y}px`);
  };
  applyVars();

  let boostTimer: number | null = null;
  const setBoost = () => {
    document.documentElement.classList.add("cursor-boost");
    if (boostTimer) window.clearTimeout(boostTimer);
    boostTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("cursor-boost");
      boostTimer = null;
    }, 850);
  };

  // Even in reduced motion mode, show a STATIC aura (so mobile never looks boring)
  const onScroll = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    ty = window.innerHeight * (0.22 + 0.52 * p);
    tx = window.innerWidth * 0.5;
    x += (tx - x) * 0.25;
    y += (ty - y) * 0.25;
    applyVars();
  };

  if (reduce) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (boostTimer) window.clearTimeout(boostTimer);
      document.documentElement.classList.remove("cursor-on", "cursor-boost", "cursor-coarse");
    };
  }

  // Desktop pointer tracking
  const onPointerMove = (e: PointerEvent) => {
    tx = e.clientX;
    ty = e.clientY;
  };

  // Mobile touch tracking (THIS is what makes it feel like desktop)
  let touching = false;

  const onTouchStart = (e: TouchEvent) => {
    touching = true;
    const t = e.touches[0];
    if (!t) return;
    tx = t.clientX;
    ty = t.clientY;
    setBoost();
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
  };

  // Attach listeners
  if (!isCoarse) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  } else {
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Animation loop
  let rafId = 0;
  const loop = (time: number) => {
    // Only drift when NOT touching (so finger tracking actually works)
    if (isCoarse && !touching) {
      const driftX = Math.sin(time * 0.00035) * (window.innerWidth * 0.12);
      const driftY = Math.cos(time * 0.00028) * (window.innerHeight * 0.06);
      tx = window.innerWidth * 0.5 + driftX;
      // ty stays scroll-driven (set by onScroll), add tiny drift
      ty = ty + driftY;
    }

    x += (tx - x) * 0.12;
    y += (ty - y) * 0.12;

    applyVars();
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(rafId);

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchcancel", onTouchEnd);
    window.removeEventListener("scroll", onScroll);

    if (boostTimer) window.clearTimeout(boostTimer);

    document.documentElement.classList.remove("cursor-on", "cursor-boost", "cursor-coarse");
  };
}, []);

  return <div ref={ref} className="cursor-aura" aria-hidden="true" />;
}
