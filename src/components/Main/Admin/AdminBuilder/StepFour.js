import React, { useState, useEffect } from "react";
import List from "../../Builder/List";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  Stack,
  IconButton,
  Button,
  Icon,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Fab,
  Grid,
  Card,
  MobileStepper,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  TextField,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import { Cookie } from "@mui/icons-material";

const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

export default function StepFour(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const theme = useTheme();
  const [currYear, setCurrYear] = useState(2022);
  const [currCategory, setCurrCategory] = useState("LIBR");
  const [indexYear, setIndexYear] = useState(0);
  const [indexCategory, setIndexCategory] = useState(0);
  const [addOpenYear, setAddOpenYear] = useState(false);
  const [addOpenReqs, setAddOpenReqs] = useState(false);
  const [prereqs, setPrereqs] = useState([]);
  const [coreqs, setCoreqs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [errorAddReqs, setErrorAddReqs] = useState(false);
  const addMessageReqs =
    "Enter the information for the course requirements below";
  const errorMessageReqs = "Invalid input!";

  const resetReqsDialogs = () => {
    setErrorAddReqs(false);
    setAddOpenReqs(false);
    setPrereqs([]);
    setCoreqs([]);
  };

  const nextYear = () => {
    setIndexYear((prevActiveStep) => prevActiveStep + 1);
  };

  const nextCategory = () => {
    setIndexCategory((prevActiveStep) => prevActiveStep + 1);
  };

  const prevYear = () => {
    setIndexYear((prevActiveStep) => prevActiveStep - 1);
  };

  const prevCategory = () => {
    setIndexCategory((prevActiveStep) => prevActiveStep - 1);
  };

  const loadReqs = (id, courses) => {
    setCourse(id);
    setCourses(courses);
    setAddOpenReqs(true);
  };

  const addReqs = () => {
    let newCourse = {};
    newCourse = {
      ...props.lists[course],
      prereqs: prereqs,
      coreqs: coreqs,
    };
    props.setBuilderLists({
      ...props.lists,
      [course]: newCourse,
    });
    resetReqsDialogs();
  };

  const addYear = (index) => {
    let newYear = (
      parseInt(props.lists["year_list"]["year_ids"][index]) + 1
    ).toString();
    let newYearList = {
      ...props.lists["year_list"],
      year_ids: [...props.lists["year_list"]["year_ids"], newYear],
    };
    let temp_years = {};
    temp_years[newYear] = {
      id: newYear,
      name: newYear,
      semester_ids: props.createSemesters(
        props.info["degree_id"],
        props.User["user_id"],
        newYear
      ),
    };
    console.log(temp_years);
    let temp_semesters = {};
    temp_years[newYear]["semester_ids"].forEach((semester_id, j) => {
      temp_semesters[semester_id] = {
        id: semester_id,
        name: props.getSemesterName(j),
        year: newYear,
        courses: [],
      };
    });
    props.setBuilderLists({
      ...props.lists,
      ...temp_semesters,
      ...temp_years,
      year_list: newYearList,
    });
    nextYear();
    setAddOpenYear(false);
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const navigation = (
    <MobileStepper
      style={{ background: "#FBFBF8" }}
      variant="dots"
      steps={props.lists["category_list"]["category_ids"].length}
      position="static"
      activeStep={indexCategory}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button
          size="small"
          onClick={nextCategory}
          disabled={
            indexCategory ===
            props.lists["category_list"]["category_ids"].length - 1
          }
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button
          size="small"
          onClick={prevCategory}
          disabled={indexCategory === 0}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </Button>
      }
    />
  );

  const addYearDialog = (
    <Dialog
      open={addOpenYear}
      onClose={() => {
        setAddOpenYear(false);
      }}
    >
      <DialogTitle>Add Year</DialogTitle>
      <DialogContent style={{ minWidth: 500 }}>
        <DialogContentText>
          Add the year{" "}
          {parseInt(props.lists["year_list"]["year_ids"][indexYear]) + 1}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            console.log("closing add dialog");
            setAddOpenYear(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log(
              "adding next year",
              parseInt(props.lists["year_list"]["year_ids"][indexYear]) + 1
            );
            addYear(indexYear);
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  const addReqsDialog = (
    <Dialog
      open={addOpenReqs}
      onClose={() => {
        setAddOpenReqs(false);
      }}
    >
      <DialogTitle>Add Requirements</DialogTitle>
      <DialogContent style={{ minWidth: 500 }}>
        <DialogContentText color={errorAddReqs ? "red" : "gray"}>
          {errorAddReqs ? errorMessageReqs : addMessageReqs}
        </DialogContentText>
        <DialogContentText>{course}</DialogContentText>
        <Stack style={{ margin: 10, padding: 10 }} spacing={2}>
          <Autocomplete
            multiple
            limitTags={2}
            id="checkboxes-tags-1"
            options={courses}
            disableCloseOnSelect
            getOptionLabel={(option) => option.classification}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.classification}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Pre-Requisites"
                placeholder="Course"
              />
            )}
            onChange={(e, value) => {
              console.log(value);
              setPrereqs(value);
            }}
          />
          <Autocomplete
            multiple
            limitTags={2}
            id="checkboxes-tags-1"
            options={courses}
            disableCloseOnSelect
            getOptionLabel={(option) => option.classification}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.classification}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Co-Requisites"
                placeholder="Course"
              />
            )}
            onChange={(e, value) => {
              console.log(value);
              setCoreqs(value);
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            console.log("closing add dialog");
            resetReqsDialogs();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("adding requirements");
            if (
              (prereqs.length || coreqs.length) &&
              !intersection(prereqs, coreqs).length
            ) {
              setErrorAddReqs(false);
              addReqs();
            } else {
              console.log("ran into error");
              setErrorAddReqs(true);
            }
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div style={{ margin: 20 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid key={"categories"} xs={2} item>
          <List
            key={0}
            // ref={props.lists}
            list={
              props.lists[
                props.lists["category_list"]["category_ids"][indexCategory]
              ]
            }
            courses={
              props.lists[
                props.lists["category_list"]["category_ids"][indexCategory]
              ]["courses"]
            }
            title={
              props.lists[
                props.lists["category_list"]["category_ids"][indexCategory]
              ]["name"]
            }
            subtitle={
              props.lists[
                props.lists["category_list"]["category_ids"][indexCategory]
              ]["id"]
            }
            length={450}
            footer={navigation}
            loadReqs={loadReqs}
            {...props}
          />
        </Grid>
        <Grid key={"left_button"} xs={0.5} item>
          <IconButton
            disabled={indexYear === 0}
            onClick={() => {
              prevYear();
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid key={"semesters"} xs={9} item>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {props.lists[props.lists["year_list"]["year_ids"][indexYear]][
              "semester_ids"
            ].map((semester_id, i) => (
              <Grid key={420 + i} xs={3} item>
                <List
                  key={i + 1}
                  // ref={props.lists}
                  list={props.lists[semester_id]}
                  courses={props.lists[semester_id]["courses"]}
                  title={props.lists[semester_id]["name"]}
                  subtitle={props.lists[semester_id]["year"]}
                  length={450}
                  loadReqs={loadReqs}
                  {...props}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid key={"right_button"} xs={0.5} item>
          <IconButton
            onClick={() => {
              if (
                indexYear ===
                props.lists["year_list"]["year_ids"].length - 1
              ) {
                setAddOpenYear(true);
              } else {
                nextYear();
              }
            }}
          >
            {indexYear === props.lists["year_list"]["year_ids"].length - 1 ? (
              <AddIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Grid>
      </Grid>
      {addYearDialog}
      {addReqsDialog}
    </div>
  );
}
