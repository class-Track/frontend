import React from "react";
import { IconButton } from "@mui/material";
import { Logout } from '@mui/icons-material'
import { LogOut } from "../../../API";


export default function LogoutButton() {

    const handleLogout = (event) => { LogOut(); }

    return (
        <React.Fragment>
            <IconButton color="inherit" onClick={handleLogout}><Logout /></IconButton>
        </React.Fragment>
    );

}
