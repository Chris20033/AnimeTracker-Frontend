import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import menuDarkUrl from '@/assets/menu-dark.svg'
import menuLightUrl from '@/assets/menu-light.svg'
import xmarkDarkUrl from '@/assets/xmark-dark.svg'
import xmarkLightUrl from '@/assets/xmark-light.svg'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { ThemeToggle } from '@/shared/components/navigation/ThemeToggle'
import { useAuthStore } from '@/store/auth.store'
import { useThemeStore } from '@/store/theme.store'

function mobileLinkClass(isActive: boolean) {
  return `flex min-h-11 items-center rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-black outline-none transition focus:ring-4 focus:ring-[var(--focus)] ${
    isActive
      ? 'bg-[var(--nav-active-bg)] text-[var(--nav-active-fg)]'
      : 'text-[var(--muted)] hover:bg-[var(--surface-inset)] hover:text-[var(--page-fg)]'
  }`
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const session = useAuthStore((state) => state.session)
  const theme = useThemeStore((state) => state.theme)
  const logoutMutation = useLogout()
  const navigate = useNavigate()
  const isDark = theme === 'dark'
  const iconUrl = isOpen ? (isDark ? xmarkDarkUrl : xmarkLightUrl) : (isDark ? menuDarkUrl : menuLightUrl)

  async function handleLogout() {
    await logoutMutation.mutateAsync()
    setIsOpen(false)
    navigate('/')
  }

  function closeMenu() {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <div className="sm:hidden">
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button type="button" aria-label={isOpen ? 'Cerrar menu principal' : 'Abrir menu principal'} aria-expanded={isOpen} aria-controls="mobile-main-nav" onClick={() => setIsOpen((current) => !current)} className="grid min-h-10 min-w-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--page-fg)] shadow-[0_14px_32px_var(--shadow)] outline-none transition hover:bg-[var(--surface-strong)] focus:ring-4 focus:ring-[var(--focus)]">
          <img src={iconUrl} alt="" className="size-5" />
        </button>
      </div>

      {isOpen ? (
        <nav id="mobile-main-nav" aria-label="Navegacion principal movil" className="absolute inset-x-3 top-[calc(100%-0.35rem)] z-30 rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface-strong)] p-2 shadow-[0_24px_70px_var(--shadow-strong)]">
          {session ? <p className="px-3 pb-2 pt-1 text-xs font-semibold text-[var(--muted)]">Sesion activa: <span className="font-black text-[var(--accent-strong)]">{session.user.username}</span></p> : null}
          <div className="grid gap-1">
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => mobileLinkClass(isActive)}>Inicio</NavLink>
            <NavLink to="/anime" onClick={closeMenu} className={({ isActive }) => mobileLinkClass(isActive)}>Anime</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/library" onClick={closeMenu} className={({ isActive }) => mobileLinkClass(isActive)}>Biblioteca</NavLink>
                <NavLink to="/dashboard" onClick={closeMenu} className={({ isActive }) => mobileLinkClass(isActive)}>Dashboard</NavLink>
                <NavLink to="/profile" onClick={closeMenu} className={({ isActive }) => mobileLinkClass(isActive)}>Perfil</NavLink>
                <button type="button" onClick={() => void handleLogout()} disabled={logoutMutation.isPending} className="flex min-h-11 items-center rounded-[var(--radius-md)] border border-[var(--line)] px-4 py-2.5 text-sm font-black text-[var(--accent-strong)] outline-none transition hover:bg-[var(--accent)] hover:text-[var(--action-ink)] focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-60">
                  {logoutMutation.isPending ? 'Cerrando...' : 'Cerrar sesion'}
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={closeMenu} className={({ isActive }) => mobileLinkClass(isActive)}>Login</NavLink>
                <NavLink to="/registro" onClick={closeMenu} className={({ isActive }) => mobileLinkClass(isActive)}>Registro</NavLink>
              </>
            )}
          </div>
        </nav>
      ) : null}
    </div>
  )
}
