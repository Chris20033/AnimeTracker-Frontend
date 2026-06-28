import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks/useAuth'

export function AppLayout() {
  const { isAuthenticated, logout, session } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_34rem),linear-gradient(135deg,_#111827_0%,_#18181b_48%,_#0f172a_100%)] text-stone-100">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <NavLink to="/" className="group inline-flex items-center gap-3" aria-label="AnimeTracker inicio">
          <span className="grid size-11 place-items-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-xl font-black text-amber-200 shadow-[0_0_30px_rgba(251,191,36,0.18)] transition group-hover:scale-105">
            A
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.28em] text-amber-200/80">AnimeTracker</span>
            <span className="block text-xs text-stone-400">Tu biblioteca anime</span>
          </span>
        </NavLink>

        <nav aria-label="Navegacion principal" className="hidden items-center gap-2 sm:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive ? 'bg-stone-100 text-stone-950' : 'text-stone-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            Inicio
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-stone-100 text-stone-950' : 'text-stone-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-amber-200/30 px-4 py-2 text-sm font-bold text-amber-100 transition hover:bg-amber-200 hover:text-stone-950"
              >
                Cerrar sesion
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-stone-100 text-stone-950' : 'text-stone-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/registro"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-amber-300 text-stone-950' : 'text-amber-100 hover:bg-amber-300/15'
                  }`
                }
              >
                Registro
              </NavLink>
            </>
          )}
        </nav>
      </header>

      {isAuthenticated ? (
        <div className="mx-auto -mt-2 w-full max-w-6xl px-5 pb-4 text-right text-sm text-stone-400 sm:px-8">
          Sesion activa como <span className="font-bold text-amber-100">{session?.user.username}</span>
        </div>
      ) : null}

      <main className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8">
        <Outlet />
      </main>
    </div>
  )
}
