import { React, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import PrintIcon from "@mui/icons-material/Print";
import { IconButton, Button, Icon } from "@mui/material";

export default function Viewer(props) {
  const cookies = new Cookies();
  const [userData, setUserData] = useState();
  const [session_id, setSessionID] = useState(cookies.get("SessionID"));
  const curriculum_id = "CIIC_57_V1";

  useEffect(() => {
    if (session_id) {
      getUserData();
    }
  }, []);

  const getUserData = async () => {
    await axios({
      method: "POST",
      url: props.API + "me",
      data: {
        session_id: session_id,
      },
    })
      .then((res) => {
        console.log("result:", res.data);
        setUserData(res.data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const createHistory = async () => {
    await axios({
      method: "POST",
      url: props.API + "history",
      data: {
        user_id: userData.user_id,
        curriculum_id: curriculum_id,
        session_id: session_id,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  

  return (
    <div>
      <p>Viewer component works!</p>
      <IconButton onClick={() => createHistory()}>
        <PrintIcon />
      </IconButton>
    </div>
  );
}
