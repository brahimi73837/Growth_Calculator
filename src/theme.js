// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E50914',
    },
    background: {
      default: '#141414', 
      paper: '#1C1C1C',
    },
    text: {
      primary: '#ffffff', 
      secondary: '#B3B3B3',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h4: {
      color: '#ffffff', 
      fontWeight: 'bold', 
    },
    body1: {
      color: '#ffffff', 
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#1C1C1C',
          borderRadius: 4,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default theme;