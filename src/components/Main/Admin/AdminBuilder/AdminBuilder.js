import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
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

export default function AdminBuilder(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
  const [courses, setCourses] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [curriculum, setCurriculum] = useState({});
  const [info, setInfo] = useState({
    degree_id: "",
    degree_name: "",
    department_id: "",
    department_name: "",
    curriculumSequence: "",
    length: "",
    credits: "",
  });
  const [categories, setCategories] = useState({});
  const [categoryKeys, setCategoryKeys] = useState([]);
  const [categoryLists, setCategoryLists] = useState({});
  const [builderLists, setBuilderLists] = useState({});

  useEffect(() => {
    console.log(curriculum);
  }, [curriculum]);

  useEffect(() => {
    if (!emptyObject(categories)) {
      loadCategoryLists();
      getCourses();
    }
  }, [categories]);

  useEffect(() => {
    if (totalCourses()) {
      loadBuilderLists();
    }
  }, [categoryLists]);

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

  const loadBuilderLists = () => {
    let year_list = {
      id: "year_list",
      name: "Year List",
      year_ids: [new Date().getFullYear().toString()],
    };

    let category_list = {
      id: "category_list",
      name: "Category List",
      category_ids: [...categoryKeys],
    };

    let temp_categories = {};
    let temp_courses = {};
    categoryKeys.forEach((key, i) => {
      categoryLists[key].forEach((course, i) => {
        temp_courses[course["classification"]] = {
          id: course["classification"],
          course_id: course["course_id"],
          prereqs: [],
          coreqs: [],
          category: key,
        };
      });
      temp_categories[key] = {
        id: key,
        name: categories[key]["name"],
        courses: categoryLists[key].map((course, i) => ({
          id: course["classification"],
          course_id: course["course_id"],
          department_id: course["department_id"],
          name: course["name"],
          classification: course["classification"],
        })),
      };
    });

    let temp_years = {};
    let temp_semesters = {};
    year_list["year_ids"].forEach((year, i) => {
      temp_years[year] = {
        id: year,
        name: year,
        semester_ids: createSemesters(
          info["degree_id"],
          props.User["user_id"],
          year
        ),
      };
      temp_years[year]["semester_ids"].forEach((semester, j) => {
        temp_semesters[semester] = {
          id: semester,
          name: getSemesterName(j),
          year: year,
          courses: [],
        };
      });
    });

    let newBuilderList = {
      year_list: year_list,
      category_list: category_list,
      ...temp_categories,
      ...temp_courses,
      ...temp_years,
      ...temp_semesters,
    };

    console.log(newBuilderList);
    props.setBuilderLists(newBuilderList);
  };

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      console.log("end of list");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const emptyObject = (object) => {
    return !Object.keys(object).map((category) => category).length;
  };

  const totalCourses = () => {
    let count = 0;
    categoryKeys.forEach((key, i) => {
      count += categoryLists[key].length;
    });
    console.log(count);
    return count;
  };

  const createSemesters = (degree_id, user_id, year) => {
    return [
      degree_id + "_" + year + "_spring",
      degree_id + "_" + year + "_fall",
      degree_id + "_" + year + "_summer",
      degree_id + "_" + year + "_ext_summer",
    ];
  };

  const getSemesterName = (index) => {
    switch (index) {
      case 0:
        return "Spring";
        break;
      case 1:
        return "Fall";
        break;
      case 2:
        return "Summer";
        break;
      case 3:
        return "Extended Summer";
        break;
      default:
        return undefined;
    }
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
      <Button
        disabled={
          (activeStep === 1 && emptyObject(categories)) ||
          (activeStep === 2 && !totalCourses())
        }
        onClick={handleNext}
      >
        {activeStep < steps.length ? "Next" : "Finish"}
      </Button>
    </Box>
  );

  const components = [
    <StepOne
      info={info}
      setInfo={setInfo}
      curriculum={curriculum}
      setCurriculum={setCurriculum}
      session={props.Session}
      user={props.User}
    />,
    <StepTwo
      categories={categories}
      setCategories={setCategories}
      courses={courses}
    />,
    <StepThree
      categories={categories}
      categoryKeys={categoryKeys}
      categoryLists={categoryLists}
      setCategoryLists={setCategoryLists}
      courses={courses}
      setCourses={setCourses}
    />,
    <StepFour
      {...props}
      // category_ids={props.builderLists["category_list"]["category_ids"]}
      // year_ids={props.builderLists["year_list"]["year_ids"]}
      info={info}
      user={props.User}
      session={props.Session}
    />,
  ];

  return (
    <div style={{ margin: 50 }}>
      {stepper}
      {components[activeStep]}
      {navigation}
    </div>
  );
}
