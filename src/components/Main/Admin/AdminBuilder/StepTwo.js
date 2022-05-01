import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import {
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Stack,
  Autocomplete,
  Grid,
  List,
  Card,
  CardHeader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Divider,
} from "@mui/material";

export default function StepTwo(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const loading = "loading...";
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [classification, setClassification] = useState("");
  const [id, setID] = useState("");
  const [credits, setCredits] = useState("");

  useEffect(() => {
    getOptions();
  }, []);

  const getOptions = async () => {
    await axios({
      method: "GET",
      url: tempAPI + "categories",
    })
      .then((res) => {
        console.log(res.data);
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const addCategory = (val) => {
    let newCategories = {
      ...props.categories,
      [val.classification]: val,
    };
    props.setCategories(newCategories);
  };

  const deleteCategory = (key) => {
    delete props.categories[key];
    let newCategories = {
      ...props.categories,
    };
    props.setCategories(newCategories);
  };

  const resetInfo = () => {
    setCategory("");
    setID("");
    setCredits("");
  };

  const picker = (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={8} style={{}}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Select a Category" />
          )}
          onChange={(e, value) => {
            if (value) {
              console.log(value);
              setCategory(value.name);
              setClassification(value.classification);
              setID(value.category_id);
            } else {
              resetInfo();
            }
          }}
        />
      </Grid>
      <Grid item xs={3} style={{}}>
        <TextField
          fullWidth
          value={credits}
          label="Credits"
          onChange={(e) => {
            console.log(e.target.value);
            setCredits(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={1} style={{}}>
        <Button
          onClick={() => {
            if (
              category !== "" &&
              id !== "" &&
              credits !== "" &&
              classification !== ""
            ) {
              addCategory({
                id: id,
                name: category,
                classification: classification,
                credits: credits,
              });
            } else {
              console.log("missing input");
            }
          }}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );

  const list = (
    <div>
      {Object.keys(props.categories).map((category, i) => (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{ marginTop: 5 }}
          key={i}
        >
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Category Name"
              disabled
              value={props.categories[category].name}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Total Credits"
              disabled
              value={props.categories[category].credits}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              onClick={() => {
                deleteCategory(category);
              }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      ))}
    </div>
  );

  return (
    <div style={{ margin: 20 }}>
      {props.categories ? (
        <Stack style={{ margin: 10, padding: 10 }} spacing={2}>
          {picker}
          {list}
        </Stack>
      ) : (
        <p>loading categories...</p>
      )}
    </div>
  );
}
