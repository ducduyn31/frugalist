import { ClassNames, TDataRoot } from '@/components/table/types'
import React from 'react'
import { Row } from '@tanstack/table-core'
import { cssName } from '@/components/table/helpers'
import { useTranslations } from 'use-intl'
import { TableDataRow } from '@/components/table/row/data-row'

interface Props<T extends TDataRoot>
  extends React.HTMLProps<HTMLTableRowElement> {
  classNames?: ClassNames
  row: Row<T>
  namespace?: string
}

export function GroupedRow<T extends TDataRoot>({
  row,
  classNames,
  namespace,
}: Props<T>) {
  const t = useTranslations(namespace ?? 'common.Table')

  const expand = () => {
    row.toggleExpanded()
  }

  return (
    <>
      <tr
        className={cssName(classNames?.groupedRow)`bg-base-100 text-base-300`}
        onClick={expand}
      >
        {row
          .getVisibleCells()
          .filter(cell => cell.getValue())
          .map(cell => (
            <td
              colSpan={row.getAllCells().length}
              key={cell.column.id}
              className={cssName(
                classNames?.groupedCell,
              )`pr-6 py-3 font-semibold text-left first-of-type:pl-6 last-of-type:pr-6`}
            >
              {t(`groups.${row.getGroupingValue(cell.column.id) as string}`)}
            </td>
          ))}
      </tr>
      {row.getIsExpanded() &&
        row
          .getLeafRows()
          .map((subRow, index) => (
            <TableDataRow
              row={subRow}
              key={subRow.id}
              classNames={classNames}
              className={index % 2 === 0 ? 'bg-base-200/20' : undefined}
            />
          ))}
    </>
  )
}
