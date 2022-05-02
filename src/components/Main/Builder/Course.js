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

        props.loadReqs(props.course.classification, filtered_courses);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
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
              justifyContent="space-between"
              alignItems="space-between"
            >
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid item>{props.course.classification}</Grid>
                  <Grid item>
                    <Grid container direction="row" spacing={1}>
                      {props.builderLists[props.course.classification].prereqs
                        .length ? (
                        props.builderLists[
                          props.course.classification
                        ].prereqs.map((course, i) => (
                          <Grid
                            item
                            style={{ fontSize: "small", color: "red" }}
                          >
                            {course.classification}
                          </Grid>
                        ))
                      ) : (
                        <div />
                      )}
                      {props.builderLists[props.course.classification].coreqs
                        .length ? (
                        props.builderLists[
                          props.course.classification
                        ].coreqs.map((course, i) => (
                          <Grid
                            item
                            style={{ fontSize: "small", color: "orange" }}
                          >
                            {course.classification}
                          </Grid>
                        ))
                      ) : (
                        <div />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton
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
          </Card>
        </div>
      )}
    </Draggable>
  );
}
