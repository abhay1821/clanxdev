interface ChevronLeftIconProps {
  className?: string;
}

export function ChevronLeftIcon({ className }: ChevronLeftIconProps) {
  return (
    <svg
      className={["h-4 w-4 shrink-0 text-[#2A2C31]", className].filter(Boolean).join(" ")}
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 4L6 8l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
