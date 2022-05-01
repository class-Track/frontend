import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
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
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@mui/material";

export default function AdminBuilder() {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const steps = ["Step One", "Step Two", "Step Three"];
  const [courses, setCourses] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [categories, setCategories] = useState({});
  const [categoryKeys, setCategoryKeys] = useState([]);
  const [categoryLists, setCategoryLists] = useState({});
  const [info, setInfo] = useState({
    degree_id: "",
    degree_name: "",
    department_id: "",
    department_name: "",
    curriculumSequence: "",
    length: "",
    credits: "",
  });

  useEffect(() => {
    if (Object.keys(categories).map((category) => category).length) {
      loadCategoryLists();
      getCourses();
    }
  }, [categories]);

  const getCourses = async () => {
    await axios({
      method: "GET",
      url: tempAPI + "courses",
    })
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const loadCategoryLists = () => {
    setCategoryKeys(Object.keys(categories).map((category) => category));
    let tempCategories = {};
    Object.keys(categories).map((categoryKey, i) => {
      tempCategories[categoryKey] = [];
    });
    setCategoryLists(tempCategories);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const stepper = (
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );

  const navigation = (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
      <Button disabled={activeStep === steps.length} onClick={handleNext}>
        Next
      </Button>
    </Box>
  );

  return (
    <div style={{ margin: 50 }}>
      {stepper}
      {activeStep === 0 ? <StepOne info={info} setInfo={setInfo} /> : <div />}
      {activeStep === 1 ? (
        <StepTwo categories={categories} setCategories={setCategories} />
      ) : (
        <div />
      )}
      {activeStep === 2 &&
      Object.keys(categories).map((category) => category).length ? (
        <StepThree
          categories={categories}
          categoryKeys={categoryKeys}
          categoryLists={categoryLists}
          setCategoryLists={setCategoryLists}
          courses={courses}
          setCourses={setCourses}
        />
      ) : (
        <div />
      )}
      {navigation}
    </div>
  );
}
