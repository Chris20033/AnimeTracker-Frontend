interface SelectInputProps {
  label: string
  value: string
  options: Array<{ value: string, label: string }>
  onChange: (value: string) => void
  disabled?: boolean
}

export function SelectInput({ label, value, options, onChange, disabled }: SelectInputProps) {
  const inputId = label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div>
      <label htmlFor={inputId} className="text-sm font-black text-[var(--page-fg)]">{label}</label>
      <select id={inputId} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-12 w-full rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)] px-4 py-3 text-[var(--page-fg)] outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-60">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  )
}
