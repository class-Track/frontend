import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";

//These generate gets using SessionIDs on the header as in Neco
//I'm not entirely sure if flask lets us see the headers, so we can change this if needed

//The API URL. Either the one provided by the environment variable, or the default
export const APIURL = process.env.APIURL ?? 'https://classtrack-api.herokuapp.com';
//TODO: REPLACE THE DEFAULT WITH THE ACTUAL API

const GenerateJSONPost = (SessionID, Body) => {
    return({
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'SessionID': SessionID },
        body: JSON.stringify(Body)
    })
}

const GenerateJSONPut = (SessionID,Body) => {
    return({
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json', 
            'SessionID': SessionID},
        body: JSON.stringify(Body)
    })
}


const GenerateGet = (SessionID) => {    
    return(SessionID ? {
        method: 'GET',
        headers: {'SessionID': SessionID },
    } : { method: 'GET'})
}

const GenerateDelete = (SessionID) => {    
    return({
        method: 'DELETE',
        headers: {'SessionID': SessionID },
    })
}

export const GetUser = (Session, setLoading, setUser, setInvalidSession) =>{

    //TODO REMOVE ONCE WE HAVE THE API DONE. OR IF ANYTHING UPDATE THIS SAMPLE USER WITH AN ACTUAL SAMPLE USER BECAUSE THIS IS ONE FROM NECO
    setUser({
        "name":"Chopo",
        "imageURL":"https://avatars.githubusercontent.com/u/49919240",
        "isAdmin":true,
        "isGov":false,
        "isSDC":false,
        "isUploader":false,
        "idGenerator":{},
        "id":"57174",
        "degree":{ "name":"Software Engineering" }
    });

    return;

    setLoading(true);
    fetch(APIURL + "/classTrack/me", GenerateGet(Session))
      .then(response => {
        if (!response.ok) {
          setInvalidSession(true)
          return undefined;
        }
        return response.json()
      }).then(data => {

        //Actually we don't need to check if it's undefined or not
        setUser(data)
        setLoading(false)
        //if it's invalid it'll just set undefined which is what user should be

      })

}

export const LogIn = (email, password, setSession, setLoading, setError) => {

    setLoading(true)

    fetch(APIURL + "/classTrack/login", GenerateJSONPost(null,{
        "email":email,"password":password
    }))
    .then(response=>{
        if (!response.ok) {
            setError(true)
            return undefined;
          }
          return response.json()
      }).then( data => {

        setSession(data)
        setLoading(false)

      })

}

export const LogOut = () => {

    const history = useHistory();
    const cookies = new Cookies();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'SessionID' : cookies.get('SessionID') },
      };

    fetch(APIURL + "/classTrack/logout",requestOptions).then( response => {
        cookies.remove("SessionID")
        history.go("/")
      })
      
}