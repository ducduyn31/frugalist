import { DateTime, Interval } from 'luxon'

export interface DateRange {
  from: Date
  to: Date
  type: 'INCLUDED' | 'EXCLUDED'
}

const prepareInterval = (range: DateRange) =>
  Interval.fromDateTimes(
    DateTime.fromJSDate(range.from).startOf('day'),
    // Temporary shift end date by 1 day to make it inclusive
    DateTime.fromJSDate(range.to).plus({ days: 1 }).startOf('day'),
  )

const prepareRange = (interval: Interval) => ({
  from: interval.start?.toJSDate() ?? new Date(),
  // Shift end date back by 1 day to fit JS Date
  to: interval.end?.minus({ days: 1 }).toJSDate() ?? new Date(),
})

export const calculateDateRage = (
  ranges: DateRange[],
): Omit<DateRange, 'type'>[] => {
  ranges.sort((a, b) => a.from.getTime() - b.from.getTime())
  const includedRanges = ranges.filter(range => range.type === 'INCLUDED')
  const excludedRanges = ranges.filter(range => range.type === 'EXCLUDED')

  if (includedRanges.length === 0) {
    return []
  }

  const includedRangesIntervals = Interval.merge(
    includedRanges.map(prepareInterval),
  )

  if (excludedRanges.length === 0) {
    return includedRangesIntervals.map(prepareRange)
  }

  const excludedRangesIntervals = Interval.merge(
    excludedRanges.map(prepareInterval),
  )

  let i = 0
  let j = 0

  while (
    i < includedRangesIntervals.length &&
    j < excludedRangesIntervals.length
  ) {
    const nextIncludeRange = includedRangesIntervals[i]
    const nextExcludeRange = excludedRangesIntervals[j]

    if (nextIncludeRange.overlaps(nextExcludeRange)) {
      const [includeInterval1, includeInterval2] =
        nextIncludeRange.difference(nextExcludeRange)
      includedRangesIntervals.splice(i, 1)
      if (includeInterval2) {
        includedRangesIntervals.splice(i, 0, includeInterval2)
      }
      if (includeInterval1) {
        includedRangesIntervals.splice(i, 0, includeInterval1)
      }
      j++
    } else {
      i++
    }
  }

  return includedRangesIntervals.map(prepareRange)
}
