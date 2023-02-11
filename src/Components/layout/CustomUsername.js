import React from 'react';
import { useTheme } from '@mui/material/styles';
import { TextField, InputAdornment } from '@mui/material';

function CustomTextBox(props) {
    const theme = useTheme();
    
    return (
        <TextField id={props.id} color="contrast" margin="dense" label={props.label} type="text" fullWidth variant="standard"
            onFocus={() => { 
                document.getElementById(props.id + "-adorn").style.display = "flex"; 
                document.getElementById(props.id + "-label").style.transform = "translate(0, -1.5px) scale(0.75)"; 
            }}
            onBlur ={(event) => { 
                if (document.getElementById(props.id).value === "") {
                    document.getElementById(props.id + "-adorn").style.display = "none"; 
                    document.getElementById(props.id + "-label").style.transform = "translate(0, 20px) scale(1)"; 
                }
                props.onBlur(event);
            }}
            error={props.error}
            required={props.required}
            onChange={props.onChange}
            InputLabelProps={{ id: props.id + "-label", style: { color: theme.palette.contrast.main, transform: "translate(0, 20px) scale(1)" } }}
            InputProps={{ 
                id: props.id,
                startAdornment: <InputAdornment id={props.id + "-adorn"} sx={{color: theme.palette.contrast.main, display: "none"}} position="start">{window.location.host}/@</InputAdornment>,
                sx: { color: theme.palette.contrast.main, caretColor: theme.palette.contrast.main, textTransform: "lowercase", 
                    "&::before": { borderBottomColor: theme.palette.contrast.main + "77" },
                    "&:hover:not(.Mui-disabled):before": { borderBottomColor: theme.palette.contrast.main + "e3" } }
            }}
            inputProps={{
                style: { marginLeft: "-6px", textTransform: "lowercase" }
            }} 
            FormHelperTextProps={{ 
                id: props.id + "-helper-normal",
                sx: { color: theme.palette.contrast.main, textAlign: "right", marginTop: "-2px", marginBottom: "-18px" } }}
            helperText={props.helperText}
            />
    );
}
export default CustomTextBox;