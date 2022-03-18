import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, IconButton, AppBar, CircularProgress, Toolbar, Typography, Button, TextField
} from "@mui/material";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import UserButton from "../NavBarComponents/UserButton";
import Hamburger from "../NavBarComponents/Hamburger";
import LogoutButton from "../NavBarComponents/LogoutButton";
import SettingsButton from "../NavBarComponents/SettingsButton";

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
  customHeight: { minHeight: 200 },
  offset: theme.mixins.toolbar
}));

const WelcomeLabel = (props) => {

  return(
    <table>
      <tr><td><b>Welcome {props.user.name}!</b><br/>
      <div style={{color:(props.DarkMode ? '#cccccc' : '#666666'), fontSize:'.7em'}}>{props.user.degree ? props.user.degree.name : "Unknown Degree"}</div>
      </td></tr>
    </table>
  );

}


export default function ButtonAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query,setQuery] = useState("");

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
          <table width={'100%'}>
            <tr>
              <td width={'20px'}><IconButton onClick={() => { setMenuOpen(true) }} style={{ marginRight: "15px" }}><MenuIcon /></IconButton></td>
              <td width={'70px'}><a href="/"><img src={`ct/widecenter${(props.DarkMode ? 'white' : '')}.png`} alt="ClassTrack Logo" height="40" style={{ marginTop: '7px' }} /></a></td>
              <td><TextField placeholder="Search" value={query} onChange={(event)=>{setQuery(event.target.value)}} fullWidth style={{paddingRight:"20px", paddingLeft:'20px'}}/></td>
              {/* This will probably need to be switched to an Autocomplete */}
              {
                props.Session
                  ? <> {props.User
                    ? <>
                      <td width={'200px'}><WelcomeLabel user={props.User} DarkMode={props.DarkMode}/></td>
                      <td width={'20px'}><SettingsButton User={props.User} Session={props.Session} DarkMode={props.DarkMode} RefreshUser={props.RefreshUser} /></td>
                      <td width={'20px'}><UserButton User={props.User}/></td>
                      <td width={'20px'}><LogoutButton /></td>
                    </>: <td><CircularProgress color="secondary" /></td>}</>

                  : <>
                    <td width={'20px'}><Button color="inherit" onClick={sendToLogin}> Log In </Button></td>
                    <td width={'20px'}><Button color="inherit" onClick={sendToRegister}> Register </Button></td>
                  </>}

            </tr>
          </table>
          <Typography variant="h6" className={classes.title} style={{ marginLeft: "10px", fontFamily: 'DM Serif Display' }}> </Typography>
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
