import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { CircularProgress, Divider, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';
import CurriculumCarrouselCard from './CurriculumCarrouselCard';


export default function CurriculumCarrousel(props) {

    const [startIndex, setStartIndex] = useState(0);

    const Forward = () => { setStartIndex(startIndex+3) }
    const Backward = () => { setStartIndex(startIndex-3) }

    return (<>
        <div style={{fontSize:'1.25em'}}><b>{props.title}</b></div>
        <Divider style={{marginTop:'5px', marginBottom:'25px'}}/>
        <table width='100%' style={{minHeight:'200px'}}>
            <tr>
                <td width={1}><IconButton onClick={Backward} disabled={props.loading || !props.curriculums || startIndex === 0}><ArrowLeft /></IconButton></td>
                <td>
                    {!props.curriculums || props.loading
                        ? <div style={{ textAlign: 'center', marginTop:'20px' }}><CircularProgress size={'50px'}/></div> //pass down everything but all the curriculums
                        : <CarrouselGrid {...props} curriculums={undefined} items={props.curriculums.slice(startIndex, startIndex + 3)} />
                    }
                </td>
                <td width={1}><IconButton onClick={Forward} disabled={props.loading || !props.curriculums || props.curriculums.length <= startIndex + 3}><ArrowRight /></IconButton></td>
            </tr>
        </table>
    </>)
}

function CarrouselGrid(props) {

    //This *maybe* could've been a map but eh
    //With this at least now we can go ahead and ensure there's three grid slots.

    return (<>
        <Grid container spacing={2} width="100%">
            <Grid item xs={4}>
                {props.items[0] //Pass down everything but the items
                    ? <CurriculumCarrouselCard {...props} items={undefined} item={props.items[0]} />
                    : <></>}
            </Grid>
            <Grid item xs={4}>
                {props.items[1] //Pass down everything but the items
                    ? <CurriculumCarrouselCard {...props} items={undefined} item={props.items[1]} />
                    : <></>}
            </Grid>
            <Grid item xs={4}>
                {props.items[2] //Pass down everything but the items
                    ? <CurriculumCarrouselCard {...props} items={undefined} item={props.items[2]} />
                    : <></>}
            </Grid>
        </Grid>

    </>)

}