import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CurriculumCarrousel from "../Curriculum/CurriculumCarrousel";
import DummyData from "../../../data/DummyData.json";
import {
  Stack,
  Grid,
  IconButton,
  Button,
  Icon,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Fab,
  Tooltip,
} from "@mui/material";
import { Add } from "@mui/icons-material";

function NewCurriculumButton(props) {
  //TODO Have this thing do something. Do we show a popup asking for name/department/other details or do we just link to a completely blank builder (?)
  return (
    <Tooltip title="Create a new curriculum">
      <Fab size="small" color="primary">
        {" "}
        <Add />{" "}
      </Fab>
    </Tooltip>
  );
}

export default function Home(props) {
  const history = useHistory();

  return (
    <div style={{ margin: 50 }}>
      {props.User ? (
        <div>
          <div style={{ padding: 10 }}>
            <CurriculumCarrousel
              {...props}
              title={"Your Curriculums"}
              loading={false}
              curriculums={DummyData}
              headerButton={NewCurriculumButton}
              editButtons={true}
            />
          </div>
          <div style={{ padding: 10 }}>
            <CurriculumCarrousel
              {...props}
              title={"Drafts"}
              loading={false}
              curriculums={DummyData}
              editButtons={true}
            />
          </div>
          {props.User.isAdmin ? (
            <div />
          ) : (
            <div style={{ padding: 10 }}>
              <CurriculumCarrousel
                {...props}
                title={"Recomended"}
                loading={false}
                curriculums={DummyData}
              />
            </div>
          )}
        </div>
      ) : (
        <p>loading user...</p>
      )}
    </div>
  );
}
