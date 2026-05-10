interface InsightsIconProps {
  className?: string;
}

export function InsightsIcon({ className }: InsightsIconProps) {
  return (
    <svg
      className={["shrink-0", className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M8 7a4 4 0 0 0 0 8c1.5 0 2.8-.8 3.5-2" />
      <path d="M16 7a4 4 0 0 1 0 8c-1.5 0-2.8-.8-3.5-2" />
      <path d="M12 3v18" />
      <path d="M3 12h18" />
    </svg>
  );
}
