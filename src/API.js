import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";

// export const APIURL = process.env.APIURL ?? "https://classtrack-backend.herokuapp.com/classTrack/";
export const APIURL = process.env.APIURL ?? "http://127.0.0.1:5000/classTrack/";
//TODO: REPLACE THE DEFAULT WITH THE ACTUAL API

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

export const logout = async (Session, removeSession, setUser) => {
  const history = useHistory();
  const cookies = new Cookies();

  await axios({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    url: APIURL + "logout",
    data: {
      session_id: Session,
    },
  })
    .then((res) => {
      console.log("result:", res.data);
      cookies.remove("SessionID");
      removeSession();
      setUser(undefined);
      history.push("/");
    })
    .catch((error) => {
      console.log("error:", error);
    });
};

export const SignUpAPI = async (data) => {

  await axios({
    method: "POST",
    url: APIURL + "user",
    data: {
      isAdmin: false,
      variant_id: parseInt(data.get("degree")),
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      email: data.get("email"),
      password: data.get("password"),
    },
  })
    .then((res) => {
      console.log("results:", res.data);
      history.push("/");
    })
    .catch((error) => {
      console.log("error:", error);
    });

}

export const getDegrees = async (setDegrees) => {
  await axios({
    method: "GET",
    url: APIURL + "degrees_dept",
  })
    .then((res) => {
      console.log("Degrees: ", res.data);
      setDegrees(res.data);
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const createHistory = async (Session, user_id,curriculum_id) => {
  
  //Why are we passing a session and a user. We should only be passing a session
  //The server can get the user attatched to it.

  //Imma leave it like this but someone please look over this
  
  await axios({
    method: "POST",
    url: APIURL + "history",
    data: {
      user_id: user_id,
      curriculum_id: curriculum_id,
      session_id: Session,
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error.data);
    });
};

export const getCurriculum = async (Session, id, setLoadCurriculum, setCurriculumData) => {
  
  //Hey, we need to pass the session, unless we're going to allow anyone 
  //To see any curriculum.

  setLoadCurriculum(false);
  await axios({
    method: "GET",
    url: APIURL + "currGraph/curr",
    params: {
      id: id ?? "CIIC_57_V28",
    },
  })
    .then((res) => {
      console.log(res.data);
      setCurriculumData(res.data);
      setLoadCurriculum(true);
    })
    .catch((error) => {
      console.log(error.data);
    });
};

export const getGraph = async (Session, name) => {
  await axios({
    method: "GET",
    url: tempAPI + "currGraph/curr",
    params: {
      name: name ?? "Test_Curriculum_4_54",
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error.data);
    });
};

export const saveGraph = async (Session, lists) => {
  let semesters = [];
  await axios({
    method: "POST",
    url: APIURL + "me",
    data: {
      session_id: Session,
    },
  })
    .then((res) => {
      years.forEach((year) => {
        lists[year]["semester_ids"].forEach((semester) => {
          semesters.push({
            ...lists[semester],
            id:
              res.data["degree_id"] +
              "_" +
              res.data["user_id"] +
              "_" +
              lists[semester].id,
          });
        });
      });
      let tempResponse = {
        graph: [
          {
            name:
              "Test_Curriculum_" +
              res.data["degree_id"] +
              "_" +
              res.data["user_id"],
            // program: res.data["degree_id"],
            program: 4,
            user: res.data["user_id"],
            semesters: semesters,
          },
        ],
      };
      console.log(tempResponse);
      axios({
        method: "POST",
        url: APIURL + "currGraph/student",
        data: tempResponse,
      })
        .then((res) => {
          console.log("result:", res.data);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    })
    .catch((error) => {
      console.log(error.data);
    });
};
