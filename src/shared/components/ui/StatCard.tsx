interface StatCardProps {
  label: string
  value: string
  detail: string
}

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <article className="group ledger-surface relative overflow-hidden p-4 transition hover:-translate-y-0.5 hover:bg-[var(--surface-strong)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-black tracking-[0.08em] text-[var(--accent-strong)]">{label}</p>
        <span className="size-2 rounded-full bg-[var(--sakura)]" />
      </div>
      <p className="text-2xl font-black tracking-[-0.035em] text-[var(--page-fg)]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail}</p>
    </article>
  )
}
