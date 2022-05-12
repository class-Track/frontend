import { createTheme } from '@mui/material/styles';

//TODO: These are the Neco light and dark themes
//please replace these later.

export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#3595FF', },
      secondary: { main: '#00B9FF', },
    },
  });
  
  export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#1c5621', },
      secondary: { main: '#f50057', },
    },
  })