//om nom nom. You're too late. I ate the hamburger. Have this menu instead.
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SchoolIcon from "@mui/icons-material/School";
import { React, useState, useEffect } from "react";

export default function Hamburger(props) {
  const GenerateListItem = (props) => {
    return (
      <ListItem button key={props.text} onClick={() => props.PushTo(props.url)}>
        <ListItemIcon>
          {typeof props.image === "string" ? (
            <img
              src={
                "/icons/" + (props.DarkMode ? "white/" : "black/") + props.image
              }
              alt={props.imageAlt}
              width="30px"
              style={{ margin: "5px", marginLeft: "10px" }}
            />
          ) : (
            props.image
          )}
        </ListItemIcon>
        <ListItemText>{props.text}</ListItemText>
      </ListItem>
    );
  };

  const PushTo = (url) => {
    props.history.push(url);
    props.setMenuOpen(false);
  };

  return (
    <Drawer open={props.menuOpen} onClose={() => props.setMenuOpen(false)}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          <ListItem key="Logo">
            <div style={{ textAlign: "center", width: "100%" }}>
              <img
                src={"ct/" + (props.DarkMode ? "white" : "black") + "/logo.png"}
                alt="ClassTrack logo"
                height="75"
              />
            </div>
          </ListItem>
        </List>
        <Divider />

        {props.Session ? (
          <div>
            <Divider />
            <List>
              {/* TODO: Make a Curriculum icon */}
              <GenerateListItem
                text="Home"
                url="/Home"
                image="home.png"
                imageAlt="Curriculum"
                DarkMode={props.DarkMode}
                PushTo={PushTo}
              />
              <GenerateListItem
                text="Community"
                url="/Community"
                image="community.png"
                imageAlt="Curriculum"
                DarkMode={props.DarkMode}
                PushTo={PushTo}
              />
              {props.User && props.User.isAdmin ? (
                <div>
                  <GenerateListItem
                    text="Administrate"
                    url="/Admin"
                    image="admin.png"
                    imageAlt="Admin"
                    DarkMode={props.DarkMode}
                    PushTo={PushTo}
                  />
                  <GenerateListItem
                    text="Courses"
                    url="/AdminCourses"
                    image={<MenuBookIcon />}
                    imageAlt="Courses"
                    DarkMode={props.DarkMode}
                    PushTo={PushTo}
                  />
                  <GenerateListItem
                    text="Departments"
                    url="/AdminDepartments"
                    image={<AccountBalanceIcon />}
                    imageAlt="Admin"
                    DarkMode={props.DarkMode}
                    PushTo={PushTo}
                  />
                  <GenerateListItem
                    text="Degrees"
                    url="/AdminDegrees"
                    image={<SchoolIcon />}
                    imageAlt="Admin"
                    DarkMode={props.DarkMode}
                    PushTo={PushTo}
                  />
                </div>
              ) : (
                <div />
              )}
            </List>
            <Divider />
          </div>
        ) : (
          <List>
            <GenerateListItem
              text="Home"
              url="/Home"
              image="person.png"
              imageAlt="Person"
              DarkMode={props.DarkMode}
              PushTo={PushTo}
            />
            <GenerateListItem
              text="Community"
              url="/Community"
              image="Add.png"
              imageAlt="Add"
              DarkMode={props.DarkMode}
              PushTo={PushTo}
            />
          </List>
        )}

        <Divider />
        <List>
          <ListItem>
            <ListItemText style={{ textAlign: "center" }}>
              Dark Mode:
              <Switch
                checked={props.DarkMode}
                onChange={() => props.ToggleDarkMode()}
              />
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
