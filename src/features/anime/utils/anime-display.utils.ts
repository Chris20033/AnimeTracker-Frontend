const animeTypeLabels: Record<string, string> = {
  tv: 'TV',
  movie: 'Movie',
  special: 'Special',
  ova: 'OVA',
  ona: 'ONA',
  music: 'Music',
  cm: 'CM',
  pv: 'PV',
  tv_special: 'TV Special',
}

const animeStatusLabels: Record<string, string> = {
  current: 'Current',
  finished: 'Finished',
  upcoming: 'Upcoming',
  tba: 'TBA',
  unreleased: 'Unreleased',
}

export function formatAnimeType(type: string | null | undefined) {
  if (!type) {
    return null
  }

  return animeTypeLabels[type.toLowerCase()] ?? formatUnknownLabel(type)
}

export function formatAnimeStatus(status: string | null | undefined) {
  if (!status) {
    return null
  }

  return animeStatusLabels[status.toLowerCase()] ?? formatUnknownLabel(status)
}

function formatUnknownLabel(value: string) {
  return value
    .replace(/[-_]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
