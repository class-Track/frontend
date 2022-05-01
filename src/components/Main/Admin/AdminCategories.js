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

export default function AdminCategories(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const [categories, setCategories] = useState();
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [classification, setClassification] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [errorAdd, setErrorAdd] = useState(false);
  const [errorEdit, setErrorEdit] = useState(false);
  const addMessage = "Enter the information for this new category below";
  const editMessage = "Enter the new information for this category below";
  const deleteMessage = "Deleting the following category";
  const errorMessage = "Invalid input!";
  const columns = [
    { id: "index", label: "Index", minWidth: 50 },
    { id: "id", label: "ID", minWidth: 50 },
    { id: "name", label: "Category Name", minWidth: 100 },
    { id: "classification", label: "Classification", minWidth: 100 },
  ];

  useEffect(() => {
    getCategories();
  }, []);

  const createData = (index, id, name, classification) => {
    return {
      index,
      id,
      name,
      classification,
    };
  };

  const addCategory = async (name, classification, session_id) => {
    await axios({
      method: "POST",
      url: tempAPI + "category",
      data: {
        name: name,
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

  const getCategories = async () => {
    await axios({
      method: "GET",
      url: tempAPI + "categories",
    })
      .then((res) => {
        console.log(res.data);
        let tempList = [];
        res.data.forEach((value, i) => {
          tempList.push(
            createData(
              i,
              value["category_id"],
              value["name"],
              value["classification"]
            )
          );
        });
        console.log("tempList:", tempList);
        setAddOpen(false);
        setEditOpen(false);
        setDelOpen(false);
        setCategories(tempList);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const editCategory = async (
    category_id,
    name,
    classification,
    session_id
  ) => {
    await axios({
      method: "PUT",
      url: tempAPI + "category/update/" + category_id,
      data: {
        category_id: category_id,
        name: name,
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

  const deleteCategory = async (category_id, session_id) => {
    await axios({
      method: "POST",
      url: tempAPI + "category/delete/" + category_id,
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
    getCategories();
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
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent style={{ minWidth: 500 }}>
        <DialogContentText color={errorAdd ? "red" : "gray"}>
          {errorAdd ? errorMessage : addMessage}
        </DialogContentText>
        <Stack style={{ margin: 10, padding: 10 }} spacing={2}>
          <TextField
            id="name"
            label="Category Name"
            onChange={(e) => {
              setErrorAdd(false);
              setName(e.target.value);
            }}
          />
          <TextField
            label="Category Classification"
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
            console.log("closing add dialog");
            resetDialogs();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("adding category", name);
            if (name !== "" && classification !== "") {
              setErrorAdd(false);
              addCategory(name, classification, props.Session);
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
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent style={{ minWidth: 500 }}>
        <DialogContentText color={errorEdit ? "red" : "gray"}>
          {errorEdit ? errorMessage : editMessage}
        </DialogContentText>
        <Stack style={{ margin: 10, padding: 10 }} spacing={2}>
          <TextField
            id="name"
            label="Category Name"
            onChange={(e) => {
              setErrorAdd(false);
              setName(e.target.value);
            }}
          />
          <TextField
            label="Category Classification"
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
            console.log("editing category", name);
            if (name !== "" && classification !== "") {
              setErrorEdit(false);
              editCategory(id, name, classification, props.Session);
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
      <DialogTitle>Delete Category</DialogTitle>
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
            console.log("deleting category", name);
            deleteCategory(id, props.Session);
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div style={{ margin: 50 }}>
      {categories ? (
        <CRUDTable
          list={categories}
          title="Categories"
          columns={columns}
          openAdd={openAdd}
          openEdit={openEdit}
          openDel={openDel}
          setID={setID}
        />
      ) : (
        <p>loading categories...</p>
      )}
      {addDialog}
      {editDialog}
      {deleteDialog}
    </div>
  );
}
