import React from "react"
import SideBar from "../components/sideBar/SideBar"

// styles
import './MainLayout.scss'
import { Outlet } from "react-router-dom"

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout flex bg-blue-gray-50/50">
      <SideBar></SideBar>
      <div className="h-screen flex-1 p-7 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout;