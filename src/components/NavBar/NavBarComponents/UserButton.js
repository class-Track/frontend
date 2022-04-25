import React from "react";
import { IconButton } from "@mui/material";

export default function UserButton(props) {
    return (
        <a href="/profile">
            <IconButton>
                <img src={props.User.imageURL === "" ? "/icons/person.png" : props.User.imageURL} alt="Profile" width="30px" />
            </IconButton>
        </a>
    );

}
