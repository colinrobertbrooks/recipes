import 'bootstrap/dist/css/bootstrap.min.css';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import './index.css';

ReactDOM.render(
  <StrictMode>
    <Root />
  </StrictMode>,
  document.getElementById('root')
);
