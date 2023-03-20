import React from 'react';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setGenericDialog, selectGenericDialog } from '../../slices/uiSlice';
import { setCurrCountry, getLangAsync, selectRegions, selectCountries, selectCurrCountry, selectLangs, selectCurrLang } from '../../slices/appSlice';
import { Close, Star } from '@mui/icons-material';
import { Buffer } from "buffer";

const CountryIcon = styled("img")(({theme}) => ({
    width: "19px",
    height: "19px",
    border: "1px solid black",
    borderRadius: "100%",
    objectFit: "cover",
    marginRight: "10px",
    marginLeft: "20px",
    borderColor: theme.palette.contrast.main
  }));

const RegionDiv = styled("div")(({theme}) => ({
    color: theme.palette.contrast.main
  }));

const CountryDiv = styled("div")(({theme}) => ({
    display: "inline-flex",
    alignItems: "center",
    width: "calc(50% - 8px)",
    margin: "4px",
    cursor: "pointer",
    ':hover': { 
        color: theme.palette.contrastHover.main,
        fontWeight: 400
    }
  }));

const LangDiv = styled("div")(({theme}) => ({
    display: "flex",
    lineHeight: "2em",
    alignItems: "center",
    paddingLeft: "30px",
    cursor: "pointer",
    ':hover': { 
        color: theme.palette.contrastHover.main,
        fontWeight: 400
    }
  }));

function Generic() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const type = useSelector(selectGenericDialog);
    const regions = useSelector(selectRegions);
    const langs = useSelector(selectLangs);
    const countries = useSelector(selectCountries);
    const currCountry = useSelector(selectCurrCountry);
    const currLang = useSelector(selectCurrLang);
    const theme = useTheme();

    return (
        <Dialog
            open={type !== ""} 
            scroll={type === "selectcountry" ? "body" : "paper"}
            onClose={() => dispatch(setGenericDialog(""))} 
            sx={{ ".MuiBackdrop-root": { backdropFilter: "blur(2px)", filter: "blur(0px)" } }}
            PaperProps={{ sx: { backgroundColor: theme.palette.dialog.main, minWidth: "280px" } }}>
            <DialogTitle sx={{ textAlign: "center", marginBottom: "8px", color: theme.palette.contrast.main, fontFamily: "inherit" }}>
                { type === "terms" && t("termsandconditions")}
                { type === "selectcountry" && "Choose Your Country or Region"}
                { type === "selectlang" && "Choose Language"}
                <Close sx={{float: "right", marginTop: "-8px", marginRight: "-16px"}} onClick={() => dispatch(setGenericDialog(""))} />
            </DialogTitle>
            <DialogContent sx={{color: theme.palette.contrast.main, whiteSpace: "pre-line", overflowY: "scroll" }}>
                { type === "terms" && t("terms:terms") }
                { type === "selectcountry" && 
                    regions.map((r) => {
                        return (
                        <RegionDiv key={r.id}>
                            <h2>{r.name}</h2>
                            { countries.filter((c) => c.level0 === r.id).sort((a, b) => a.name > b.name ? 1 : -1).map((c) => {
                                return (
                                <CountryDiv key={c.id} onClick={() => { 
                                    if (c.id !== currCountry.id) {
                                        dispatch(setCurrCountry({...c, icon: Buffer.from(c.icon, 'base64').toString()})); 
                                        dispatch(getLangAsync(c.preferredLangs[0])); 
                                    }
                                    dispatch(setGenericDialog("")); 
                                }}>
                                    <CountryIcon alt="" src={"data:image/svg+xml;base64," + Buffer.from(c.icon, 'base64').toString()} />
                                    <span>{c.name}</span>
                                </CountryDiv>
                                )
                                })
                            }
                        </RegionDiv>
                    )})
                }
                { type === "selectlang" &&
                    <>
                        { currCountry.preferredLangs.map((id) => {
                            return (
                                <LangDiv key={id} onClick={() => {
                                    if (id !== currLang.id)
                                        dispatch(getLangAsync(id));
                                    dispatch(setGenericDialog(""));
                                }}>
                                    <Star sx={{color:"#cdb327", position: "absolute", marginLeft: "-30px"}} />
                                    { id.toUpperCase() + " - " + langs.filter((l) => l.id === id)[0].name }
                                </LangDiv>
                        )}) }
                        { langs.filter((l) => currCountry.preferredLangs.indexOf(l.id) === -1).sort((a, b) => a.id > b.id ? 1 : -1).map((l) => {
                            return (
                                <LangDiv key={l.id} onClick={() => {
                                    if (l.id !== currLang.id)
                                        dispatch(getLangAsync(l.id));
                                    dispatch(setGenericDialog(""));
                                }}>
                                    { l.id.toUpperCase() + " - " + l.name }
                                </LangDiv>
                        )}) }
                    </> 
                }
            </DialogContent>
        </Dialog>
    );
}
export default Generic;