"use client";

import { useEffect, useState, type CSSProperties, type MouseEventHandler, type ReactNode } from "react";
import { playStoreHref } from "@/lib/siteLinks";

export function PlayStoreLink({
  children,
  className,
  style,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const [href, setHref] = useState(() => playStoreHref());

  useEffect(() => {
    setHref(playStoreHref(window.location.search));
  }, []);

  return (
    <a href={href} className={className} style={style} onClick={onClick}>
      {children}
    </a>
  );
}
