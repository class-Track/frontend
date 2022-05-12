import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar } from '@mui/material';
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.red,
    },
    card: {
        "fontFamily":"\"Segoe UI\"",
        "margin":"0 auto",
        "borderRadius":"5px",
        "overflow":"hidden",
        "width":"50%",
        "padding":"15px 25px",
        "boxShadow":"0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)",
        "minWidth": "250px",
        "maxWidth": "40%"
    },
    card__personal:{
        "display":"flex",
        "justifyContent":"flex-start",
        "margin": "3%",
        flexWrap: "wrap",
    },
    card__nameHolder_h1:{
        "fontSize":"30px",
        "margin":"0",
    },
    card__nameHolder_h2:{
        "margin":"0",
        "fontSize":"15px",
        "color":"grey",
    },
    card__info:{
        "display":"flex",
        "justifyContent":"space-between",
        "padding":"20px 25px",
        "fontWeight":"lighter",
        "color":"#3b3a3a",
        "fontSize":"20px"
    },
    card__info_span:{
        "borderBottom":"1px solid #cbcbcb"
    },
    card__avatar_img:{
        "borderRadius":"40px",
        "width":"60px",
        "height":"60px",
        "border":"5px solid #fff",
        "boxShadow":"0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
        "marginRight":"25px"
    },
    card__skills:{
        "marginBottom":"5px"
    },
    card__skills_span:{
        "display":"inline-block",
        "height":"32px",
        "fontSize":"13px",
        "fontWeight":"500",
        "color":"rgba(0, 0, 0, 0.6)",
        "lineHeight":"32px",
        "padding":"0 12px",
        "borderRadius":"16px",
        "backgroundColor":"#e4e4e4",
        "marginBottom":"5px",
        "marginRight":"5px"
    },
    card__curriculum:{
        "backgroundColor":"#f8f9f9",
        "margin":"0px -25px",
        "display":"flex",
        "justifyContent":"space-around",
        "padding":"13px",
        "textAlign":"center",
        "color":"#6e6e6e",
        "borderTop":"1px solid #eaeaea",
    },
    card__curriculum_h1:{
        "fontWeight":"bolder",
        "margin":"0",
        "fontSize":"20px"
    },
    card_universityButton:{
        "display":"block",
        "backgroundColor":"#3595FF",
        "textDecoration":"none",
        "textAlign":"center",
        "margin":"0px -25px -15px -25px",
        "lineHeight":"60px","color":"#fff",
        "fontWeight":"bolder",
        "cursor":"pointer",
        "WebkitUserSelect":"none",
        "MozUserSelect":"none","MsUserSelect":"none"
    }
}),
);

const theme = createTheme();

export default function ProfileCard(props) {
  const classes = useStyles();
  function Curriculum(props) {
    return (
       <div className={classes.card__curriculum}>
          <div>
             <h1 className={classes.card__curriculum_h1}>{props.curriculum}</h1>
          </div>
       </div>
    );
 }
 
 function Skills(props) {
    let startKey = 0;
    return (
       <div className={classes.card__skills}>
          {
             props.skills.map(elem => {
                return <span className={classes.card__skills_span} key={startKey++}>{elem}</span>
             })
          }
       </div>
    );
 }
 
 function Avatar(props) {
    return (
       <div >
          <img className={classes.card__avatar_img} src={props.image} alt="user avatar" />
       </div>
    );
 }
 
 function NameHolder(props) {
    return (
       <div>
          <h1 className={classes.card__nameHolder_h1}>{props.name}</h1>
          <h2 className={classes.card__nameHolder_h2}>{props.email}</h2>
       </div>
    );
 }
 function UniversityButton(props) {
    return (
       <div className={classes.card_universityButton}>{props.university}</div>
    );
 }
 
//  function Info(props) {
//     return (
//        <div className={classes.card__info}>
//           <span className={classes.card__info_span}>Pens: {props.pens}</span>
//           <span className={classes.card__info_span}>Posts: {props.posts}</span>
//           <span className={classes.card__info_span}>Projects: {props.projects}</span>
//        </div>
//     );
//  }
  return (
    <ThemeProvider theme={theme}>
        <div className={classes.card}>
            <div className={classes.card__personal}>
                <Avatar image="https://raw.githubusercontent.com/JustMonk/codepen-resource-project/master/img/pixel%20avatar.png" />
                <NameHolder name={props.name} email={props.email} />
            </div>
            <Curriculum curriculum={props.curriculum} />
            <UniversityButton university={props.university}/>
        </div>    
    </ThemeProvider>
  );
}