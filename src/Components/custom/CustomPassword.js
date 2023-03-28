import React from 'react';
import { useTheme } from '@mui/material/styles';
import { TextField, InputAdornment } from '@mui/material';
import { VisibilityOutlined } from '@mui/icons-material';

function CustomPassword(props) {
    const theme = useTheme();
    
    return (
        <TextField id={props.id} color="contrast" margin="dense" label={props.label} type="password" fullWidth variant="standard"
            error={props.error}
            required={props.required}
            onFocus = {() => { 
                const el = document.getElementById(props.id + "-label");
                el.style.transform = "translate(0, 5px) scale(0.75)"; 
                el.style.opacity = "0.7"; 
            }}
            onBlur = {(event) => { 
                if (document.getElementById(props.id).value === "") {
                    const el = document.getElementById(props.id + "-label");
                    el.style.transform = "translate(0, 20px) scale(1)"; 
                    el.style.opacity = "1"; 
                }
                if (props.onBlur)
                    props.onBlur(event);
            }}
            onChange={props.onChange}    
            InputLabelProps={{ id: props.id + "-label", style: { color: theme.palette.contrast.main } }}
            inputProps={{ onChange: (e) => { 
                    if (e.target.value !== "") {
                        document.getElementById(props.id + "-peek").style.display = "unset";
                        document.getElementById(props.id + "-placeholder").style.display = "none";
                    }
                    else {
                        document.getElementById(props.id + "-peek").style.display = "none";
                        document.getElementById(props.id + "-placeholder").style.display = "unset";
                    }
                }
            }}
            InputProps={{
                sx: { color: theme.palette.contrast.main, caretColor: theme.palette.contrast.main, 
                    "&::before": { borderBottomColor: theme.palette.contrast.main + "77" },
                    "&:hover:not(.Mui-disabled):before": { borderBottomColor: theme.palette.contrast.main + "e3" } },
                id: props.id,
                endAdornment: ( <InputAdornment position="end">
                    <VisibilityOutlined id={props.id + "-placeholder"} sx={{ opacity: "0.0" }} />
                    <VisibilityOutlined id={props.id + "-peek"} sx={{ cursor: "pointer", color: "contrast.main", opacity: "0.5", display: "none" }}
                        onMouseDown={(e) => { document.getElementById(props.id).type = "text"; 
                                              e.target.tagName === "svg" ? e.target.style.opacity = "0.9" : e.target.parentElement.style.opacity = "0.9"; } }
                        onMouseUp={(e) => { document.getElementById(props.id).type = "password"; 
                                            e.target.tagName === "svg" ? e.target.style.opacity = "0.5" : e.target.parentElement.style.opacity = "0.5"; 
                                            document.getElementById(props.id).focus(); } } 
                        onTouchStart={(e) => { document.getElementById(props.id).type = "text"; 
                                               e.target.tagName === "svg" ? e.target.style.opacity = "0.9" : e.target.parentElement.style.opacity = "0.9"; } }
                        onTouchEnd={(e) => { document.getElementById(props.id).type = "password"; 
                                             e.target.tagName === "svg" ? e.target.style.opacity = "0.5" : e.target.parentElement.style.opacity = "0.5";
                                             document.getElementById(props.id).focus(); } } />
                </InputAdornment>
            )}}
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
export default CustomPassword;