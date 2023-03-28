import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import MenuBar from '../components/layout/MenuBar';
import DrawerMenu from '../components/layout/DrawerMenu';
import SnackBar from '../components/layout/SnackBar';
import Generic from '../components/dialog/Generic';
import { ThemeProvider } from '@mui/material/styles'
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import LandingPage from '../pages/LandingPage';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryAsync, getLangAsync, getRegionsAsync, getLangsAsync, getCountriesAsync } from '../slices/appSlice';
import { selectCurrTheme } from '../slices/uiSlice';
import themes from './themes';
import TestPage from '../pages/TestPage';

function App() {
  console.log("inside App func");
  const dispatch = useDispatch();
  const theme = useSelector(selectCurrTheme);

  useEffect(() => {
    const settings = (navigator.language || navigator.userLanguage).split("-");
    const initLangCode = settings[0].toLowerCase();
    const initCountryCode = settings.length > 1 ? settings[1] : settings[0].toUpperCase();
    dispatch(getLangAsync(initLangCode));
    dispatch(getCountryAsync(initCountryCode));
    dispatch(getRegionsAsync());
    dispatch(getLangsAsync());
    dispatch(getCountriesAsync());
  }, [dispatch]);


  return (
    <ThemeProvider theme={themes[theme]}>
      <MenuBar />
      <DrawerMenu />
      <SnackBar />
      <Generic />
      <Routes>
        <Route path="/" element={ <LandingPage /> }>
          <Route path="login" element={ <Login /> } />
          <Route path="signup" element={ <Signup /> } />
        </Route>
        <Route path="test" element={ <TestPage /> }>
          <Route path="login" element={ <Login /> } />
          <Route path="signup" element={ <Signup /> } />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
