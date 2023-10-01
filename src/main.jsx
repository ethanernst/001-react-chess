import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from './style/GlobalStyle.js';
import './index.css';
import { BoardStateProvider } from './store/BoardStateContext.jsx';
import { GameStateProvider } from './store/GameStateContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <GameStateProvider>
      <BoardStateProvider>
        <App />
      </BoardStateProvider>
    </GameStateProvider>
  </React.StrictMode>
);
