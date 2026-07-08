import { useAuthStore } from '@/store/auth.store'

export function SessionBanner() {
  const session = useAuthStore((state) => state.session)

  if (!session) {
    return null
  }

  return (
    <div className="mx-auto -mt-1 w-full max-w-7xl px-4 pb-4 text-sm text-[var(--muted)] sm:px-6 lg:px-8 lg:text-right">
      Sesion activa: <span className="font-black text-[var(--accent-strong)]">{session.user.username}</span>
    </div>
  )
}
