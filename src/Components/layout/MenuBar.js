import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button, IconButton, ButtonGroup  } from '@mui/material';
import { Menu, DarkModeOutlined, LightModeOutlined, ShoppingBagOutlined, 
    Translate, CheckCircleOutline, LocationOnOutlined,
    NotificationsOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Config from '../../Config/Config';
import { styled, useTheme } from '@mui/material/styles';

const AppBarIcons = styled('div')(({ theme }) => ({
    flex: "1",
    textAlign: "right",
}));

const AppBarUserBtns = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: "0px 12px", 
    alignItems: "flex-end",
    textAlign: "right",
    [theme.breakpoints.down('sm')]: {
        paddingRight: "0px"
    },
    [theme.breakpoints.up('sm')]: {
        paddingRight: "12px"
    }
}));

const TopRightIcon = styled('div')(({ theme }) => ({
    width: "16px",
    height: "16px",
    position: "absolute",
    [theme.breakpoints.down('sm')]: {
        top: "-3px",
        right: "-3px"
    },
    [theme.breakpoints.up('sm')]: {
        top: "0px",
        right: "0px"
    }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        padding: "4px"
    },
    [theme.breakpoints.up('sm')]: {
        padding: "8px"
    }
}));

function MenuBar(props) {
    const { t, i18n } = useTranslation();
    const [regionMenuOpen, setRegionMenuOpen] = useState(false);
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const theme = useTheme();
    
    return (
        <AppBar id="app-menubar" position="static">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu"
                    onClick={() => props.setDrawerOpen(!props.drawerOpen) }>
                    <Menu />
                </IconButton>
                <AppBarIcons>
                    <StyledIconButton color="inherit" aria-label="Theme"
                        onClick={() => { theme === Config.Themes.light ? props.setTheme(Config.Themes.dark) : props.setTheme(Config.Themes.light)} }>
                        { theme === Config.Themes.light ? <DarkModeOutlined /> : <LightModeOutlined /> }
                    </StyledIconButton>
                    { languageMenuOpen && 
                        <ButtonGroup orientation="vertical" sx={{ position: "absolute", backgroundColor: theme.palette.primary.main, zIndex: "6", marginTop: "36px" }}>
                            <Button color="inherit" aria-label="Language"
                                onClick={() => setLanguageMenuOpen(!languageMenuOpen) }
                                endIcon={ <CheckCircleOutline /> }>
                                { Config.Languages[i18n.resolvedLanguage].localName }
                            </Button>
                            {Object.keys(Config.Languages).map((lng) => (
                                lng !== i18n.resolvedLanguage &&
                                <Button key={lng} color="inherit" aria-label="SetLanguage"
                                    onClick={() => { i18n.changeLanguage(lng); setLanguageMenuOpen(false); } }
                                    endIcon={ lng === i18n.resolvedLanguage && <CheckCircleOutline /> }>
                                    { Config.Languages[lng].localName }
                                </Button>
                            ))}
                        </ButtonGroup>
                    }
                    <StyledIconButton color="inherit" aria-label="Language" sx={{ zIndex: "4" }} onClick={(e) => {
                        if (!languageMenuOpen) {
                            let eventListened = false;
                            let listenerFuncLang = (ev) => {
                                if (eventListened) {
                                    setLanguageMenuOpen(false);
                                    window.removeEventListener("click", listenerFuncLang);
                                    window.removeEventListener("scroll", listenerFuncLang);
                                    window.removeEventListener("touchmove", listenerFuncLang);
                                    window.removeEventListener("mousewheel", listenerFuncLang);
                                }
                                eventListened = !eventListened;
                            }
                            window.addEventListener("click", listenerFuncLang);
                            window.addEventListener("scroll", listenerFuncLang);
                            window.addEventListener("touchmove", listenerFuncLang);
                            window.addEventListener("mousewheel", listenerFuncLang);
                        }
                        setLanguageMenuOpen(!languageMenuOpen);
                        }}>
                        <Translate />
                        <TopRightIcon>
                            <div style={{ fontSize: "10px", lineHeight: "16px", textTransform: "uppercase", fontWeight: "600" }}>{i18n.resolvedLanguage}</div>
                        </TopRightIcon>
                    </StyledIconButton>
                    { regionMenuOpen && 
                        <ButtonGroup orientation="vertical" sx={{ 
                            position: "absolute", backgroundColor: theme.palette.primary.main,
                            borderRadius: "1.5em", border: "2px solid", borderColor: theme.palette.contrast.main,
                            marginLeft: "-2px", marginTop: "-2px", zIndex: "4" }}>
                            <StyledIconButton color="inherit" aria-label="Region" sx={{ zIndex: "5" }} onClick={() => setRegionMenuOpen(!regionMenuOpen) }>
                                { props.region.icon({theme: theme, width: "1em", borderWidth: "2px" }) }
                            </StyledIconButton>
                            {Object.keys(Config.Regions).map((rgn) => (
                                Config.Regions[rgn].name !== props.region.name &&
                                <StyledIconButton key={rgn} color="inherit" aria-label="SetRegion"
                                    onClick={() => { 
                                        props.setRegion(Config.Regions[rgn]);
                                        setRegionMenuOpen(false);
                                        i18n.changeLanguage(Config.Regions[rgn].preferredLanguage); 
                                    }}>
                                    { Config.Regions[rgn].icon({theme: theme, width: "1em", borderWidth: "2px" }) }
                                </StyledIconButton>
                            ))}
                        </ButtonGroup>
                    }
                    <StyledIconButton color="inherit" aria-label="Region" onClick={(e) => { 
                        if (!regionMenuOpen) {
                            let eventListened = false;
                            let listenerFuncRegion = (ev) => {
                                if (eventListened) {
                                    setRegionMenuOpen(false);
                                    window.removeEventListener("click", listenerFuncRegion);
                                    window.removeEventListener("scroll", listenerFuncRegion);
                                    window.removeEventListener("touchmove", listenerFuncRegion);
                                    window.removeEventListener("mousewheel", listenerFuncRegion);
                                }
                                eventListened = !eventListened;
                            }
                            window.addEventListener("click", listenerFuncRegion);
                            window.addEventListener("scroll", listenerFuncRegion);
                            window.addEventListener("touchmove", listenerFuncRegion);
                            window.addEventListener("mousewheel", listenerFuncRegion);
                        }
                        setRegionMenuOpen(!regionMenuOpen); 
                        }}>
                        <LocationOnOutlined />
                        { !regionMenuOpen &&
                            <TopRightIcon sx={{ fontSize: "16px" }}>
                                { props.region.icon({theme: theme, width: "14px", borderWidth: "1px" }) }
                            </TopRightIcon>
                        }
                    </StyledIconButton>
                    <StyledIconButton color="inherit" aria-label="ShoppingBag">
                        <ShoppingBagOutlined />
                        <TopRightIcon>
                            <div style={{ borderRadius: "100%", backgroundColor: theme.palette.contrast.main,
                                fontSize: "12px", lineHeight: "16px", color: theme.palette.contrastNegative.main }}>0</div>
                        </TopRightIcon>
                    </StyledIconButton>
                </AppBarIcons>
                { true
                    ? <AppBarUserBtns>
                        <Link to="/login" style={{ color: "inherit", textDecoration: "inherit" }}>
                            <Button color="buttonPrimary" variant="contained"
                                sx={{ padding: "0px 8px", margin: "3px 0px", textAlign: "right", color: "buttonContrast.main" }}>
                                {t("signin")}
                            </Button>
                        </Link>
                        <Link to="/signup" style={{ color: "inherit", textDecoration: "inherit" }}>
                            <Button color="buttonPrimary" variant="contained"
                                sx={{ padding: "0px 8px", margin: "3px 0px", textAlign: "right", color: "buttonContrast.main" }}>
                                {t("signup")}
                            </Button>
                        </Link>
                    </AppBarUserBtns>
                    : <>
                        <StyledIconButton color="inherit" aria-label="Notifications">
                            <NotificationsOutlined />
                            <TopRightIcon>
                                <div style={{ borderRadius: "100%", backgroundColor: theme.palette.contrast.main,
                                    fontSize: "12px", lineHeight: "16px", color: theme.palette.contrastNegative.main }}>3</div>
                            </TopRightIcon>
                        </StyledIconButton>
                        <div></div>
                    </>
                }
                
            </Toolbar>
        </AppBar>
    );
}
export default MenuBar;