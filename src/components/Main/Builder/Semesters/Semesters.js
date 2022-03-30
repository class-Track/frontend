import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

export default function Semesters() {
    return (
        <div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    Test Semester 1
                </Grid>
                <Grid item>
                    Test Semester 2
                </Grid>
                <Grid item>
                    Test Semester 3
                </Grid>
                <Grid item>
                    Test Semester 4
                </Grid>
            </Grid>
        </div>
    )
}