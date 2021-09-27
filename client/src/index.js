import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CoinsList from './CoinsList';
import reportWebVitals from './reportWebVitals';

function AppIndex() {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
}

function CoinsListIndex() {
    ReactDOM.render(
      <React.StrictMode>
        <CoinsList />
      </React.StrictMode>,
      document.getElementById('root')
    );
}

var url = window.location.href.replace('http://localhost:3001','');

if (url === '/') {
  AppIndex();
} else {
  CoinsListIndex();
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
