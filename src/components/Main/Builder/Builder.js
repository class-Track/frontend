import { React, useState, useEffect } from "react";
import List from "./List";
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
import StepFour from "../Admin/AdminBuilder/StepFour";
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
  Typography,
  TextField,
} from "@mui/material";
import { Cookie } from "@mui/icons-material";

export default function Builder(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const [info, setInfo] = useState({});
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [loadCurriculum, setLoadCurriculum] = useState(false);
  const actions = [
    {
      icon: <SaveIcon onClick={() => console.log("pressed save")} />,
      name: "Save",
    },
    {
      icon: <DeleteIcon onClick={() => console.log("pressed delete")} />,
      name: "Delete",
    },
    {
      icon: <ShareIcon onClick={() => console.log("pressed share")} />,
      name: "Share",
    },
  ];

  useEffect(() => {
    if (props.id) {
      getCurriculum();
    }
  }, []);

  useEffect(() => {
    if (Object.keys(props.lists).length > 0) {
      getIdentifier();
    }
  }, [props.lists]);

  useEffect(() => {
    if (Object.keys(props.lists).length > 0) {
      loadNewLists();
    }
  }, [identifier, props.lists]);

  const getCurriculum = async () => {
    console.log(props.id);
    await axios({
      method: "GET",
      url: tempAPI + "currGraph",
      params: {
        id: props.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        props.setLists(res.data);
        setLoadCurriculum(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createSemesters = (degree_id, user_id, year) => {
    return [
      degree_id + "_" + year + "_spring",
      degree_id + "_" + year + "_summer",
      degree_id + "_" + year + "_ext_summer",
      degree_id + "_" + year + "_fall",
    ];
  };

  const getSemesterName = (index) => {
    switch (index) {
      case 0:
        return "Spring";
        break;
      case 1:
        return "Summer";
        break;
      case 2:
        return "Extended Summer";
        break;
      case 3:
        return "Fall";
        break;
      default:
        return undefined;
    }
  };

  const getIdentifier = async () => {
    await axios({
      method: "GET",
      url: tempAPI + "curriculums/newID",
      params: {
        deptCode: props.lists["deptCode"],
        user_id: props.User["user_id"],
      },
    })
      .then((res) => {
        console.log(res.data);
        setIdentifier(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const loadNewLists = () => {
    let new_category_list = {
      ...props.lists["category_list"],
      category_ids: props.lists["category_list"]["category_ids"].map(
        (category_id) => {
          return identifier + "_" + category_id;
        }
      ),
    };

    let new_categories = {};
    let new_courses = {};
    props.lists["category_list"]["category_ids"].forEach((category_id) => {
      new_categories[identifier + "_" + category_id] = {
        ...props.lists[category_id],
        classification: identifier + "_" + category_id,
        id: identifier + "_" + category_id,
      };
      props.lists[category_id]["courses"].forEach((course) => {
        new_courses[course["id"]] = {
          ...props.lists[course["id"]],
          category: identifier + "_" + category_id,
        };
      });
    });

    let new_year_list = {};
    let new_semesters = {};
    props.lists["year_list"]["year_ids"].forEach((year) => {
      let new_semester_ids = [];
      props.lists[year]["semester_ids"].forEach((semester_id) => {
        new_semester_ids.push(identifier + "_" + semester_id);
        new_semesters[identifier + "_" + semester_id] = {
          ...props.lists[semester_id],
          id: identifier + "_" + semester_id,
        };
        props.lists[semester_id]["courses"].forEach((course) => {
          new_courses[course["id"]] = {
            ...props.lists[course["id"]],
            category: identifier + "_" + props.lists[course["id"]]["category"],
          };
        });
      });
      new_year_list[year] = {
        ...props.lists[year],
        semester_ids: new_semester_ids,
      };
    });

    console.log({
      credits: props.lists["credits"],
      curriculum_sequence: identifier,
      degree_id: props.lists["degree_id"],
      degree_name: props.lists["degree_name"],
      department_id: props.lists["department_id"],
      department_name: props.lists["department_name"],
      deptCode: props.lists["deptCode"],
      length: props.lists["length"],
      name: name,
      category_list: new_category_list,
      year_list: new_year_list,
      course_list: props.lists["course_list"],
      ...new_categories,
      ...new_semesters,
      ...new_courses,
    });
  };

  return (
    <div style={{ margin: 30 }}>
      {loadCurriculum ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid
            xs={12}
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="Name"
                variant="standard"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={() => console.log("clicked save button")}>
                <SaveAsIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => console.log("clicked delete button")}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <StepFour
              {...props}
              info={info}
              user={props.User}
              session={props.Session}
              isDragDisabled={false}
              createSemesters={createSemesters}
              getSemesterName={getSemesterName}
            />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      {/* <Fab
        size="large"
        aria-label="add"
        sx={{ position: "absolute", bottom: 16, right: 96 }}
      >
        <DeleteIcon />
      </Fab>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SaveAsIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial> */}
    </div>
  );
}
