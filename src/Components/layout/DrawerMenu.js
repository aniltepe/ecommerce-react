import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Public, Storefront, Translate, DarkModeOutlined, LightModeOutlined, AppSettingsAlt } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useTheme, styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectDrawerOpen, setDrawerOpen, setCurrTheme, selectCurrTheme, setGenericDialog } from '../../slices/uiSlice';
import { selectCurrCountry, selectCurrLang } from '../../slices/appSlice';

const ListItemCustomIcon = styled("img")(({theme}) => ({
  width: "19px",
  height: "19px",
  border: "1px solid black",
  borderRadius: "100%",
  objectFit: "cover",
  marginRight: "10px",
  marginLeft: "15px",
  borderColor: theme.palette.contrast.main
}));

const ListItemIconStyled = styled(ListItemIcon)(({theme}) => ({
  padding: "6px",
  borderRadius: "100%",
  minWidth: "unset",
  // boxShadow: theme.palette.drawer.boxshadow,
  color: theme.palette.contrast.main
}));

const ListItemTextStyled = styled(ListItemText)(({theme}) => ({
  marginLeft: "15px",
  color: theme.palette.contrast.main
}));

const ListItemButtonStyled = styled(ListItemButton)(() => ({
  padding: "4px 8px"
}));


function DrawerMenu() {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const open = useSelector(selectDrawerOpen);
  const currLang = useSelector(selectCurrLang);
  const currCountry = useSelector(selectCurrCountry);
  const themeCode = useSelector(selectCurrTheme);
    return (
        <Drawer 
          anchor="left" 
          open={open} 
          onClose={() => dispatch(setDrawerOpen(false))}
          sx={{ zIndex: "1600", ".MuiBackdrop-root": { backdropFilter: "blur(2px)", filter: "blur(0px)" } }}
          PaperProps={{ 
            sx: {height: {xs: "calc(100dvh - 61px)", sm: "calc(100dvh - 64px)"}, bottom: "0px", top: "unset", width: "240px", backgroundColor: theme.palette.drawer.main }
          }} >
            <Box>
                <List onClick={() => dispatch(setDrawerOpen(false))}>
                  <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                    <ListItem disablePadding>
                      <ListItemButtonStyled>
                        <ListItemIconStyled>
                          <Storefront />
                        </ListItemIconStyled>
                        <ListItemTextStyled primary={t("shop")} />
                      </ListItemButtonStyled>
                    </ListItem>
                  </Link>
                  <Link to="test" style={{ color: "inherit", textDecoration: "inherit" }}>
                    <ListItem disablePadding>
                      <ListItemButtonStyled>
                        <ListItemIconStyled>
                          <AppSettingsAlt />
                        </ListItemIconStyled>
                        <ListItemTextStyled primary={"Test"} />
                      </ListItemButtonStyled>
                    </ListItem>
                  </Link>
                </List>

                <List sx={{width: "100%", position: "absolute", bottom: "0px"}}>
                  <ListItem disablePadding>
                    <ListItemButtonStyled onClick={() => {dispatch(setGenericDialog("selectlang")); dispatch(setDrawerOpen(false));}}>
                      <ListItemIconStyled>
                        <Translate />
                      </ListItemIconStyled>
                      <ListItemTextStyled primary={currLang.id.toUpperCase() + " - " + currLang.name} />
                    </ListItemButtonStyled>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButtonStyled onClick={() => {dispatch(setGenericDialog("selectcountry")); dispatch(setDrawerOpen(false));}}>
                      <ListItemIconStyled>
                        <Public />
                      </ListItemIconStyled>
                      <ListItemCustomIcon alt="" src={"data:image/svg+xml;base64," + currCountry.icon} />
                      <ListItemTextStyled sx={{marginLeft: "0px"}} primary={currCountry.name} />
                    </ListItemButtonStyled>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButtonStyled onClick={() => { themeCode === "light" ? dispatch(setCurrTheme("dark")) : dispatch(setCurrTheme("light"))}}>
                      <ListItemIconStyled>
                        { themeCode === "light" ? <LightModeOutlined /> : <DarkModeOutlined /> }
                      </ListItemIconStyled>
                      <ListItemTextStyled primary={themeCode === "light" ? t("lightmode") : t("darkmode")} />
                    </ListItemButtonStyled>
                  </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}
export default DrawerMenu;