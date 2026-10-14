export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.eonextechnologies.mahout";

/** Play install referrer. Incoming ad UTMs win; otherwise the site click is tagged as Instagram. */
export function playStoreHref(search = ""): string {
  const incoming = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const referrer = new URLSearchParams();
  referrer.set("utm_source", incoming.get("utm_source") || "instagram");
  referrer.set("utm_medium", incoming.get("utm_medium") || "paid");
  referrer.set("utm_campaign", incoming.get("utm_campaign") || "instagram");
  const content = incoming.get("utm_content");
  if (content) referrer.set("utm_content", content);
  const term = incoming.get("utm_term");
  if (term) referrer.set("utm_term", term);
  return `${PLAY_STORE_URL}&referrer=${encodeURIComponent(referrer.toString())}`;
}

export const EONEX_URL = "https://eonextechnologies.com/";

export const EONEX_INFINITY_SRC = "/images/brand/eonex-infinity.png";
export const EONEX_LOCKUP_SRC = "/images/brand/eonex-lockup.png";
