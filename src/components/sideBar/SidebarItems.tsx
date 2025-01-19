// import React from 'react';
import { 
  PresentationChartBarIcon,
  GiftIcon, UserCircleIcon,
  PowerIcon,
  DocumentArrowUpIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/solid";
import { NavigateFunction } from 'react-router-dom';

const handleNavigate = (navigate: NavigateFunction, path: string) => {
  navigate(path);
};

const sidebarItems = (navigate: NavigateFunction, handleOpen: () => void) => [
  { icon: <DocumentArrowUpIcon className="h-5 w-5" />, label: "Bài viết", onClick: () => { handleNavigate(navigate, '/posts') } },
  { icon: <PresentationChartBarIcon className="h-5 w-5" />, label: "Sản phẩm", onClick: () => { handleNavigate(navigate, '/products') } },
  { icon: <ShoppingCartIcon className="h-5 w-5" />, label: "Giỏ hàng", onClick: () => { handleNavigate(navigate, '/') } },
  { icon: <GiftIcon className="h-5 w-5" />, label: "Hình ảnh", onClick: () => { handleNavigate(navigate, '/media') } },
  { icon: <UserCircleIcon className="h-5 w-5" />, label: "Hồ sơ cá nhân" },
  { icon: <GiftIcon className="h-5 w-5" />, label: "Tạo sản phẩm", onClick: () => { handleNavigate(navigate, '/create-product') } },
  { icon: <PowerIcon className="h-5 w-5" />, label: "Đăng xuất", onClick: handleOpen },
];

export default sidebarItems;