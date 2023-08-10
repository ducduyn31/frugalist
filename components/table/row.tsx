import React from 'react'
import { Row } from '@tanstack/table-core'
import { ClassNames, TDataRoot } from '@/components/table/types'
import { CellContext, flexRender } from '@tanstack/react-table'
import { cssName } from '@/components/table/helpers'

interface Props<T extends TDataRoot>
  extends React.HTMLProps<HTMLTableRowElement> {
  row: Row<T>
  actions?: (row: CellContext<T, unknown>) => React.ReactElement | null
  classNames?: ClassNames
}

export function TableRow<T extends TDataRoot>({
  row,
  classNames,
  className,
  ...rest
}: Props<T>) {
  return (
    <tr
      className={cssName(
        classNames?.tableRow,
        className,
      )`hover:bg-base-300 cursor-pointer`}
      {...rest}
    >
      {row.getVisibleCells().map(cell => (
        <td
          key={cell.column.id}
          className={cssName(
            classNames?.tableCell,
          )`whitespace-nowrap pr-6 py-6 font-normal text-left first-of-type:pl-6 last-of-type:pr-6`}
        >
          <div
            className={cssName(
              classNames?.tableCellTooltip,
            )`tooltip tooltip-bottom`}
            data-tip={cell.getValue()}
          >
            <div className={classNames?.tableCellContent}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </div>
        </td>
      ))}
    </tr>
  )
}
