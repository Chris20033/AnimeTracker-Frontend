import { Link } from 'react-router-dom'
import { formatAnimeStatus, formatAnimeType } from '@/features/anime/utils/anime-display.utils'
import type { HomeAnimeItem } from '@/features/home/types/home.interface'
import { getScoreTone } from '@/shared/utils/get-score-tone'

interface HomeHeroProps {
  anime: HomeAnimeItem | null
}

export function HomeHero({ anime }: HomeHeroProps) {
  if (!anime) {
    return (
      <section className="ledger-panel p-6 sm:p-8 lg:p-10">
        <p className="ledger-kicker">AnimeTracker broadcast</p>
        <h1 className="mt-3 max-w-4xl text-5xl ledger-title sm:text-6xl lg:text-7xl">Tu siguiente anime empieza aqui.</h1>
        <p className="ledger-copy mt-5 text-lg">La cartelera se esta preparando. Explora el catalogo mientras cargan las recomendaciones.</p>
        <Link to="/anime" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
          Explorar catalogo
        </Link>
      </section>
    )
  }

  const scoreTone = getScoreTone(anime.score)
  const typeLabel = formatAnimeType(anime.type)
  const statusLabel = formatAnimeStatus(anime.status)

  return (
    <section className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--line)] bg-[var(--surface-strong)] shadow-[0_32px_90px_var(--shadow-strong)]">
      {anime.imageUrl ? <img src={anime.imageUrl} alt="" className="absolute inset-0 size-full object-cover opacity-18 blur-xl scale-110" aria-hidden="true" /> : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--surface-strong)_0%,color-mix(in_srgb,var(--surface-strong)_92%,transparent)_48%,color-mix(in_srgb,var(--accent-soft)_70%,transparent)_100%)]" />

      <div className="relative grid gap-6 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:p-10">
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="airing-badge">Featured</span>
            <span className={`ledger-chip ring-1 ${scoreTone.className}`}>Score {anime.score ?? 'N/A'} · {scoreTone.label}</span>
            {anime.rank ? <span className="ledger-chip">Rank #{anime.rank}</span> : null}
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] text-[var(--page-fg)] sm:text-6xl lg:text-7xl">{anime.title}</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-[var(--muted)] sm:text-lg">
            {anime.synopsis ?? 'Un anime destacado para abrir tu siguiente sesion.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {typeLabel ? <span className="ledger-chip">{typeLabel}</span> : null}
            {anime.year ? <span className="ledger-chip">{anime.year}</span> : null}
            {anime.episodes ? <span className="ledger-chip">{anime.episodes} episodios</span> : null}
            {statusLabel ? <span className="ledger-chip">{statusLabel}</span> : null}
          </div>

          {anime.genres.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2" aria-label="Generos destacados">
              {anime.genres.slice(0, 4).map((genre) => (
                <span key={genre} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-black text-[var(--accent-strong)]">{genre}</span>
              ))}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to={`/anime/${anime.source}/${anime.externalId}`} className="broadcast-action">
              Ver detalle
            </Link>
            {anime.trailerUrl ? (
              <a href={anime.trailerUrl} target="_blank" rel="noreferrer" className="broadcast-secondary-action">
                Ver trailer
              </a>
            ) : (
              <Link to="/anime" className="broadcast-secondary-action">
                Explorar catalogo
              </Link>
            )}
          </div>
        </div>

        <Link to={`/anime/${anime.source}/${anime.externalId}`} className="group relative min-h-96 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--line)] bg-[var(--surface-inset)] outline-none focus:ring-4 focus:ring-[var(--focus)]">
          {anime.imageUrl ? <img src={anime.imageUrl} alt={anime.title} className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" /> : null}
          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,var(--broadcast-poster)_85%)] p-5 text-[var(--broadcast-poster-text)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] opacity-80">Now spotlighting</p>
            <p className="mt-1 text-2xl font-black leading-tight">{anime.title}</p>
          </div>
        </Link>
      </div>
    </section>
  )
}
