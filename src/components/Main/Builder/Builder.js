import { React, useState, useEffect } from "react";
import List from "./List";
//import Cookies from "universal-cookie/es6";
//import axios from "axios";
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
import { getGraph, saveGraph } from "../../../API";
//import { Cookie } from "@mui/icons-material";

export default function Builder(props) {
  //const cookies = new Cookies();
  const years = props.lists["year_list"]["year_ids"];
  const [yearIndex, setYearIndex] = useState(years.length - 1);
  const actions = [
    { icon: <SaveIcon onClick={() => saveGraph(props.Session, props.lists, years)} />, name: "Save" },
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
    getGraph(props.Session, "Test_Curriculum_4_54");
  });

  // const getGraph = async () => {
  //   await axios({
  //     method: "GET",
  //     url: tempAPI + "currGraph/curr",
  //     params: {
  //       name: "Test_Curriculum_4_54",
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.data);
  //     });
  // };

  // const saveGraph = async () => {
  //   let semesters = [];
  //   await axios({
  //     method: "POST",
  //     url: props.API + "me",
  //     data: {
  //       session_id: sessionID,
  //     },
  //   })
  //     .then((res) => {
  //       years.forEach((year) => {
  //         props.lists[year]["semester_ids"].forEach((semester) => {
  //           semesters.push({
  //             ...props.lists[semester],
  //             id:
  //               res.data["degree_id"] +
  //               "_" +
  //               res.data["user_id"] +
  //               "_" +
  //               props.lists[semester].id,
  //           });
  //         });
  //       });
  //       let tempResponse = {
  //         graph: [
  //           {
  //             name:
  //               "Test_Curriculum_" +
  //               res.data["degree_id"] +
  //               "_" +
  //               res.data["user_id"],
  //             // program: res.data["degree_id"],
  //             program: 4,
  //             user: res.data["user_id"],
  //             semesters: semesters,
  //           },
  //         ],
  //       };
  //       console.log(tempResponse);
  //       axios({
  //         method: "POST",
  //         url: tempAPI + "currGraph/student",
  //         data: tempResponse,
  //       })
  //         .then((res) => {
  //           console.log("result:", res.data);
  //         })
  //         .catch((error) => {
  //           console.log("error:", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error.data);
  //     });
  // };

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
      </SpeedDial>
    </div>
  );
}
