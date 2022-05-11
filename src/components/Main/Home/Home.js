import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CurriculumCarrousel from "../Curriculum/CurriculumCarrousel";
import DummyData from "../../../data/DummyData.json";
import { Fab, Tooltip } from "@mui/material";
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
  const tempAPI = "http://127.0.0.1:5000/classTrack/";
  const [degrees, setDegrees] = useState([]);
  const [curriculums, setCurriculums] = useState([]);
  const [userCurriculum, setUserCurriculum] = useState([]);
  const [draftCurriculum, setDraftCurriculum] = useState([]);

  useEffect(() => {
    getLists();
  }, [props.User]);

  // getUserCurriculum(props.Session, setCurriculum).then((res) => {
  //   console.log("Frontend getUserCurriculum: ", res)
  //   userCurriculum = res
  // })

  const getLists = async () => {
    if (props.User) {
      if (props.User.isAdmin) {
        await axios({
          method: "GET",
          url: tempAPI + "degrees",
        })
          .then((res) => {
            console.log("degrees", res.data);
            setDegrees(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios({
          method: "GET",
          url: tempAPI + "curriculum/" + props.User.user_id,
        })
          .then((res) => {
            console.log("curriculums", res.data);
            setCurriculums(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div style={{ margin: 50 }}>
      {props.User ? (
        <div>
          <div style={{ padding: 10 }}>
            <CurriculumCarrousel
              {...props}
              title={
                props.User.isAdmin ? "Base Curriculums" : "Your Curriculums"
              }
              loading={false}
              curriculums={props.User.isAdmin ? degrees : curriculums}
              headerButton={NewCurriculumButton}
              editButtons={true}
            />
          </div>
          {props.User.isAdmin ? (
            <div />
          ) : (
            <div>
              <div style={{ padding: 10 }}>
                <CurriculumCarrousel
                  {...props}
                  title={"Drafts"}
                  loading={false}
                  curriculums={draftCurriculum}
                  editButtons={true}
                />
              </div>
              <div style={{ padding: 10 }}>
                <CurriculumCarrousel
                  {...props}
                  title={"Recomended"}
                  loading={false}
                  curriculums={DummyData}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>loading user...</p>
      )}
    </div>
  );
}
