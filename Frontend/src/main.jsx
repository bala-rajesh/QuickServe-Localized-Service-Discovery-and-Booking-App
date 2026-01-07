import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App.jsx';
import './index.css';
import { AlertProvider } from './components/CustomAlert.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <AlertProvider>
      <App />
    </AlertProvider>
  </RecoilRoot>
)

