import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", route: '' },
    { title: "Editor", src: "Chat", route: 'editor-blog' },
    { title: "Accounts", src: "User", gap: true, route: '' },
    { title: "Schedule ", src: "Calendar", route: '' },
    { title: "Search", src: "Search", route: '' },
    { title: "Analytics", src: "Chart", route: '' },
    { title: "Files ", src: "Folder", gap: true, route: '' },
    { title: "Setting", src: "Setting", route: '' },
  ];

  const navigate = useNavigate()

  const onNavigate = (route: string) => {
    navigate(route)
  }

  const logout = () => {
    localStorage.clear()
    navigate('/auth/login')
  }

  return (
    <div className="flex">
      <div className={` ${open ? "w-72" : "w-20 "} bg-black h-screen p-5  pt-8 relative duration-300`} >
        <img
          src="/img/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img src="/img/logo.png" className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0" }`}>
            Admin
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white" } `}
              onClick={() => {
                onNavigate(Menu.route)
              }}
            >
              <img src={`/img/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
          <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
              onClick={() => {
                logout()
              }}
            >
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;