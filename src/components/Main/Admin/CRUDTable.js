import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";

export default function CRUDTable(props) {
  const tempAPI = "https://classtrack-backend.herokuapp.com/classTrack/";
  const [columns, setColumns] = useState(props.columns);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Divider sx={{ p: 1 }}>
        <Typography component="h2" variant="h4" color="gray" gutterBottom>
          {props.title}
        </Typography>
      </Divider>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    // style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <IconButton
                          aria-label="update"
                          onClick={() => {
                            console.log("editing", row["id"], row["name"]);
                            props.openEdit(row["id"], row["name"]);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            console.log("deleting", row["id"], row["name"]);
                            props.openDel(row["id"], row["name"]);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item sx={{ p: 1 }}>
            <IconButton
              onClick={() => {
                console.log("adding");
                props.openAdd();
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={props.list.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
