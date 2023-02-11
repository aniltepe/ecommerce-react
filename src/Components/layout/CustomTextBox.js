import React from 'react';
import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';

function CustomTextBox(props) {
    const theme = useTheme();
    
    return (
        <TextField id={props.id} color="contrast" margin="dense" label={props.label} type="text" fullWidth variant="standard"
            error={props.error}
            required={props.required}
            onBlur={props.onBlur}
            onChange={props.onChange}
            InputLabelProps={{ style: { color: theme.palette.contrast.main } }}
            InputProps={{ 
                sx: { color: theme.palette.contrast.main, caretColor: theme.palette.contrast.main, 
                    "&::before": { borderBottomColor: theme.palette.contrast.main + "77" },
                    "&:hover:not(.Mui-disabled):before": { borderBottomColor: theme.palette.contrast.main + "e3" } }
            }} 
            FormHelperTextProps={{ 
                id: props.id + "-helper-normal",
                sx: { color: theme.palette.contrast.main, textAlign: "right", marginTop: "-2px", marginBottom: "-18px" } }}
            helperText={props.helperText}
            />
    );
}
export default CustomTextBox;