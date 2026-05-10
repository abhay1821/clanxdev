import {
  CreditCardIcon,
  FileTextIcon,
  GiftIcon,
  HomeIcon,
  InsightsIcon,
  SettingsIcon,
} from "../icons";
import type { NavItem } from "../../types/navigation";

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: HomeIcon },
  {
    label: "Insights",
    href: "/insights",
    icon: InsightsIcon,
  },
  {
    label: "Gamification",
    href: "/gamification",
    icon: GiftIcon,
  },
  {
    label: "Applications",
    href: "/applications",
    icon: FileTextIcon,
  },
  {
    label: "Payments",
    href: "/payments",
    icon: CreditCardIcon,
  },
];

type SidebarProps = {
  selectedItem: string;
  onSelectItem: (label: string) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export function Sidebar({
  selectedItem,
  onSelectItem,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  function selectNav(label: string) {
    onSelectItem(label);
    onMobileClose();
  }

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-[min(280px,88vw)] flex-col border-r border-brand-border bg-[#F3EAF7] shadow-xl transition-transform duration-200 ease-out md:w-sidebar md:translate-x-0 md:shadow-none ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center px-5 pb-7 pt-6">
        <span className="font-sora text-lg font-bold tracking-tight text-gray-900">
          ClanxDev
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = selectedItem === item.label;
          const Icon = item.icon;

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => selectNav(item.label)}
              className={`flex w-full cursor-pointer select-none items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-150 ${
                active
                  ? "bg-white font-semibold text-fuchsia-600"
                  : "font-normal text-gray-500 hover:bg-fuchsia-100/60 hover:text-fuchsia-600"
              }`}
            >
              <Icon
                className={`h-[17px] w-[17px] ${active ? "text-fuchsia-600" : "text-gray-500"}`}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-6">
        <button
          type="button"
          onClick={() => selectNav("Settings")}
          className={`flex w-full cursor-pointer select-none items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-150 ${
            selectedItem === "Settings"
              ? "bg-white font-semibold text-fuchsia-600"
              : "font-normal text-gray-500 hover:bg-fuchsia-100/60 hover:text-fuchsia-600"
          }`}
        >
          <SettingsIcon
            className={`h-[17px] w-[17px] ${selectedItem === "Settings" ? "text-fuchsia-600" : "text-gray-500"}`}
          />
          Settings
        </button>
      </div>
    </aside>
  );
}
