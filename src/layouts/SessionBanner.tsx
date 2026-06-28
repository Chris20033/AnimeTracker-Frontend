import { useAuthStore } from '@/store/auth.store'

export function SessionBanner() {
  const session = useAuthStore((state) => state.session)

  if (!session) {
    return null
  }

  return (
    <div className="mx-auto -mt-2 w-full max-w-6xl px-5 pb-4 text-right text-sm text-stone-400 sm:px-8">
      Sesion activa como <span className="font-bold text-amber-100">{session.user.username}</span>
    </div>
  )
}
