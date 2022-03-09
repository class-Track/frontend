import { Button, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

export default function UserButton(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };
  
    return (
        <a href="/profile">
            <IconButton>
                <img src={props.User.imageURL === "" ? "/icons/person.png" : props.User.imageURL} alt="Profile" width="30px"/>
            </IconButton>
        </a>
    );
  
  }
  