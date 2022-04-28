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
  Autocomplete,
} from "@mui/material";

export default function AdminDegrees(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const [degrees, setDegrees] = useState();
  const [departments, setDepartments] = useState();
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [length, setLength] = useState(0);
  const [credits, setCredits] = useState(0);
  const [curriculumSequence, setCurriculumSequence] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [errorAdd, setErrorAdd] = useState(false);
  const [errorEdit, setErrorEdit] = useState(false);
  const addMessage = "Enter the information for this new degree below";
  const editMessage = "Enter the new information for this degree below";
  const deleteMessage = "Deleting the following degree";
  const errorMessage = "Invalid input!";
  const columns = [
    { id: "index", label: "Index", minWidth: 50 },
    { id: "id", label: "ID", minWidth: 50 },
    { id: "name", label: "Degree Name", minWidth: 100 },
    { id: "department_id", label: "Department ID", minWidth: 100 },
    { id: "curriculum_sequence", label: "Curriculum Sequence", minWidth: 100 },
    { id: "length", label: "Length in Years", minWidth: 50 },
    { id: "credits", label: "Total Credits", minWidth: 50 },
  ];

  useEffect(() => {
    getDegrees();
    getDepartments();
  }, []);

  const createData = (
    index,
    id,
    name,
    department_id,
    curriculum_sequence,
    length,
    credits
  ) => {
    return {
      index,
      id,
      name,
      department_id,
      curriculum_sequence,
      length,
      credits,
    };
  };

  const addDegree = async (
    name,
    department_id,
    length,
    credits,
    session_id
  ) => {
    await axios({
      method: "POST",
      url: tempAPI + "/degrees",
      data: {
        name: name,
        department_id,
        department_id,
        length: length,
        credits: credits,
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

  const getDegrees = async () => {
    await axios({
      method: "GET",
      url: tempAPI + "degrees",
    })
      .then((res) => {
        console.log(res.data);
        let tempList = [];
        res.data.forEach((value, i) => {
          tempList.push(
            createData(
              i,
              value["degree_id"],
              value["name"],
              value["department_id"],
              value["curriculum_sequence"],
              value["length"],
              value["credits"]
            )
          );
        });
        console.log("tempList:", tempList);
        setAddOpen(false);
        setEditOpen(false);
        setDelOpen(false);
        setDegrees(tempList);
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

  const editDegree = async (
    degree_id,
    name,
    department_id,
    curriculum_sequence,
    length,
    credits,
    session_id
  ) => {
    await axios({
      method: "PUT",
      url: tempAPI + "degree/update/" + degree_id,
      data: {
        session_id: session_id,
        name: name,
        department_id: department_id,
        curriculum_sequence: curriculum_sequence,
        length: length,
        credits: credits,
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

  const deleteDegree = async (degree_id, session_id) => {
    await axios({
      method: "POST",
      url: tempAPI + "degree/delete" + degree_id,
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
    getDegrees();
    setName("");
    setID("");
    setLength(0);
    setCredits(0);
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
      <DialogTitle>Add Degree</DialogTitle>
      <DialogContent style={{ minWidth: 500 }}>
        <DialogContentText color={errorAdd ? "red" : "gray"}>
          {errorAdd ? errorMessage : addMessage}
        </DialogContentText>
        <Stack style={{ margin: 10, padding: 10 }} spacing={2}>
          <TextField
            id="name"
            label="Degree Name"
            onChange={(e) => {
              setErrorAdd(false);
              setName(e.target.value);
            }}
          />
          <TextField
            label="Degree Length in Years"
            onChange={(e) => {
              setErrorEdit(false);
              setLength(parseInt(e.target.value));
            }}
          />
          <TextField
            label="Total Credits"
            onChange={(e) => {
              setErrorEdit(false);
              setCredits(parseInt(e.target.value));
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
              length !== 0 &&
              credits !== 0 &&
              departmentID !== ""
            ) {
              setErrorAdd(false);
              addDegree(name, departmentID, length, credits, props.Session);
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
            label="Degree Name"
            onChange={(e) => {
              setErrorEdit(false);
              setName(e.target.value);
            }}
          />
          <TextField
            label="Degree Length in Years"
            onChange={(e) => {
              setErrorEdit(false);
              setLength(parseInt(e.target.value));
            }}
          />
          <TextField
            label="Total Credits"
            onChange={(e) => {
              setErrorEdit(false);
              setCredits(parseInt(e.target.value));
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
            if (
              name !== "" &&
              length !== 0 &&
              credits !== 0 &&
              departmentID !== ""
            ) {
              setErrorEdit(false);
              editDegree(
                id,
                name,
                departmentID,
                curriculumSequence,
                length,
                credits,
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
      <DialogTitle>Delete Degree</DialogTitle>
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
            deleteDegree(id, props.Session);
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div style={{ margin: 50 }}>
      {degrees ? (
        <CRUDTable
          list={degrees}
          title="Degrees"
          columns={columns}
          openAdd={openAdd}
          openEdit={openEdit}
          openDel={openDel}
          setID={setID}
        />
      ) : (
        <p>loading degrees...</p>
      )}
      {departments ? addDialog : <div />}
      {departments ? editDialog : <div />}
      {deleteDialog}
    </div>
  );
}
