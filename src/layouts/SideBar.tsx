import { Card, Chip, List, ListItem, ListItemPrefix, ListItemSuffix, Typography } from "@material-tailwind/react";
import { PresentationChartBarIcon, InboxIcon, UserCircleIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  // const onNavigate = (route: string) => {
  //   navigate(route);
  // };

  const logout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  // Danh sách các mục trong Sidebar
  const sidebarItems = [
    { icon: <PresentationChartBarIcon className="h-5 w-5" />, label: "Dashboard" },
    { icon: <InboxIcon className="h-5 w-5" />, label: "Inbox", suffix: <Chip value="14" size="sm" variant="ghost" className="rounded-full" /> },
    { icon: <UserCircleIcon className="h-5 w-5" />, label: "Profile" },
    { icon: <Cog6ToothIcon className="h-5 w-5" />, label: "Settings" },
    { icon: <PowerIcon className="h-5 w-5" />, label: "Log Out" , onClick: logout},
  ];

  return (
    <Card className="h-100vh w-full max-w-[20rem] p-4">
      {/* <div className="mb-2 p-4">
        <Typography variant="h5">Sidebar</Typography>
      </div> */}
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem key={index}  onClick={item.onClick}>
            <ListItemPrefix>{item.icon}</ListItemPrefix>
            {item.label}
            {item.suffix && <ListItemSuffix>{item.suffix}</ListItemSuffix>}
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default SideBar;
