import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CurriculumCarrouselCard from "./CurriculumCarrouselCard";

export default function CurriculumCarrousel(props) {
  const [startIndex, setStartIndex] = useState(0);

  const Forward = () => {
    setStartIndex(startIndex + 3);
  };
  const Backward = () => {
    setStartIndex(startIndex - 3);
  };

  return (
    <div style={{ paddingBottom: 20 }}>
      <Grid container>
        <Grid xs={12} item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant={"h5"} style={{ fontWeight: "bold" }}>
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              {props.headerButton ? <props.headerButton /> : <div />}
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} item>
          <Divider style={{ marginTop: "5px", marginBottom: "25px" }} />
        </Grid>
        <Grid xs={12} item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid xs={1} item>
              <IconButton
                onClick={Backward}
                disabled={
                  props.loading || !props.curriculums || startIndex === 0
                }
              >
                <ArrowLeft />
              </IconButton>
            </Grid>
            <Grid xs={10} item>
              {props.curriculums.length === 0 ? <Alert variant="outlined" severity="info"> You don't have any saved Curriculums. </Alert> : props.loading ? (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <CircularProgress />
                </div> //pass down everything but all the curriculums
              ) : (
                <CarrouselGrid
                  {...props}
                  curriculums={undefined}
                  items={props.curriculums.slice(startIndex, startIndex + 3)}
                  editButtons={props.editButtons}
                />
              )}
            </Grid>
            <Grid xs={1} item>
              <IconButton
                onClick={Forward}
                disabled={
                  props.loading ||
                  !props.curriculums ||
                  props.curriculums.length <= startIndex + 3
                }
              >
                <ArrowRight />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div style={{ fontSize: "1.25em" }}>
        <table width="100%">
          <tr>
            <td>
              <b>{props.title}</b>
            </td>
            <td width="1">
              {props.headerButton ? <props.headerButton /> : <></>}
            </td>
          </tr>
        </table>
      </div>
      <Divider style={{ marginTop: "5px", marginBottom: "25px" }} />
      <table width="100%" style={{ minHeight: "200px" }}>
        <tr>
          <td width={1}>
            <IconButton
              onClick={Backward}
              disabled={props.loading || !props.curriculums || startIndex === 0}
            >
              <ArrowLeft />
            </IconButton>
          </td>
          <td>
            {props.curriculums.length == 0 || props.loading ? (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <CircularProgress />
              </div> //pass down everything but all the curriculums
            ) : (
              <CarrouselGrid
                {...props}
                curriculums={undefined}
                items={props.curriculums.slice(startIndex, startIndex + 3)}
                editButtons={props.editButtons}
              />
            )}
          </td>
          <td width={1}>
            <IconButton
              onClick={Forward}
              disabled={
                props.loading ||
                !props.curriculums ||
                props.curriculums.length <= startIndex + 3
              }
            >
              <ArrowRight />
            </IconButton>
          </td>
        </tr>
      </table> */}
    </div>
  );
}

function CarrouselGrid(props) {
  return (
    <>
      <Grid
        container
        spacing={5}
        width="100%"
        direction={props.Vertical ? "column" : "row"}
      >
        <Grid item xs={4}>
          {props.items[0] ? ( //Pass down everything but the items
            <CurriculumCarrouselCard
              {...props}
              items={undefined}
              item={props.items[0]}
              editButtons={props.editButtons}
            />
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={4}>
          {props.items[1] ? ( //Pass down everything but the items
            <CurriculumCarrouselCard
              {...props}
              items={undefined}
              item={props.items[1]}
              editButtons={props.editButtons}
            />
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={4}>
          {props.items[2] ? ( //Pass down everything but the items
            <CurriculumCarrouselCard
              {...props}
              items={undefined}
              item={props.items[2]}
              editButtons={props.editButtons}
            />
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  );
}
