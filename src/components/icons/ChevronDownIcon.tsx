interface ChevronDownIconProps {
  open?: boolean;
  className?: string;
}

export function ChevronDownIcon({ open, className }: ChevronDownIconProps) {
  return (
    <svg
      className={[
        "h-4 w-4 shrink-0 text-[#52545A] transition-transform",
        open && "rotate-180",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
