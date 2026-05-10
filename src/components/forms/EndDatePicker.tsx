import { useEffect, useId, useRef, useState } from "react";
import { formatIsoDateShortComma, toIsoLocalDate } from "../../data/dateLimits";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "../icons";

type CalendarCell = { iso: string; inMonth: boolean; disabled: boolean };

function buildCalendarCells(
  year: number,
  monthIndex: number,
  minIso: string,
): CalendarCell[] {
  const cells: CalendarCell[] = [];
  const offset = new Date(year, monthIndex, 1).getDay();

  for (let j = offset; j >= 1; j--) {
    const d = new Date(year, monthIndex, j - offset);
    const iso = toIsoLocalDate(d);
    cells.push({ iso, inMonth: false, disabled: iso < minIso });
  }

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, monthIndex, day);
    const iso = toIsoLocalDate(d);
    cells.push({ iso, inMonth: true, disabled: iso < minIso });
  }

  let tail = 1;
  while (cells.length < 42) {
    const d = new Date(year, monthIndex + 1, tail++);
    const iso = toIsoLocalDate(d);
    cells.push({ iso, inMonth: false, disabled: iso < minIso });
  }

  return cells;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface EndDatePickerProps {
  value: string;
  minDate: string;
  onChange: (iso: string) => void;
  placeholder?: string;
}

export function EndDatePicker({
  value,
  minDate,
  onChange,
  placeholder = "Select End Date",
}: EndDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    if (value) {
      const [y, m] = value.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    const [y, m] = minDate.split("-").map(Number);
    return new Date(y, m - 1, 1);
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const year = viewMonth.getFullYear();
  const monthIndex = viewMonth.getMonth();
  const cells = buildCalendarCells(year, monthIndex, minDate);

  useEffect(() => {
    if (!open) return;
    function onDocMouseDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el || !(e.target instanceof Node) || el.contains(e.target)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function prevMonth() {
    setViewMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function nextMonth() {
    setViewMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function selectDay(iso: string, disabled: boolean) {
    if (disabled) return;
    onChange(iso);
    setOpen(false);
  }

  const headerLabel = `${MONTH_NAMES[monthIndex]} ${year}`;

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        id={`${uid}-trigger`}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={`${uid}-popover`}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 rounded-[10px] border-2 border-[#C530C5] bg-white px-[10px] py-[9px] text-left outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#C530C5]/30"
      >
        <CalendarIcon />
        <span
          className={`min-w-0 flex-1 font-dm text-[16px] font-normal leading-[140%] ${value ? "text-[#2A2C31]" : "text-[#B5B5B5]"}`}
        >
          {value ? formatIsoDateShortComma(value) : placeholder}
        </span>
      </button>

      {open ? (
        <div
          id={`${uid}-popover`}
          role="dialog"
          aria-label="Choose end date"
          className="absolute left-0 right-0 top-full z-[60] mt-[8px] rounded-[10px] border border-[#E3E3E3] bg-white p-3 shadow-modal"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={prevMonth}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#E3E3E3] bg-white transition hover:bg-[#F9FAFB]"
              aria-label="Previous month"
            >
              <ChevronLeftIcon />
            </button>
            <span className="font-dm text-[16px] font-semibold leading-[140%] text-[#2A2C31]">
              {headerLabel}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#E3E3E3] bg-white transition hover:bg-[#F9FAFB]"
              aria-label="Next month"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {WEEK_SHORT.map((w) => (
              <div
                key={w}
                className="pb-1 text-center font-dm text-[12px] font-normal leading-[140%] text-[#5C5E63]"
              >
                {w}
              </div>
            ))}
            {cells.map((cell, idx) => {
              const selected = value === cell.iso;
              const dayNum = parseInt(cell.iso.split("-")[2] ?? "0", 10);
              return (
                <button
                  key={`${cell.iso}-${idx}`}
                  type="button"
                  disabled={cell.disabled}
                  onClick={() => selectDay(cell.iso, cell.disabled)}
                  className={[
                    "flex h-9 items-center justify-center rounded-[10px] font-dm text-[14px] leading-[140%] transition",
                    selected &&
                      "bg-[#C530C5] font-medium text-white hover:bg-[#C530C5]",
                    !selected &&
                      cell.disabled &&
                      (cell.inMonth
                        ? "cursor-not-allowed text-[#D5D6DA]"
                        : "cursor-not-allowed text-[#E8E8E8]"),
                    !selected &&
                      !cell.disabled &&
                      cell.inMonth &&
                      "text-[#2A2C31] hover:bg-[#FAEEFA]/80",
                    !selected &&
                      !cell.disabled &&
                      !cell.inMonth &&
                      "text-[#B5B5B5] hover:bg-[#FAEEFA]/50",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
