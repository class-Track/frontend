import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import CRUDTable from "./CRUDTable";
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
  Snackbar,
  Alert,
  Autocomplete,
} from "@mui/material";

export default function AdminCourses(props) {
  const tempAPI = "https://classtrack-backend.herokuapp.com/classTrack/";
  const [courses, setCourses] = useState();
  const [departments, setDepartments] = useState();
  const [name, setName] = useState("");
  const [credits, setCredits] = useState("");
  const [classification, setClassification] = useState("");
  const [id, setID] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [errorAdd, setErrorAdd] = useState(false);
  const [errorEdit, setErrorEdit] = useState(false);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const addMessage = "Enter the information for this new course below";
  const editMessage = "Enter the new information for this course below";
  const deleteMessage = "Deleting the following course";
  const errorMessage = "Invalid input!";
  const columns = [
    { id: "index", label: "Index", minWidth: 100 },
    { id: "id", label: "ID", minWidth: 100 },
    { id: "name", label: "Course Name", minWidth: 200 },
    { id: "credits", label: "Course Credits", minWidth: 100 },
    { id: "department_id", label: "Department ID", minWidth: 100 },
    { id: "classification", label: "Classification", minWidth: 100 },
  ];

  useEffect(() => {
    getCourses();
    getDepartments();
  }, []);

  const handleAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false);
  };

  const createData = (
    index,
    id,
    name,
    credits,
    department_id,
    classification
  ) => {
    return { index, id, name, credits, department_id, classification };
  };

  const addCourse = async (
    name,
    credits,
    department_id,
    classification,
    session_id
  ) => {
    await axios({
      method: "POST",
      url: tempAPI + "course",
      data: {
        session_id: session_id,
        department_id: department_id,
        name: name,
        credits: parseInt(credits),
        classification: classification,
      },
    })
      .then((res) => {
        if(res.status === 200) {
          console.log(res.data);
          setAlert(true);
          setSuccess(true);
        }
        resetDialogs();
      })
      .catch((err) => {
        console.log(err.data);
        resetDialogs();
        setAlert(true);
        setSuccess(false);
      });
  };

  const getCourses = async () => {
    await axios({
      method: "GET",
      url: tempAPI + "courses",
    })
      .then((res) => {
        console.log(res.data);
        let tempList = [];
        res.data.forEach((value, i) => {
          tempList.push(
            createData(
              i,
              value["course_id"],
              value["name"],
              value["credits"],
              value["department_id"],
              value["classification"]
            )
          );
        });
        console.log("tempList:", tempList);
        setAddOpen(false);
        setEditOpen(false);
        setDelOpen(false);
        setCourses(tempList);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const getDepartments = async () => {
    await axios({
      method: "GET",
      url: tempAPI + "departments",
    })
      .then((res) => {
        console.log(res.data);
        setDepartments(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const editCourse = async (
    course_id,
    name,
    credits,
    department_id,
    classification,
    session_id
  ) => {
    await axios({
      method: "PUT",
      url: tempAPI + "course/update/" + course_id,
      data: {
        name: name,
        credits: parseInt(credits),
        department_id: department_id,
        classification: classification,
        session_id: session_id,
      },
    })
      .then((res) => {
        console.log(res.data);
        resetDialogs();
      })
      .catch((err) => {
        console.log(err.data);
        resetDialogs();
      });
  };

  const deleteCourse = async (course_id, session_id) => {
    await axios({
      method: "POST",
      url: tempAPI + "course/delete/" + course_id,
      data: {
        session_id: session_id,
      },
    })
      .then((res) => {
        console.log(res.data);
        resetDialogs();
      })
      .catch((err) => {
        console.log(err.data);
        resetDialogs();
      });
  };

  const openAdd = () => {
    setAddOpen(true);
    setEditOpen(false);
    setDelOpen(false);
  };

  const openEdit = (id, name) => {
    setID(id);
    setName(name);
    setAddOpen(false);
    setEditOpen(true);
    setDelOpen(false);
  };

  const openDel = (id, name) => {
    setID(id);
    setName(name);
    setAddOpen(false);
    setEditOpen(false);
    setDelOpen(true);
  };

  const resetDialogs = () => {
    getCourses();
    setName("");
    setCredits("");
    setClassification("");
    setID("");
    setDepartmentID("");
    setAddOpen(false);
    setEditOpen(false);
    setDelOpen(false);
  };

  const addDialog = (
    <Dialog
      open={addOpen}
      onClose={() => {
        setAddOpen(false);
      }}
    >
      <DialogTitle>Add Course</DialogTitle>
      <DialogContent style={{ minWidth: 500 }}>
        { errorAdd ? <Alert severity="warning"> You must fill out all fields! </Alert> : 
        <DialogContentText color="gray"> {addMessage}  </DialogContentText>
        }
        
        <Stack style={{ margin: 10, padding: 10 }} spacing={2}>
          <TextField
            id="name"
            label="Course Name"
            onChange={(e) => {
              setErrorAdd(false);
              setName(e.target.value);
            }}
          />
          <TextField
            id="credits"
            label="Course Credits"
            onChange={(e) => {
              setErrorAdd(false);
              setCredits(e.target.value);
            }}
          />
          <TextField
            id="classification"
            label="Course Classification"
            onChange={(e) => {
              setErrorAdd(false);
              setClassification(e.target.value);
            }}
          />
          <Autocomplete
            // value={departments[0]["name"]}
            options={departments}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Select Department" />
            )}
            onChange={(e, value) => {
              if (value) {
                setDepartmentID(value.department_id);
              }
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            console.log("closing add dialog");
            resetDialogs();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("adding course", name);
            if (
              name !== "" &&
              credits !== "" &&
              classification !== "" &&
              departmentID !== ""
            ) {
              setErrorAdd(false);
              addCourse(
                name,
                credits,
                departmentID,
                classification,
                props.Session
              );
            } else {
              setErrorAdd(true);
            }
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
  const editDialog = (
    <Dialog
      open={editOpen}
      onClose={() => {
        setEditOpen(false);
      }}
    >
      <DialogTitle>Edit Course</DialogTitle>
      <DialogContent style={{ minWidth: 500 }}>
        <DialogContentText color={errorEdit ? "red" : "gray"}>
          {errorEdit ? errorMessage : editMessage}
        </DialogContentText>
        <Stack style={{ margin: 10, padding: 10 }} spacing={2}>
          <TextField
            label="Course Name"
            onChange={(e) => {
              setErrorEdit(false);
              setName(e.target.value);
            }}
          />
          <TextField
            id="credits"
            label="Course Credits"
            onChange={(e) => {
              setErrorAdd(false);
              setCredits(e.target.value);
            }}
          />
          <TextField
            label="Course Classification"
            onChange={(e) => {
              setErrorEdit(false);
              setClassification(e.target.value);
            }}
          />
          <Autocomplete
            options={departments}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Select Department" />
            )}
            onChange={(e, value) => {
              if (value) {
                setDepartmentID(value.department_id);
              }
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            console.log("closing edit dialog");
            resetDialogs();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("editing course", name);
            if (name !== "" && classification !== "" && departmentID !== "") {
              setErrorEdit(false);
              editCourse(
                id,
                name,
                credits,
                departmentID,
                classification,
                props.Session
              );
            } else {
              setErrorEdit(true);
            }
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
  const deleteDialog = (
    <Dialog
      open={delOpen}
      onClose={() => {
        setDelOpen(false);
      }}
    >
      <DialogTitle>Delete Course</DialogTitle>
      <DialogContent>
        <DialogContentText>{deleteMessage}</DialogContentText>
        <Typography>{name}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            console.log("closing delete dialog");
            resetDialogs();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("deleting course", name);
            deleteCourse(id, props.Session);
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div style={{ margin: 50 }}>
      {courses ? (
        <CRUDTable
          list={courses}
          title="Courses"
          columns={columns}
          openAdd={openAdd}
          openEdit={openEdit}
          openDel={openDel}
          setID={setID}
        />
      ) : (
        <p>loading courses...</p>
      )}
      {departments ? addDialog : <div />}
      {departments ? editDialog : <div />}
      {deleteDialog}
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlert}>
          <Alert onClose={handleAlert} severity={success ? "success" : "error"} sx={{ width: '100%' }}>
            {success ? "Course was created" : "Error creating course"}
          </Alert>
      </Snackbar>
    </div>
  );
}
