import React from "react"
import SideBar from "./SideBar"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="main-layout flex bg-blue-gray-50/50">
      <SideBar></SideBar>
      <div className="h-screen flex-1 p-7 overflow-auto">
        {children}
      </div>
    </div>
  )
}