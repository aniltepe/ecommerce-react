import React, { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { checkusername, checkemail, checkphone } from '../services/userService';
import { validateOnChange, validateOnBlur, validateOnSubmit } from '../app/validation';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrCountry, selectCurrLang } from '../slices/appSlice';
import { setGenericDialog, addSnackbarItem } from '../slices/uiSlice';
import { signupAsync, selectStatus } from '../slices/userSlice';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, CircularProgress } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';
import { styled, useTheme } from '@mui/material/styles';
import CustomTextBox from '../components/custom/CustomTextBox';
import CustomPassword from '../components/custom/CustomPassword';
import CustomUsername from '../components/custom/CustomUsername';
import CustomPhone from '../components/custom/CustomPhone';
import { Close } from '@mui/icons-material';

const CustomLink = styled(Link)(({ theme }) => ({
    color: "inherit",
    ':hover': { 
        color: theme.palette.contrastHover.main
    },
    fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
}));

const CustomSpan = styled('span')(({ theme }) => ({
    color: theme.palette.contrast.main,
    fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
    paddingLeft: "6px"
}));

const TermsConditions = styled('span')(({ theme }) => ({
    color: theme.palette.contrast.main,
    fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
    cursor: "pointer",
    textDecoration: "underline",
    ':hover': { 
        color: theme.palette.contrastHover.main
    }
}));

const TermsErrorText = styled('p')(({theme}) => ({
    position: "absolute",
    right: "0px",
    bottom: "0px",
    color: "#d32f2f", 
    textAlign: "right",
    transform: "translate(0px, 100%)",  
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    margin: "0px",
    [theme.breakpoints.down('sm')]: {
        paddingTop: "2px",
        lineHeight: "0.6rem",
        fontSize: "0.68rem",
        letterSpacing: "0em",
        fontWeight: "300"
    },
    [theme.breakpoints.up('sm')]: {
        paddingTop: "4px",
        lineHeight: "0.75rem",
        fontSize: "0.75rem",
        letterSpacing: "0.03333em",
        fontWeight: "400"
    }
}));

const DialogFooter = styled('p')(({ theme }) => ({
    display: "block",
    color: theme.palette.contrast.main,
    paddingLeft: "24px"
}));

const AdditionalInfo = styled('div')(() => ({
    position: "relative",
    marginTop: "16px",
    display: "flex",
    alignItems: "center",
    flex: "1",
    justifyContent: "left",
    height: "40px",
    marginLeft: "-11px"
}));

