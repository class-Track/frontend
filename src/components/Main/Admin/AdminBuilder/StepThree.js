import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
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
  CardActions,
  CardContent,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Divider,
  useTheme,
  MobileStepper,
} from "@mui/material";
import { Swipe } from "@mui/icons-material";

const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

const union = (a, b) => {
  return [...a, ...not(b, a)];
};

export default function StepThree(props) {
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState([]);
  const [filter, setFilter] = useState("");
  const leftChecked = intersection(checked, props.courses);
  const rightChecked = intersection(
    checked,
    props.categoryLists[props.categoryKeys[activeStep]]
  );

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    props.setCourses(not(props.courses, leftChecked));
    setChecked(not(checked, leftChecked));
    props.setCategoryLists({
      ...props.categoryLists,
      [props.categoryKeys[activeStep]]:
        props.categoryLists[props.categoryKeys[activeStep]].concat(leftChecked),
    });
  };

  const handleCheckedLeft = () => {
    props.setCourses(props.courses.concat(rightChecked));
    setChecked(not(checked, rightChecked));
    props.setCategoryLists({
      ...props.categoryLists,
      [props.categoryKeys[activeStep]]: not(
        props.categoryLists[props.categoryKeys[activeStep]],
        rightChecked
      ),
    });
  };

  const handleNext = () => {
    if (activeStep + 1 < props.categoryKeys.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep - 1 >= 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          // width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value, i) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem
              key={i}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={value["classification"] + ": " + value["name"]}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const customListFiltered = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          // width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items
          .filter(
            (object) =>
              object["classification"].toLowerCase().includes(filter) ||
              object["classification"].includes(filter) ||
              filter === ""
          )
          .map((value, i) => {
            const labelId = `transfer-list-all-item-${value}-label`;
            return (
              <ListItem
                key={i}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={value["classification"] + ": " + value["name"]}
                />
              </ListItem>
            );
          })}
        <ListItem />
      </List>
    </Card>
  );

  const stepper = (
    <MobileStepper
      variant="dots"
      steps={props.categoryKeys.length}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === props.categoryKeys.length - 1}
        >
          Next
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );

  return (
    <div style={{ margin: 20 }}>
      {props.categoryKeys ? (
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid xs={5.5} item style={{ background: "" }}>
                {customListFiltered("Courses", props.courses)}
              </Grid>
              <Grid xs={1} item style={{ background: "" }}>
                <Grid container direction="column" alignItems="center">
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                  >
                    &lt;
                  </Button>
                </Grid>
              </Grid>
              <Grid xs={5.5} item style={{ background: "" }}>
                <Paper>
                  <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {props.categoryKeys.map((categoryKey, i) => (
                      <div key={i}>
                        {customList(
                          props.categories[categoryKey]["name"],
                          props.categoryLists[categoryKey]
                        )}
                      </div>
                    ))}
                  </SwipeableViews>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
              spacing={2}
            >
              <Grid style={{ background: "" }} xs={5.5} item>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid xs={12} item>
                    <TextField
                      fullWidth
                      label="Search..."
                      value={filter}
                      onChange={(e) => {
                        setFilter(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid style={{ background: "" }} xs={1} item />
              <Grid style={{ background: "" }} xs={5.5} item>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Paper>
                      <Card>{stepper}</Card>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <p>loading categories...</p>
      )}
    </div>
  );
}
