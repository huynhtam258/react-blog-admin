import React from "react"
import { useNavigate } from "react-router-dom"
import SideBar from "./SideBar"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const navigate = useNavigate()
  return (
    <div className="main-layout flex">
      <SideBar></SideBar>
      <div className="h-screen flex-1 p-7 overflow-auto">
        {children}
      </div>
    </div>
  )
}