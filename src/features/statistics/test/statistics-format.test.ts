import { describe, expect, it } from 'vitest'
import { formatAverageScore, formatStatNumber, getStatusDistributionItems } from '@/features/statistics/utils/statistics-format.utils'

describe('statistics format utils', () => {
  it('formats numbers and average score for display', () => {
    expect(formatStatNumber(1234)).toBe('1,234')
    expect(formatAverageScore(null)).toBe('Pendiente')
    expect(formatAverageScore(7)).toBe('7.0')
  })

  it('maps status distribution into display items', () => {
    const items = getStatusDistributionItems({
      WATCHING: 1,
      COMPLETED: 2,
      ON_HOLD: 3,
      DROPPED: 4,
      PLAN_TO_WATCH: 5,
    })

    expect(items).toHaveLength(5)
    expect(items[0]).toMatchObject({ status: 'WATCHING', label: 'Viendo', value: 1 })
    expect(items[4]).toMatchObject({ status: 'PLAN_TO_WATCH', label: 'Planeados', value: 5 })
  })
})
