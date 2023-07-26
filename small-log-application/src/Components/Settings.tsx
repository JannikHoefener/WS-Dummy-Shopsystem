import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SettingsIcon from "@mui/icons-material/Settings";
import ToggleTheme from './ToggleTheme';

export default function SettingsByAlert() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} sx={{color: "white"}}><SettingsIcon /></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Settings"}</DialogTitle>
        
        <DialogContent>
            {/* Kontent bzw Funktionen hier einfügen */}
            <ToggleTheme/>
        </DialogContent>

      </Dialog>
    </>
  );
}