import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import AdminCourses from "./AdminCourses";
import AdminDepartments from "./AdminDepartments";
import AdminDegrees from "./AdminDegrees";
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Autocomplete,
} from "@mui/material";
import AdminCategories from "./AdminCategories";

export default function Admin(props) {
  const tempAPI = "https://classtrack-backend.herokuapp.com/classTrack/";
  const [index, setIndex] = useState(0);

  const createCourses = async () => {
    await axios({
      method: "POST",
      url: tempAPI + "course",
      data: {
        session_id: props.Session,
        department_id: 79,
        name: "Biology " + index,
        classification: "BIOL" + (3000 + index).toString(),
      },
    })
      .then((res) => {
        console.log(res.data);
        setIndex((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button onClick={() => createCourses()} disabled>index: {index}</Button>
    </div>
  );
}
