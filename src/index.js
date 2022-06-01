import React from 'react';
import ReactDOM from 'react-dom/client';
import ComponentTestEnvironment from './component_test_env';
import './globals.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ComponentTestEnvironment />
  </React.StrictMode>
);
