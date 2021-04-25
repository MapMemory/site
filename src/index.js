import './styles/fonts.scss';
import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes.js'
import reportWebVitals from './utils/reportWebVitals';

ReactDOM.render(
  <BrowserRouter history={BrowserRouter}>
    <Routes />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
