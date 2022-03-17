import React, { useState } from 'react';
import { Route, Redirect } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import Cookies from 'universal-cookie/es6';
import useWindowDimensions from './components/WindowDimensions/useWindowDimensions';
import Layout from './NavMenuLayout';
import './App.css';
import { GetUser } from './API';
import { darkTheme, lightTheme } from './Themes';
import { CircularProgress, CssBaseline } from '@mui/material';
import { Footer } from './Footer';
import Home from './components/LandingPage/LandingPage';
import SignUp from './components/UserAuth/SignUp';
import Login from './components/UserAuth/Login';
import Main from './components/Main/Main';

//Cookies should only really be accessed here.
const cookies = new Cookies();

function CenteredCircular() { return (<div style={{ textAlign: 'center' }}> <CircularProgress /> </div>) }

export default function App() {

  //Width of the window. Used to determine if we need to switch to a vertical arrangement
  const { width } = useWindowDimensions();
  const Vertical = width < 900;

  //Auth stuff. Session and User is passed down to the components.
  const [Session, setSession] = useState(undefined)
  const [User, setUser] = useState(undefined)

  //Loading usestate to make sure we don't start loading 50 times
  const [Loading, setLoading] = useState(false)

  //Warning to show a dialogbox to say ```y o    s i g n    o u t```
  const [InvalidSession, setInvalidSession] = useState(false);

  //Dark mode will not be a user saved preference. It'll be saved in a cookie
  const [darkMode, setDarkMode] = useState(undefined);

  //This is the set session that must be passed down
  const saveSession = (SessionID) => {

    //Set the cookie
    cookies.set("SessionID", SessionID)

    //set the usestates
    setSession(SessionID)
    setInvalidSession(false)
  }

  const removeSession = () => {
    setSession(null)
    setInvalidSession(true)
  }

  const ToggleDarkMode = () => {
    //What is !undefined? Please tell me it's "true" just to make my life easier.
    if (darkMode) {
      //Delete the cookie
      cookies.remove("DarkMode")
    } else {
      //Add the cookie
      cookies.set("DarkMode", true)
    }

    setDarkMode(!darkMode);

  }

  //Assuming there's a valid session, this will automatically trigger a refresh
  const RefreshUser = () => { setUser(undefined); }

  //This runs at legitiately *EVERY* time we load and render ANY page in the app
  //So here we can set the session and user

  //Check that session reflects the cookie's state
  if (Session !== cookies.get("SessionID")) { setSession(cookies.get("SessionID")) }
  if (darkMode !== cookies.get("DarkMode")) { setDarkMode(cookies.get("DarkMode")) }

  //Check that the user is defined
  if (Session && !InvalidSession && !Loading && !User) {
    //If there is a session, and it's not invalid, and
    //we're not already loading a user, and the user is not set

    //Well, time to get the user
    GetUser(Session, setLoading, setUser, setInvalidSession)
  }

  // <Layout DarkMode={darkMode} ToggleDarkMode={ToggleDarkMode} Session={Session} InvalidSession={InvalidSession} setSession = {SetSession} RefreshUser = {RefreshUser} User={User} Vertical={Vertical}>
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Route exact path='/'>
        {/* <Home DarkMode={darkMode} Session={Session} InvalidSession={InvalidSession} setSession={SetSession} RefreshUser={RefreshUser} User={User} Vertical={Vertical} /> */}
        {Session ? <Redirect to='/Main' /> : <Redirect to='/Login' />}
      </Route>
      <Route path='/Login'>
        {Session ? <Redirect to='/Main' />
          : <Login saveSession={saveSession} />}
      </Route>
      <Route path='/SignUp'>
        {Session ? <Redirect to='/Main' />
          : <SignUp />}
      </Route>
      <Route path='/Curriculums'>
        {Session
          ? <>Curriculums here</>
          : <Redirect to='/Login' />}
      </Route>
      <Route path='/Profile'>
        {Session
          ? <>Profile here</>
          : <Redirect to='/Login' />}
      </Route>
      <Route path='/Admin'>
        {Session ? <>
          {User ? <> {
            User.isAdmin //Set appropriate role names
              ? <>Admin component here</>
              : <>You do not have permission to access this resource</>}
          </> : <CenteredCircular />
          } </> : <Redirect to='/Login' />}
      </Route>
      <Route path="/Main">
        {Session ? <Main removeSession={removeSession} /> : <Redirect to='/Login' />}
      </Route>
      {/* <Footer /> */}
    </ThemeProvider>
  );
}