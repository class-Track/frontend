import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import { CircularProgress } from "@mui/material";
import { GetUserProfile } from "../../API";



export default function ProfileSelf(props) {
  
    const [profile,setProfile] = useState(undefined)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(undefined)

    useEffect(() => {
      if (props.Session) {
        GetUserProfile(props.Session,setLoading,setProfile, setError)
      }
    }, [props.Session]);
  
    // Using hardcode right now
    // let user = 
    // {
    //     email: "julio.aguilar@email.com",
    //     first_name: "Julio",
    //     isAdmin: true,
    //     last_name: "Aguilar",
    //     university_id: 2,
    //     user_id: 57
    // }

    if(error){
      return(<div style={{textAlign:'center'}}>{error}</div>)
    }

    if(!profile || loading){
      return(<div style={{textAlign:'center'}}><CircularProgress/></div>)
    }

    //I leave this component as a separate thing in case we want to add anything around the profile of the current user (like options to manage it)
    // return(<>Display for currently logged in user. This should eventually delegate to ProfileUser.</>)
    return(
    <ProfileCard 
        name = {`${profile.first_name} ${profile.last_name}`}
        email = {`${profile.email}`}
        // curriculum = {`${user.user_id}`}
        curriculum = {`${profile.degree_name}`}
        // university = {`${user.university_id}`}
        university = {`${profile.university_name}`}
    />)
}
