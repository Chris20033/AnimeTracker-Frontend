import { NavLink, useNavigate } from 'react-router-dom'
import { useLogout } from '@/hooks/useLogout'
import { useAuthStore } from '@/store/auth.store'

function navLinkClass(isActive: boolean) {
  return `rounded-full px-4 py-2 text-sm font-bold outline-none transition focus:ring-4 focus:ring-[var(--focus)] ${
    isActive
      ? 'bg-[var(--page-fg)] text-[var(--page-bg)] shadow-[0_12px_30px_var(--shadow)]'
      : 'text-[var(--muted)] hover:bg-[var(--surface-inset)] hover:text-[var(--page-fg)]'
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
    <nav aria-label="Navegacion principal" className="flex w-full flex-wrap items-center gap-2 rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-1.5 shadow-[0_18px_50px_var(--shadow)] backdrop-blur lg:w-auto lg:rounded-full">
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
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-bold text-[var(--accent-strong)] outline-none transition hover:bg-[var(--accent)] hover:text-[#271018] focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-60"
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
              `rounded-full px-4 py-2 text-sm font-bold outline-none transition focus:ring-4 focus:ring-[var(--focus)] ${
                isActive
                  ? 'bg-[var(--accent)] text-[#271018] shadow-[0_12px_30px_var(--shadow)]'
                  : 'text-[var(--accent-strong)] hover:bg-[var(--accent-soft)]'
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
