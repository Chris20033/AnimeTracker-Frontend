import { Outlet } from 'react-router-dom'
import { BrandLink } from '@/layouts/BrandLink'
import { Navbar } from '@/layouts/Navbar'
import { SessionBanner } from '@/layouts/SessionBanner'

export function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_8%_0%,_var(--sakura-soft),_transparent_24rem),radial-gradient(circle_at_92%_10%,_var(--aura-soft),_transparent_26rem),radial-gradient(circle_at_50%_110%,_var(--accent-soft),_transparent_28rem),linear-gradient(135deg,_var(--page-bg),_var(--page-bg))] text-[var(--page-fg)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(90deg,_transparent_0_11px,_var(--line)_11px_12px,_transparent_12px_28px)] opacity-35" />
      <header className="relative mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-6">
        <BrandLink />
        <Navbar />
      </header>

      <SessionBanner />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8">
        <Outlet />
      </main>
    </div>
  )
}
