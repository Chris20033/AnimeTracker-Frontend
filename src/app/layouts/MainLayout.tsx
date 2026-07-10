import { Outlet } from "react-router-dom";
import { BrandLink } from "@/shared/components/navigation/BrandLink";
import { Footer } from "@/shared/components/navigation/Footer";
import { Navbar } from "@/shared/components/navigation/Navbar";
import { SessionBanner } from "@/app/layouts/SessionBanner";
import { ThemeToggle } from "@/shared/components/navigation/ThemeToggle";
import { SearchBar } from "@/shared/components/navigation/SearchBar";

export function MainLayout() {
  return (
    <div className="app-shell relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,_transparent,_var(--line-strong),_transparent)]" />
      <header className="relative mx-auto grid w-full max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:items-center lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <BrandLink />
          <SearchBar />
        </div>
        <div className="flex min-w-0 justify-start lg:justify-end">
          <Navbar />
          <ThemeToggle />
        </div>
      </header>

      <SessionBanner />

      <main className="relative mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
