import React from 'react'
import { Row } from '@tanstack/table-core'
import { ClassNames, TDataRoot } from '@/components/table/types'
import { CellContext } from '@tanstack/react-table'
import { TableDataRow } from '@/components/table/row/data-row'
import { GroupedRow } from '@/components/table/row/grouped-row'

interface Props<T extends TDataRoot>
  extends React.HTMLProps<HTMLTableRowElement> {
  row: Row<T>
  actions?: (row: CellContext<T, unknown>) => React.ReactElement | null
  classNames?: ClassNames
  namespace?: string
}

export function TableRow<T extends TDataRoot>({ row, ...rest }: Props<T>) {
  const isGroupRow = row.getIsGrouped()

  if (isGroupRow) {
    return <GroupedRow row={row} {...rest} />
  }

  return <TableDataRow row={row} {...rest} />
}
