import React, { useState, useEffect } from "react";
import Course from "./Course";
import { Droppable } from "react-beautiful-dnd";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  CardActions,
  MobileStepper,
  Button,
  useTheme,
  TextField,
} from "@mui/material";

const list_style = {
  overflowY: "auto",
  // width: 300,
  minHeight: 325,
  maxHeight: 325,
};

const card_style = {
  backgroundColor: "#F2EECB",
};

export default function List(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [filter, setFilter] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const searchField = (
    <TextField
      fullWidth
      label="Search..."
      variant="standard"
      value={filter}
      onChange={(e) => {
        setFilter(e.target.value);
        props.setFilter(e.target.value);
      }}
    />
  );

  return (
    <div>
      <Card style={card_style} elevation={6}>
        <CardHeader
          title={props.title}
          subheader={props.isCategory ? searchField : props.subtitle}
          style={{ backgroundColor: "#FBFBF8" }}
        />
        <Divider />
        <Droppable droppableId={props.list.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ ...list_style, minHeight: props.length }}
            >
              {props.courses
                .filter(
                  (object) =>
                    object["classification"].toLowerCase().includes(filter) ||
                    object["classification"].includes(filter) ||
                    filter === ""
                )
                .map((course, index) => (
                  <Course
                    {...props}
                    course={course}
                    id={course.id}
                    index={index}
                    key={course.id}
                    disableDrag={props.disableDrag}
                  />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {props.footer ? props.footer : <div />}
      </Card>
    </div>
  );
}
