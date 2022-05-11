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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Card style={card_style} elevation={6}>
        <CardHeader
          title={props.title}
          subheader={props.subtitle}
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
              {props.courses.map((course, index) => (
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
