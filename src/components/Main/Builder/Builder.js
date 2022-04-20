import { React, useState, useEffect } from "react";
import List from "./List";
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

export default function Builder(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/currGraph/student";
  const years = props.lists["year_list"]["year_ids"];
  const [yearIndex, setYearIndex] = useState(years.length - 1);
  const actions = [
    { icon: <SaveIcon onClick={() => saveGraph()} />, name: "Save" },
    {
      icon: <DeleteIcon onClick={() => console.log("pressed delete")} />,
      name: "Delete",
    },
    {
      icon: <ShareIcon onClick={() => console.log("pressed share")} />,
      name: "Share",
    },
  ];

  const saveGraph = async () => {
    let semesters = [];
    years.forEach((year) => {
      props.lists[year]["semester_ids"].forEach((semester) => {
        semesters.push({
          ...props.lists[semester],
          id:
            // props.userData["degree_id"] +
            // "_" +
            // props.userData["user_id"] +
            // "_" +
            "4_54_" +
            props.lists[semester].id,
        });
      });
    });
    let tempResponse = {
      graph: [
        {
          name:
            "Test_Curriculum_4_54",
            // props.userData["degree_id"] +
            // "_" +
            // props.userData["user_id"],
          // program: props.userData["degree_id"],
          // user: props.userData["user_id"],
          program: 4,
          user: 54,
          semesters: semesters,
        },
      ],
    };
    console.log(tempResponse);
    await axios({
      method: "POST",
      url: tempAPI,
      data: tempResponse,
    })
      .then((res) => {
        console.log("result:", res.data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const nextYear = () => {
    if (yearIndex + 1 < years.length) {
      setYearIndex(yearIndex + 1);
    }
  };

  const prevYear = () => {
    if (yearIndex - 1 >= 0) {
      setYearIndex(yearIndex - 1);
    }
  };

  return (
    <div>
      <Stack
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
            length={425}
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
      </SpeedDial>
    </div>
  );
}
