import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren<{}> {
  modal?: React.ReactNode
}

export default function PeopleLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
