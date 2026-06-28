import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/30 backdrop-blur">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-200">404</p>
        <h1 className="mt-4 text-4xl font-black text-white">Ruta no encontrada</h1>
        <p className="mt-4 text-stone-300">Esta pantalla aun no existe en el roadmap del frontend.</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-200"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
