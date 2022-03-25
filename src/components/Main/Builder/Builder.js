import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import Courses from './Courses/Courses';
import Semesters from './Semesters/Semesters';

export default function Builder() {

    return (
        <div>
            <p>Builder works!</p>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item>
                    <Courses />
                </Grid>
                <Grid item>
                    <Semesters />
                </Grid>
            </Grid>
        </div>
    )

}