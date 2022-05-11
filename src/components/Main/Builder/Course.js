import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Grid, CardActionArea, IconButton, Divider } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import CourseCard from "./CourseCard";
import axios from "axios";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const card_style = {
  backgroundColor: "#FBFBF8",
  // width: 275,
  margin: 10,
  padding: 10,
};

export default function Course(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";

  const getCourses = async () => {
    return await axios({
      method: "GET",
      url: tempAPI + "courses",
    })
      .then((res) => {
        let filtered_courses = res.data.filter((object) => {
          return object.classification !== props.course.classification;
        });
        let updated_courses = [];
        filtered_courses.forEach((course) => {
          updated_courses.push({
            ...course,
            id: course.classification,
          });
        });
        props.loadReqs(props.course.classification, updated_courses);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Draggable
      key={props.id}
      draggableId={props.id}
      index={props.index}
      isDragDisabled={props.isDragDisabled}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* <CourseCard {...props} /> */}
          <Card style={card_style}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid
                key={"course"}
                xs={9.5}
                item
                // style={{ background: "red" }}
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid key={"classification"} item>
                  {props.course.classification}
                </Grid>
                <Grid key={"reqs"} item>
                  <Grid container direction="row" spacing={0.5}>
                    {props.lists[props.course.classification].prereqs.length ? (
                      props.lists[props.course.classification].prereqs.map(
                        (course, i) => (
                          <Grid
                            key={"prereqs" + i}
                            item
                            style={{ fontSize: "small", color: "red" }}
                          >
                            {course.classification}
                          </Grid>
                        )
                      )
                    ) : (
                      <></>
                    )}
                    {props.lists[props.course.classification].coreqs.length ? (
                      props.lists[props.course.classification].coreqs.map(
                        (course, i) => (
                          <Grid
                            key={"coreqs" + i}
                            item
                            style={{ fontSize: "small", color: "orange" }}
                          >
                            {course.classification}
                          </Grid>
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                key={"reqs_button"}
                xs={2.5}
                item
                // style={{ background: "green" }}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <IconButton
                    disabled={props.isDragDisabled}
                    onClick={() => {
                      console.log(
                        "clicked course card",
                        props.course.classification
                      );
                      getCourses();
                    }}
                  >
                    <ErrorOutline />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
