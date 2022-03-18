import { createTheme } from '@mui/material/styles';

//TODO: These are the Neco light and dark themes
//please replace these later.

export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#12bf48', },
      secondary: { main: '#f50057', },
    },
  });
  
  export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#1c5621', },
      secondary: { main: '#f50057', },
    },
  })