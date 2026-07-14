export function formatSeason(season: string | null, year: number | null) {
  if (!season && !year) {
    return 'Pendiente'
  }

  return [season, year].filter(Boolean).join(' ')
}
