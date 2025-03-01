import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

interface LogoutDialogProps {
  open: boolean;
  handleOpen: () => void;
  handleLogOut: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ open, handleOpen, handleLogOut }) => {
  return (
    <Dialog size='xs' open={open} handler={handleOpen}>
      <DialogHeader>Đăng xuất</DialogHeader>
      <DialogBody>
        Bạn có muốn đăng xuất không ?
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Hủy</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleLogOut}>
          <span>Chấp nhận</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default LogoutDialog;