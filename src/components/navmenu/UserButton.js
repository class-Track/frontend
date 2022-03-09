import { Button, Divider, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

export default function UserButton(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };
  
    return (
      <div>
        <Button onClick={handleClick} style={{ textTransform: 'none' }}>
            <img src={props.User.imageURL === "" ? "/Images/Blankperson.png" : props.User.imageURL} alt="Profile" width="30px" style={{ margin: "5px", marginLeft: "10px" }} />
        </Button>
        
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} >
          {/* Are we going to have PFPs? 
            <MenuItem onClick={handlePickerOpen} disabled={!props.User.isAdmin && !props.User.isUploader}>Change Profile</MenuItem>
            <Divider />
          */}
          <MenuItem onClick={()=>{}}>My Profile</MenuItem>
          <Divider />
          <MenuItem onClick={()=>{}}>Change Password</MenuItem>
          <MenuItem onClick={()=>{}}>Log Out</MenuItem>
        </Menu>
      </div>
    );
  
  }
  