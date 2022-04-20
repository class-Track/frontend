import Course from "./Course";
import { Droppable } from "react-beautiful-dnd";
import { Grid, Card, CardHeader, CardContent, Divider } from "@mui/material";

const list_style = {
  overflowY: "auto",
  width: 300,
  minHeight: 325,
  maxHeight: 325,
};

const card_style = {
  backgroundColor: "#FBFBF8",
};

export default function List(props) {
  return (
    <div>
      <Card style={card_style} elevation={6}>
        <CardHeader title={props.title} subheader={props.subtitle} />
        {/* <Divider /> */}
        <CardContent>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Droppable droppableId={props.list.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ ...list_style, minHeight: props.length }}
                >
                  {props.courses.map((course, index) => (
                    <Grid item key={course.id}>
                      <Course
                        code={course.code}
                        id={course.id}
                        name={course.name}
                        index={index}
                      />
                    </Grid>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
