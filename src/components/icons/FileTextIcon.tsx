interface FileTextIconProps {
  className?: string;
}

export function FileTextIcon({ className }: FileTextIconProps) {
  return (
    <svg
      className={["shrink-0", className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4.5h6M9 10h6M9 14h6" />
    </svg>
  );
}
