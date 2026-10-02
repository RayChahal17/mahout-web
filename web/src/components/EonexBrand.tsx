import type { CSSProperties } from "react";
import { EONEX_INFINITY_SRC, EONEX_LOCKUP_SRC, EONEX_URL } from "@/lib/siteLinks";

const glow: CSSProperties = {
  display: "block",
  objectFit: "contain",
};

export function EonexEmblem({ height = 36 }: { height?: number }) {
  return (
    <img
      src={EONEX_INFINITY_SRC}
      alt=""
      style={{ ...glow, height, width: "auto", flexShrink: 0 }}
    />
  );
}

export function EonexLockup() {
  return (
    <a
      href={EONEX_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Eonex Technologies, opens in a new tab"
      style={{ display: "inline-flex", marginTop: "var(--mahout_space_24)" }}
    >
      <img
        src={EONEX_LOCKUP_SRC}
        alt=""
        style={{ ...glow, width: 196, height: "auto" }}
      />
    </a>
  );
}
