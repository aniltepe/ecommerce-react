import React from 'react';
import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';

function CustomTextBox(props) {
    const theme = useTheme();
    
    return (
        <TextField id={props.id} color="contrast" margin="dense" label={props.label} type="text" fullWidth variant="standard"
            error={props.error}
            required={props.required}
            onFocus = {() => { 
                const el = document.getElementById(props.id + "-label");
                el.style.letterSpacing = "normal"; 
                el.style.fontSize = "1rem"; 
                el.style.opacity = "0.7"; 
                el.style.transform = "translate(0, 5px) scale(0.75)"; 
            }}
            onBlur = {(event) => { 
                if (document.getElementById(props.id).value === "") {
                    const el = document.getElementById(props.id + "-label");
                    el.style.letterSpacing = props.longLabel && window.innerWidth < 600 ? "-0.4px" : "normal"; 
                    el.style.fontSize = props.longLabel && window.innerWidth < 600 ? "0.9rem" : "1rem"; 
                    el.style.opacity = "1"; 
                    el.style.transform = "translate(0, 20px) scale(1)"; 
                }
                if (props.onBlur)
                    props.onBlur(event);
            }}
            onChange={props.onChange}
            InputLabelProps={{ 
                id: props.id + "-label", 
                style: { 
                    color: theme.palette.contrast.main, 
                    letterSpacing: props.longLabel && window.innerWidth < 600 ? "-0.4px" : "normal",
                    fontSize: props.longLabel && window.innerWidth < 600 ? "0.9rem" : "1rem" } }}
            InputProps={{ 
                sx: { color: theme.palette.contrast.main, caretColor: theme.palette.contrast.main, 
                    "&::before": { borderBottomColor: theme.palette.contrast.main + "77" },
                    "&:hover:not(.Mui-disabled):before": { borderBottomColor: theme.palette.contrast.main + "e3" } }
            }} 
            FormHelperTextProps={{ 
                id: props.id + "-helper-normal",
                sx: { 
                    color: theme.palette.contrast.main, 
                    textAlign: "right", 
                    position: "absolute", 
                    marginTop: "0px", 
                    right: "0px", 
                    bottom: "0px", 
                    transform: "translate(0px, 100%)",  
                    paddingTop: {xs: "2px", sm: "4px"},
                    lineHeight: {xs: "0.6rem", sm: "0.75rem"}, 
                    fontSize: {xs: "0.68rem", sm: "0.75rem"},
                    letterSpacing: {xs: "0em", sm: "0.03333em"},
                    fontWeight: {xs: "300", sm: "400"}
                }
            }}
            helperText={props.helpertext}
        />
    );
}
export default CustomTextBox;