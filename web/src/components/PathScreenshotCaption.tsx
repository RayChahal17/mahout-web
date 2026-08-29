import type { PathScreenshotStory } from "@/lib/pathScreenshotStory";

export function PathScreenshotCaption({
  story,
  className = "",
}: {
  story: PathScreenshotStory;
  className?: string;
}) {
  return (
    <div
      className={`path-shot-caption${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <div key={`${story.eyebrow}-${story.title}`} className="path-shot-caption__inner">
        <span className="path-shot-caption__eyebrow">{story.eyebrow}</span>
        <p className="path-shot-caption__title">{story.title}</p>
        <p className="path-shot-caption__body">{story.body}</p>
        <div className="path-shot-caption__chips">
          {story.chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
