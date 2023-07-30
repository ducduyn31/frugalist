'use client'

import * as React from 'react'
import { FC } from 'react'

interface Props {
  name: string
}

export const AppSelect: FC<Props> = ({ name }) => {
  return <div>{name}</div>
}
