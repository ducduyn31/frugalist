import React from 'react'
import { cssName } from '@/components/table/helpers'
import { flexRender } from '@tanstack/react-table'
import { ClassNames, TDataRoot } from '@/components/table/types'
import { Row } from '@tanstack/table-core'

interface Props<T extends TDataRoot>
  extends React.HTMLProps<HTMLTableRowElement> {
  classNames?: ClassNames
  onRowClick?: (row: Row<T>) => void
  row: Row<T>
}

export function TableDataRow<T extends TDataRoot>({
  row,
  classNames,
  className,
  onRowClick,
  ...rest
}: Props<T>) {
  return (
    <tr
      className={cssName(
        classNames?.tableRow,
        className,
      )`hover:bg-base-300 cursor-pointer`}
      onClick={() => onRowClick?.(row)}
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
