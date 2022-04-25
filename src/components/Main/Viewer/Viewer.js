import { React, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import PrintIcon from "@mui/icons-material/Print";
import List from "../Builder/List";
import {
  Stack,
  IconButton,
  Button,
  Icon,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Fab,
} from "@mui/material";

export default function Viewer(props) {
  const cookies = new Cookies();
  const [userData, setUserData] = useState();
  const [curriculumData, setCurriculumData] = useState();
  const [loadCurriculum, setLoadCurriculum] = useState(false);
  const [session_id, setSessionID] = useState(cookies.get("SessionID"));
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const curriculum_id = "CIIC_57_V1";

  useEffect(() => {
    if (session_id) {
      // getUserData();
      getCurriculum();
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

  const getCurriculum = async () => {
    setLoadCurriculum(false);
    await axios({
      method: "GET",
      url: tempAPI + "currGraph/curr",
      params: {
        id: "CIIC_57_V28",
      },
    })
      .then((res) => {
        console.log(res.data);
        setCurriculumData(res.data);
        setLoadCurriculum(true);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div>
      {loadCurriculum ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {curriculumData["years"].map((year, i) =>
            curriculumData[year]["semesters_ids"].map((semester_id, i) => (
              <List
                key={i}
                list={curriculumData[semester_id]}
                courses={curriculumData[semester_id]["courses"]}
                title={curriculumData[semester_id].name}
                subtitle={"Year " + year}
                length={450}
              />
            ))
          )}
        </Stack>
      ) : (
        <p>loading curriculum...</p>
      )}
    </div>
  );
}
