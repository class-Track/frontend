import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import AdminCourses from "./AdminCourses";
import AdminDepartments from "./AdminDepartments";
import AdminDegrees from "./AdminDegrees";
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Autocomplete,
} from "@mui/material";
import AdminCategories from "./AdminCategories";

export default function Admin() {
  return (
    <div>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <AdminCourses />
        <AdminDepartments />
        <AdminDegrees />
        <AdminCategories />
      </Stack>
    </div>
  );
}
