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
} from "@mui/material";

export default function Home(props) {
  const history = useHistory();

  return (
    <div style={{ margin: 50 }}>
      <div style={{ padding: 10 }}>
        <CurriculumCarrousel
          {...props}
          title={"Recent"}
          loading={false}
          curriculums={DummyData}
        />
      </div>
      <div style={{ padding: 10 }}>
        <CurriculumCarrousel
          {...props}
          title={"Recent"}
          loading={false}
          curriculums={DummyData}
        />
      </div>
    </div>
  );
}
