import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { PresentationChartBarIcon, UserCircleIcon, Cog6ToothIcon, PowerIcon, } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { logout } from "../services/auth.service";
import { useState } from "react";

// styles
import './SideBar.scss'

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleLogOut = () => {
    logout(dispatch, navigate)
    setOpen(false)
  };

  const handleNavigate = (path: string): void  => {
    navigate(path)
  }

  const sidebarItems = [
    { icon: <PresentationChartBarIcon className="h-5 w-5" />, label: "Dashboard", onClick: ()=> {handleNavigate('/')}},
    { icon: <UserCircleIcon className="h-5 w-5" />, label: "Profile" },
    { icon: <Cog6ToothIcon className="h-5 w-5" />, label: "Create post", onClick: ()=> {handleNavigate('/create-blog')} },
    { icon: <PowerIcon className="h-5 w-5" />, label: "Log Out", onClick: handleOpen },
  ];
  

  return (
    <>
      <Card className="h-100vh w-full max-w-[20rem] p-4">
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem key={index} onClick={item.onClick}>
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item.label}
            </ListItem>
          ))}
        </List>
      </Card>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Logout.</DialogHeader>
        <DialogBody>
          Would you like logout
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleLogOut}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>


  );
};

export default SideBar;
