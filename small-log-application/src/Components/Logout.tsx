import { IconButton } from "@mui/material";
import React from "react";
import { LoginContext } from "../Context/LoginAuthContext";
import LogoutIcon from "@mui/icons-material/Logout";


export default function Logout() {
    const {logOut} = React.useContext(LoginContext);
    return(
        <>
        <IconButton size="large" color="inherit" onClick={logOut}>
              <LogoutIcon />
            </IconButton>
        </>
    )
}
