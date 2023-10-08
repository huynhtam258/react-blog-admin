import React from 'react'

interface Props {
  children?: React.ReactNode
}
export default function Unauthenticate({ children }: Props) {
  return (
    <div className='unauthenticate-layout'>
      {children}
    </div>
  )
}