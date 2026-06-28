import { Outlet } from 'react-router-dom'
import { BrandLink } from '@/layouts/BrandLink'
import { Navbar } from '@/layouts/Navbar'
import { SessionBanner } from '@/layouts/SessionBanner'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_34rem),linear-gradient(135deg,_#111827_0%,_#18181b_48%,_#0f172a_100%)] text-stone-100">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <BrandLink />
        <Navbar />
      </header>

      <SessionBanner />

      <main className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8">
        <Outlet />
      </main>
    </div>
  )
}
