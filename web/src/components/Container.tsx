import { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: "min(var(--max_content), calc(100% - 48px))",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
}
