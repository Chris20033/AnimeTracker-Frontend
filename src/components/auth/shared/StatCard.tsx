interface StatCardProps {
  label: string
  value: string
  detail: string
}

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-4 backdrop-blur transition hover:-translate-y-0.5 hover:bg-[var(--surface-strong)]">
      <div className="absolute inset-x-4 top-0 h-1 rounded-b-full bg-[linear-gradient(90deg,_var(--sakura),_var(--accent))] opacity-75" />
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-strong)]">{label}</p>
      <p className="mt-3 text-2xl font-black text-[var(--page-fg)]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail}</p>
    </article>
  )
}
