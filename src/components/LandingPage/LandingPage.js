import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from "react-router-dom";

function AdCard(props) {
  return (
  <Card sx={{ minWidth: '100%' }}>
    <CardContent>
      <img src={props.img} width='100%' alt='' style={props.fit ? {height:'200px', objectFit:'cover'} : {}}/>
      <Typography gutterBottom sx={{textAlign:'center', marginTop:'10px'}}> <h4>{props.title}</h4> </Typography>
      <Divider />
      <div style={{ minWidth: '100%', maxHeight: '200px', overflowY: 'auto' }} >
        {props.children}
      </div>
    </CardContent>
  </Card>)
}

export default function Home(props) {
  const history = useHistory();

  return (
    <div>

      <div style={{ marginBottom: '15px', position: 'relative' }}>
        <img src='/home.png' alt='Newpond Central' width='100%' style={{height:'300px', objectFit:'cover'}}/><br />
        <div style={{ position: 'absolute', bottom: '50%', left: '50%', transform: 'translate(-50%,50%)', textShadow: '2px 2px 8px #000000' }}>
          <img src='/ct/logo.png' height={'200px'} alt='Neco Logo'/>
        </div>
      </div>

      <h2 style={{ textAlign: 'center' }}>Are you ready to stay on track?</h2>
      <div style={{ marginTop: '20px' }}>
      <Grid container direction='row' justifyContent='center' spacing={2} alignItems='center'>
        <Grid item>
          <Button onClick={()=>{history.push("/Login")}}variant={'contained'}> Sign in</Button>
        </Grid>
        <Grid item>
          <Button onClick={()=>{history.push("/SignUp")}}variant={'contained'}> Sign up</Button>
        </Grid>
      </Grid>
      </div>
      <br />
      <Grid container style={{ minWidth: '100%' }} spacing={2}>
        <Grid item xs={props.Vertical ? 12 : 4}>
          <AdCard title='Centralized' img='/screenshots/ct2.png' fit={!props.Vertical}>
              ClassTrack gives you all the information you need to chart your path to graduation, all in one place. No more having to ask departments, or start a scavanger hunt for documents on ancient university websites.
          </AdCard>
        </Grid>

        <Grid item xs={props.Vertical ? 12 : 4}>
          <AdCard title='Easier' img='/screenshots/ct3.png' fit={!props.Vertical}>
            ClassTrack's curriculum makes it easy to chart out your plan to graduate. Plans can be easily built and verified to ensure all corequisites and pre-requisites are met, and that you complete all your credits at the end. No more stress on the day you pick your courses.
          </AdCard>
        </Grid>

        <Grid item xs={props.Vertical ? 12 : 4}>
          <AdCard title='Collaborative' img='/screenshots/ct1.png' fit={!props.Vertical}>
            ClassTrack's community feature means you're not alone. Share your plans to graduate, or start making your own from a published one. No need to start from scratch, or from your own department's curriculum.
          </AdCard>
        </Grid>

      </Grid>
    </div>
  );
}
