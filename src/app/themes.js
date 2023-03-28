import { createTheme } from '@mui/material/styles';

const themes = {
    light: createTheme({ 
        palette:
        { 
            primary: { main: '#f5eded' },
            contrast: { main: '#000000e3' },
            contrastNegative: { main: '#eeeeee' },
            contrastHover: { main: '#555555' },
            dialog: { main: '#e7e5ec' },
            drawer: { main: '#dde1e7', boxshadow: `-3px -3px 8px rgb(255 255 255 / 90%), 
                                                    3px 3px 5px rgb(110 110 140 / 70%), 
                                                    inset -1px -1px 1px rgb(255 255 255 / 50%), 
                                                    inset 1px 1px 1px rgb(110 110 140 / 10%)` },
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
            drawer: { main: '#484848', boxshadow: `-2px -2px 6px rgb(150 150 150 / 25%), 
                                                    2px 2px 6px rgb(40 40 40 / 50%), 
                                                    inset -1px -1px 3px rgb(150 150 150 / 15%), 
                                                    inset 1px 1px 1px rgb(40 40 40 / 20%)` },
            buttonPrimary: { main: '#000000e3' },
            buttonContrast: { main: '#eeeeee' },
            plainbg: { main: "#4b474c"}
        }
    })
};

export default themes;