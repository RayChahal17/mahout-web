import { IosWaitNote } from "./IosWaitNote";
import { PlayMark } from "./PlayMark";
import { PlayStoreLink } from "./PlayStoreLink";

export function StickyCta() {
  return (
    <div className="sticky-cta">
      <div className="sticky-cta__row">
        <img className="sticky-cta__mark" src="/images/brand/mahout-app-icon.png" alt="" width={36} height={36} />
        <PlayStoreLink className="sticky-cta__btn">
          <PlayMark />
          <span>Get it on Google Play</span>
        </PlayStoreLink>
      </div>
      <IosWaitNote />
    </div>
  );
}
