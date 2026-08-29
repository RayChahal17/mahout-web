export type ElementIconName = "mountain" | "path" | "elephant" | "mahout" | "north-star";

type ElementIconProps = {
  name: ElementIconName;
  size?: number;
  className?: string;
};

const ELEPHANT_PATH =
  "m369.554688 27.152344h-18.820313l-.410156-.277344c-15.367188-10.613281-45.277344-31.230469-86.234375-25.335938.066406.09375.097656.203126.160156.296876-30.378906 5.03125-64.398438 28.71875-75.75 60.667968-10.949219 30.78125-2.476562 67.804688 25.210938 110.074219l42.339843 64.695313c64.023438-32.011719 61.734375-80.777344 60.371094-109.914063-.203125-4.292969-.335937-7.398437-.335937-10.15625 0-8.296875 6.714843-15.007813 15.007812-15.007813 8.296875 0 15.007812 6.710938 15.007812 15.007813 0 2.332031.132813 4.96875.265626 7.828125 1.523437 32.539062 4.601562 98.34375-76.890626 139.089844-5.085937 2.546875-13.523437 7.566406-18.65625 7.566406-4.925781 0-9.71875-2.417969-12.574218-6.785156l-49.65625-75.878906c-33.082032-50.539063-42.636719-96.488282-28.378906-136.574219 3.175781-8.925781 7.550781-16.605469 12.324218-23.742188-96.527344 11.664063-172.429687 94.097657-172.4687498 195.722657-.3554682 15.128906-.6679682 61.164062 39.4492188 120.289062 14.011719 20.667969 21.429687 46.492188 21.429687 74.691406v42.988282c0 8.296874 6.710938 15.007812 15.007813 15.007812h60.03125c8.296875 0 14.808594-6.710938 14.808594-15.007812v-75.042969h60.234375v75.042969c0 8.296874 6.714844 15.007812 15.011718 15.007812h60.03125c8.296876 0 14.808594-6.710938 14.808594-15.007812 0-58.203126 12.117188-110.335938 36.652344-159.390626l17.046875-34.09375 28.960937 4.824219c21.792969 3.632813 37.609376 22.304688 37.609376 44.410157v24.183593c0 12.296875-16.871094 19.332031-25.621094 10.609375-5.859375-5.863281-15.359375-5.863281-21.222656 0l-42.417969 42.417969c-5.859375 5.863281-5.859375 15.359375 0 21.222656 25.402343 25.429688 61.617187 35.804688 96.792969 27.746094 44.734374-10.246094 83.320312-59.933594 83.320312-108.492187v-167.042969c0-78.105469-64.335938-141.640625-142.445312-141.640625zm36.585937 150.085937c-8.285156 0-15.007813-6.722656-15.007813-15.011719 0-8.289062 6.722657-15.007812 15.007813-15.007812 8.289063 0 15.011719 6.71875 15.011719 15.007812 0 8.289063-6.722656 15.011719-15.011719 15.011719zm0 0";

export function ElementIcon({ name, size = 24, className }: ElementIconProps) {
  if (name === "elephant") {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 512 511"
        fill="none"
        aria-hidden="true"
      >
        <g transform="translate(0 17)">
          <path d={ELEPHANT_PATH} fill="currentColor" />
          <path
            d={ELEPHANT_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={name === "mountain" ? "0 0 24 24" : "0 0 48 48"}
      fill="none"
      aria-hidden="true"
    >
      {name === "mountain" ? (
        <>
          <path d="M3 19h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 19 7 11c0.4 -0.7 1.4 -0.7 1.8 0l2 3.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 14 15 8.5c0.4 -0.7 1.4 -0.7 1.8 0L21 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 19c1 -1 1.8 -2 2 -3.1 0.5 -0.8 1 -1.6 1.5 -2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}

      {name === "path" ? (
        <g transform="translate(24 24)">
          <path d="M-16 14 C-6 8 -8 -2 2 -6 C12 -10 10 -18 16 -20" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="-16" cy="14" r="4.2" fill="currentColor" />
          <circle cx="2" cy="-6" r="4.2" fill="currentColor" />
          <circle cx="16" cy="-20" r="4.2" fill="currentColor" />
        </g>
      ) : null}

      {name === "mahout" ? (
        <g transform="translate(24 24)">
          <path d="M-12.5 -4 a10.5 10.5 0 1 0 21 0 a10.5 10.5 0 1 0 -21 0" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-15 -6 A13 13 0 0 1 11 -6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-13 -6 H7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-20 22 C-14 12 10 12 16 22" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}

      {name === "north-star" ? (
        <>
          <path d="M24 4 L29 19 L44 24 L29 29 L24 44 L19 29 L4 24 L19 19 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 17 A7 7 0 1 1 23.99 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 12 V36 M12 24 H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
    </svg>
  );
}

export function ElementIconBadge({
  name,
  size = 40,
  iconSize = 22,
  className,
}: {
  name: ElementIconName;
  size?: number;
  iconSize?: number;
  className?: string;
}) {
  return (
    <span
      className={className ? `element-icon-badge ${className}` : "element-icon-badge"}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
      }}
    >
      <ElementIcon name={name} size={iconSize} />
    </span>
  );
}
