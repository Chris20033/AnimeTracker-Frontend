interface ProfileHeaderProps {
  username: string
  avatarUrl: string | null
  bannerUrl: string | null
  bio: string | null
  eyebrow: string
  meta?: string
}

export function ProfileHeader({ username, avatarUrl, bannerUrl, bio, eyebrow, meta }: ProfileHeaderProps) {
  const initial = username.trim().charAt(0).toUpperCase() || 'A'

  return (
    <section className="ledger-panel overflow-hidden p-3 sm:p-4">
      <div className="relative min-h-40 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-inset)] sm:min-h-56">
        {bannerUrl ? (
          <img src={bannerUrl} alt="Banner del perfil" className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,var(--accent-soft),transparent_16rem),radial-gradient(circle_at_82%_18%,var(--cyan-soft),transparent_18rem),linear-gradient(135deg,var(--surface-inset),var(--surface-strong))]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,color-mix(in_srgb,var(--surface-strong)_88%,transparent))]" />
      </div>

      <div className="relative -mt-12 px-3 pb-3 sm:-mt-16 sm:px-5 sm:pb-5">
        <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface-strong)] p-4 shadow-[0_18px_48px_var(--shadow)] sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-[1.35rem] border-4 border-[var(--surface-strong)] bg-[var(--accent)] text-3xl font-black text-[var(--action-ink)] shadow-[0_16px_34px_var(--shadow)] sm:size-32 sm:text-4xl">
              {avatarUrl ? <img src={avatarUrl} alt={`Avatar de ${username}`} className="size-full object-cover" /> : initial}
            </div>

            <div className="min-w-0 pb-1">
              <p className="ledger-kicker">{eyebrow}</p>
              <h1 className="mt-2 break-words text-3xl ledger-title sm:text-5xl">@{username}</h1>
              {meta ? <p className="mt-2 break-words text-sm font-bold text-[var(--soft)]">{meta}</p> : null}
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-[var(--muted)]">
            {bio?.trim() || 'Este perfil todavia no tiene biografia.'}
          </p>
        </div>
      </div>
    </section>
  )
}
