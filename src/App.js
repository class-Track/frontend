import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import Cookies from "universal-cookie/es6";
import useWindowDimensions from "./components/WindowDimensions/useWindowDimensions";
import Layout from "./NavMenuLayout";
import "./App.css";
import { GetUser } from "./API";
import { darkTheme, lightTheme } from "./Themes";
import { CircularProgress, CssBaseline } from "@mui/material";
import { Footer } from "./Footer";
import { DragDropContext } from "react-beautiful-dnd";
import { lists, courses } from "./data/dummy_data";
import axios from "axios";
import Home from "./components/Main/Home/Home";
import SignUp from "./components/UserAuth/SignUp";
import Login from "./components/UserAuth/Login";
import Main from "./components/Main/Main";
import Navbar from "./components/NavBar/NavBar";
import Community from "./components/Main/Community/Community";
import Profile from "./components/Main/Profile/Profile";
import Settings from "./components/Main/Settings/Settings";
import Builder from "./components/Main/Builder/Builder";
import Viewer from "./components/Main/Viewer/Viewer";

//Cookies should only really be accessed here.
const cookies = new Cookies();

function CenteredCircular() {
  return (
    <div style={{ textAlign: "center" }}>
      {" "}
      <CircularProgress />{" "}
    </div>
  );
}

