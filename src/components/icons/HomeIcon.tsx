interface HomeIconProps {
  className?: string;
}

export function HomeIcon({ className }: HomeIconProps) {
  return (
    <svg
      className={["shrink-0", className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M3 11.5 12 3l9 8.5" />
      <path d="M5 10.5V21h14V10.5" />
      <path d="M10 21v-6h4v6" />
    </svg>
  );
}
