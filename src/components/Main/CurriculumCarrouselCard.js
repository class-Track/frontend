import { Star } from '@mui/icons-material';
import { Button, ButtonGroup, Card, CardContent, Divider } from '@mui/material';
import { fontSize } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';


export default function CurriculumCarrouselCard(props) {
    let item = props.item

    return (<Card>
        <table width='100%'>
            <tr><td>
                <CardContent>
                    <table width='100%'><tr>
                        {/* Maybe implement a cutoff function so that we keep the item name to just one line */}
                        <td><b>{item.name}</b></td>
                        {/* Replace the following with the actual thing or move this elsewhere pls */}
                        <td width={'1'}> <Star /></td>
                        <td width={'1'}> {item.rating} </td>
                    </tr></table>
                    <Divider style={{ marginBottom: '10px' }} />
                    {/* I think the course/credit load is the most important thing. Optionally both of these should be displayed but idk. We can't be that information dense */}
                    <div>
                        {item.courses} courses ({item.credits} credits)<br />
                        {item.semesters} semesters
                    </div>
                    <div style={{ fontSize: '.7em', marginTop: '1em' }}>
                        By {item.user_name}<br />
                        {item.department_name}
                    </div>

                </CardContent>

            </td></tr>
            <tr><td><CardButtonRow {...props} /></td></tr>
        </table>

    </Card>)
}

function CardButtonRow(props) {

    let item=props.item
    return (
        <ButtonGroup fullWidth variant="outlined">
            <Button LinkComponent={Link} to={`/curriculum/${item.id}`} >View</Button>
            {/* User is passed down from App.js. Check there, or pass down another User object */}
            {/* Also please change this link to whatever the builder will use and whatever it will use eventually to specify we're going to build */}
            <Button LinkComponent={Link} to={`/Builder/${item.id}`} disabled={item.user_id !== props.User.id}>Edit</Button>
            {/* We will need to define an onclick */}
            <Button onClick={undefined}>Delete</Button>
        </ButtonGroup>
    )

}