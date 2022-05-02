import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { styled, alpha } from "@mui/material/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  AppBar,
  CircularProgress,
  Toolbar,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import UserButton from "./NavBarComponents/UserButton";
import Hamburger from "./NavBarComponents/Hamburger";
import LogoutButton from "./NavBarComponents/LogoutButton";
import SettingsButton from "./NavBarComponents/SettingsButton";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { LogOut } from "../../API";

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
  customHeight: { minHeight: 200 },
  offset: theme.mixins.toolbar,
}));

// const WelcomeLabel = (props) => {
//   return (
//     <table>
//       <tr>
//         <td>
//           <b>Welcome {props.user.name}!</b>
//           <br />
//           <div
//             style={{
//               color: props.DarkMode ? "#cccccc" : "#666666",
//               fontSize: ".7em",
//             }}
//           >
//             {props.user.degree ? props.user.degree.name : "Unknown Degree"}
//           </div>
//         </td>
//       </tr>
//     </table>
//   );
// };

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  const sendToLogin = (event) => {
    history.push("/Login");
    setMenuOpen(false);
  };

  const sendToRegister = (event) => {
    history.push("/Register");
    setMenuOpen(false);
  };

  const navigateToProfile = () => {
    history.push("/Profile");
  };

  const navigateToSettings = () => {
    history.push("/Settings");
  };

  return (
    <React.Fragment>
      <AppBar color={"primary"} enableColorOnDark>
        <Toolbar>
          <table width={"100%"}>
            <tr>
              <td width={"20px"}>
                <IconButton
                  onClick={() => {
                    setMenuOpen(true);
                  }}
                  style={{ marginRight: "15px" }}
                >
                  <MenuIcon />
                </IconButton>
              </td>
              <td width={"70px"}>
                <img
                  src={`ct/widecenter${props.DarkMode ? "white" : ""}.png`}
                  alt="ClassTrack Logo"
                  height="40"
                  style={{ marginTop: "7px" }}
                />
              </td>
              <td>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                {/* <TextField placeholder="Search" value={query} onChange={(event) => { setQuery(event.target.value) }} fullWidth style={{ paddingRight: "20px", paddingLeft: '20px' }} /> */}
              </td>
              {/* This will probably need to be switched to an Autocomplete */}
              <>
                <td width={"20px"}>
                  <IconButton onClick={() => navigateToProfile()}>
                    <AccountCircleIcon />
                  </IconButton>
                </td>
                <td width={"20px"}>
                  <IconButton onClick={() => navigateToSettings()}>
                    <SettingsIcon />
                  </IconButton>
                </td>
                <td width={"20px"}>
                  <LogoutButton {...props}/>
                </td>
              </>
              {/* {props.Session ? (
                <>
                  {" "}
                  {props.User ? (
                    <>
                      <td width={"200px"}>
                        <WelcomeLabel
                          user={props.User}
                          DarkMode={props.DarkMode}
                        />
                      </td>
                      <td width={"20px"}>
                        <SettingsButton
                          User={props.User}
                          Session={props.Session}
                          DarkMode={props.DarkMode}
                          RefreshUser={props.RefreshUser}
                        />
                      </td>
                      <td width={"20px"}>
                        <UserButton User={props.User} />
                      </td>
                      <td width={"20px"}>
                        <LogoutButton />
                      </td>
                    </>
                  ) : (
                    <td>
                      <CircularProgress color="secondary" />
                    </td>
                  )}
                </>
              ) : (
                <>
                  <td width={"20px"}>
                    <IconButton onClick={() => navigateToProfile()}>
                      <AccountCircleIcon />
                    </IconButton>
                  </td>
                  <td width={"20px"}>
                    <IconButton onClick={() => navigateToSettings()}>
                      <SettingsIcon />
                    </IconButton>
                  </td>
                  <td width={"20px"}>
                    <IconButton onClick={() => logout()}>
                      <LogoutIcon />
                    </IconButton>
                  </td>
                </>
              )} */}
            </tr>
          </table>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ marginLeft: "10px", fontFamily: "DM Serif Display" }}
          >
            {" "}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar style={{ marginBottom: "20px" }} />

      <Dialog open={props.InvalidSession}>
        <DialogTitle> Session Expired </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your session was not found on the server, and has most likely
            expired. Please log in again.
          </DialogContentText>{" "}
        </DialogContent>
        <DialogActions>
          {" "}
          <LogoutButton {...props}/>{" "}
        </DialogActions>
      </Dialog>

      <Hamburger
        DarkMode={props.DarkMode}
        ToggleDarkMode={props.ToggleDarkMode}
        Session={props.Session}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        sendToLogin={sendToLogin}
        history={history}
        User={props.User}
      />
    </React.Fragment>
  );
}
