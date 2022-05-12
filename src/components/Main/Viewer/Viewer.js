import { React, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import List from "../Builder/List";
import { Link, useHistory } from "react-router-dom";
import {
  Stack,
  IconButton,
  Button,
  Icon,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Fab,
  Grid,
  Divider,
  Typography,
} from "@mui/material";

export default function Viewer(props) {
  const history = useHistory();
  const cookies = new Cookies();
  const [userData, setUserData] = useState();
  const [curriculum, setCurriculum] = useState();
  const [loadCurriculum, setLoadCurriculum] = useState(false);
  const [years, setYears] = useState([]);
  const [session_id, setSessionID] = useState(cookies.get("SessionID"));
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const curriculum_id = props.id;

  useEffect(() => {
    getCurriculum();
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
      url: tempAPI + "currGraph",
      params: {
        id: props.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        setCurriculum(res.data);
        setLoadCurriculum(true);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  const editCurriculum = () => {
    history.push("/Builder/" + props.id);
  };

  return (
    <div style={{ margin: 40 }}>
      {loadCurriculum ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid
            xs={12}
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Typography variant={"h4"}>{curriculum.name}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => editCurriculum()}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
          >
            {curriculum.year_list.year_ids
              .sort((a, b) => (a > b ? 1 : -1))
              .map((year_id, i) => (
                <Grid item key={year_id}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                  >
                    <Grid xs={12} item key={i}>
                      <Divider sx={{ p: 1 }}>
                        <Typography
                          component="h2"
                          variant="h4"
                          color="gray"
                          gutterBottom
                        >
                          {year_id}
                        </Typography>
                      </Divider>
                    </Grid>
                    <Grid
                      xs={24}
                      item
                      key={i + 1}
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={4}
                    >
                      {curriculum[year_id].semester_ids
                        .sort((a, b) => (a > b ? 1 : -1))
                        .map((semester_id, j) => (
                          <Grid xs={3} key={i + 1 + j} item>
                            <List
                              key={i + 1 + j}
                              list={curriculum[semester_id]}
                              courses={curriculum[semester_id]["courses"]}
                              title={curriculum[semester_id]["name"]}
                              subtitle={curriculum[semester_id]["year"]}
                              length={450}
                              isDragDisabled={true}
                              lists={curriculum}
                              {...props}
                            />
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
      ) : (
        <p>loading curriculum for viewer...</p>
      )}
    </div>
  );
}
