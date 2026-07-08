import { Outlet } from 'react-router-dom'
import { BrandLink } from '@/layouts/BrandLink'
import { Navbar } from '@/layouts/Navbar'
import { SessionBanner } from '@/layouts/SessionBanner'
import { ThemeToggle } from '@/layouts/ThemeToggle'

export function MainLayout() {
  return (
    <div className="app-shell relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,_transparent,_var(--line-strong),_transparent)]" />
      <header className="relative mx-auto grid w-full max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:items-center lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <BrandLink />
          <ThemeToggle />
        </div>
        <div className="flex min-w-0 justify-start lg:justify-end">
          <Navbar />
        </div>
      </header>

      <SessionBanner />

      <main className="relative mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
