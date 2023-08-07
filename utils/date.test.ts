import { calculateDateRage, DateRange } from '@/utils/date'

describe('calculateDateRage', () => {
  it('should return empty array if no included ranges', () => {
    expect(calculateDateRage([])).toEqual([])
  })

  it('should return included ranges if no excluded ranges', () => {
    const ranges: DateRange[] = [
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-01-02'),
        type: 'INCLUDED',
      },
      {
        from: new Date('2021-01-03'),
        to: new Date('2021-01-04'),
        type: 'INCLUDED',
      },
    ]
    const expected: Omit<DateRange, 'type'>[] = [
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-01-04'),
      },
    ]

    expect(calculateDateRage(ranges)).toEqual(expected)
  })

  it('should return merged included ranges if no excluded ranges', () => {
    const ranges: DateRange[] = [
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-01-02'),
        type: 'INCLUDED',
      },
      {
        from: new Date('2021-01-02'),
        to: new Date('2021-01-03'),
        type: 'INCLUDED',
      },
    ]

    const expected: Omit<DateRange, 'type'>[] = [
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-01-03'),
      },
    ]

    expect(calculateDateRage(ranges)).toEqual(expected)
  })

  it('should return 01/02/2021 to 30/05/2023', () => {
    const ranges: DateRange[] = [
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-05-30'),
        type: 'INCLUDED',
      },
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-01-31'),
        type: 'EXCLUDED',
      },
    ]
    const expected: Omit<DateRange, 'type'>[] = [
      {
        from: new Date('2021-02-01'),
        to: new Date('2021-05-30'),
      },
    ]

    expect(calculateDateRage(ranges)).toEqual(expected)
  })

  it('should return empty when include is same as exclude', () => {
    const ranges: DateRange[] = [
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-05-30'),
        type: 'INCLUDED',
      },
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-05-30'),
        type: 'EXCLUDED',
      },
    ]
    const expected: Omit<DateRange, 'type'>[] = []

    expect(calculateDateRage(ranges)).toEqual(expected)
  })

  it('should return 30/05/2021 to 30/05/2023', () => {
    const ranges: DateRange[] = [
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-06-30'),
        type: 'INCLUDED',
      },
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-05-29'),
        type: 'EXCLUDED',
      },
      {
        from: new Date('2021-05-31'),
        to: new Date('2021-06-30'),
        type: 'EXCLUDED',
      },
    ]

    const expected: Omit<DateRange, 'type'>[] = [
      {
        from: new Date('2021-05-30'),
        to: new Date('2021-05-30'),
      },
    ]

    expect(calculateDateRage(ranges)).toEqual(expected)
  })

  it('should return 10 ranges given 3 included ranges and 7 excluded ranges', () => {
    const ranges: DateRange[] = [
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-04-30'),
        type: 'INCLUDED',
      },
      {
        from: new Date('2021-06-01'),
        to: new Date('2021-08-31'),
        type: 'INCLUDED',
      },
      {
        from: new Date('2021-10-01'),
        to: new Date('2021-12-31'),
        type: 'INCLUDED',
      },
      {
        from: new Date('2021-01-01'),
        to: new Date('2021-01-10'),
        type: 'EXCLUDED',
      },
      {
        from: new Date('2021-01-18'),
        to: new Date('2021-01-20'),
        type: 'EXCLUDED',
      },
      {
        from: new Date('2021-01-25'),
        to: new Date('2021-01-26'),
        type: 'EXCLUDED',
      },
      {
        from: new Date('2021-05-25'),
        to: new Date('2021-06-10'),
        type: 'EXCLUDED',
      },
      {
        from: new Date('2021-07-11'),
        to: new Date('2021-07-15'),
        type: 'EXCLUDED',
      },
      {
        from: new Date('2021-08-01'),
        to: new Date('2021-08-05'),
        type: 'EXCLUDED',
      },
      {
        from: new Date('2021-08-27'),
        to: new Date('2021-09-15'),
        type: 'EXCLUDED',
      },
      {
        from: new Date('2021-10-11'),
        to: new Date('2021-10-20'),
        type: 'EXCLUDED',
      },
      {
        from: new Date('2021-12-21'),
        to: new Date('2021-12-30'),
        type: 'EXCLUDED',
      },
    ]

    const expected: Omit<DateRange, 'type'>[] = [
      {
        from: new Date('2021-01-11'),
        to: new Date('2021-01-17'),
      },
      {
        from: new Date('2021-01-21'),
        to: new Date('2021-01-24'),
      },
      {
        from: new Date('2021-01-27'),
        to: new Date('2021-04-30'),
      },
      {
        from: new Date('2021-06-11'),
        to: new Date('2021-07-10'),
      },
      {
        from: new Date('2021-07-16'),
        to: new Date('2021-07-31'),
      },
      {
        from: new Date('2021-08-06'),
        to: new Date('2021-08-26'),
      },
      {
        from: new Date('2021-10-01'),
        to: new Date('2021-10-10'),
      },
      {
        from: new Date('2021-10-21'),
        to: new Date('2021-12-20'),
      },
      {
        from: new Date('2021-12-31'),
        to: new Date('2021-12-31'),
      },
    ]

    expect(calculateDateRage(ranges)).toEqual(expected)
  })
})
