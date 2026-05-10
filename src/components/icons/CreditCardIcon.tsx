interface CreditCardIconProps {
  className?: string;
}

export function CreditCardIcon({ className }: CreditCardIconProps) {
  return (
    <svg
      className={["shrink-0", className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 11h18M7 16h4" />
    </svg>
  );
}
