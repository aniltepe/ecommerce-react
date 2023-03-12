import React, {useState} from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Storefront } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectDrawerOpen, setDrawerOpen } from '../../slices/uiSlice';

function DrawerMenu(props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const drawerOpen = useSelector(selectDrawerOpen);
  const dispatch = useDispatch();
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  let toolbar = document.getElementById("app-menubar");
  if (toolbar && toolbarHeight === 0) {
    setToolbarHeight(toolbar.clientHeight);
    setWindowHeight(window.innerHeight);
  }
  window.addEventListener("resize", () => {
    if (windowHeight !==  window.innerHeight)
      setWindowHeight(window.innerHeight);
    if (toolbar && toolbarHeight !== toolbar.clientHeight)
      setToolbarHeight(toolbar.clientHeight);
  });
    const toggle = (opt) => { 
        return () => props.setOpen(opt); };
    return (
        <Drawer anchor="left" open={drawerOpen} onClose={() => dispatch(setDrawerOpen(false))} sx={{ zIndex: "1600" }}
          PaperProps={{ 
            sx: {height: (windowHeight - toolbarHeight) + "px", top: toolbarHeight + "px" },
          }} >
            <Box sx={{ width: 200, backgroundColor: theme.palette.primary }}
              onClick={toggle(false)}
              onKeyDown={toggle(false)} >
                <List>
                  <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Storefront />
                        </ListItemIcon>
                        <ListItemText primary={"Mağaza"} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </List>
            </Box>
        </Drawer>
    )
}
export default DrawerMenu;