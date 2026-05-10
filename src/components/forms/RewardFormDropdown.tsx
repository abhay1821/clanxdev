import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "../icons";

export interface RewardFormDropdownOption {
  id: string;
  label: string;
}

export interface RewardFormDropdownProps {
  label: string;
  placeholder: string;
  required?: boolean;
  selectedId: string;
  options: RewardFormDropdownOption[];
  formatSelection: () => string;
  onPickOption: (id: string) => void;
  renderNested?: (optionId: string) => ReactNode;
  shouldShowFooter?: (selectedId: string) => boolean;
  onPanelOpen?: () => void;
  onFooterCancel?: () => void;
  onFooterSave?: () => void;
  closePanelAfterPick?: (optionId: string) => boolean;
}

export function RewardFormDropdown({
  label,
  placeholder,
  required = false,
  selectedId,
  options,
  formatSelection,
  onPickOption,
  renderNested,
  shouldShowFooter,
  onPanelOpen,
  onFooterCancel,
  onFooterSave,
  closePanelAfterPick,
}: RewardFormDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const showPlaceholder = !selectedId;
  const selectionText = formatSelection();

  const handleToggleMain = () => {
    if (!open) {
      onPanelOpen?.();
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handlePickRow = (id: string) => {
    onPickOption(id);
    if (closePanelAfterPick?.(id)) {
      setOpen(false);
    }
  };

  const handleFooterCancel = () => {
    onFooterCancel?.();
    setOpen(false);
  };

  const handleFooterSave = () => {
    onFooterSave?.();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el || !(e.target instanceof Node) || el.contains(e.target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const footerVisible =
    open && Boolean(selectedId && shouldShowFooter?.(selectedId));

  return (
    <div ref={rootRef} className="flex flex-col gap-1">
      <label
        id={`${listId}-label`}
        className="font-['Plus Jakarta Sans'] text-[14px] font-normal leading-[140%] text-[#5C5E63]"
      >
        {label}
        {required ? <span className="ml-1 text-[#E43A2B]">*</span> : null}
      </label>

      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-labelledby={`${listId}-label`}
          onClick={handleToggleMain}
          className={`flex w-full items-center justify-between rounded-[13.13px] bg-white px-[10px] py-[9px] font-dm text-[16px] font-normal leading-[140%] outline-none transition-colors ${
            open ? "border border-[#E3E3E3]" : "border border-[#D5D6DA]"
          }`}
        >
          <span
            className={`truncate text-left ${showPlaceholder ? "text-[#B5B5B5]" : "text-[#2A2C31]"}`}
          >
            {showPlaceholder ? placeholder : selectionText}
          </span>
          <ChevronDownIcon open={open} />
        </button>

        {open ? (
          <div
            id={listId}
            role="listbox"
            aria-labelledby={`${listId}-label`}
            className="absolute left-0 right-0 top-full z-10 mt-1 rounded-[13.13px] border border-[#E3E3E3] bg-white px-1 pt-1 pb-2 shadow-card"
          >
            <ul className="flex flex-col">
              {options.map((opt) => {
                const selected = selectedId === opt.id;
                const nested =
                  selected && renderNested ? renderNested(opt.id) : null;
                return (
                  <li
                    key={opt.id}
                    role="presentation"
                    className="flex flex-col"
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => handlePickRow(opt.id)}
                      className={`flex w-full items-center justify-between gap-2 px-[9px] py-[9px] font-dm text-[16px] font-normal leading-[140%] text-left transition-colors ${
                        selected
                          ? "rounded-[8.75px] bg-[#FAEEFA] text-[#C530C5]"
                          : "text-[#2A2C31]"
                      }`}
                    >
                      <span className="truncate">
                        {selected ? selectionText : opt.label}
                      </span>
                      {selected ? <CheckIcon /> : null}
                    </button>
                    {nested}
                  </li>
                );
              })}
            </ul>

            {footerVisible ? (
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleFooterCancel}
                  className="flex h-10 flex-1 items-center justify-center rounded-[10px] border border-[#E3E3E3] bg-white text-center font-dm text-[16px] font-medium leading-[140%] text-[#2A2C31]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFooterSave}
                  className="flex h-10 flex-1 items-center justify-center rounded-[10px] border border-[#E3E3E3] bg-[#C530C5] text-center font-dm text-[16px] font-medium leading-[140%] text-white"
                >
                  Save
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
