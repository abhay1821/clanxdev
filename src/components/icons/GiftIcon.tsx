interface GiftIconProps {
  className?: string;
}

export function GiftIcon({ className }: GiftIconProps) {
  return (
    <svg
      className={["shrink-0", className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13M3 12h18" />
      <path d="M9.3 8A2.3 2.3 0 1 1 12 5.7V8H9.3ZM14.7 8A2.3 2.3 0 1 0 12 5.7V8h2.7Z" />
    </svg>
  );
}
