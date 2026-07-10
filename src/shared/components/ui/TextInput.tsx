interface TextInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  min?: string
  max?: string
  step?: string
}

export function TextInput({ label, value, onChange, placeholder, type = 'text', min, max, step }: TextInputProps) {
  const inputId = label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div>
      <label htmlFor={inputId} className="text-sm font-black text-[var(--page-fg)]">{label}</label>
      <input id={inputId} type={type} min={min} max={max} step={step} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 min-h-12 w-full rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)] px-4 py-3 text-[var(--page-fg)] outline-none transition placeholder:text-[var(--soft)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--focus)]" />
    </div>
  )
}
