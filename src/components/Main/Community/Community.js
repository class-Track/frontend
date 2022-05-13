import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CurriculumCarrousel from "../Curriculum/CurriculumCarrousel";

export default function Community({props}) {
        const history = useHistory();
        const tempAPI = "http://127.0.0.1:5000/classTrack/";
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
              console.log("curriculums", res.data);
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
                console.log("curriculums", res.data);
                setMostVisited(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          };


        return (
          <div style={{ margin: 50 }}>
            {props.User ? (
                  <div>
                    <div style={{ padding: 10 }}>
                      <CurriculumCarrousel
                        {...props}
                        title={"Top Rated Curriculums in your degree"}
                        loading={false}
                        curriculums={topRated}
                        editButtons={true}
                        update={true}
                      />
                    </div>
                    <div style={{ padding: 10 }}>
                      <CurriculumCarrousel
                        {...props}
                        title={"Most visited curriculums in your degree"}
                        loading={false}
                        curriculums={mostVisited}
                        editButtons={true}
                        update={true}
                      />
                    </div>
                  </div>
            ) : (
              <p>loading user...</p>
            )}
          </div>
        );
}