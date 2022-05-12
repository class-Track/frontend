import { React, useState, useEffect } from "react";
import List from "./List";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import StepFour from "../Admin/AdminBuilder/StepFour";
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
  Typography,
} from "@mui/material";
import { Cookie } from "@mui/icons-material";

export default function Builder(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const [info, setInfo] = useState({});
  const [loadCurriculum, setLoadCurriculum] = useState(false);
  const actions = [
    {
      icon: <SaveIcon onClick={() => console.log("pressed save")} />,
      name: "Save",
    },
    {
      icon: <DeleteIcon onClick={() => console.log("pressed delete")} />,
      name: "Delete",
    },
    {
      icon: <ShareIcon onClick={() => console.log("pressed share")} />,
      name: "Share",
    },
  ];

  useEffect(() => {
    if (props.id) {
      getCurriculum();
    }
  }, []);

  const getCurriculum = async () => {
    console.log(props.id);
    await axios({
      method: "GET",
      url: tempAPI + "currGraph",
      params: {
        id: props.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        props.setLists(res.data);
        setLoadCurriculum(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createSemesters = (degree_id, user_id, year) => {
    return [
      degree_id + "_" + year + "_spring",
      degree_id + "_" + year + "_summer",
      degree_id + "_" + year + "_ext_summer",
      degree_id + "_" + year + "_fall",
    ];
  };

  const getSemesterName = (index) => {
    switch (index) {
      case 0:
        return "Spring";
        break;
      case 1:
        return "Summer";
        break;
      case 2:
        return "Extended Summer";
        break;
      case 3:
        return "Fall";
        break;
      default:
        return undefined;
    }
  };

  return (
    <div style={{ margin: 30 }}>
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
              <Typography variant={"h4"}>{props.lists.name}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => console.log("clicked save button")}>
                <SaveAsIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => console.log("clicked delete button")}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <StepFour
              {...props}
              info={info}
              user={props.User}
              session={props.Session}
              isDragDisabled={false}
              createSemesters={createSemesters}
              getSemesterName={getSemesterName}
            />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      {/* <Fab
        size="large"
        aria-label="add"
        sx={{ position: "absolute", bottom: 16, right: 96 }}
      >
        <DeleteIcon />
      </Fab>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SaveAsIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial> */}
    </div>
  );
}
