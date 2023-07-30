'use client'
import React from 'react'

interface Props extends React.PropsWithChildren<{}> {
  providers?: React.ReactElement[]
}

export const WrappedProviders: React.FC<Props> = ({ children, providers }) => (
  <>{providers?.reduceRight(nest, children) ?? children}</>
)

const nest = (children: React.ReactNode, component: React.ReactElement) =>
  React.cloneElement(component, {}, children)
