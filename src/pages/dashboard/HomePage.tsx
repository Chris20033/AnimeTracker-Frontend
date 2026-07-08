import { Link } from 'react-router-dom'

const queueItems = [
  { episode: '01', title: 'Temporada actual', meta: '12 episodios por ordenar', status: 'Watching' },
  { episode: '02', title: 'Lista pendiente', meta: 'Favoritos y prioridad', status: 'Plan' },
  { episode: '03', title: 'Archivo completado', meta: 'Historial y notas', status: 'Done' },
]

const seasonShelf = [
  { label: 'Auth', title: 'Sesion segura', detail: 'Login, registro y rutas privadas conectadas.' },
  { label: 'Vite', title: 'Stack listo', detail: 'React, TypeScript, Query y Zustand preparados.' },
  { label: 'MVP', title: 'Biblioteca', detail: 'Listas, favoritos y progreso entran en la siguiente emision.' },
]

export function HomePage() {
  return (
    <section className="broadcast-board py-6 sm:py-9 lg:py-12">
      <div className="broadcast-grid">
        <article className="broadcast-hero">
          <div className="broadcast-copy">
            <div className="flex flex-wrap items-center gap-3">
              <span className="airing-badge">On air</span>
              <span className="broadcast-code">Spring arc / AT-01</span>
            </div>
            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.07em] text-[var(--broadcast-ink)] sm:text-6xl lg:text-7xl">
              Tu anime, listo para el siguiente episodio.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[var(--broadcast-muted)] sm:text-lg">
              AnimeTracker convierte temporadas, favoritos y progreso en una cartelera personal: que ver, que pausar y que terminar sin perder contexto.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/registro" className="broadcast-action text-white">
                Crear mi lista
              </Link>
              <Link to="/login" className="broadcast-secondary-action">
                Continuar temporada
              </Link>
            </div>
          </div>

          <div className="broadcast-poster" aria-hidden="true">
            <div className="broadcast-frame">
              <span className="broadcast-frame-label">EP</span>
              <strong>01</strong>
              <span>watch queue</span>
            </div>
            <div className="broadcast-progress">
              <span />
            </div>
          </div>
        </article>

        <aside className="broadcast-queue" aria-label="Cola de temporada">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="broadcast-code">Tonight's queue</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--broadcast-ink)]">Siguiente tanda</h2>
            </div>
            <span className="broadcast-count">3</span>
          </div>

          <div className="mt-6 grid gap-3">
            {queueItems.map((item) => (
              <article key={item.title} className="episode-strip">
                <span className="episode-number">{item.episode}</span>
                <div className="min-w-0">
                  <h3 className="truncate font-black text-[var(--broadcast-ink)]">{item.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--broadcast-muted)]">{item.meta}</p>
                </div>
                <span className="episode-status">{item.status}</span>
              </article>
            ))}
          </div>
        </aside>
      </div>

      <div className="season-shelf" aria-label="Estado de modulos del producto">
        {seasonShelf.map((item) => (
          <article key={item.label} className="season-card">
            <span>{item.label}</span>
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
