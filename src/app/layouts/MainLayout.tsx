import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/app/router/ScrollToTop";
import { BrandLink } from "@/shared/components/navigation/BrandLink";
import { Footer } from "@/shared/components/navigation/Footer";
import { MobileNav } from "@/shared/components/navigation/MobileNav";
import { Navbar } from "@/shared/components/navigation/Navbar";
import { SessionBanner } from "@/app/layouts/SessionBanner";
import { ThemeToggle } from "@/shared/components/navigation/ThemeToggle";
import { SearchBar } from "@/shared/components/navigation/SearchBar";

export function MainLayout() {
  return (
    <div className="app-shell relative">
      <ScrollToTop />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,_transparent,_var(--line-strong),_transparent)]" />
      <header className="relative mx-auto grid w-full max-w-7xl gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-4 lg:px-8">
        <div className="grid min-w-0 gap-3 sm:flex sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <BrandLink />
            <MobileNav />
          </div>
          <SearchBar />
        </div>
        <div className="hidden min-w-0 items-start justify-start gap-2 sm:flex lg:justify-end">
          <Navbar />
          <ThemeToggle />
        </div>
      </header>

      <SessionBanner />

      <main className="relative mx-auto w-full max-w-7xl px-3 pb-14 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
