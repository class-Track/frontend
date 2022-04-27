import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
//import axios from "axios";
import CurriculumCarrousel from "./Curriculum/CurriculumCarrousel";
import DummyData from "../../data/DummyData.json";
import { GetUser } from "../../API";

export default function Main(props) {
  const history = useHistory();
  // const API = 'https://classtrack-backend.herokuapp.com/'
  

  //We don't need any of this. The suer and Session are in the props package

  // useEffect(() => {
  //   if (session_id) {
  //     GetUser()
  //   }
  // }, []);

  // const getUserData = async () => {
  //   await axios({
  //     method: "POST",
  //     url: API + "me",
  //     data: {
  //       session_id: session_id,
  //     },
  //   })
  //     .then((res) => {
  //       console.log("result:", res.data);
  //       setUserData(res.data);
  //     })
  //     .catch((error) => {
  //       console.log("error:", error);
  //     });
  // };

  return (
    <div style={{ margin: 50 }}>
      <CurriculumCarrousel
        {...props}
        title={"Recent"}
        loading={false}
        curriculums={DummyData}
      />
      {/* <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          {userData ? (
            <div>
              <p>session_id: {session_id}</p>
              <p>first_name: {userData.first_name}</p>
              <p>last_name: {userData.last_name}</p>
              <p>email: {userData.email}</p>
              <p>user_id: {userData.user_id}</p>
              <p>degree_id: {userData.degree_id}</p>
              <p>isAdmin: {userData.isAdmin.toString()}</p>
            </div>
          ) : (
            <></>
          )}
        </Grid>
      </Grid> */}
    </div>
  );
}
