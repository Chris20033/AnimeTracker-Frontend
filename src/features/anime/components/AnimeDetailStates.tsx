import { Link } from 'react-router-dom'

interface AnimeDetailErrorProps {
  notFound: boolean
}

export function AnimeDetailError({ notFound }: AnimeDetailErrorProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="ledger-panel p-6 text-center sm:p-8">
        <p className="ledger-kicker">Anime detail</p>
        <h1 className="mt-3 text-3xl ledger-title">{notFound ? 'Anime no encontrado' : 'No se pudo cargar el detalle'}</h1>
        <p className="mt-3 text-[var(--muted)]">{notFound ? 'El proveedor no encontro ese anime.' : 'La API externa no respondio correctamente. Intenta de nuevo.'}</p>
        <Link to="/anime" className="ledger-link mt-5 inline-flex min-h-11 items-center px-4">
          Volver al catalogo
        </Link>
      </div>
    </section>
  )
}

export function AnimeDetailSkeleton() {
  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[minmax(18rem,0.42fr)_minmax(0,1fr)] lg:py-10" aria-busy="true">
      <div className="ledger-panel h-[34rem] animate-pulse" />
      <div className="grid gap-6">
        <div className="ledger-panel h-96 animate-pulse" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="ledger-surface h-28 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  )
}
