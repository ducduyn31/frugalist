export type TDataRoot = Record<string, any>

interface FieldOption {
  hidden?: boolean
  isGroupIdentifier?: boolean
}

const classNames = [
  'table',
  'tbody',
  'thead',
  'headerCell',
  'tableRow',
  'tableCell',
  'tableCellTooltip',
  'tableCellContent',
  'wrapper',
  'loadingWrapper',
  'groupedRow',
  'groupedCell',
] as const

export type FieldOptions<T extends TDataRoot> = Partial<
  Record<keyof T, FieldOption>
>

export type ClassNames = Partial<Record<(typeof classNames)[number], string>>
