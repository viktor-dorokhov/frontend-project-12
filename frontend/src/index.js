import React from 'react';
import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
import './index.css';
import init from './init';

const root = ReactDOM.createRoot(document.getElementById('chat'));
const vdom = await init();
root.render(
  <React.StrictMode>
    {vdom}
  </React.StrictMode>,
);

// reportWebVitals();
