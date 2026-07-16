import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function SearchBar() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = searchValue.trim()

    if (!query) {
      navigate('/anime')
      return
    }

    navigate(`/anime?q=${encodeURIComponent(query)}&page=1`)
    setSearchValue('')
  }

  return (
    <form onSubmit={handleSearch} role="search" className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-1.5 sm:w-72">
      <label htmlFor="nav-anime-search" className="sr-only">Search anime</label>
      <input
        id="nav-anime-search"
        type="search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Search anime..."
        className="min-h-10 rounded-full border border-[var(--line)] bg-[var(--surface-inset)] px-3 text-xs font-bold text-[var(--page-fg)] outline-none placeholder:text-[var(--soft)] focus:ring-4 focus:ring-[var(--focus)] sm:min-h-11 sm:px-4 sm:text-sm"
      />
      <button type="submit" className="min-h-10 rounded-full bg-[var(--accent)] px-3 text-xs font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)] sm:min-h-11 sm:px-4 sm:text-sm">
        Search
      </button>
    </form>
    
  )
}
