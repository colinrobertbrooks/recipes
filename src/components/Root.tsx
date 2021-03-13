import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import App from './App';

const Root: React.FC = () => (
  <Router>
    <QueryParamProvider ReactRouterRoute={Route}>
      <App />
    </QueryParamProvider>
  </Router>
);

export default Root;
