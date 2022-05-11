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
} from "@mui/material";
import { Cookie } from "@mui/icons-material";

export default function Builder(props) {
  const cookies = new Cookies();
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const [info, setInfo] = useState({});
  const [loadCurriculum, setLoadCurriculum] = useState(false);
  const [yearIndex, setYearIndex] = useState(0);
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
    getCurriculum();
  }, []);

  const getCurriculum = async () => {
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

  const nextYear = () => {
    // if (yearIndex + 1 < years.length) {
    //   setYearIndex(yearIndex + 1);
    // }
  };

  const prevYear = () => {
    // if (yearIndex - 1 >= 0) {
    //   setYearIndex(yearIndex - 1);
    // }
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
    <div>
      <p>{props.id}</p>
      {loadCurriculum ? (
        <StepFour
          {...props}
          info={info}
          user={props.User}
          session={props.Session}
          isDragDisabled={false}
          createSemesters={createSemesters}
          getSemesterName={getSemesterName}
        />
      ) : (
        <></>
      )}
      {/* <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <List
          key={0}
          list={props.lists["course_list"]}
          courses={props.lists["course_list"]["courses"]}
          scroll={true}
          title={props.lists["course_list"].name}
          subtitle={"All Courses"}
          length={740}
        />
        <IconButton
          disabled={yearIndex === 0}
          key={1}
          onClick={() => prevYear()}
        >
          <ChevronLeftIcon />
        </IconButton>
        {props.lists[years[yearIndex]]["semester_ids"].map((value, index) => (
          <List
            key={index + 2}
            list={props.lists[value]}
            courses={props.lists[value]["courses"]}
            title={props.lists[value].name}
            subtitle={props.lists[value].year}
            length={450}
          />
        ))}
        {yearIndex === years.length - 1 ? (
          <IconButton>
            <AddIcon />
          </IconButton>
        ) : (
          <IconButton key={years.length + 1} onClick={() => nextYear()}>
            <ChevronRightIcon />
          </IconButton>
        )}
      </Stack>
      <Fab
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
