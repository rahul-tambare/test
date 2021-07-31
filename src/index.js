import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/Contaner/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './ReduxStore/Store/Store'

// Broweser Router For rendering
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


ReactDOM.render(
  <Provider store={store}>

    {app}

  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();