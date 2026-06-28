import { NavLink, useNavigate } from 'react-router-dom'
import { useLogout } from '@/hooks/useLogout'
import { useAuthStore } from '@/store/auth.store'

function navLinkClass(isActive: boolean) {
  return `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive ? 'bg-stone-100 text-stone-950' : 'text-stone-300 hover:bg-white/10 hover:text-white'
  }`
}

export function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logoutMutation = useLogout()
  const navigate = useNavigate()

  async function handleLogout() {
    await logoutMutation.mutateAsync()
    navigate('/')
  }

  return (
    <nav aria-label="Navegacion principal" className="hidden items-center gap-2 sm:flex">
      <NavLink to="/" className={({ isActive }) => navLinkClass(isActive)}>
        Inicio
      </NavLink>

      {isAuthenticated ? (
        <>
          <NavLink to="/dashboard" className={({ isActive }) => navLinkClass(isActive)}>
            Dashboard
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="rounded-full border border-amber-200/30 px-4 py-2 text-sm font-bold text-amber-100 transition hover:bg-amber-200 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {logoutMutation.isPending ? 'Cerrando...' : 'Cerrar sesion'}
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className={({ isActive }) => navLinkClass(isActive)}>
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
  )
}
