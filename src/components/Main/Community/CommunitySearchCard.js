import { createStyles, makeStyles } from '@mui/styles';
import { useState } from "react";
import StarRateIcon from '@mui/icons-material/StarRate';
import TextField from "@mui/material/TextField";
import { 
    Card,
    Box,
    Grid,
    CardContent,
    Dialog, 
    DialogActions, 
    CardHeader,
    Button,
    IconButton, 
    Typography,
 } from "@mui/material";
const useStyles = makeStyles(() =>
  createStyles({
    Boxy: {
        padding: "3% 8%",
        "boxShadow":"0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)",
        minHeight: "90vh"
      },
    searchText:{
        padding: "5px",
        justifyContent: "normal",
        fontSize: "2em",
        color: "blue",
        margin: 1,
      },
      card__community_title_h1:{
        "fontWeight":"bolder",
        "margin":"0",
        fontSize: "3em",
    },
    searchBar:{
        fontSize: "1.8rem",
        color: "white",
        width: "100%",
        height: "100%",
        padding: "0 0 0 1rem",
        background: "tomato",
        border: "none",
        outline: "none",
    }
  }),
);

const SearchBar = ({setSearchQuery}) => (
    <form>
      <TextField 
        sx={{
            fontSize: "1.8rem",
            color: "white",
            width: "100%",
            padding: "3px 0px",
        }}
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Search Curriculum"
        variant="outlined"
      />
    </form>
  );

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d["name"].toLowerCase().includes(query) || d["name"].includes(query)  || query === "" );
    }                    
  };

export default function CommunityCard(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, props.userCurriculumData); 
    console.log(props.userCurriculumData)
    const classes = useStyles();

    function CommunityTitle(props) {
        return (
           <div >
              <div>
                 <h1 className={classes.card__community_title_h1}>{props.title}</h1>
                 <hr></hr>
              </div>
           </div>
        );
     }
     
    return (
        <div className={classes.Boxy}>
            <div className={classes}>
                <CommunityTitle title={props.title}></CommunityTitle>
                <SearchBar 
                    className={classes.searchBar}
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                />
                <div style={{ padding: 3 }}>
                    {dataFiltered.map((d) => (
                    <div className={classes.searchText} key={d.id}>
                        <Card sx={{marginTop:"6px"}}>
                            <Box >
                                <CardContent sx={{textAlign:"center"}} >
                                    <Box>
                                        <Typography  component="div" variant="h5">
                                            {d.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {d.degree_name}
                                        </Typography>                                   
                                    </Box>
                                    <Box sx={{display:"flex", flexDirection:'row', justifyContent:"center"}}>
                                       <StarRateIcon sx={{color:"#FFDF00"}} />
                                       <Typography sx={{alignSelf:"end"}}>{d.rating}</Typography>
                                    </Box>
                                </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            </Box>
                                <CardContent sx={{textAlign:"center", display:"flex", direction:"column"}}>
                                    <Box sx={{padding:"5px 3px", flexBasis:"33%", borderRight:"1px solid rgba(0, 0, 0, 0.14)", borderTop:"1px solid rgba(0, 0, 0, 0.14)"}}>
                                        <Typography variant="subtitle2" color="textSecondary">Credits</Typography>
                                        <Typography sx={{color:"#afb3c5"}}>{d.credits}</Typography>                                      
                                    </Box>
                                    <Box sx={{padding:"5px 3px", flexBasis:"33%", borderLeft:"1px solid rgba(0, 0, 0, 0.14)", borderRight:"1px solid rgba(0, 0, 0, 0.14)", borderTop:"1px solid rgba(0, 0, 0, 0.14)"}}>
                                        <Typography  variant="subtitle2" color="textSecondary">Semesters</Typography>
                                        <Typography sx={{color:"#afb3c5"}}>{d.semesters}</Typography>    
                                    </Box>
                                    <Box sx={{padding:"5px 3px", flexBasis:"33%", borderLeft:"1px solid rgba(0, 0, 0, 0.14)", borderTop:"1px solid rgba(0, 0, 0, 0.14)"}}>
                                        <Typography variant="subtitle2" color="textSecondary">Course Count</Typography>
                                        <Typography sx={{color:"#afb3c5"}}>{d.course_count}</Typography>                        
                                    </Box>
                                    </CardContent>
                            </Box>
                        </Card>
                    </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}