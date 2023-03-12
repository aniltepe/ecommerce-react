import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './app/App';
import { store } from './app/store';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    partialBundledLanguages: true,
    resources: { },
    ns: [],
    defaultNS: "default"
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <React.Suspense fallback="loading">
          <App />
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);