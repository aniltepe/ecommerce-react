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
            onBlur={props.onBlur}
            onChange={props.onChange}    
            InputLabelProps={{ style: { color: theme.palette.contrast.main } }}
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
                sx: { color: theme.palette.contrast.main, textAlign: "right", marginTop: "-2px", marginBottom: "-18px" } }}
            helperText={props.helperText} />
    );
}
export default CustomPassword;