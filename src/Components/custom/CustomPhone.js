import React from 'react';
import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { IMaskInput } from 'react-imask';

const CustomPhoneMask = React.forwardRef(function CustomPhoneMask(props, ref) {
    const { onChange, regioncode, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask={'{' + regioncode + '} (#00) 000 00 00'}
            definitions={{ '#': /[1-9]/ }}
            lazy={false}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

function CustomPhone(props) {
    const theme = useTheme();
    const maskedCode = props.regionCode.replace("0", "\\0");
    const defaultMask = props.regionCode + " (___) ___ __ __";
    const [values, setValues] = React.useState({ [props.id + "-ref"]: '' });
    const handleChange = (event) => { setValues({  ...values, [event.target.name]: event.target.value }); };

    return (
        <TextField id={props.id} value={values[props.id + "-ref"]} color="contrast" margin="dense" label={props.label} type="text" fullWidth variant="standard"
            onFocus = {() => { 
                const el = document.getElementById(props.id + "-label");
                document.getElementById(props.id).style.opacity = "1.0"; 
                el.style.transform = "translate(0, 5px) scale(0.75)"; 
                el.style.opacity = "0.7"; 
            }}
            onBlur = {(event) => { 
                if (document.getElementById(props.id).value === defaultMask ) {
                    const el = document.getElementById(props.id + "-label");
                    document.getElementById(props.id).style.opacity = "0.0"; 
                    el.style.transform = "translate(0, 20px) scale(1)";
                    el.style.opacity = "1"; 
                }
                if (props.onBlur)
                    props.onBlur(event);
            }}
            error={props.error}
            required={props.required}
            onChange={handleChange}
            name={ props.id + "-ref" }
            InputLabelProps={{ id: props.id + "-label", style: { color: theme.palette.contrast.main, transform: "translate(0, 20px) scale(1)" } }}
            InputProps={{ 
                inputComponent: CustomPhoneMask,
                inputProps: { regioncode: maskedCode, id: props.id, style: { opacity: "0.0" } },
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
            helperText={props.helperText}
        />
    );
}

export default CustomPhone;