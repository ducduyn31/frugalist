import React, { useMemo } from 'react'
import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslations } from 'use-intl'
import { TableHeader } from '@/components/table/header'
import { TableRow } from '@/components/table/row'
import { ClassNames, FieldOptions } from '@/components/table/types'
import { cssName } from '@/components/table/helpers'
import { LoadingSkeleton } from '@/components/table/loading'

interface Props<T extends Record<string, any>> {
  data: T[]
  namespace?: string
  fieldOptions?: FieldOptions<T>
  classNames?: ClassNames
  actions?: (row: CellContext<T, unknown>) => React.ReactElement | null
  loading?: boolean
}

export function Table<T extends Record<string, any>>({
  data,
  actions,
  loading,
  namespace,
  fieldOptions,
  classNames,
}: Props<T>): React.ReactElement<Props<T>> | null {
  const t = useTranslations(namespace ?? 'common.Table')

  const columns: ColumnDef<T>[] = useMemo(() => {
    if (data.length === 0) {
      return []
    }

    const hiddenColumns = Object.keys(fieldOptions ?? {}).filter(
      key => fieldOptions?.[key]?.hidden,
    )

    const dataColumns: ColumnDef<T>[] = Object.keys(data[0])
      .filter(key => !hiddenColumns.includes(key))
      .map(key => ({
        id: key,
        header: t(`columns.${key}`),
        accessorKey: key,
      }))

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
    columns,
    data,
    getCoreRowModel: getCoreRowModel<T>(),
    debugAll: true,
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
          {table.getRowModel().rows.map(row => (
            <TableRow
              row={row}
              key={row.id}
              classNames={classNames}
              actions={actions}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
