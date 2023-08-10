import React from 'react'
import { Table } from '@tanstack/table-core'
import { ClassNames, TDataRoot } from '@/components/table/types'
import { flexRender } from '@tanstack/react-table'
import { cssName } from '@/components/table/helpers'

interface Props<T extends TDataRoot> {
  table: Table<T>
  classNames?: ClassNames
}

export function TableHeader<T extends TDataRoot>({
  table,
  classNames,
}: Props<T>) {
  const headers = table.getHeaderGroups().flatMap(group => group.headers)

  return (
    <thead className={classNames?.thead}>
      <tr className="leading-normal">
        {headers.map(header => (
          <th
            key={header.id}
            className={cssName(
              classNames?.headerCell,
            )`pr-6 py-6 font-normal text-left first-of-type:pl-6 last-of-type:pr-6 text-base-300 dark:text-base-content`}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
    </thead>
  )
}
