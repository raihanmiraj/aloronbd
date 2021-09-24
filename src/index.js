import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './Component/App';
import Header from './Component/Header/Header';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

import axios from 'axios';

// axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.baseURL = "http://localhost/reactapi/public/api";
// Token save 
// axios.defaults.baseURL = "https://api.aloronbd.com/public/api";
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("TOKEN_KEY");

ReactDOM.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();
