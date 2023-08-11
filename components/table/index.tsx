import React, { useMemo, useState } from 'react'
import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  getGroupedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslations } from 'use-intl'
import { TableHeader } from '@/components/table/header'
import { TableRow } from '@/components/table/row/row'
import { ClassNames, FieldOptions } from '@/components/table/types'
import {
  cssName,
  getDataColumns,
  getGroupIdentifiers,
} from '@/components/table/helpers'
import { LoadingSkeleton } from '@/components/table/loading'
import { Row } from '@tanstack/table-core'

interface Props<T extends Record<string, any>> {
  data: T[]
  namespace?: string
  fieldOptions?: FieldOptions<T>
  classNames?: ClassNames
  actions?: (row: CellContext<T, unknown>) => React.ReactElement | null
  onRowClick?: (row: Row<T>) => void
  loading?: boolean
}

export function Table<T extends Record<string, any>>({
  data,
  actions,
  loading,
  namespace,
  fieldOptions,
  classNames,
  onRowClick,
}: Props<T>): React.ReactElement<Props<T>> | null {
  const t = useTranslations(namespace ?? 'common.Table')
  const [grouping, setGrouping] = useState([] as string[])

  const columns: ColumnDef<T>[] = useMemo(() => {
    if (data.length === 0) {
      return []
    }

    const dataColumnNames = getDataColumns({
      fieldOptions,
      sampleData: data[0],
    })

    const dataColumns: ColumnDef<T>[] = dataColumnNames.map(key => ({
      id: key,
      header: t(`columns.${key}`),
      accessorKey: key,
    }))

    const groupIdentifer = getGroupIdentifiers(fieldOptions)?.[0]

    if (!!groupIdentifer) {
      dataColumns[0] = {
        ...dataColumns[0],
        getGroupingValue: row => row[groupIdentifer],
      }
      if (dataColumns[0].id) setGrouping([dataColumns[0].id])
    }

    if (!!actions) {
      dataColumns.push({
        id: 'actions',
        header: t('columns.actions'),
        cell: row => actions(row),
      })
    }

    return dataColumns
  }, [actions, data, fieldOptions, t])

  const table = useReactTable({
    state: {
      grouping,
      expanded: true,
    },
    columns,
    data,
    getCoreRowModel: getCoreRowModel<T>(),
    getGroupedRowModel: getGroupedRowModel<T>(),
  })

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div
      className={cssName(
        classNames?.wrapper,
      )`rounded-box bg-white dark:bg-base-300`}
    >
      <table className={cssName(classNames?.table)`w-full`}>
        <TableHeader table={table} classNames={classNames} />
        <tbody className={cssName(classNames?.tbody)`border-t border-base-100`}>
          {table.getRowModel().rows.map((row, id) => (
            <TableRow
              namespace={namespace}
              row={row}
              key={row.id}
              classNames={classNames}
              className={id % 2 === 0 ? 'bg-base-200/20' : undefined}
              actions={actions}
              onClick={() => onRowClick?.(row)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
