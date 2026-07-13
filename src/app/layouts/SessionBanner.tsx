import { useAuthStore } from '@/store/auth.store'

export function SessionBanner() {
  const session = useAuthStore((state) => state.session)

  if (!session) {
    return null
  }

  return (
    <div className="mx-auto -mt-0.5 hidden w-full max-w-7xl px-3 pb-3 text-xs font-semibold text-[var(--muted)] sm:block sm:px-6 sm:pb-4 sm:text-sm lg:px-8 lg:text-right">
      Sesion activa: <span className="font-black text-[var(--accent-strong)]">{session.user.username}</span>
    </div>
  )
}
