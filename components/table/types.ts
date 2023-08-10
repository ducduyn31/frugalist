export type TDataRoot = Record<string, any>

export interface FieldOptions {}

const classNames = [
  'table',
  'tbody',
  'thead',
  'headerCell',
  'tableRow',
  'tableCell',
  'tableCellTooltip',
  'tableCellContent',
] as const

export type ClassNames = Partial<Record<(typeof classNames)[number], string>>
