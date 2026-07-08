import type { ComponentPropsWithoutRef } from "react";

interface SubmitButtonProps extends ComponentPropsWithoutRef<"button"> {
  isLoading: boolean;
  loadingLabel: string;
}

export function SubmitButton({
  children,
  isLoading,
  loadingLabel,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || props.disabled}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-white shadow-[0_14px_28px_var(--shadow)] outline-none transition hover:-translate-y-0.5 hover:brightness-105 focus:ring-4 focus:ring-[var(--focus)] active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-[var(--surface-inset)] disabled:text-[var(--soft)] disabled:shadow-none disabled:hover:brightness-100"
      {...props}
    >
      {isLoading ? loadingLabel : children}
    </button>
  );
}
