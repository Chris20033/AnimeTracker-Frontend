export function formatSeason(season: string | null, year: number | null) {
  if (!season && !year) {
    return 'Pending'
  }

  return [season, year].filter(Boolean).join(' ')
}
