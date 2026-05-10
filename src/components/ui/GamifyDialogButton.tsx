import type { ButtonHTMLAttributes, ReactNode } from "react";

export type GamifyDialogButtonVariant = "secondary" | "primary";

const variantClass: Record<GamifyDialogButtonVariant, string> = {
  secondary:
    "border border-[#D5D6DA] bg-white text-[#2A2C31] hover:bg-[#FAFAFA]",
  primary:
    "bg-gradient-to-r from-[#E173E1] to-[#D67DE4] text-white hover:opacity-95",
};

const baseClass =
  "inline-flex items-center justify-center rounded-[10px] px-6 py-2.5 text-center font-dm text-[16px] font-medium leading-[140%] transition focus:outline-none focus:ring-2 focus:ring-[#FBCFFB] disabled:pointer-events-none disabled:opacity-50";

type GamifyDialogButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: GamifyDialogButtonVariant;
  children: ReactNode;
};

export function GamifyDialogButton({
  variant,
  className,
  children,
  type = "button",
  ...rest
}: GamifyDialogButtonProps) {
  return (
    <button
      type={type}
      className={[baseClass, variantClass[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
