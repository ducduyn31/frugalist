import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren<{}> {
  modal?: React.ReactNode
}

export default function BillsLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
