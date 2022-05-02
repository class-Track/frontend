import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import {
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  Autocomplete,
} from "@mui/material";

export default function StepOne(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const loading = "loading...";
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    getDegrees();
  }, []);

  const getDegrees = async () => {
    await axios({
      method: "GET",
      url: tempAPI + "degrees",
    })
      .then((res) => {
        console.log(res.data);
        setDegrees(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const getDepartment = async (department_id) => {
    return await axios({
      method: "GET",
      url: tempAPI + "department/" + department_id,
    })
      .then((res) => res.data)
      .catch((err) => err);
  };

  const loadInfo = async (
    degree_id,
    degree_name,
    department_id,
    curriculum_sequence,
    length,
    credits
  ) => {
    props.setInfo({
      degree_id: loading,
      degree_name: loading,
      department_id: loading,
      department_name: loading,
      curriculumSequence: loading,
      length: loading,
      credits: loading,
    });
    getDepartment(department_id)
      .then((res) => {
        props.setInfo({
          degree_id: degree_id,
          degree_name: degree_name,
          department_id: department_id,
          department_name: res["name"],
          curriculumSequence: curriculum_sequence,
          length: length,
          credits: credits,
        });
        props.setCurriculum({
          name: curriculum_sequence,
          user_id: props.user["user_id"],
          degree_id: degree_id,
          degree_name: degree_name,
          department_id: department_id,
          department_name: res["name"],
          deptCode: res["classification"],
          curriculum_sequence: curriculum_sequence,
          length: length,
          credits: credits,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetInfo = () => {
    props.setInfo({
      degree_id: "",
      degree_name: "",
      department_id: "",
      department_name: "",
      curriculumSequence: "",
      length: "",
      credits: "",
    });
  };

  return (
    <div style={{ margin: 20 }}>
      {degrees ? (
        <Stack style={{ margin: 10, padding: 10 }} spacing={2}>
          <Autocomplete
            options={degrees}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Select Degree" />
            )}
            onChange={(e, value) => {
              console.log(value);
              if (value) {
                loadInfo(
                  value.degree_id,
                  value.name,
                  value.department_id,
                  value.curriculum_sequence,
                  value.length,
                  value.credits
                );
              } else {
                resetInfo();
              }
            }}
          />
          <TextField
            label="Department Name"
            disabled
            value={props.info["department_name"]}
          />
          <TextField
            label="Curriculum Sequence"
            disabled
            value={props.info["curriculumSequence"]}
          />
          <TextField
            label="Degree Length in Years"
            disabled
            value={props.info["length"]}
          />
          <TextField
            label="Total Credits"
            disabled
            value={props.info["credits"]}
          />
        </Stack>
      ) : (
        <p>loading degrees...</p>
      )}
    </div>
  );
}
