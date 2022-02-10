// import React from "react";
// import ReactDOM from "react-dom";
// import MathJax from "react-mathjax-preview/es/index";
 

 
// const math = String.raw`<br><b>Hello</b>2<sub>7
// <math><mfrac data-reactroot=""><mi>33</mi><mi>100</mi></mfrac></math>

 
 
 
//  `;
// function App() {
//   return (
//     <div className="App">
//       <MathJax math={math} />
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);




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
// axios.defaults.baseURL = "http://localhost/reactapi/public/api";
axios.defaults.baseURL = "https://api.aloronbd.com/public/api";
// Token save 
//  axios.defaults.baseURL = "https://api.aloronbd.com/public/api";
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("TOKEN_KEY");

ReactDOM.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,
  document.getElementById('root')
);

 
reportWebVitals();
serviceWorker.register();






// import { StrictMode } from "react";
// import ReactDOM from "react-dom";

// import App from './Component/App';

// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
//   rootElement
// );

