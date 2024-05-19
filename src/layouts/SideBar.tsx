import { Button, Card, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, List, ListItem, ListItemPrefix, ListItemSuffix } from "@material-tailwind/react";
import { PresentationChartBarIcon, InboxIcon, UserCircleIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { logout } from "../services/auth.service";
import { useState } from "react";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);

  const handleLogOut = () => {
    logout(dispatch, navigate)
    setOpen(false)
  };

  // Danh sách các mục trong Sidebar
  const sidebarItems = [
    { icon: <PresentationChartBarIcon className="h-5 w-5" />, label: "Dashboard" },
    { icon: <InboxIcon className="h-5 w-5" />, label: "Inbox", suffix: <Chip value="14" size="sm" variant="ghost" className="rounded-full" /> },
    { icon: <UserCircleIcon className="h-5 w-5" />, label: "Profile" },
    { icon: <Cog6ToothIcon className="h-5 w-5" />, label: "Settings" },
    { icon: <PowerIcon className="h-5 w-5" />, label: "Log Out", onClick: handleOpen },
  ];

  return (
    <>
      <Card className="h-100vh w-full max-w-[20rem] p-4">
        {/* <div className="mb-2 p-4">
        <Typography variant="h5">Sidebar</Typography>
      </div> */}
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem key={index} onClick={item.onClick}>
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item.label}
              {item.suffix && <ListItemSuffix>{item.suffix}</ListItemSuffix>}
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