export default function App() {
  const API = "https://classtrack-backend.herokuapp.com/classTrack/";
  const cookies = new Cookies();

  const [session_id, setSessionID] = useState(cookies.get("SessionID"));
  const [userData, setUserData] = useState(null);

  const [currLists, setCurrLists] = useState(lists);
  const [currCourses, setCurrCourses] = useState(courses);

  //Width of the window. Used to determine if we need to switch to a vertical arrangement
  const { width } = useWindowDimensions();
  const Vertical = width < 900;

  //Auth stuff. Session and User is passed down to the components.
  const [Session, setSession] = useState(undefined);
  const [User, setUser] = useState(undefined);

  //Loading usestate to make sure we don't start loading 50 times
  const [Loading, setLoading] = useState(false);

  //Warning to show a dialogbox to say ```y o    s i g n    o u t```
  const [InvalidSession, setInvalidSession] = useState(false);

  //Dark mode will not be a user saved preference. It'll be saved in a cookie
  const [darkMode, setDarkMode] = useState(undefined);

  const dragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;
    const draggableObject =
      currLists[source.droppableId]["courses"][source.index];

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = currLists[source.droppableId];
    const end = currLists[destination.droppableId];

    // if dropping into the same list, run this code
    if (destination.droppableId === source.droppableId) {
      // rearrange course in source list
      const newStartCourses = Array.from(start["courses"]);
      newStartCourses.splice(source.index, 1);
      newStartCourses.splice(destination.index, 0, draggableObject);
      // create a new list
      const newStart = {
        ...start,
        course_ids: newStartCourses,
      };
      // create a state
      const newCurrLists = {
        ...currLists,
        [newStart.id]: newStart,
      };
      // update state
      setCurrLists(newCurrLists);
      return;
    }
    // if dropping into a different list, run this code
    else {
      // remove course from source and update
      const newStartCourses = Array.from(start["courses"]);
      newStartCourses.splice(source.index, 1);
      const newStart = {
        ...start,
        courses: newStartCourses,
      };
      // add course to destination and update
      const newEndCourses = Array.from(end["courses"]);
      newEndCourses.splice(destination.index, 0, draggableObject);
      const newEnd = {
        ...end,
        courses: newEndCourses,
      };
      // create a state
      const newCurrLists = {
        ...currLists,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd,
      };
      // update state
      setCurrLists(newCurrLists);
      return;
    }
  };

  //This is the set session that must be passed down
  const saveSession = (SessionID) => {
    //Set the cookie
    cookies.set("SessionID", SessionID);

    //set the usestates
    setSession(SessionID);
    setInvalidSession(false);
  };

  const removeSession = () => {
    setSession(null);
    setInvalidSession(true);
  };

  const ToggleDarkMode = () => {
    //What is !undefined? Please tell me it's "true" just to make my life easier.
    if (darkMode) {
      //Delete the cookie
      cookies.remove("DarkMode");
    } else {
      //Add the cookie
      cookies.set("DarkMode", true);
    }

    setDarkMode(!darkMode);
  };

  //Assuming there's a valid session, this will automatically trigger a refresh
  const RefreshUser = () => {
    setUser(undefined);
  };

  //This runs at legitiately *EVERY* time we load and render ANY page in the app
  //So here we can set the session and user

  //Check that session reflects the cookie's state
  if (Session !== cookies.get("SessionID")) {
    setSession(cookies.get("SessionID"));
  }
  if (darkMode !== cookies.get("DarkMode")) {
    setDarkMode(cookies.get("DarkMode"));
  }

  //Check that the user is defined
  if (Session && !InvalidSession && !Loading && !User) {
    //If there is a session, and it's not invalid, and
    //we're not already loading a user, and the user is not set

    //Well, time to get the user
    GetUser(Session, setLoading, setUser, setInvalidSession);
  }

  // <Layout DarkMode={darkMode} ToggleDarkMode={ToggleDarkMode} Session={Session} InvalidSession={InvalidSession} setSession = {SetSession} RefreshUser = {RefreshUser} User={User} Vertical={Vertical}>
  return (
    <DragDropContext onDragEnd={dragEnd}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        {Session ? <Navbar removeSession={removeSession} API={API} /> : <></>}

        <CssBaseline />
        <Route exact path="/">
          {/* <Home DarkMode={darkMode} Session={Session} InvalidSession={InvalidSession} setSession={SetSession} RefreshUser={RefreshUser} User={User} Vertical={Vertical} /> */}
          {Session ? <Redirect to="/Main" /> : <Redirect to="/Login" />}
        </Route>
        <Route path="/Login">
          {Session ? (
            <Redirect to="/Main" />
          ) : (
            <Login saveSession={saveSession} API={API} />
          )}
        </Route>
        <Route path="/SignUp">
          {Session ? <Redirect to="/Main" /> : <SignUp API={API} />}
        </Route>
        <Route path="/Curriculums">
          {Session ? <>Curriculums here</> : <Redirect to="/Login" />}
        </Route>
        <Route path="/Admin">
          {Session ? (
            <>
              {User ? (
                <>
                  {" "}
                  {User.isAdmin ? ( //Set appropriate role names
                    <>Admin component here</>
                  ) : (
                    <>You do not have permission to access this resource</>
                  )}
                </>
              ) : (
                <CenteredCircular />
              )}{" "}
            </>
          ) : (
            <Redirect to="/Login" />
          )}
        </Route>
        <Route path="/Main">
          {Session ? (
            <Main removeSession={removeSession} API={API} />
          ) : (
            <Redirect to="/Login" />
          )}
        </Route>
        <Route path="/Home">
          {Session ? <Home /> : <Redirect to="/Login" />}
        </Route>
        <Route path="/Community">
          {Session ? <Community /> : <Redirect to="/Login" />}
        </Route>
        <Route path="/Profile">
          {Session ? <Profile /> : <Redirect to="/Login" />}
        </Route>
        <Route path="/Settings">
          {Session ? <Settings /> : <Redirect to="/Login" />}
        </Route>
        <Route path="/Builder">
          {Session ? (
            <Builder lists={currLists} API={API} />
          ) : (
            <Redirect to="/Login" />
          )}
        </Route>
        <Route path="/Viewer">
          {Session ? <Viewer API={API} /> : <Redirect to="/Login" />}
        </Route>
        {/* <Footer /> */}
      </ThemeProvider>
    </DragDropContext>
  );
}
