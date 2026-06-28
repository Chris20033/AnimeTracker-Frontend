import type { ComponentPropsWithoutRef } from 'react'

type AuthSubmitButtonProps = ComponentPropsWithoutRef<'button'> & {
  isLoading: boolean
  loadingLabel: string
}

export function AuthSubmitButton({ children, isLoading, loadingLabel, ...props }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || props.disabled}
      className="inline-flex w-full items-center justify-center rounded-2xl bg-amber-300 px-5 py-3 font-black text-stone-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-300"
      {...props}
    >
      {isLoading ? loadingLabel : children}
    </button>
  )
}
