import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import MenuBar from '../layout/MenuBar';
import DrawerMenu from '../layout/DrawerMenu';
import { ThemeProvider } from '@mui/material/styles'
import Login from './Login';
import Signup from './Signup';
import Config from '../../Config/Config';
import LandingPage from './LandingPage';
import CustomSnackbar, { useCustomSnackbar } from '../layout/CustomSnackbar';

export const SnackbarContext = createContext();

function App() {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? Config.Themes.dark : Config.Themes.light);
  const initRegion = (navigator.language || navigator.userLanguage).split("-").length > 1 
    ? Config.Regions[((navigator.language || navigator.userLanguage).split("-")[1]).toLowerCase()]
    : Config.Regions[Object.keys(Config.Regions).find(rgn => Config.Regions[rgn].preferredLanguage === i18n.resolvedLanguage)]
  const [region, setRegion] = useState(initRegion);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {add, items, setItems} = useCustomSnackbar();
  return (
    <ThemeProvider theme={theme}>
      <MenuBar setTheme={setTheme} region={region} setRegion={setRegion} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <DrawerMenu open={drawerOpen} setOpen={setDrawerOpen} />
      <CustomSnackbar items={items} setItems={setItems} />
      <SnackbarContext.Provider value={add}>
        <Routes>
          <Route path="/" element={ <LandingPage /> }>
            <Route path="login" element={ <Login /> } />
            <Route path="signup" element={ <Signup region={region} /> } />
          </Route>
        </Routes>
      </SnackbarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
