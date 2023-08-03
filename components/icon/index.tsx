'use client'
import React from 'react'
import loadable from '@loadable/component'
import { BiError } from 'react-icons/bi'

interface Props extends React.SVGProps<SVGSVGElement> {
  name: string
}

export const Icon: React.FC<Props> = ({ name, ...rest }) => {
  const lib = name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')[0]
    .toLowerCase()

  const Element = loadable(() => import(`react-icons/${lib}/index.js`), {
    resolveComponent: components => components[name] ?? BiError,
  })

  return <Element {...rest} />
}
