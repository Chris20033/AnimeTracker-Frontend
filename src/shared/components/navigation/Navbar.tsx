import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/store/auth.store";

function navLinkClass(isActive: boolean) {
  return `inline-flex min-h-9 items-center rounded-full px-3 py-2 text-xs font-black outline-none transition focus:ring-4 focus:ring-[var(--focus)] sm:min-h-11 sm:px-4 sm:py-2.5 sm:text-sm ${
    isActive
      ? "bg-[var(--nav-active-bg)] text-[var(--nav-active-fg)]"
      : "text-[var(--muted)] hover:bg-[var(--surface-inset)] hover:text-[var(--page-fg)]"
  }`;
}

export function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    navigate("/");
  }

  return (
    <nav
      aria-label="Navegacion principal"
      className="flex w-full min-w-0 flex-wrap items-center gap-1.5 rounded-[1.35rem] border border-[var(--line)] bg-[var(--surface)] p-1.5 shadow-[0_14px_36px_var(--shadow)] lg:w-auto lg:justify-end lg:rounded-full"
    >
      <NavLink to="/" className={({ isActive }) => navLinkClass(isActive)}>
        Inicio
      </NavLink>
      <NavLink to="/anime" className={({ isActive }) => navLinkClass(isActive)}>
        Anime
      </NavLink>

      {isAuthenticated ? (
        <>
          <NavLink to="/library" className={({ isActive }) => navLinkClass(isActive)}>
            Biblioteca
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => navLinkClass(isActive)}>
            Perfil
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="inline-flex min-h-9 items-center rounded-full border border-[var(--line)] px-3 py-2 text-xs font-black text-[var(--accent-strong)] outline-none transition hover:bg-[var(--accent)] hover:text-[var(--action-ink)] focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-11 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            {logoutMutation.isPending ? "Cerrando..." : "Cerrar sesion"}
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            Login
          </NavLink>
          <NavLink
            to="/registro"
            className={({ isActive }) =>
              `inline-flex min-h-9 items-center rounded-full px-3 py-2 text-xs font-black outline-none transition focus:ring-4 focus:ring-[var(--focus)] sm:min-h-11 sm:px-4 sm:py-2.5 sm:text-sm ${
                isActive
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--accent-strong)] hover:bg-[var(--accent-soft)]"
              }`
            }
          >
            Registro
          </NavLink>
        </>
      )}
    </nav>
  );
}
