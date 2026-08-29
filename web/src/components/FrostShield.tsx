import { type HTMLAttributes, type ReactNode } from "react";

export function FrostShield({
  children,
  className = "",
  style,
  ...props
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`frost-shield ${className}`.trim()} style={style} {...props}>
      {children}
    </div>
  );
}
