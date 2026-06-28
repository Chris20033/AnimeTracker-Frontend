import { NavLink } from 'react-router-dom'

export function BrandLink() {
  return (
    <NavLink to="/" className="group inline-flex items-center gap-3" aria-label="AnimeTracker inicio">
      <span className="grid size-11 place-items-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-xl font-black text-amber-200 shadow-[0_0_30px_rgba(251,191,36,0.18)] transition group-hover:scale-105">
        A
      </span>
      <span>
        <span className="block text-sm font-semibold uppercase tracking-[0.28em] text-amber-200/80">AnimeTracker</span>
        <span className="block text-xs text-stone-400">Tu biblioteca anime</span>
      </span>
    </NavLink>
  )
}
