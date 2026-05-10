import type { ReactNode } from 'react'

interface ToggleProps {
  label: string
  hint?: string
  checked: boolean
  onChange: (value: boolean) => void
  checkedChildren?: ReactNode
}

export function Toggle({ label, hint, checked, onChange, checkedChildren }: ToggleProps) {
  const showBelowRow = Boolean(hint || (checked && checkedChildren))

  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex items-center justify-between gap-4">
        <p className="font-dm text-[14px] font-medium leading-[140%] text-[#1F2937]">{label}</p>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FBCFFB] ${
            checked ? 'bg-[#C530C5]' : 'bg-[#D9D9D9]'
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              checked ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
      {showBelowRow ? (
        <div
          className={
            hint && checked && checkedChildren
              ? 'flex flex-col gap-2'
              : 'flex flex-col'
          }
        >
          {hint ? (
            <p className="font-dm text-[12px] font-normal leading-[150%] text-[#5B6473]">{hint}</p>
          ) : null}
          {checked && checkedChildren ? checkedChildren : null}
        </div>
      ) : null}
    </div>
  )
}
