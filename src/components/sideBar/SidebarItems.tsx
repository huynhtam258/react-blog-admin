// import React from 'react';
import { PresentationChartBarIcon, GiftIcon, UserCircleIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { NavigateFunction } from 'react-router-dom';

const handleNavigate = (navigate: NavigateFunction, path: string) => {
  navigate(path);
};

const sidebarItems = (navigate: NavigateFunction, handleOpen: () => void) => [
  { icon: <PresentationChartBarIcon className="h-5 w-5" />, label: "Danh sách bài viết", onClick: () => { handleNavigate(navigate, '/posts') } },
  { icon: <PresentationChartBarIcon className="h-5 w-5" />, label: "Danh sách sản phẩm", onClick: () => { handleNavigate(navigate, '/products') } },
  { icon: <PresentationChartBarIcon className="h-5 w-5" />, label: "Danh sách giỏ hàng", onClick: () => { handleNavigate(navigate, '/') } },
  { icon: <GiftIcon className="h-5 w-5" />, label: "Danh sách hình ảnh", onClick: () => { handleNavigate(navigate, '/media') } },
  { icon: <UserCircleIcon className="h-5 w-5" />, label: "Hồ sơ cá nhân" },
  { icon: <Cog6ToothIcon className="h-5 w-5" />, label: "Tạo bài viết", onClick: () => { handleNavigate(navigate, '/create-blog') } },
  { icon: <GiftIcon className="h-5 w-5" />, label: "Tạo sản phẩm", onClick: () => { handleNavigate(navigate, '/create-product') } },
  { icon: <PowerIcon className="h-5 w-5" />, label: "Đăng xuất", onClick: handleOpen },
];

export default sidebarItems;