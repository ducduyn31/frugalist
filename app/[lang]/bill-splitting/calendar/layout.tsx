import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren<{}> {
  modal: React.ReactNode
}

export default async function CalendarLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
