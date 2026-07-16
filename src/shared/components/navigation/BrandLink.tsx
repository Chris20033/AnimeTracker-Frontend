import { NavLink } from 'react-router-dom'

export function BrandLink() {
  return (
    <NavLink to="/" className="group inline-flex min-w-0 items-center gap-2.5 rounded-2xl outline-none focus:ring-4 focus:ring-[var(--focus)] sm:gap-3" aria-label="AnimeTracker home">
      <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-[0.95rem] transition group-hover:-translate-y-0.5 sm:size-12 sm:rounded-[1.1rem]">
        <img src="/logo_light.png" alt="" className="brand-logo-light size-full object-contain" aria-hidden="true" />
        <img src="/logo_dark.png" alt="" className="brand-logo-dark size-full object-contain" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block max-w-[7.5rem] truncate text-xs font-black tracking-[-0.01em] text-[var(--page-fg)] sm:max-w-none sm:text-sm">AnimeTracker</span>
        <span className="block max-w-[7.5rem] truncate text-[0.68rem] font-semibold text-[var(--muted)] sm:max-w-none sm:text-xs">Episode ledger</span>
      </span>
    </NavLink>
  )
}
