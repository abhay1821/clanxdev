import { MenuIcon } from "../icons";

type TopHeaderProps = {
  selectedItem: string;
  onMenuClick: () => void;
};

export function TopHeader({ selectedItem, onMenuClick }: TopHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-brand-border bg-white px-4 py-4 md:px-[146px] md:py-5">
      <div className="flex min-w-0 flex-1 items-center">
        <button
          type="button"
          className="-ml-1 mr-2 shrink-0 rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <h1 className="truncate font-sora text-[18px] font-semibold leading-[140%] text-gray-900">
          {selectedItem}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-4 md:gap-5">
        <div className="relative">
          <BellIcon className="h-8 w-8 text-gray-600" />
          <span className="absolute -right-1 -top-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white">
            5
          </span>
        </div>
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#C530C5] font-sora text-sm font-bold text-white">
          C
        </div>
      </div>
    </header>
  );
}

function BellIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 17H5l1.4-1.4A2 2 0 0 0 7 14.2V11a5 5 0 1 1 10 0v3.2a2 2 0 0 0 .6 1.4L19 17h-4" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}
