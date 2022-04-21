import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import CurriculumCarrousel from './CurriculumCarrousel';
import DummyData from './DummyData.json';

export default function Main(props) {

    const history = useHistory();
    // const API = 'https://classtrack-backend.herokuapp.com/'
    const API = props.API
    const cookies = new Cookies()
    const [session_id, setSessionID] = useState(cookies.get("SessionID"))
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        if (session_id) {
            getUserData()
        }
    }, [])

    const checkSession = async () => {
        await axios({

        })
    }

    const getUserData = async () => {
        await axios({
            method: 'POST',
            url: API + 'me',
            data: {
                session_id: session_id
            }
        }).then(res => {
            console.log('result:', res.data)
            setUserData(res.data)
        }).catch(error => {
            console.log('error:', error)
        })
    }

    const logout = async () => {
        await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            url: API + 'logout',
            data: {
                session_id: session_id
            }
        }).then(res => {
            console.log('result:', res.data)
            cookies.remove("SessionID")
            props.removeSession()
            history.push('/')
        }).catch(error => {
            console.log('error:', error)
        })
    }

    return (
        <div>
            <CurriculumCarrousel {...props} title={'Recent'} loading={false} curriculums={DummyData}/>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <p>Main page works!</p>
                    {userData ?
                        <div>
                            <p>session_id: {session_id}</p>
                            <p>first_name: {userData.first_name}</p>
                            <p>last_name: {userData.last_name}</p>
                            <p>email: {userData.email}</p>
                            <p>user_id: {userData.user_id}</p>
                            <p>degree_id: {userData.degree_id}</p>
                            <p>isAdmin: {userData.isAdmin.toString()}</p>
                        </div>
                        : <></>}
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => { logout() }}>Log Out</Button>
                </Grid>
            </Grid>
        </div>
    )
}
