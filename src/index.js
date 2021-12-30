import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/normalize.css';
import theme from './themes';
import {CssBaseline, ThemeProvider} from '@mui/material';
import { Provider } from "react-redux";
import store from "./stores"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

