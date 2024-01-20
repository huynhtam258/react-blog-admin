import React from "react"
import { useNavigate } from "react-router-dom"
import SideBar from "./SideBar"

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
    <div className="main-layout flex">
      <SideBar></SideBar>
      <div className="h-screen flex-1 p-7 overflow-auto">
        {/* <h1 className="text-2xl font-semibold ">Home Page</h1> */}
        {children}
      </div>
    </div>
  )
}