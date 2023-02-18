import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { checkusername, checkemail, checkphone } from '../../Services/UserService';
import { validateOnChange, validateOnBlur, validateOnSubmit } from '../../Config/Validation';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';
import { styled, useTheme } from '@mui/material/styles';
import CustomTextBox from '../layout/CustomTextBox';
import CustomPassword from '../layout/CustomPassword';
import CustomUsername from '../layout/CustomUsername';
import CustomPhone from '../layout/CustomPhone';

const CustomLink = styled(Link)(({ theme }) => ({
    ':hover': { 
        color: theme.palette.contrastHover.main
    }
}));

function Signup(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();
    const [control, setControl] = React.useState({
        signupfullname: { id: "signupfullname", label: t("fullname"), rules: { } },
        signupusername: { id: "signupusername", label: t("username"), requiredLabel: true, rules: { required: true, minlength: 4, maxlength: 30, uniquefuncimmdt: checkusername, allowedchars: [".", "_"] } },
        signupemail: { id: "signupemail", label: t("email"), rules: { match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, uniquefunclazy: checkemail } }, // eslint-disable-line
        signupphone: { id: "signupphone", label: t("phonenumber"),requiredLabel: true, rules: { required: true, minlength: 10, maskedchars: [props.region.dialCode, " ", "(", ")", "_"], uniquefunclazy: checkphone } },
        signuppassword: { id: "signuppassword", label: t("password"), requiredLabel: true, dfltHelper: t('passwordincludes'), helperText: t('passwordincludes'), rules: { required: true, minlength: 8, mustcontainlower: true, mustcontainupper: true, mustcontainnumber: true } },
        signuppasswordre: { id: "signuppasswordre", label: t("confirmpassword"), requiredLabel: true, rules: { required: true, mustequal: "signuppassword" }}
    });

    const OnChange = (event) => {
        validateOnChange(event, control, setControl, t);
    }
    const OnBlur = (event) => {
        validateOnBlur(event, control, setControl, t);
    }
    
    const handleSubmit = () => {
        let isFormValid = validateOnSubmit(control, setControl, t);
        if (isFormValid) {
            return;
        }
    }

    return (
        <Dialog open={true} onClose={() =>  navigate("/")} sx={{ ".MuiBackdrop-root": { backdropFilter: "blur(2.5px)" } }}
            PaperProps={{ sx: { backgroundColor: theme.palette.dialog.main } }}>
            <DialogTitle sx={{ textAlign: "center", marginBottom: "8px", color: theme.palette.contrast.main }}>{t("createaccount")}!</DialogTitle>
            <DialogContent>
                <CustomTextBox label={control.signupfullname.label} id={control.signupfullname.id} />
                <CustomUsername label={control.signupusername.label} id={control.signupusername.id} 
                    helperText={control.signupusername.helperText} error={control.signupusername.error}
                    required={control.signupusername.requiredLabel} onChange={OnChange} onBlur={OnBlur} />
                <CustomTextBox label={control.signupemail.label} id={control.signupemail.id} helperText={control.signupemail.helperText}
                    error={control.signupemail.error} required={control.signupemail.requiredLabel} onBlur={OnBlur}/>
                <CustomPhone label={control.signupphone.label} id={control.signupphone.id} regionCode={props.region.dialCode}
                    helperText={control.signupphone.helperText} error={control.signupphone.error} 
                    required={control.signupphone.requiredLabel} onBlur={OnBlur} />
                <CustomPassword label={control.signuppassword.label} id={control.signuppassword.id} 
                    helperText={control.signuppassword.helperText} error={control.signuppassword.error}
                    required={control.signuppassword.requiredLabel} onBlur={OnBlur} />
                <CustomPassword label={control.signuppasswordre.label} id={control.signuppasswordre.id} 
                    helperText={control.signuppasswordre.helperText} error={control.signuppasswordre.error} 
                    required={control.signuppasswordre.requiredLabel} onBlur={OnBlur} />
            </DialogContent>
            <DialogActions> 
                <Button color="buttonPrimary" variant="contained" fullWidth sx={{color: "buttonContrast.main", fontSize: "1.1em" }} onClick={handleSubmit} >
                    {t("signup")}
                </Button>
            </DialogActions>
            <p style={{ display: "block", color: theme.palette.contrast.main, paddingLeft: "24px" }}>
                <Trans i18nKey="alreadyhaveaccount"><CustomLink style={{ color: "inherit" }} to="/login"></CustomLink></Trans>
            </p>
        </Dialog>
    );
}
export default Signup;