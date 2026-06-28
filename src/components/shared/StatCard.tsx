interface StatCardProps {
  label: string
  value: string
  detail: string
}

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/70">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-stone-400">{detail}</p>
    </article>
  )
}
