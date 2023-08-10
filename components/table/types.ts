export type TDataRoot = Record<string, any>

interface FieldOption {
  hidden?: boolean
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
] as const

export type FieldOptions<T extends TDataRoot> = Partial<
  Record<keyof T, FieldOption>
>

export type ClassNames = Partial<Record<(typeof classNames)[number], string>>
