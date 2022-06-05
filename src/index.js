import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

// import store from "./redux/store";

import {store} from "./reduxToolkit/store"


import {BrowserRouter} from "react-router-dom";

import "./scss/app.scss"

import App from './App';




ReactDOM.render(
      <BrowserRouter>
          <Provider store={store}>
              <App/>
          </Provider>
      </BrowserRouter>,
  document.getElementById('root')
);

