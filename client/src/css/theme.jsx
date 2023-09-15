import { createTheme } from '@mui/material/styles';
import { pink, cyan } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: pink,
        secondary: cyan,
    },
});

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#000000"
          },
        secondary: cyan,
    },
});