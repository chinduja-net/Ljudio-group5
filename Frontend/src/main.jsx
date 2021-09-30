import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import SongProvider from './context/SongProvider';

ReactDOM.render(
  <React.StrictMode>
    <SongProvider>
      <App />
    </SongProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
