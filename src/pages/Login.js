import React, { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { validateOnSubmit } from '../app/validation';
import { useDispatch, useSelector } from 'react-redux';
import { addSnackbarItem } from '../slices/uiSlice';
import { loginAsync, setLoggedUser, selectStatus } from '../slices/userSlice';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';
import { styled, useTheme } from '@mui/material/styles';
import CustomTextBox from '../components/custom/CustomTextBox';
import CustomPassword from '../components/custom/CustomPassword';
import { Close } from '@mui/icons-material';

const AdditionalInfo = styled('div')(() => ({
    marginTop: "16px",
    display: "flex",
    alignItems: "center",
    flex: "1",
    justifyContent: "space-between",
    height: "40px"
}));

const CustomP = styled('p')(({ theme }) => ({
    color: theme.palette.contrast.main,
    fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
    cursor: "pointer",
    textDecoration: "underline",
    ':hover': { 
        color: theme.palette.contrastHover.main
    }
}));

const CustomLink = styled(Link)(({ theme }) => ({
    color: "inherit",
    ':hover': { 
        color: theme.palette.contrastHover.main
    },
    fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
}));

const DialogFooter = styled('p')(({ theme }) => ({
    display: "block",
    color: theme.palette.contrast.main,
    paddingLeft: "24px"
}));

function Login() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const nsUserLoaded = i18n.hasLoadedNamespace('user');
    const navigate = useNavigate();
    const currStatus = useSelector(selectStatus);
    const theme = useTheme();
    const fields = {
        loginany: { id: "loginany", label: t("user:usernamephoneoremail"), rules: { required: true } },
        loginpassword: { id: "loginpassword", label: t("user:password"), rules: { required: true } },
        loginremember: { id: "loginremember", label: t("user:rememberme"), rules: { }}
    };
    const [control, setControl] = React.useState(fields);

    useEffect(() => {
        if (nsUserLoaded)
            setControl(fields);
    // eslint-disable-next-line 
    }, [nsUserLoaded]);
    
    const handleSubmit = () => {
        let isFormValid = validateOnSubmit(control, setControl, t);
        if (isFormValid) {
            const logindata = {
                any: document.getElementById(control.loginany.id).value,
                password: document.getElementById(control.loginpassword.id).value,
                remember: document.getElementById(control.loginremember.id).checked
            };
            dispatch(loginAsync(logindata)).then((action) => {
                console.log(action)
                if (action.type === "user/login/fulfilled") {
                    if (action.payload.status === 200) {
                        navigate("../");
                        dispatch(setLoggedUser(action.payload.data));
                        dispatch(addSnackbarItem({message: t("loginsuccessful"), autohide: 5000, type: "success"}));
                    }
                    else if (action.payload.status === 401) {
                        dispatch(addSnackbarItem({message: t("validation:passwordnocorrect"), autohide: 5000, type: "error"}));
                    }
                    else if (action.payload.status === 404) {
                        dispatch(addSnackbarItem({message: t("validation:usernotfound"), autohide: 5000, type: "error"}));
                    }
                }
                else if (action.type === "user/login/rejected") {
                    dispatch(addSnackbarItem({message: t("erroroccured"), autohide: 5000, type: "error"}));
                }
            }).catch((err) => {
                console.log(err);
                dispatch(addSnackbarItem({message: t("erroroccured"), autohide: 5000, type: "error"}));
            });
        }
    }

    return (
        <Dialog scroll="body" open={true} onClose={() => navigate("../")} sx={{ ".MuiBackdrop-root": { backdropFilter: "blur(2px)", filter: "blur(0px)" } }}
            PaperProps={{ sx: { backgroundColor: theme.palette.dialog.main } }}>
            <DialogTitle sx={{ textAlign: "center", marginBottom: "8px", color: theme.palette.contrast.main, fontFamily: "inherit" }}>
                {t("signinaccount")}!
                <Close sx={{float: "right", marginTop: "-8px", marginRight: "-16px"}} onClick={() => navigate("../")} />
            </DialogTitle>
            <DialogContent>
                <CustomTextBox label={control.loginany.label} id={control.loginany.id} 
                    helpertext={control.loginany.helpertext} error={control.loginany.error} longLabel={true}/>
                <CustomPassword label={control.loginpassword.label} id={control.loginpassword.id} 
                    helpertext={control.loginpassword.helpertext} error={control.loginpassword.error}/>
                <AdditionalInfo>
                    <FormControlLabel label={control.loginremember.label} sx={{ color: "contrast.main", ':hover': { color: "contrastHover.main" }, ".MuiTypography-root": { paddingLeft: "6px" } }} control={
                        <Checkbox id={control.loginremember.id} sx={{ color: "contrast.main", padding: "0px", '&.Mui-checked': { color: "contrastHover.main" }}} /> }/>
                    <CustomP onClick={() => console.log("forgot password")}>
                        {t("user:forgotpass")}
                    </CustomP>
                </AdditionalInfo>
            </DialogContent>
            <DialogActions> 
                <Button color="buttonPrimary" variant="contained" fullWidth sx={{color: "buttonContrast.main", fontSize: "1.1em" }} onClick={handleSubmit}>
                    {currStatus === "loading" ? <CircularProgress color='inherit' size={30.797} /> : t("login")}
                </Button> 
            </DialogActions>
            <DialogFooter>
                <Trans i18nKey="donthaveaccount">
                    <CustomLink to="../signup" />
                </Trans>
            </DialogFooter>
        </Dialog>
    );
}
export default Login;