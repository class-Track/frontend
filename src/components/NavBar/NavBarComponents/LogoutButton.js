import React from "react";
import { IconButton } from "@mui/material";
import { Logout } from '@mui/icons-material'
import { LogOut } from "../../../API";
import { useHistory } from "react-router-dom";


export default function LogoutButton(props) {

    const history = useHistory();

    const handleLogout = (event) => { LogOut(props.Session, props.removeSession, props.setUser, history); }

    return (
        <React.Fragment>
            <IconButton color="inherit" onClick={handleLogout}><Logout /></IconButton>
        </React.Fragment>
    );

}
