import { FieldOptions, TDataRoot } from '@/components/table/types'

export const getHiddenFields = <T extends TDataRoot>(
  fieldOptions?: FieldOptions<T>,
): string[] => {
  const hiddenFields: string[] = []
  if (!fieldOptions) return hiddenFields
  Object.entries(fieldOptions).forEach(([key, value]) => {
    if (value?.hidden) {
      hiddenFields.push(key)
    }
  })
  return hiddenFields
}

export const getGroupIdentifiers = <T extends TDataRoot>(
  fieldOptions?: FieldOptions<T>,
): string[] => {
  const groupIdentifiers: string[] = []
  if (!fieldOptions) return groupIdentifiers
  Object.entries(fieldOptions).forEach(([key, value]) => {
    if (value?.isGroupIdentifier) {
      groupIdentifiers.push(key)
    }
  })
  return groupIdentifiers
}

type GetDataColumnsInput<T extends TDataRoot> = {
  fieldOptions?: FieldOptions<T>
  sampleData: T
}

export const getDataColumns = <T extends TDataRoot>({
  fieldOptions,
  sampleData,
}: GetDataColumnsInput<T>): string[] => {
  const dataColumns: string[] = []
  const filteredColumns: string[] = [
    ...getHiddenFields(fieldOptions),
    ...getGroupIdentifiers(fieldOptions),
  ]

  Object.keys(sampleData).forEach(key => {
    if (!filteredColumns.includes(key)) {
      dataColumns.push(key)
    }
  })

  return dataColumns
}
