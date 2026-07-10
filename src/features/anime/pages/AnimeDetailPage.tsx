import { isAxiosError } from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useAnimeDetail } from '@/features/anime/hooks/useAnimeDetail'
import { MetricCard } from '@/features/anime/components/MetricCard'
import { InfoCard } from '@/features/anime/components/InfoCard'
import { AnimeDetailError, AnimeDetailSkeleton } from '@/features/anime/components/AnimeDetailStates'
import { formatSeason } from '@/features/anime/components/anime-detail.utils'

export function AnimeDetailPage() {
  const { source, externalId } = useParams()
  const detailQuery = useAnimeDetail(source, externalId)

  if (detailQuery.isLoading) {
    return <AnimeDetailSkeleton />
  }

  if (detailQuery.isError || !detailQuery.data) {
    const notFound = isAxiosError(detailQuery.error) && detailQuery.error.response?.status === 404
    return <AnimeDetailError notFound={notFound} />
  }

  const anime = detailQuery.data
  const airedDate = anime.airedFrom ? new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(new Date(anime.airedFrom)) : 'Pendiente'

  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[minmax(18rem,0.42fr)_minmax(0,1fr)] lg:py-10">
      <aside className="ledger-panel h-max overflow-hidden">
        <div className="aspect-[3/4] bg-[var(--surface-inset)]">
          {anime.imageUrl ? <img src={anime.imageUrl} alt={anime.title} className="size-full object-cover" /> : <div className="grid size-full place-items-center font-black text-[var(--soft)]">Sin imagen</div>}
        </div>
        <div className="grid gap-3 p-5">
          <Link to="/anime" className="ledger-link inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--line)] px-4">
            Volver al catalogo
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Score" value={anime.score ?? 'N/A'} score={anime.score} />
            <MetricCard label="Episodios" value={anime.episodes ?? 'N/A'} />
          </div>
        </div>
      </aside>

      <div className="grid gap-6">
        <article className="ledger-panel p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="ledger-chip bg-[var(--accent-soft)] text-[var(--accent-strong)]">{anime.source}</span>
            {anime.type ? <span className="ledger-chip">{anime.type}</span> : null}
            {anime.year ? <span className="ledger-chip">{anime.year}</span> : null}
          </div>

          <h1 className="mt-5 text-4xl ledger-title sm:text-5xl lg:text-6xl">{anime.title}</h1>
          {anime.titleEnglish ? <p className="mt-3 text-lg font-bold text-[var(--muted)]">{anime.titleEnglish}</p> : null}

          <p className="mt-6 max-w-4xl text-base font-semibold leading-8 text-[var(--muted)]">
            {anime.synopsis ?? 'Este anime todavia no tiene sinopsis disponible.'}
          </p>

          {anime.genres.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Generos">
              {anime.genres.map((genre) => (
                <span key={genre} className="rounded-full border border-[var(--line)] bg-[var(--surface-inset)] px-3 py-1.5 text-sm font-black text-[var(--page-fg)]">
                  {genre}
                </span>
              ))}
            </div>
          ) : null}
        </article>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Informacion de anime">
          <InfoCard label="Estado" value={anime.status ?? 'Pendiente'} />
          <InfoCard label="Duracion" value={anime.duration ?? 'Pendiente'} />
          <InfoCard label="Estudio" value={anime.studio ?? 'Pendiente'} />
          <InfoCard label="Temporada" value={formatSeason(anime.season, anime.year)} />
          <InfoCard label="Fecha de estreno" value={airedDate} />
          <InfoCard label="ID externo" value={`${anime.source}-${anime.externalId}`} />
        </section>
      </div>
    </section>
  )
}
