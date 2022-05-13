import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CommunityCard from "./CommunitySearchCard";
import { Grid } from "@mui/material";

export default function Community({props}) {
    const history = useHistory();
    const tempAPI = "https://classtrack-backend.herokuapp.com/classTrack/";
    const [topRated, setTopRated] = useState([]);
    const [mostVisited, setMostVisited] = useState([]);
    
    useEffect(() => {
        getLists();
    }, [props.User]);
    
    const getLists = async () => {
        if (props.User) {
        getTopRated(props.User.degree_id);
        getMostVisited(props.User.degree_id);
        }
    };
    
    const getTopRated = async (deptID) => {
        await axios({
        method: "GET",
        url: `${tempAPI}curriculum/top_rated`,
        params: {
            id: deptID,
            },
        })
        .then((res) => {
            console.log("curriculums Top Rated", res.data);
            console.log(`${tempAPI}curriculum/top_rated`);
            setTopRated(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    const getMostVisited = async (deptID) => {
        await axios({
            method: "GET",
            url: `${tempAPI}curriculum/top_degree`,
            params: {
                id: deptID,
            },
        })
            .then((res) => {
            console.log("curriculums Most Visited", res.data);
            setMostVisited(res.data);
            })
            .catch((err) => {
            console.log(err);
            });
        };

    return (
        <Grid justifyContent="center" container spacing={2}>
            <Grid item xs={5}>
                <CommunityCard
                    title ="Top Rated"
                    userCurriculumData={topRated} 
                />
            </Grid>
            <Grid item xs={5}>
                <CommunityCard
                    userCurriculumData={mostVisited}
                    title ="Most Visited" 
                />
            </Grid>
        </Grid>
    );
}