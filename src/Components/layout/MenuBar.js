import React from 'react';
import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button, IconButton, MenuItem, ListItemIcon, Divider  } from '@mui/material';
import MenuComponent from '@mui/material/Menu';
import { Menu, ShoppingBagOutlined, NotificationsOutlined, Logout, AccountCircle, Settings } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawerOpen, addSnackbarItem } from '../../slices/uiSlice';
import { logoutAsync, selectLoggedUser } from '../../slices/userSlice';

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

const UserIconButton = styled('img')(({ theme }) => ({
    width: "30px",
    height: "30px",
    borderRadius: "100%",
    objectFit: "cover",
    cursor: "pointer",
    [theme.breakpoints.down('sm')]: {
        padding: "1px 6px"
    },
    [theme.breakpoints.up('sm')]: {
        padding: "5px 8px"
    }
}));

function MenuBar() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const loggedUser = useSelector(selectLoggedUser);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    return (
        <AppBar id="app-menubar" position="static" sx={{height: {xs: "61px", sm: "64px"}}}>
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu"
                    onClick={() => dispatch(setDrawerOpen(true)) }>
                    <Menu />
                </IconButton>
                <AppBarIcons>
                    <StyledIconButton color="inherit" aria-label="ShoppingBag" onClick={() => dispatch(addSnackbarItem({message: "Shopping bag clicked"}))}>
                        <ShoppingBagOutlined />
                        <TopRightIcon>
                            <div style={{ borderRadius: "100%", backgroundColor: theme.palette.contrast.main,
                                fontSize: "12px", lineHeight: "16px", color: theme.palette.contrastNegative.main }}>0</div>
                        </TopRightIcon>
                    </StyledIconButton>
                </AppBarIcons>
                { !loggedUser
                    ? <AppBarUserBtns>
                        <Link to="./login" relative="path" style={{ color: "inherit", textDecoration: "inherit" }}>
                            <Button color="buttonPrimary" variant="contained"
                                sx={{ padding: "0px 8px", margin: "3px 0px", textAlign: "right", color: "buttonContrast.main" }}>
                                {t("login")}
                            </Button>
                        </Link>
                        <Link to="./signup" relative="path" style={{ color: "inherit", textDecoration: "inherit" }}>
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
                                    fontSize: "12px", lineHeight: "16px", color: theme.palette.contrastNegative.main }}>0</div>
                            </TopRightIcon>
                        </StyledIconButton>
                        <UserIconButton alt="" src={"data:image/png;base64," + loggedUser.image} onClick={(e) => setAnchorEl(e.currentTarget)} />
                        <MenuComponent anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} onClick={() => setAnchorEl(null)}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
                          <MenuItem onClick={() => setAnchorEl(null)}>
                            <ListItemIcon>
                              <AccountCircle fontSize="small" />
                            </ListItemIcon>
                            { t("user:profile") }
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={() => setAnchorEl(null)}>
                            <ListItemIcon>
                              <Settings fontSize="small" />
                            </ListItemIcon>
                            { t("user:settings") }
                          </MenuItem>
                          <MenuItem onClick={() => { 
                            dispatch(logoutAsync()).then(() => { 
                                dispatch(addSnackbarItem({message: t("loggedout"), type: "info", autohide: 5000}));
                            });
                            setAnchorEl(null); 
                          }}>
                            <ListItemIcon>
                              <Logout fontSize="small" />
                            </ListItemIcon>
                            { t("user:logout") }
                          </MenuItem>
                        </MenuComponent>
                    </>
                }
                
            </Toolbar>
        </AppBar>
    );
}
export default MenuBar;