import React from 'react'

// styles
import './UnauthenticateLayout.scss'

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