import { ErrorOutline } from '@mui/icons-material';
import { Card, CardContent, Grid, IconButton, Typography, Dialog, DialogTitle, DialogContent, Divider, DialogActions, Button } from '@mui/material';
import React from 'react';

const card_style = {
    // width: '200px',
    margin: 10,
};

export default function CourseCard(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card elevation={2} id='sc' style={card_style}>


            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardContent >
                    <Grid container direction='column' justify='center'>
                        <Grid container alignItems='center'>
                            <Typography style={{ fontSize: 15, fontWeight: "bold" }}>{props.id}</Typography>
                            {/* <Typography style={{ fontSize: 10, color: '#7f7f7f' }}> - {props.section ?? '001'}</Typography> 
                                The figma mentions a section, but we can't really have that
                            */}
                        </Grid>
                        <Grid item>
                            <Typography style={{ fontSize: 11, color: '#7f7f7f' }}>{props.name}</Typography>
                        </Grid>
                        {/* <Grid item>
                            <Typography style={{ fontSize: 10, color: '#7f7f7f' }}>{props.professor ?? "The Professor"}</Typography>
                            The figma also mentions professor but... can we actually do this? Without a section?
                        </Grid> */}
                        <Grid item>
                            <Typography style={{ fontSize: 13, color: '#7f7f7f', position: 'relative', top: '20px' }}>
                                {props.credits ?? 0} credits
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <div >
                    <IconButton onClick={handleClickOpen} style={{ marginTop: '12px', marginLeft: '30px' }}>
                        <ErrorOutline style={{ width: '20px', height: '20px' }}></ErrorOutline>
                    </IconButton>
                </div>
                <div style={{ backgroundColor: props.color ?? 'purple', width: '10%', height: '100px' }} />
            </div>

            <CourseDialog {...props} open={open} handleClose={handleClose} />

        </Card>
    );

}

function CourseDialog(props) {

    const cellstyle={textAlign:'right', paddingRight:'10px'}

    return (<Dialog onClose={props.handleClose} open={props.open} maxWidth='sm'>
        <DialogTitle> {props.id} </DialogTitle>
        <DialogContent dividers>
            <table width='100%'>
                <tr>
                    <td width={1} style={cellstyle}>ID:</td>
                    <td>{props.id}</td>
                </tr>
                <tr>
                    <td style={cellstyle}>Name:</td>
                    <td>{props.name}</td>
                </tr>
                <tr>
                    <td style={cellstyle}>Credits:</td>
                    <td>{props.credits ?? 0}</td>
                </tr>
                <tr>
                    <td style={cellstyle}>Available:</td>
                    <td>{props.available ?? 'All Semesters'}</td>
                </tr>
                <tr><td colSpan={2}><Divider style={{marginTop:'10px',marginBottom:'10px'}}/></td></tr>
                <tr>
                    <td style={cellstyle}>Prerequesites:</td>
                    <td>N/A</td>
                </tr>
                <tr>
                    <td style={cellstyle}>Corequisites:</td>
                    <td>N/A</td>
                </tr>
            </table>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose}>OK</Button>
        </DialogActions>
    </Dialog>)

}