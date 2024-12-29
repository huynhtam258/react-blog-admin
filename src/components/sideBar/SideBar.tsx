import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { logout } from "../../services/auth.service";
import { useState } from "react";

// styles
import './SideBar.scss'
import LogoutDialog from "../dialog/LogoutDialog";
import sidebarItems from "./SidebarItems";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(!open);

  const handleLogOut = () => {
    logout(dispatch, navigate)
    setOpen(false)
  };

  return (
    <>
      <Card className="h-100vh w-full max-w-[20rem] p-4">
        <List>
          {sidebarItems(navigate, handleOpen).map((item, index) => (
            <ListItem key={index} onClick={item.onClick}>
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item.label}
            </ListItem>
          ))}
        </List>
      </Card>
      <LogoutDialog 
        open={open} 
        handleOpen={handleOpen} 
        handleLogOut={handleLogOut} 
      />
    </>


  );
};

export default SideBar;
