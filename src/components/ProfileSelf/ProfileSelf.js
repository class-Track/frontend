import Cookies from "universal-cookie/es6";
import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import axios from "axios";



export default function ProfileDepartment({propsPackage, API}) {
    const cookies = new Cookies();
    const [session_id, setSessionID] = useState(cookies.get("SessionID"));
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      if (session_id) {
        getUserData();
      }
    }, []);
  
    const checkSession = async () => {
      await axios({});
    };
  
    const getUserData = async () => {
      await axios({
        method: "POST",
        url: API + "me",
        data: {
          session_id: session_id,
        },
      })
        .then((res) => {
          console.log("res:", res.data);
          setUserData(res.data);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    };

    // Using hardcode right now
    let user = 
    {
        email: "julio.aguilar@email.com",
        first_name: "Julio",
        isAdmin: true,
        last_name: "Aguilar",
        university_id: 2,
        user_id: 57
    }

    //I leave this component as a separate thing in case we want to add anything around the profile of the current user (like options to manage it)
    // return(<>Display for currently logged in user. This should eventually delegate to ProfileUser.</>)
    return(
    <ProfileCard 
        name = {`${user.first_name} ${user.last_name}`}
        email = {`${user.email}`}
        // curriculum = {`${user.user_id}`}
        curriculum = "Software Engineering"
        // university = {`${user.university_id}`}
        university = "University of Puerto Rico - Mayaguez" 
    />)
}
