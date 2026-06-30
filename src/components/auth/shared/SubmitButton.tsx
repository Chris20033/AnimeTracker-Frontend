import type { ComponentPropsWithoutRef } from 'react'

interface SubmitButtonProps extends ComponentPropsWithoutRef<'button'> {
  isLoading: boolean
  loadingLabel: string
}

export function SubmitButton({ children, isLoading, loadingLabel, ...props }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || props.disabled}
      className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-3 font-black text-[#271018] shadow-[0_18px_40px_var(--shadow)] outline-none transition hover:-translate-y-0.5 hover:brightness-105 focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:bg-[var(--surface-inset)] disabled:text-[var(--soft)] disabled:shadow-none"
      {...props}
    >
      {isLoading ? loadingLabel : children}
    </button>
  )
}
