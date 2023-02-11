import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { validateOnSubmit } from '../../Config/Validation';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Checkbox, FormControlLabel } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';
import { styled, useTheme } from '@mui/material/styles';
import CustomTextBox from '../layout/CustomTextBox';
import CustomPassword from '../layout/CustomPassword';

const LoginHelper = styled('div')(() => ({
    marginTop: "16px",
    display: "flex",
    alignItems: "center",
    flex: "1",
    justifyContent: "space-between"
}));

const CustomP = styled('p')(({ theme }) => ({
    color: theme.palette.contrast.main,
    cursor: "pointer",
    textDecoration: "underline",
    ':hover': { 
        color: theme.palette.contrastHover.main
    }
}));

const CustomLink = styled(Link)(({ theme }) => ({
    ':hover': { 
        color: theme.palette.contrastHover.main
    }
}));

function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();
    const [control, setControl] = React.useState({
        loginany: { id: "loginany", label: t("usernamephoneoremail"), rules: { required: true } },
        loginpassword: { id: "loginpassword", label: t("password"), rules: { required: true } },
        loginremember: { id: "loginremember", label: t("rememberme"), rules: { }}
    });
    
    const handleSubmit = () => {
        let isFormValid = validateOnSubmit(control, setControl, t);
        if (isFormValid) {
            return;
        }
    }

    return (
        <Dialog open={true} onClose={() =>  navigate("/")} sx={{ ".MuiBackdrop-root": { backdropFilter: "blur(2.5px)" } }}
            PaperProps={{ sx: { backgroundColor: theme.palette.dialog.main } }}>
            <DialogTitle sx={{ textAlign: "center", marginBottom: "8px", color: theme.palette.contrast.main }}>{t("welcomeback")}!</DialogTitle>
            <DialogContent>
                <CustomTextBox label={control.loginany.label} id={control.loginany.id} 
                    helperText={control.loginany.helperText} error={control.loginany.error}/>
                <CustomPassword label={control.loginpassword.label} id={control.loginpassword.id} 
                    helperText={control.loginpassword.helperText} error={control.loginpassword.error}/>
                <LoginHelper>
                    <FormControlLabel label={control.loginremember.label} sx={{ color: "contrast.main", ':hover': { color: "contrastHover.main" } }} control={
                        <Checkbox id={control.loginremember.id} sx={{ color: "contrast.main", padding: "0px", '&.Mui-checked': { color: "contrastHover.main" }}} /> }/>
                    <CustomP>
                        {t("forgotpass")}
                    </CustomP>
                </LoginHelper>
            </DialogContent>
            <DialogActions> 
                <Button color="buttonPrimary" variant="contained" fullWidth sx={{color: "buttonContrast.main", fontSize: "1.1em" }} onClick={handleSubmit}>
                    {t("signin")}
                </Button> 
            </DialogActions>
            <p style={{ display: "block", color: theme.palette.contrast.main, paddingLeft: "24px" }}>
                <Trans i18nKey="donthaveaccount"><CustomLink style={{ color: "inherit" }} to="/signup"></CustomLink></Trans>
            </p>
        </Dialog>
    );
}
export default Login;