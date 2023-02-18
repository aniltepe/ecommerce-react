import { createTheme } from '@mui/material/styles';
import { TR, US, GB, FR, DE, JP } from 'country-flag-icons/react/1x1';

const Themes = {
    light: createTheme({ 
        palette:
        { 
            primary: { main: '#ffecec' },
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

const Regions = {
    tr: {
        icon: (props) => { return <TR style={{ width: props.width, height: props.width, fontSize: "1.2rem", borderRadius: "100%", 
            borderColor: props.theme.palette.primary.contrastText, borderWidth: props.borderWidth, borderStyle: "solid" }}></TR> },
        name: "Türkiye",
        preferredLanguage: "tr",
        dialCode: "+90"
    },
    us: { 
        icon: (props) => { return <US style={{ width: props.width, height: props.width, fontSize: "1.2rem", borderRadius: "100%", 
            borderColor: props.theme.palette.primary.contrastText, borderWidth: props.borderWidth, borderStyle: "solid" }}></US> },
        name: "USA",
        preferredLanguage: "en",
        dialCode: "+1"
    },
    es: { 
        icon: (props) => { return <ES style={{ width: props.width, height: props.width, fontSize: "1.2rem", borderRadius: "100%", 
            borderColor: props.theme.palette.primary.contrastText, borderWidth: props.borderWidth, borderStyle: "solid" }}></ES> },
        name: "España",
        preferredLanguage: "es",
        dialCode: "+34"
    },
    gb: { 
        icon: (props) => { return <GB style={{ width: props.width, height: props.width, fontSize: "1.2rem", borderRadius: "100%", 
            borderColor: props.theme.palette.primary.contrastText, borderWidth: props.borderWidth, borderStyle: "solid" }}></GB> },
        name: "United Kingdom",
        preferredLanguage: "en",
        dialCode: "+44"
    },
    fr: { 
        icon: (props) => { return <FR style={{ width: props.width, height: props.width, fontSize: "1.2rem", borderRadius: "100%", 
            borderColor: props.theme.palette.primary.contrastText, borderWidth: props.borderWidth, borderStyle: "solid" }}></FR> },
        name: "France",
        preferredLanguage: "fr",
        dialCode: "+33"
    },
    de: { 
        icon: (props) => { return <DE style={{ width: props.width, height: props.width, fontSize: "1.2rem", borderRadius: "100%", 
            borderColor: props.theme.palette.primary.contrastText, borderWidth: props.borderWidth, borderStyle: "solid" }}></DE> },
        name: "Deutschland",
        preferredLanguage: "de",
        dialCode: "+49"
    },
    jp: {
        icon: (props) => { return <JP style={{ width: props.width, height: props.width, fontSize: "1.2rem", borderRadius: "100%", 
            borderColor: props.theme.palette.primary.contrastText, borderWidth: props.borderWidth, borderStyle: "solid" }}></JP> },
        name: "日本国",
        preferredLanguage: "ja",
        dialCode: "+81"
    }
};

const Languages = {
    tr: { localName: "Türkçe" },
    en: { localName: "English" },
    fr: { localName: "Français" },
    de: { localName: "Deutsch" },
    ja: { localName: "日本語" }
}

const exported = {
    Themes, Regions, Languages
}

export default exported;