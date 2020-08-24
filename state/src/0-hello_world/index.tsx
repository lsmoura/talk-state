import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import '../global-style.css';

let root = document.getElementById('root');
if (!root) {
  root = document.createElement('div');
  document.querySelector('body').append(root);
}

ReactDOM.render(
  <App/>,
  root,
);