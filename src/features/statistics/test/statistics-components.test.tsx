import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatisticsCards } from '@/features/statistics/components/StatisticsCards'
import { StatusDistributionPanel } from '@/features/statistics/components/StatusDistributionPanel'
import { TopGenresPanel } from '@/features/statistics/components/TopGenresPanel'

describe('statistics components', () => {
  it('renders summary cards', () => {
    render(<StatisticsCards totalAnime={7} completedAnime={1} totalEpisodesWatched={39} averageScore={7} />)

    expect(screen.getByText('Total anime')).toBeInTheDocument()
    expect(screen.getByText('39')).toBeInTheDocument()
    expect(screen.getByText('7.0')).toBeInTheDocument()
  })

  it('renders status percentages and empty state', () => {
    const { rerender } = render(<StatusDistributionPanel distribution={{ WATCHING: 1, COMPLETED: 1, ON_HOLD: 0, DROPPED: 0, PLAN_TO_WATCH: 2 }} />)

    expect(screen.getByText('Library distribution')).toBeInTheDocument()
    expect(screen.getByText('2 · 50%')).toBeInTheDocument()

    rerender(<StatusDistributionPanel distribution={{ WATCHING: 0, COMPLETED: 0, ON_HOLD: 0, DROPPED: 0, PLAN_TO_WATCH: 0 }} />)
    expect(screen.getByText('No statuses recorded yet')).toBeInTheDocument()
  })

  it('renders top genres and empty state', () => {
    const { rerender } = render(<TopGenresPanel genres={[{ name: 'Shounen', count: 5 }, { name: 'Drama', count: 2 }]} />)

    expect(screen.getByText('Your favorite patterns')).toBeInTheDocument()
    expect(screen.getByText('1. Shounen')).toBeInTheDocument()

    rerender(<TopGenresPanel genres={[]} />)
    expect(screen.getByText('No dominant genres')).toBeInTheDocument()
  })
})
