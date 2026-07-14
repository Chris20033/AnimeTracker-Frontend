interface InfoCardProps {
  label: string
  value: string
}

export function InfoCard({ label, value }: InfoCardProps) {
  return (
    <article className="ledger-surface p-5">
      <p className="text-xs font-black tracking-[0.12em] text-[var(--soft)]">{label}</p>
      <p className="mt-2 break-words text-lg font-black text-[var(--page-fg)]">{value}</p>
    </article>
  )
}
