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
          onFocus={() => { 
              document.getElementById(props.id).style.opacity = "1.0"; 
              document.getElementById(props.id + "-label").style.transform = "translate(0, -1.5px) scale(0.75)"; 
          }}
          onBlur ={(event) => { 
              if (document.getElementById(props.id).value === defaultMask ) {
                  document.getElementById(props.id).style.opacity = "0.0"; 
                  document.getElementById(props.id + "-label").style.transform = "translate(0, 20px) scale(1)"; 
              }
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
            sx: { color: theme.palette.contrast.main, textAlign: "right", marginTop: "-2px", marginBottom: "-18px" } }}
          helperText={props.helperText}
          />
  );
}

export default CustomPhone;