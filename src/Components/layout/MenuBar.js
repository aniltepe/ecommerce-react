import React from 'react';
import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button, IconButton  } from '@mui/material';
import { Menu, DarkModeOutlined, LightModeOutlined, ShoppingBagOutlined, 
    NotificationsOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawerOpen, setCurrTheme, selectCurrTheme } from '../../slices/uiSlice';

const AppBarIcons = styled('div')(() => ({
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

function MenuBar() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const themeCode = useSelector(selectCurrTheme);
    const theme = useTheme();
    
    return (
        <AppBar id="app-menubar" position="static">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu"
                    onClick={() => dispatch(setDrawerOpen(true)) }>
                    <Menu />
                </IconButton>
                <AppBarIcons>
                    <StyledIconButton color="inherit" aria-label="Theme"
                        onClick={() => { themeCode === "light" ? dispatch(setCurrTheme("dark")) : dispatch(setCurrTheme("light"))} }>
                        { themeCode === "light" ? <DarkModeOutlined /> : <LightModeOutlined /> }
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
                                {t("login")}
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