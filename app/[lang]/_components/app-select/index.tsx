import * as React from 'react'
import { FC } from 'react'
import Link from 'next/link'
import { T } from '@/components/t-component'

interface Props {
  name: string
}

export const AppSelect: FC<Props> = ({ name }) => {
  return (
    <Link href={name} className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">
          <T ns="app.AppSelect" text={`${name}.title`} />
        </h2>
        <p>
          <T ns="app.AppSelect" text={`${name}.description`} />
        </p>
      </div>
    </Link>
  )
}
