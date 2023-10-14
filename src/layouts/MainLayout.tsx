import React from "react"
import { useNavigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/auth/login')
  }
  return (
    <div className="main-layout">
      <div className="flex justify-end">
        <button onClick={logout}>Logout</button>
      </div>
      {children}
    </div>
  )
}