import { PlayMark } from "./PlayMark";
import { PlayStoreLink } from "./PlayStoreLink";

export function StickyCta() {
  return (
    <div className="sticky-cta">
      <PlayStoreLink className="sticky-cta__btn">
        <img className="sticky-cta__mark" src="/images/brand/mahout-mark.png" alt="" width={36} height={36} />
        <PlayMark />
        <span>Get it on Google Play</span>
      </PlayStoreLink>
    </div>
  );
}
