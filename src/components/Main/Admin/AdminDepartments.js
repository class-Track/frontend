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
} from "@mui/material";

export default function AdminDepartments(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const [departments, setDepartments] = useState();
  const [name, setName] = useState("");
  const [classification, setClassification] = useState("");
  const [id, setID] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [errorAdd, setErrorAdd] = useState(false);
  const [errorEdit, setErrorEdit] = useState(false);
  const addMessage = "Enter the information for this new department below";
  const editMessage = "Enter the new information for this department below";
  const deleteMessage = "Deleting the following department";
  const errorMessage = "Invalid input!";
  const columns = [
    { id: "index", label: "Index", minWidth: 100 },
    { id: "id", label: "ID", minWidth: 100 },
    { id: "name", label: "Department Name", minWidth: 200 },
    { id: "university_id", label: "University ID", minWidth: 100 },
    { id: "classification", label: "Classification", minWidth: 100 },
  ];

  useEffect(() => {
    getDepartments();
  }, []);

  const createData = (index, id, name, university_id, classification) => {
    return { index, id, name, university_id, classification };
  };

  const addDepartment = async (
    name,
    university_id,
    classification,
    session_id
  ) => {
    await axios({
      method: "POST",
      url: tempAPI + "department",
      data: {
        name: name,
        university_id: university_id,
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

  const getDepartments = async () => {
    await axios({
      method: "GET",
      url: tempAPI + "departments",
    })
      .then((res) => {
        console.log(res.data);
        let tempList = [];
        res.data.forEach((value, i) => {
          tempList.push(
            createData(
              i,
              value["department_id"],
              value["name"],
              value["university_id"],
              value["classification"]
            )
          );
        });
        setAddOpen(false);
        setEditOpen(false);
        setDelOpen(false);
        setDepartments(tempList);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const editDepartment = async (
    department_id,
    name,
    university_id,
    classification,
    session_id
  ) => {
    await axios({
      method: "PUT",
      url: tempAPI + "department/update/" + department_id,
      data: {
        name: name,
        university_id: university_id,
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

  const deleteDepartment = async (department_id, session_id) => {
    await axios({
      method: "POST",
      url: tempAPI + "department/delete/" + department_id,
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
    getDepartments();
    setName("");
    setClassification("");
    setID("");
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
      <DialogTitle>Add Department</DialogTitle>
      <DialogContent style={{ minWidth: 500 }}>
        <DialogContentText color={errorAdd ? "red" : "gray"}>
          {errorAdd ? errorMessage : addMessage}
        </DialogContentText>
        <Stack style={{ margin: 10, padding: 10 }} spacing={2}>
          <TextField
            id="name"
            label="Department Name"
            onChange={(e) => {
              setErrorAdd(false);
              setName(e.target.value);
            }}
          />
          <TextField
            id="classification"
            label="Department Classification"
            onChange={(e) => {
              setErrorAdd(false);
              setClassification(e.target.value);
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
            console.log("adding department", name);
            if (name !== "" && classification !== "") {
              setErrorAdd(false);
              addDepartment(
                name,
                props.User.university_id,
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
      <DialogTitle>Edit Department</DialogTitle>
      <DialogContent style={{ minWidth: 500 }}>
        <DialogContentText color={errorEdit ? "red" : "gray"}>
          {errorEdit ? errorMessage : editMessage}
        </DialogContentText>
        <Stack style={{ margin: 10, padding: 10 }} spacing={2}>
          <TextField
            label="Department Name"
            onChange={(e) => {
              setErrorEdit(false);
              setName(e.target.value);
            }}
          />
          <TextField
            label="Department Classification"
            onChange={(e) => {
              setErrorEdit(false);
              setClassification(e.target.value);
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
            console.log("editing department", name);
            if (name !== "" && classification !== "") {
              setErrorEdit(false);
              editDepartment(
                id,
                name,
                props.User.university_id,
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
      <DialogTitle>Delete Department</DialogTitle>
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
            console.log("deleting department", name);
            deleteDepartment(id, props.Session);
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div style={{ margin: 50 }}>
      {departments ? (
        <CRUDTable
          list={departments}
          title="Departments"
          columns={columns}
          openAdd={openAdd}
          openEdit={openEdit}
          openDel={openDel}
          setID={setID}
        />
      ) : (
        <p>loading departments...</p>
      )}
      {addDialog}
      {editDialog}
      {deleteDialog}
    </div>
  );
}
