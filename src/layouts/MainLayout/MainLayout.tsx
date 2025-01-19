import React, { useEffect, useState } from "react"
import SideBar from "../../components/sideBar/SideBar"

// styles
import './MainLayout.scss'
import { Outlet, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../store"
import { getUserProfile } from "../../pages/user/user.thunk"
import SpinnerInitial from "../../components/common/spinner/SpinnerInitial"

const MainLayout: React.FC = () => {
  const [initialize, setInitialize] = useState<boolean>(false)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await dispatch(getUserProfile()).unwrap();
        setInitialize(true);
      } catch (error) {
        localStorage.clear();
        navigate('/auth/login', { replace: true });
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  if (!initialize) {
    return <SpinnerInitial />
  }
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