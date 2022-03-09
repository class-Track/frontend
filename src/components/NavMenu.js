import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, IconButton, AppBar, CircularProgress, Toolbar, Typography, Button,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import UserButton from "./navmenu/UserButton";
import Hamburger from "./navmenu/Hamburger";
import LogoutButton from "./navmenu/LogoutButton";

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
  customHeight: { minHeight: 200 },
  offset: theme.mixins.toolbar
}));


export default function ButtonAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const sendToLogin = (event) => {
    history.push("/Login")
    setMenuOpen(false);
  }

  const sendToRegister = (event) => {
    history.push("/Register")
    setMenuOpen(false);
  }

  return (
    <React.Fragment>
      <AppBar color={"primary"} enableColorOnDark>
        <Toolbar>
          <IconButton onClick={() => { setMenuOpen(true) }} style={{ marginRight: "15px" }}><MenuIcon /></IconButton>
          <a href="/">
            <img src={"ct/logo.png"} alt="ClassTrack Logo" height="50" style={{marginTop:'7px'}} /></a>
          <Typography variant="h6" className={classes.title} style={{ marginLeft: "10px", fontFamily: 'DM Serif Display' }}> </Typography>
          {
            props.Session
              ? <> {props.User
                ? <React.Fragment>
                  <UserButton User={props.User} Session={props.Session} DarkMode={props.DarkMode} RefreshUser = {props.RefreshUser} />
                  <LogoutButton />
                </React.Fragment>
                : <CircularProgress color="secondary" />}</>

              : <React.Fragment>
                <Button color="inherit" onClick={sendToLogin}> Log In </Button>
                <Button color="inherit" onClick={sendToRegister}> Register </Button>
              </React.Fragment>}
        </Toolbar>
      </AppBar>
      <Toolbar style={{ marginBottom: "20px" }} />

      <Dialog open={props.InvalidSession} >
        <DialogTitle> Session Expired </DialogTitle>
        <DialogContent><DialogContentText>Your session was not found on the server, and has most likely expired. Please log in again.</DialogContentText> </DialogContent>
        <DialogActions> <LogoutButton /> </DialogActions>
      </Dialog>

      <Hamburger DarkMode={props.DarkMode} ToggleDarkMode={props.ToggleDarkMode} Session={props.Session}
        menuOpen={menuOpen} setMenuOpen={setMenuOpen} sendToLogin={sendToLogin} history={history} User={props.User} />

    </React.Fragment>
  );
}
