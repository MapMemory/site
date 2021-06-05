import './styles/fonts.scss';
import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes.js'

import ScrollToTop from './utils/helpers/ScrollToTop.jsx'

ReactDOM.render(
  <BrowserRouter history={BrowserRouter}>
    <ScrollToTop />
    <Routes />
  </BrowserRouter>,
  document.getElementById('root')
);