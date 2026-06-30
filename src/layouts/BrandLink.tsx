import { NavLink } from 'react-router-dom'

export function BrandLink() {
  return (
    <NavLink to="/" className="group inline-flex items-center gap-3" aria-label="AnimeTracker inicio">
      <span className="relative grid size-12 place-items-center overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] text-xl font-black text-[var(--accent-strong)] shadow-[0_18px_45px_var(--shadow)] transition group-hover:-rotate-2 group-hover:scale-105">
        <span className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,_var(--sakura),_var(--accent),_var(--aura))]" />
        AT
      </span>
      <span>
        <span className="block text-sm font-black uppercase tracking-[0.22em] text-[var(--accent-strong)]">AnimeTracker</span>
        <span className="block text-xs font-medium text-[var(--muted)]">Temporadas bajo control</span>
      </span>
    </NavLink>
  )
}
