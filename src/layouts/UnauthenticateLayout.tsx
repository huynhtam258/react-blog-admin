import React from 'react'

interface Props {
  children?: React.ReactNode
}
export default function Unauthenticate({ children }: Props) {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }
  return (
    <div className='unauthenticate-layout' style={style}>
      {children}
    </div>
  )
}