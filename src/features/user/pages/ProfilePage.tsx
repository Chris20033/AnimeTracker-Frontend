import { Link } from 'react-router-dom'
import { FavoritesSection } from '@/features/favorites/components/FavoritesSection'
import { ProfileEditForm } from '@/features/user/components/ProfileEditForm'
import { ProfileHeader } from '@/features/user/components/ProfileHeader'
import { useMyProfile } from '@/features/user/hooks/useMyProfile'

export function ProfilePage() {
  const profileQuery = useMyProfile()

  if (profileQuery.isLoading) {
    return <ProfileSkeleton />
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="ledger-panel p-6 text-center sm:p-8">
          <p className="ledger-kicker">Perfil privado</p>
          <h1 className="mt-3 text-3xl ledger-title">No se pudo cargar tu perfil</h1>
          <p className="mt-3 text-[var(--muted)]">Intenta de nuevo en unos segundos o vuelve a iniciar sesion.</p>
        </div>
      </section>
    )
  }

  const profile = profileQuery.data
  const joinedAt = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(new Date(profile.createdAt))

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <ProfileHeader username={profile.username} avatarUrl={profile.avatarUrl} bannerUrl={profile.bannerUrl} bio={profile.bio} eyebrow="Perfil privado" meta={`Miembro desde ${joinedAt} · ${profile.email}`} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.65fr)]">
        <ProfileEditForm profile={profile} />

        <div className="grid gap-6">
          <aside className="ledger-panel p-5 sm:p-7">
            <p className="ledger-kicker">Vista publica</p>
            <h2 className="mt-2 text-2xl ledger-title">Comparte tu perfil</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[var(--muted)]">Tu pagina publica muestra avatar, banner, biografia, favoritos y estadisticas visibles.</p>
            <Link to={`/u/${profile.username}`} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
              Ver perfil publico
            </Link>
            <div className="mt-6 grid gap-3 text-sm font-bold text-[var(--muted)]">
              <p className="ledger-inset px-4 py-3">Avatar: {profile.avatarUrl ? 'configurado' : 'pendiente'}</p>
              <p className="ledger-inset px-4 py-3">Banner: {profile.bannerUrl ? 'configurado' : 'pendiente'}</p>
              <p className="ledger-inset px-4 py-3">Biografia: {profile.bio ? 'configurada' : 'pendiente'}</p>
            </div>
          </aside>
          <FavoritesSection />
        </div>
      </div>
    </section>
  )
}

function ProfileSkeleton() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:px-8" aria-busy="true">
      <div className="ledger-panel h-80 animate-pulse" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.65fr)]">
        <div className="ledger-panel h-96 animate-pulse" />
        <div className="ledger-panel h-72 animate-pulse" />
      </div>
    </section>
  )
}
