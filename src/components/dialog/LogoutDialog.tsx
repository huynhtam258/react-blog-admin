import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

interface LogoutDialogProps {
  open: boolean;
  handleOpen: () => void;
  handleLogOut: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ open, handleOpen, handleLogOut }) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Logout</DialogHeader>
      <DialogBody>
        Would you like to logout?
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
  );
};

export default LogoutDialog;