function Signup() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const nsUserLoaded = i18n.hasLoadedNamespace('user');
    const nsValidLoaded = i18n.hasLoadedNamespace('validation');
    const navigate = useNavigate();
    const currCountry = useSelector(selectCurrCountry);
    const currLang = useSelector(selectCurrLang);
    const currStatus = useSelector(selectStatus);
    const theme = useTheme();
    const fields = {
        signupfullname: { id: "signupfullname", label: t("user:fullname"), rules: { maxlength: 150 } },
        signupusername: { id: "signupusername", label: t("user:username"), requiredlabel: true, rules: { required: true, match: /^([a-zA-Z0-9]+[\._]?)*$/, minlength: 4, maxlength: 30, eagerfunc: checkusername, allowedchars: [".", "_"] } },  // eslint-disable-line
        signupemail: { id: "signupemail", label: t("user:email"), rules: { match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, lazyfunc: checkemail } }, // eslint-disable-line
        signupphone: { id: "signupphone", label: t("user:phonenumber"),requiredlabel: true, rules: { required: true, minlength: 10, maskedchars: [currCountry.dialCode, " ", "(", ")", "_"], lazyfunc: checkphone } },
        signuppassword: { id: "signuppassword", label: t("user:password"), requiredlabel: true, defaulthelper: t('validation:passwordincludes'), helpertext: t('validation:passwordincludes'), rules: { required: true, minlength: 8, mustcontainlower: true, mustcontainupper: true, mustcontainnumber: true } },
        signuppasswordre: { id: "signuppasswordre", label: t("user:confirmpassword"), requiredlabel: true, rules: { required: true, mustequal: "signuppassword" }},
        signupacceptterms: { id: "signupacceptterms", rules: { required: true }}
    };
    const [control, setControl] = React.useState(fields);

    useEffect(() => {
        if (nsUserLoaded && nsValidLoaded && currCountry.name !== "")
            setControl(fields);
    // eslint-disable-next-line 
    }, [nsUserLoaded, nsValidLoaded, currCountry]);

    const OnChange = (event) => {
        validateOnChange(event, control, setControl, t);
    }
    const OnBlur = (event) => {
        validateOnBlur(event, control, setControl, t);
    }
    
    const handleSubmit = () => {
        let isFormValid = validateOnSubmit(control, setControl, t);
        if (isFormValid) {
            const signupdata = {
                fullname: document.getElementById(control.signupfullname.id).value,
                username: document.getElementById(control.signupusername.id).value.toLowerCase(),
                email: document.getElementById(control.signupemail.id).value,
                phone: document.getElementById(control.signupphone.id).value.replace("(", "").replace(")", "").replaceAll(" ", ""),
                language: currLang.id,
                country: currCountry.id,
                password: document.getElementById(control.signuppassword.id).value
            };
            dispatch(signupAsync(signupdata)).then((action) => {
                console.log(action)
                if (action.type === "user/signup/fulfilled") {
                    navigate("../");
                    dispatch(addSnackbarItem({message: t("accountcreated"), autohide: 5000, type: "success"}));
                }
                else if (action.type === "user/signup/rejected") {
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
            <DialogTitle sx={{ textAlign: "center", color: theme.palette.contrast.main, paddingBottom: "0px", fontFamily: "inherit" }}>
                {t("createaccount")}!
                <Close sx={{float: "right", marginTop: "-8px", marginRight: "-16px"}} onClick={() => navigate("../")} />
            </DialogTitle>
            <DialogContent sx={{overflow: "hidden"}}>
                <CustomTextBox label={control.signupfullname.label} id={control.signupfullname.id} />
                <CustomUsername label={control.signupusername.label} id={control.signupusername.id} 
                    helpertext={control.signupusername.helpertext} error={control.signupusername.error}
                    required={control.signupusername.requiredlabel} onChange={OnChange} onBlur={OnBlur} />
                <CustomTextBox label={control.signupemail.label} id={control.signupemail.id} 
                    helpertext={control.signupemail.helpertext} error={control.signupemail.error} 
                    required={control.signupemail.requiredlabel} onBlur={OnBlur}/>
                <CustomPhone label={control.signupphone.label} id={control.signupphone.id} regionCode={currCountry.dialCode}
                    helpertext={control.signupphone.helpertext} error={control.signupphone.error} 
                    required={control.signupphone.requiredlabel} onBlur={OnBlur} />
                <CustomPassword label={control.signuppassword.label} id={control.signuppassword.id} 
                    helpertext={control.signuppassword.helpertext} error={control.signuppassword.error}
                    required={control.signuppassword.requiredlabel} onBlur={OnBlur} />
                <CustomPassword label={control.signuppasswordre.label} id={control.signuppasswordre.id} 
                    helpertext={control.signuppasswordre.helpertext} error={control.signuppasswordre.error} 
                    required={control.signuppasswordre.requiredlabel} onBlur={OnBlur} onChange={OnChange} />
                <AdditionalInfo>
                    <Checkbox 
                        id={control.signupacceptterms.id} onChange={OnChange}
                        sx={{ color: "contrast.main", padding: "0px", '&.Mui-checked': { color: "contrastHover.main" }}} />
                    <CustomSpan>
                        <Trans i18nKey="acceptterms" ns="user">
                            <TermsConditions onClick={() => dispatch(setGenericDialog("terms"))} />
                        </Trans>
                    </CustomSpan>
                    { control.signupacceptterms.error && <TermsErrorText> { t("validation:termsnoagree") } </TermsErrorText> }
                </AdditionalInfo>
            </DialogContent>
            <DialogActions> 
                <Button color="buttonPrimary" variant="contained" fullWidth sx={{color: "buttonContrast.main", fontSize: "1.1em" }} onClick={handleSubmit} >
                    {currStatus === "loading" ? <CircularProgress color='inherit' size={30.797} /> : t("signup") }
                </Button>
            </DialogActions>
            <DialogFooter>
                <Trans i18nKey="alreadyhaveaccount">
                    <CustomLink to="../login" />
                </Trans>
            </DialogFooter>
        </Dialog>
    );
}
export default Signup;