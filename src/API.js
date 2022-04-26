import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCallback } from "react";

//These generate gets using SessionIDs on the header as in Neco
//I'm not entirely sure if flask lets us see the headers, so we can change this if needed

//The API URL. Either the one provided by the environment variable, or the default
// export const APIURL = process.env.APIURL ?? "https://classtrack-backend.herokuapp.com/classTrack/";
export const APIURL = process.env.APIURL ?? "http://127.0.0.1:5000/classTrack/";
//TODO: REPLACE THE DEFAULT WITH THE ACTUAL API

// const GenerateJSONPost = (SessionID, Body) => {
//   return {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       SessionID: SessionID,
//     },
//     body: JSON.stringify(Body),
//   };
// };

// const GenerateJSONPut = (SessionID, Body) => {
//   return {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       SessionID: SessionID,
//     },
//     body: JSON.stringify(Body),
//   };
// };

// const GenerateGet = (SessionID) => {
//   return SessionID
//     ? {
//         method: "GET",
//         headers: { SessionID: SessionID },
//       }
//     : { method: "GET" };
// };

// const GenerateDelete = (SessionID) => {
//   return {
//     method: "DELETE",
//     headers: { SessionID: SessionID },
//   };
// };

export const GetUser = async (
  Session,
  setLoading,
  setUser,
  setInvalidSession
) => {
  setLoading(true);
  console.log(Session);
  await axios({
    method: "POST",
    url: APIURL + "me",
    data: {
      session_id: Session,
    },
  })
    .then((res) => {
      console.log("result:", res.data);
      setInvalidSession(false);
      setUser(res.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log("error:", error);
      setInvalidSession(true);
    });
};

export const LogIn = async (email, password) => {
  return await axios({
    method: "POST",
    url: APIURL + "login",
    headers: { "Content-Type": "application/json" },
    data: {
      email: email,
      password: password,
    },
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.data);
      throw error;
    });
};

export const LogOut = () => {
  const history = useHistory();
  const cookies = new Cookies();

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      SessionID: cookies.get("SessionID"),
    },
  };

  fetch(APIURL + "/classTrack/logout", requestOptions).then((response) => {
    cookies.remove("SessionID");
    history.go("/");
  });
};
