import React, { useRef } from 'react'
import { ClassNames } from '@/components/table/types'
import { cssName } from '@/components/table/helpers'

interface Props {
  classNames?: ClassNames
}

const validTwWidths = [
  'w-20',
  'w-24',
  'w-28',
  'w-32',
  'w-36',
  'w-40',
  'w-44',
  'w-48',
  'w-52',
  'w-56',
  'w-60',
] as const

const sampleWidths = (n: number) => {
  const widths = []

  for (let i = 0; i < n; i++) {
    widths.push(validTwWidths[Math.floor(Math.random() * validTwWidths.length)])
  }

  return widths
}

export const LoadingSkeleton: React.FC<Props> = ({ classNames }) => {
  const headerWidths = useRef(sampleWidths(3))
  const bodyWidths = useRef([
    sampleWidths(3),
    sampleWidths(3),
    sampleWidths(3),
    sampleWidths(3),
    sampleWidths(3),
    sampleWidths(3),
  ])

  return (
    <div
      className={cssName(
        classNames?.loadingWrapper,
      )`rounded-box bg-white dark:bg-base-300 animate-pulse`}
    >
      <div className={cssName(classNames?.table)`w-full grid grid-cols-3`}>
        {headerWidths.current.map(width => (
          <div
            key={width}
            className={cssName(
              classNames?.headerCell,
            )`pr-6 py-6 first-of-type:pl-6 last-of-type:pr-6 w-60`}
          >
            <div className={`rounded bg-gray-300 ${width} h-6`} />
          </div>
        ))}
      </div>
      <div
        className={cssName(
          classNames?.tbody,
        )`border-t border-base-100 [&>*:nth-child(even)]:bg-base-200/20`}
      >
        {bodyWidths.current.map((row, i) => (
          <div
            key={i}
            className={cssName(classNames?.table)`w-full grid grid-cols-3`}
          >
            {row.map(width => (
              <div
                key={width}
                className={cssName(
                  classNames?.headerCell,
                )`pr-6 py-6 first-of-type:pl-6 last-of-type:pr-6 w-60`}
              >
                <div className={`rounded bg-gray-300 ${width} h-6`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
