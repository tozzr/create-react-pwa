import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './Store';
import './index.css';

ReactDOM.render(
  <App store={Store} />,
  document.getElementById('root')
);
