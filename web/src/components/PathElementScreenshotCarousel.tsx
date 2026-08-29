"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";
import { PathScreenshotCaption } from "./PathScreenshotCaption";

type AppScreenshotCarouselSlide = {
  src: string;
  alt: string;
  label: string;
  imageFit?: "contain" | "cover";
  imagePosition?: string;
  captionPlacement?: "bottom" | "lifted";
  story: {
    eyebrow: string;
    title: string;
    body: string;
    chips: readonly string[];
  };
};

export function AppScreenshotCarousel({
  ariaLabel,
  slides,
  progressLabel = "Screenshot progress",
  className,
  sizes = "(max-width: 900px) 392px, 360px",
}: {
  ariaLabel: string;
  slides: readonly AppScreenshotCarouselSlide[];
  progressLabel?: string;
  className?: string;
  sizes?: string;
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
    }, 5200);

    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const activeSlide = slides[activeIndex] ?? slides[0];
  const activeStory = activeSlide.story;

  return (
    <div
      className={
        className
          ? `path-element-screenshot-carousel ${className}`
          : "path-element-screenshot-carousel"
      }
      aria-label={ariaLabel}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="path-element-screenshot-carousel__viewport" aria-live="polite">
        <Image
          key={activeSlide.src}
          src={activeSlide.src}
          alt={activeSlide.alt}
          fill
          sizes={sizes}
          className="path-element-screenshot-carousel__image"
          style={{
            "--app-shot-fit": activeSlide.imageFit ?? "contain",
            "--app-shot-position": activeSlide.imagePosition ?? "top center",
          } as CSSProperties}
          unoptimized
          priority={activeIndex === 0}
        />
        <PathScreenshotCaption
          story={activeStory}
          className={
            activeSlide.captionPlacement === "lifted" ? "path-shot-caption--lifted" : ""
          }
        />
      </div>

      <p className="path-element-screenshot-carousel__sr-only">
        {activeStory.eyebrow}: {activeStory.title}. {activeStory.body}
      </p>

      <div
        className="element-screenshot-carousel__progress path-element-screenshot-carousel__progress"
        aria-label={progressLabel}
        style={{ "--carousel-count": slides.length } as CSSProperties}
      >
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show ${slide.label}: ${slide.story.title}`}
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
