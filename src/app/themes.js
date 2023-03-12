import { createTheme } from '@mui/material/styles';

export default {
    light: createTheme({ 
        palette:
        { 
            primary: { main: '#f5eded' },
            contrast: { main: '#000000e3' },
            contrastNegative: { main: '#eeeeee' },
            contrastHover: { main: '#555555' },
            dialog: { main: '#dfdfdf' },
            buttonPrimary: { main: '#000000e3' },
            buttonContrast: { main: '#eeeeee' },
            plainbg: { main: "#d0c7c7"}
        }
    }),
    dark: createTheme({ 
        palette: 
        { 
            primary: { main: '#26242b' },
            contrast: { main: '#eeeeee' },
            contrastNegative: { main: '#000000e3' },
            contrastHover: { main: '#aaaaaa' },
            dialog: { main: '#272727' },
            buttonPrimary: { main: '#000000e3' },
            buttonContrast: { main: '#eeeeee' },
            plainbg: { main: "#4b474c"}
        }
    })
};