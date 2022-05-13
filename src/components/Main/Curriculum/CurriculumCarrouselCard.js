import { Delete, Edit, Star } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  IconButton,
} from "@mui/material";
import { fontSize } from "@mui/system";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function CurriculumCarrouselCard(props) {
  const history = useHistory();
  const [highlight, setHighlight] = useState(false);

  let item = props.item;

  const viewCurriculum = () => {
    props.setUseUpdate(props.update ? props.update : false);
    history.push({
      pathname: "/Curriculum/" + props.item.curriculum_sequence,
      // state: {
      //   isDraft: props.isDraft,
      //   update: props.update,
      // },
    });
  };

  return (
    <Card style={highlight ? { background: "lightgray" } : {}}>
      <CardContent
        onClick={() => {}}
        onMouseEnter={() => {
          setHighlight(true);
        }}
        onMouseLeave={() => {
          setHighlight(false);
        }}
      >
        <table width="100%">
          <tr>
            <td>
              <table width="100%">
                <tr>
                  {/* Maybe implement a cutoff function so that we keep the item name to just one line */}
                  <td>
                    <b>{item.name}</b>
                  </td>
                  {/* Replace the following with the actual thing or move this elsewhere pls */}
                  <td width={"1"}>
                    {" "}
                    <Star />
                  </td>
                  <td width={"1"}> {item.rating} </td>
                </tr>
              </table>
              <Divider style={{ marginBottom: "10px" }} />
              {/* I think the course/credit load is the most important thing. Optionally both of these should be displayed but idk. We can't be that information dense */}
              <div>
                {item.course_count} courses ({item.credits} credits)
                <br />
                {item.semesters} semesters
              </div>
              <div style={{ fontSize: ".7em", marginTop: "1em" }}>
                By {item.user_name}
                <br />
                {item.degree_name}
              </div>
            </td>
          </tr>
        </table>
      </CardContent>
      {props.editButtons ? (
        <CardActions>
          <table width={"100%"}>
            <tr>
              <td>
                <CardButtonRow {...props} viewCurriculum={viewCurriculum} />
              </td>
            </tr>
          </table>
        </CardActions>
      ) : (
        <></>
      )}
    </Card>
  );
}

function CardButtonRow(props) {
  let item = props.item;
  return (
    <table width="100%">
      <tr>
        <td></td>
        <td width={1}>
          <IconButton
            onClick={() => {
              console.log(item.curriculum_sequence);
              props.viewCurriculum();
            }}
          >
            <Edit />
          </IconButton>
        </td>
        <td width={1}>
          <IconButton onClick={() => {}}>
            <Delete />
          </IconButton>
        </td>
      </tr>
    </table>
  );
}
