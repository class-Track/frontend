import React, { useState, useEffect } from "react";
import List from "../../Builder/List";
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
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
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
  Card,
  MobileStepper,
  useTheme,
} from "@mui/material";
import { Cookie } from "@mui/icons-material";

export default function StepFour(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const theme = useTheme();
  const [currYear, setCurrYear] = useState(2022);
  const [currCategory, setCurrCategory] = useState("LIBR");
  const [activeStep, setActiveStep] = React.useState(0);
  useEffect(() => {}, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div style={{ margin: 20 }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <List
          key={0}
          ref={props.builderLists}
          list={props.builderLists[currCategory]}
          courses={props.builderLists[currCategory]["courses"]}
          title={props.builderLists[currCategory]["name"]}
          subtitle={props.builderLists[currCategory]["id"]}
          length={450}
          footer={true}
        />
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        {props.builderLists[currYear]["semester_ids"].map((semester_id, i) => (
          <List
            key={i + 1}
            ref={props.builderLists}
            list={props.builderLists[semester_id]}
            courses={props.builderLists[semester_id]["courses"]}
            title={props.builderLists[semester_id]["name"]}
            subtitle={props.builderLists[semester_id]["year"]}
            length={450}
          />
        ))}
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </Stack>
    </div>
  );
}
