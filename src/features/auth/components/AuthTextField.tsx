import type { ComponentPropsWithoutRef } from 'react'

type AuthTextFieldProps = ComponentPropsWithoutRef<'input'> & {
  label: string
  error?: string
}

export function AuthTextField({ label, error, id, ...props }: AuthTextFieldProps) {
  const inputId = id ?? props.name
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <label className="block">
      <span className="text-sm font-semibold text-stone-200">{label}</span>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={`mt-2 w-full rounded-2xl border bg-stone-950/60 px-4 py-3 text-stone-50 outline-none transition placeholder:text-stone-500 focus:ring-4 ${
          error
            ? 'border-red-300/70 focus:border-red-200 focus:ring-red-300/15'
            : 'border-white/10 focus:border-amber-200 focus:ring-amber-300/15'
        }`}
        {...props}
      />
      {error ? (
        <span id={errorId} className="mt-2 block text-sm font-medium text-red-200">
          {error}
        </span>
      ) : null}
    </label>
  )
}
