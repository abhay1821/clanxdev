import type { ReactElement } from "react";

export type NavItem = {
  label: string;
  href: string;
  icon: (props: { className?: string }) => ReactElement;
};
