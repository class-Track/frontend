import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';

export default function Home() {

    const history = useHistory();

    const navigateToBuilder = () => {
        history.push("/Builder")
    }

    return (
        <div>
            <p>Home works!</p>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Button variant="contained" onClick={() => navigateToBuilder()}>Builder</Button>
                </Grid>
            </Grid>
        </div>
    )
}