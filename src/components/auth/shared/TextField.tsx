import type { ComponentPropsWithoutRef } from 'react'
import { useState } from 'react'

interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
  label: string
  error?: string
}

export function TextField({ label, error, id, ...props }: TextFieldProps) {
  const inputId = id ?? props.name
  const errorId = error ? `${inputId}-error` : undefined
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPasswordField = props.type === 'password'
  const inputType = isPasswordField && isPasswordVisible ? 'text' : props.type

  return (
    <div className="block">
      <label htmlFor={inputId} className="text-sm font-black text-[var(--page-fg)]">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`w-full rounded-2xl border bg-[var(--surface-inset)] px-4 py-3 text-[var(--page-fg)] outline-none transition placeholder:text-[var(--soft)] focus:ring-4 ${
            isPasswordField ? 'pr-14' : ''
          } ${
            error
              ? 'border-red-300/70 focus:border-red-300 focus:ring-red-300/15'
              : 'border-[var(--line)] focus:border-[var(--accent)] focus:ring-[var(--focus)]'
          }`}
          {...props}
          type={inputType}
        />

        {isPasswordField ? (
          <ShowPasswordButton
            isPasswordVisible={isPasswordVisible}
            onToggle={() => setIsPasswordVisible((currentValue) => !currentValue)}
          />
        ) : null}
      </div>
      {error ? (
        <span id={errorId} className="mt-2 block text-sm font-semibold text-[var(--danger)]">
          {error}
        </span>
      ) : null}
    </div>
  )
}

interface ShowPasswordButtonProps {
  isPasswordVisible: boolean
  onToggle: () => void
}

function ShowPasswordButton({ isPasswordVisible, onToggle }: ShowPasswordButtonProps) {
  const iconId = isPasswordVisible ? 'eye-off-icon' : 'eye-icon'

  return (
    <button
      type="button"
      aria-label={isPasswordVisible ? 'Ocultar contrasena' : 'Mostrar contrasena'}
      aria-pressed={isPasswordVisible}
      onClick={onToggle}
      className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-xl text-[var(--muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)] focus:outline-none focus:ring-4 focus:ring-[var(--focus)]"
    >
      <svg aria-hidden="true" className="size-5">
        <use href={`/icons.svg#${iconId}`} />
      </svg>
    </button>
  )
}
