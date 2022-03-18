import React from 'react';
import { Container } from '@mui/material';
import NavMenu from './components/NavBar/NavBar';

export default function NavBarLayout(props) {
  
    return (
      <div>
        <NavMenu DarkMode={props.DarkMode} ToggleDarkMode={props.ToggleDarkMode} Session={props.Session} InvalidSession={props.InvalidSession} 
        setSession = {props.SetSession} RefreshUser = {props.RefreshUser} User={props.User} />
        <Container maxWidth='xl'> {props.children} </Container>
      </div>
    );
}
