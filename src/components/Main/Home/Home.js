import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CurriculumCarrousel from "../Curriculum/CurriculumCarrousel";
import DummyData from "../../../data/DummyData.json";
import {
  Fab,
  Tooltip,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { getUserCurriculum } from "../../../API";
import { red } from "@mui/material/colors";

function NewCurriculumButton(props) {
  //TODO Have this thing do something. Do we show a popup asking for name/department/other details or do we just link to a completely blank builder (?)
  return (
    <Tooltip title="Create a new curriculum">
      <Fab size="small" color="primary">
        {" "}
        <Add />{" "}
      </Fab>
    </Tooltip>
  );
}

export default function Home(props) {
  const history = useHistory();
  const APIURL = "http://127.0.0.1:5000/classTrack/"
  const [userCurriculum, setUserCurriculum] = useState([])
  const [draftCurriculum, setDraftCurriculum] = useState([])

  // getUserCurriculum(props.Session, setCurriculum).then((res) => {
  //   console.log("Frontend getUserCurriculum: ", res)
  //   userCurriculum = res
  // })

  const getCurriculum = async(session_id) => {
    let user;
    return await axios({
      method: "POST",
      url: APIURL + "me",
      data: {
        session_id: session_id,
      },
    })
      .then((res) => {
        user = res.data.first_name + " " + res.data.last_name
        axios({
          method: "GET",
          url: APIURL + "curriculum/user/" + (res.data.user_id),
        }).then((res) => {
          res.data.forEach(c => {
            c["user_name"] = user
            if(c['isDraft']){
              setDraftCurriculum(array => [...array, c])
            }
            else{
              setUserCurriculum(array => [...array, c])
            }
          });
          setUserCurriculum(res.data)
          })
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }


  useEffect(() => {
    getCurriculum(props.Session)
  },[])

  return (
    <div style={{ margin: 50 }}>
      {props.User ? (
        <div>
          <div style={{ padding: 10 }}>
            <CurriculumCarrousel
              {...props}
              title={"Your Curriculums"}
              loading={false}
              curriculums={userCurriculum}
              headerButton={NewCurriculumButton}
              editButtons={true}
            />
          </div>
          <div style={{ padding: 10 }}>
            <CurriculumCarrousel
              {...props}
              title={"Drafts"}
              loading={false}
              curriculums={draftCurriculum}
              editButtons={true}
            />
          </div>
          {props.User.isAdmin ? (
            <div />
          ) : (
            <div style={{ padding: 10 }}>
              <CurriculumCarrousel
                {...props}
                title={"Recomended"}
                loading={false}
                curriculums={DummyData}
              />
            </div>
          )}
        </div>
      ) : (
        <p>loading user...</p>
      )}
    </div>
  );
}
