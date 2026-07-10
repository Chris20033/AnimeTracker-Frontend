import { isAxiosError } from 'axios'
import { Link, useParams } from 'react-router-dom'
import { ProfileHeader } from '@/features/user/components/ProfileHeader'
import { usePublicProfile } from '@/features/user/hooks/usePublicProfile'

export function PublicProfilePage() {
  const { username } = useParams()
  const profileQuery = usePublicProfile(username)

  if (profileQuery.isLoading) {
    return <PublicProfileSkeleton />
  }

  if (profileQuery.isError || !profileQuery.data) {
    const isNotFound = isAxiosError(profileQuery.error) && profileQuery.error.response?.status === 404

    return (
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="ledger-panel p-6 text-center sm:p-8">
          <p className="ledger-kicker">Perfil publico</p>
          <h1 className="mt-3 text-3xl ledger-title">{isNotFound ? 'Perfil no encontrado' : 'No se pudo cargar el perfil'}</h1>
          <p className="mt-3 text-[var(--muted)]">{isNotFound ? 'Revisa el username o pide un enlace actualizado.' : 'Intenta de nuevo en unos segundos.'}</p>
          <Link to="/" className="ledger-link mt-5 inline-flex min-h-11 items-center px-4">
            Volver al inicio
          </Link>
        </div>
      </section>
    )
  }

  const profile = profileQuery.data

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <ProfileHeader username={profile.username} avatarUrl={profile.avatarUrl} bannerUrl={profile.bannerUrl} bio={profile.bio} eyebrow="Perfil publico" />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(22rem,0.62fr)]">
        <section className="ledger-panel p-5 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
            <div>
              <p className="ledger-kicker">Favoritos</p>
              <h2 className="mt-2 text-2xl ledger-title">Anime destacados</h2>
            </div>
            <span className="ledger-chip">{profile.favorites.length} favoritos</span>
          </div>

          {profile.favorites.length > 0 ? (
            <div className="mt-5 grid gap-3">
              {profile.favorites.map((_, index) => (
                <article key={index} className="ledger-inset px-4 py-3 text-sm font-bold text-[var(--muted)]">
                  Favorito #{index + 1}
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[var(--radius-lg)] border border-dashed border-[var(--line-strong)] bg-[var(--surface-inset)] p-6 text-center">
              <p className="text-lg font-black text-[var(--page-fg)]">Sin favoritos publicos todavia</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--muted)]">Esta seccion queda lista para Sprint 8, cuando existan favoritos visibles.</p>
            </div>
          )}
        </section>

        <section className="ledger-panel p-5 sm:p-7">
          <p className="ledger-kicker">Estadisticas</p>
          <h2 className="mt-2 text-2xl ledger-title">Actividad visible</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <StatCard label="Anime total" value={profile.statistics.totalAnime} />
            <StatCard label="Completados" value={profile.statistics.completedAnime} />
            <StatCard label="Episodios vistos" value={profile.statistics.totalEpisodesWatched} />
            <StatCard label="Score promedio" value={profile.statistics.averageScore ?? 'Pendiente'} />
          </div>
        </section>
      </div>
    </section>
  )
}

interface StatCardProps {
  label: string
  value: number | string
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <article className="ledger-inset p-4">
      <p className="text-sm font-black text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-[var(--page-fg)]">{value}</p>
    </article>
  )
}

function PublicProfileSkeleton() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:px-8" aria-busy="true">
      <div className="ledger-panel h-80 animate-pulse" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(22rem,0.62fr)]">
        <div className="ledger-panel h-64 animate-pulse" />
        <div className="ledger-panel h-64 animate-pulse" />
      </div>
    </section>
  )
}
