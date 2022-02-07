import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/normalize.css';
import { Provider } from "react-redux";
import { HelmetProvider } from 'react-helmet-async';
import store from "./stores"
import {BrowserRouter as Router} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
      <HelmetProvider>
          <Provider store={store}>
              <Router>
                  <App/>
              </Router>
          </Provider>
      </HelmetProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

