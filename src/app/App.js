import { createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import MenuBar from '../components/layout/MenuBar';
import DrawerMenu from '../components/layout/DrawerMenu';
import { ThemeProvider } from '@mui/material/styles'
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import LandingPage from '../pages/LandingPage';
import SnackBar, { useSnackBar } from '../components/layout/SnackBar';
import Generic from '../components/dialog/Generic';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryAsync, getLangAsync, getRegionsAsync, getLangsAsync, getCountriesAsync } from '../slices/appSlice';
import { setCurrTheme, selectCurrTheme } from '../slices/uiSlice';
import themes from './themes';

export const SnackBarContext = createContext();

function App() {
  console.log("inside App func");
  const dispatch = useDispatch();
  const {add, items, setItems} = useSnackBar();

  useEffect(() => {
    const settings = (navigator.language || navigator.userLanguage).split("-");
    const initLangCode = settings[0].toLowerCase();
    const initCountryCode = settings.length > 1 ? settings[1] : settings[0].toUpperCase();
    const initTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    dispatch(setCurrTheme(initTheme));
    dispatch(getLangAsync(initLangCode));
    dispatch(getCountryAsync(initCountryCode));
    dispatch(getRegionsAsync());
    dispatch(getLangsAsync());
    dispatch(getCountriesAsync());
    // add({message: window.innerWidth + 'x' + window.innerHeight, autohide: 2000})
  }, [dispatch]);
  
  return (
    <ThemeProvider theme={themes[useSelector(selectCurrTheme)]}>
      <SnackBarContext.Provider value={add}>
        <MenuBar />
        <DrawerMenu />
        <SnackBar items={items} setItems={setItems} />
        <Generic />
        <Routes>
          <Route path="/" element={ <LandingPage /> }>
            <Route path="login" element={ <Login /> } />
            <Route path="signup" element={ <Signup /> } />
          </Route>
        </Routes>
      </SnackBarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
