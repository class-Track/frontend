import { Draggable } from "react-beautiful-dnd";
import { Card, Grid } from "@mui/material";
import CourseCard from "./CourseCard";

const card_style = {
  backgroundColor: "#FBFBF8",
  // width: 275,
  margin: 10,
  padding: 10,
};

export default function Course(props) {
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
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>{props.course.classification}</Grid>
              <Grid item>{props.course.name}</Grid>
            </Grid>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
